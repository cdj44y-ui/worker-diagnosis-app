# 근로자 vs 프리랜서 판단 진단 시스템

대법원 판례·고용노동부 가이드라인을 참고한 **자가진단** 웹앱입니다. 법률 자문이 아닙니다.

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

## 커스터마이징

| 항목 | 위치 |
|------|------|
| 전화·비대면 링크 | `src/components/ConsultantProfile.tsx` |
| 보도 수치 | `src/components/CrackdownStats.tsx`, `AlertBanner.tsx` |
| 문항·가중치 | `src/data/questions.ts` |
| 판정 임계값 | `src/utils/scoring.ts` → `THRESHOLD` |
