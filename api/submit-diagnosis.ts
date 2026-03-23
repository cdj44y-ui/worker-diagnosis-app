/**
 * Vercel Serverless — Notion DB에 진단 리포트 요청 저장
 *
 * Notion 데이터베이스에 아래 속성(영문 이름·타입)을 맞춰 주세요.
 * - Title (title) — 표시용 제목
 * - Email (email)
 * - Name (rich_text)
 * - Industry (select) — 옵션: 숙박·음식, 제조, 도소매, 운수, IT·소프트웨어, 건설, 기타
 * - UserType (select) — 옵션: 사업주, 근로자, 인사담당자
 * - TotalScore (number)
 * - Percentage (number)
 * - Verdict (select) — 옵션: worker, gray, freelancer
 * - PresumptionMet (number)
 * - CategoryScores (rich_text) — JSON 문자열
 * - SubmittedAt (date)
 */
import { Client } from '@notionhq/client'
import type { VercelRequest, VercelResponse } from '@vercel/node'

type Body = {
  email?: string
  name?: string
  industry?: string
  userType?: '사업주' | '근로자' | '인사담당자'
  totalScore?: number
  percentage?: number
  verdict?: 'worker' | 'gray' | 'freelancer'
  presumptionMet?: number
  categoryScores?: { category: string; score: number; max: number }[]
  submittedAt?: string
}

function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim())
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8')

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    return res.status(204).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  let raw: unknown
  try {
    raw = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
  } catch {
    return res.status(400).json({ ok: false, error: 'Invalid JSON' })
  }
  const body = raw as Body

  if (!body.email || !isValidEmail(body.email)) {
    return res.status(400).json({ ok: false, error: 'Invalid email' })
  }

  const notionKey = process.env.NOTION_API_KEY
  const dbId = process.env.NOTION_DB_ID

  if (!notionKey || !dbId) {
    console.error('Missing NOTION_API_KEY or NOTION_DB_ID')
    return res.status(500).json({ ok: false, error: 'Server configuration' })
  }

  const totalScore = typeof body.totalScore === 'number' ? body.totalScore : NaN
  const percentage = typeof body.percentage === 'number' ? body.percentage : NaN
  const presumptionMet = typeof body.presumptionMet === 'number' ? body.presumptionMet : NaN

  if (Number.isNaN(totalScore) || Number.isNaN(percentage) || Number.isNaN(presumptionMet)) {
    return res.status(400).json({ ok: false, error: 'Invalid payload' })
  }

  if (!body.verdict || !['worker', 'gray', 'freelancer'].includes(body.verdict)) {
    return res.status(400).json({ ok: false, error: 'Invalid verdict' })
  }

  const submittedAt = body.submittedAt && !Number.isNaN(Date.parse(body.submittedAt))
    ? body.submittedAt
    : new Date().toISOString()

  const categoryJson = JSON.stringify(body.categoryScores ?? [])

  const titleText = `${body.name?.trim() || body.email.trim()} · ${submittedAt.slice(0, 10)}`

  const categoryChunks: Array<{ type: 'text'; text: { content: string } }> = []
  for (let i = 0; i < categoryJson.length; i += 2000) {
    categoryChunks.push({ type: 'text', text: { content: categoryJson.slice(i, i + 2000) } })
  }

  const notion = new Client({ auth: notionKey })

  try {
    await notion.pages.create({
      parent: { database_id: dbId },
      properties: {
        Title: {
          title: [{ type: 'text', text: { content: titleText.slice(0, 2000) } }],
        },
        Email: { email: body.email.trim() },
        Name: {
          rich_text: body.name?.trim()
            ? [{ type: 'text', text: { content: body.name.trim().slice(0, 2000) } }]
            : [],
        },
        Industry: body.industry
          ? { select: { name: body.industry } }
          : { select: null },
        UserType: body.userType
          ? { select: { name: body.userType } }
          : { select: null },
        TotalScore: { number: totalScore },
        Percentage: { number: percentage },
        Verdict: { select: { name: body.verdict } },
        PresumptionMet: { number: presumptionMet },
        CategoryScores: {
          rich_text: categoryChunks.length > 0 ? categoryChunks : [{ type: 'text', text: { content: '[]' } }],
        },
        SubmittedAt: {
          date: { start: submittedAt.slice(0, 10) },
        },
      },
    })

    return res.status(200).json({ ok: true })
  } catch (e) {
    console.error('Notion create error', e)
    return res.status(502).json({ ok: false, error: 'Notion request failed' })
  }
}
