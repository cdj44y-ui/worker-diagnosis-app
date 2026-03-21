# 판례·법령 정확성 보완 기록 (2026. 3. 21.)

검증 보고서에 따른 코드 반영 요약입니다.

## 반영된 수정

| # | 항목 | 조치 |
|---|------|------|
| 1 | 판례 표기 (`타다 2024두32973`) | `refs`는 `대법원 2024두32973`로 통일. 통칭이 필요한 hint·카테고리 설명에는 `(타다)` 병기. `InfoBanner`·`DisclaimerNotice` 나열은 `2024두32973`로 정리. |
| 2 | Q2 hint 법리 귀속 | 94다22859「구체적·개별적」↔ 2004다29736「상당한」 완화를 명시하는 문구로 교체. |
| 3 | Q16 갑종근로소득 | 폐지 용어 제거 → `근로소득세 원천징수 (4대보험·원천징수 연동)`. |
| 4 | Q1 hint 따옴표 | 직접 인용 오해 방지 → `대법원 2024두32973(타다) 취지 — …` 형식. |
| 5 | 추정제 지표 표현 | 제목·부제·본문을 「추정제 법안 요건 ≠ 판례 핵심 5요소 자가점검」으로 재설계. `ResultPage`, `InfoBanner`, `Hero`, `types` 주석 등 정합성 정리. |

## 변경 파일 (주요)

- `src/data/questions.ts`
- `src/components/InfoBanner.tsx`, `DisclaimerNotice.tsx`, `ResultPage.tsx`, `Hero.tsx`
- `src/types.ts`
- `src/components/ConsultantProfile.tsx` (문구만 소폭 정합)

`legal-refs.ts`, `CrackdownStats.tsx`는 기존 표기·통계 출처가 적절하여 변경 없음.

## 참고

- `docs/legal-citations.md`의 「타다」는 사건 설명용으로 유지 가능.
- `legal-refs.ts`의 `name: '… (타다)'`는 사건명 식별용으로 유지.
