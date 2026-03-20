# 근로자 vs 프리랜서 판단 진단 시스템

대법원 판례·고용노동부 가이드라인을 참고한 **자가진단** 웹앱입니다. 법률 자문이 아닙니다.

## 라우트

| 경로 | 내용 |
|------|------|
| `/` | 랜딩(소개·보도 요약·노무사 CTA) — **판례 사건번호 없음** |
| `/diagnosis` | 자가진단(문항·진행률·결과·판례 근거) |

## 실행

```bash
cd worker-diagnosis-app
npm install
npm run dev
```

## 빌드

```bash
npm run build
npm run preview
```

## Git에 올리기

원격 저장소가 없다면 GitHub에서 새 저장소를 만든 뒤:

```bash
git remote add origin https://github.com/<계정>/<저장소>.git
git branch -M main
git push -u origin main
```

(GitHub CLI 사용 시) `gh repo create worker-diagnosis --private --source=. --remote=origin --push`

## Vercel에 배포

1. [Vercel](https://vercel.com) 로그인 → **Add New Project** → GitHub 저장소 연결  
2. **Framework Preset**: Vite (자동 인식), **Build**: `npm run build`, **Output**: `dist`  
3. 저장소 루트에 `vercel.json`이 있으면 동일 설정이 적용됩니다.

CLI로 새 프로젝트에 연결·배포:

```bash
npm i -g vercel
# 또는
npx vercel login
npx vercel        # 프리뷰
npx vercel --prod # 프로덕션
```

`package.json` 스크립트: `npm run vercel:prod` (전역/로컬 `vercel` CLI 필요)

## 커스터마이징

| 항목 | 위치 |
|------|------|
| 전화·비대면 링크 | `src/components/ConsultantProfile.tsx` |
| 보도 수치 | `src/components/CrackdownStats.tsx`, `AlertBanner.tsx` |
| 문항·가중치 | `src/data/questions.ts` |
| 판정 임계값 | `src/utils/scoring.ts` → `THRESHOLD` |
