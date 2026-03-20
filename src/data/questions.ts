import type { Category } from '../types'

// ═══════════════════════════════════════════════════════════════
// 대법원 판례 기반 근로자성 판단 진단 문항 데이터
// ═══════════════════════════════════════════════════════════════

export const CATEGORIES: Category[] = [
  {
    id: 'subordination',
    tag: 'STEP 1 / 5',
    title: '사용종속성 (지휘·감독)',
    desc: '대법원이 가장 중시하는 핵심 판단요소입니다. 업무 수행 과정에서 사용자의 구체적 지휘·감독을 받는지, 업무 내용을 사용자가 결정하는지를 진단합니다.',
    questions: [
      {
        id: 'q1',
        text: '업무의 내용(종류·범위)을 누가 결정합니까?',
        refs: ['대법원 2004다29736', '타다 2024두32973'],
        hint: '타다 판결: "쏘카가 운전기사의 업무내용을 결정"한 점이 근로자성 인정의 핵심 근거',
        weight: 5,
        options: [
          { label: '사용자(회사)가 전적으로 결정', score: 5, tag: '근로자↑↑', cls: 'high' },
          { label: '사용자가 대체로 결정, 일부 협의', score: 4, tag: '근로자↑', cls: 'high' },
          { label: '상호 협의하여 결정', score: 2.5, tag: '중립', cls: 'mid' },
          { label: '본인이 주도적으로 결정', score: 1, tag: '사업자↑', cls: 'low' },
          { label: '본인이 전적으로 결정', score: 0, tag: '사업자↑↑', cls: 'zero' },
        ],
      },
      {
        id: 'q2',
        text: '업무 수행 방법·절차·순서에 대한 구체적 지시를 받습니까?',
        refs: ['대법원 94다22859', '대법원 2004다29736'],
        hint: '판례: "업무수행 과정에서 사용자가 상당한 지휘·감독을 하는지"가 핵심',
        weight: 5,
        options: [
          { label: '세부 지시를 수시로 받고 보고 의무 있음', score: 5, tag: '근로자↑↑', cls: 'high' },
          { label: '업무 지시를 받으나 세부 방법은 자율', score: 3.5, tag: '근로자↑', cls: 'high' },
          { label: '큰 방향만 지시, 수행 방법은 자율', score: 2, tag: '중립', cls: 'mid' },
          { label: '결과물만 정해져 있고 과정은 완전 자율', score: 0.5, tag: '사업자↑', cls: 'low' },
          { label: '어떤 지시도 받지 않음', score: 0, tag: '사업자↑↑', cls: 'zero' },
        ],
      },
      {
        id: 'q3',
        text: '취업규칙·복무규정·인사규정의 적용을 받습니까?',
        refs: ['대법원 2004다29736'],
        hint: '복장 규정, 보고 체계, 회의 참석 의무, 교육 이수 의무 등 포함',
        weight: 3,
        options: [
          { label: '정규직과 동일하게 전면 적용', score: 5, tag: '근로자↑↑', cls: 'high' },
          { label: '상당 부분 적용됨', score: 3.5, tag: '근로자↑', cls: 'high' },
          { label: '일부 규정만 적용', score: 2, tag: '중립', cls: 'mid' },
          { label: '형식적으로만 적용 (실질 구속력 없음)', score: 1, tag: '사업자↑', cls: 'low' },
          { label: '전혀 적용되지 않음', score: 0, tag: '사업자↑↑', cls: 'zero' },
        ],
      },
      {
        id: 'q4',
        text: '업무를 거부하거나 다른 업무를 수행할 자유가 있습니까?',
        refs: ['대법원 94다22859'],
        hint: '업무 거부 시 불이익(계약 해지, 배정 제한 등) 존재 = 종속성 강화',
        weight: 3,
        options: [
          { label: '거부 불가, 거부 시 징계·해고 등 불이익', score: 5, tag: '근로자↑↑', cls: 'high' },
          { label: '거부 어려움, 거부 시 향후 업무 배정 제한', score: 3.5, tag: '근로자↑', cls: 'high' },
          { label: '거부 가능하나 관계 악화 우려', score: 2, tag: '중립', cls: 'mid' },
          { label: '자유롭게 거부 가능, 실질 불이익 없음', score: 0.5, tag: '사업자↑', cls: 'low' },
          { label: '수락·거부를 전적으로 자유롭게 결정', score: 0, tag: '사업자↑↑', cls: 'zero' },
        ],
      },
    ],
  },
  {
    id: 'time_place',
    tag: 'STEP 2 / 5',
    title: '시간적·장소적 구속',
    desc: '근무시간과 장소에 대한 사용자의 지정·구속 여부를 판단합니다. 플랫폼 노동의 경우 알고리즘을 통한 간접적 시간 통제도 포함합니다.',
    questions: [
      {
        id: 'q5',
        text: '근무시간(출·퇴근 시간)이 정해져 있습니까?',
        refs: ['대법원 2004다29736', '타다 2024두32973'],
        hint: '타다: "근무시간에 비례한 보수를 받은 점"이 근로자성 근거로 인정',
        weight: 4,
        options: [
          { label: '출퇴근 시간 엄격히 지정, 근태관리 시스템 적용', score: 5, tag: '근로자↑↑', cls: 'high' },
          { label: '코어타임 지정, 나머지 자율', score: 3, tag: '근로자↑', cls: 'high' },
          { label: '마감 기한만 있고 시간 운용은 자유', score: 1.5, tag: '중립', cls: 'mid' },
          { label: '완전히 자유로운 시간 운용', score: 0, tag: '사업자↑↑', cls: 'zero' },
        ],
      },
      {
        id: 'q6',
        text: '근무장소가 지정되어 있습니까?',
        refs: ['대법원 94다22859'],
        hint: '사업장 출근 의무, 지정된 현장 근무 등. 원격근무라도 접속 의무 시 구속 인정 가능',
        weight: 3,
        options: [
          { label: '사업장 출근 필수 (매일)', score: 5, tag: '근로자↑↑', cls: 'high' },
          { label: '주로 사업장이나 재택 혼합 가능', score: 3, tag: '근로자↑', cls: 'high' },
          { label: '장소 자유, 필요시만 방문', score: 1.5, tag: '중립', cls: 'mid' },
          { label: '완전히 자유 (본인 사업장/자택에서 수행)', score: 0, tag: '사업자↑↑', cls: 'zero' },
        ],
      },
      {
        id: 'q7',
        text: '초과근무·휴일근무를 지시받습니까?',
        refs: ['대법원 2004다29736'],
        hint: '연장·야간·휴일 근로 지시 가능성 = 시간 종속성의 강력한 징표',
        weight: 2,
        options: [
          { label: '필요시 초과근무 지시를 받고 거부 곤란', score: 5, tag: '근로자↑↑', cls: 'high' },
          { label: '요청을 받으나 거절 가능', score: 2.5, tag: '중립', cls: 'mid' },
          { label: '본인 재량으로 결정', score: 0.5, tag: '사업자↑', cls: 'low' },
          { label: '해당 없음 (시간 개념 자체 없음)', score: 0, tag: '사업자↑↑', cls: 'zero' },
        ],
      },
    ],
  },
  {
    id: 'economic',
    tag: 'STEP 3 / 5',
    title: '경제적 종속성',
    desc: '보수의 성격, 전속성, 독립 사업 여부 등 경제적 관계를 종합 판단합니다. 대법원은 실질적 경제적 종속성을 중시합니다.',
    questions: [
      {
        id: 'q8',
        text: '보수는 어떤 형태로 지급됩니까?',
        refs: ['대법원 94다22859', '대법원 2004다29736', '타다 2024두32973'],
        hint: '타다: "업무 수행 질과 관계없이 근무시간에 비례한 보수"가 핵심 근거. 기본급·고정급 존재 = 근로자성 강화',
        weight: 4,
        options: [
          { label: '월 고정급 (기본급 + 제수당)', score: 5, tag: '근로자↑↑', cls: 'high' },
          { label: '고정급 + 성과 인센티브 혼합', score: 3.5, tag: '근로자↑', cls: 'high' },
          { label: '시간당·건당 보수 (시간 비례)', score: 2.5, tag: '중립', cls: 'mid' },
          { label: '프로젝트 완료 후 도급 대금', score: 1, tag: '사업자↑', cls: 'low' },
          { label: '성과·매출 기반 (이윤·손실 본인 부담)', score: 0, tag: '사업자↑↑', cls: 'zero' },
        ],
      },
      {
        id: 'q9',
        text: '이 업무가 주된 수입원이며 전속적으로 근무합니까?',
        refs: ['대법원 94다22859'],
        hint: '경제적 종속성 + 전속성: 사용자에 대한 경제적 의존도가 높을수록 근로자성 강화',
        weight: 3,
        options: [
          { label: '유일한 수입원, 타 업무 금지 (전속 계약)', score: 5, tag: '근로자↑↑', cls: 'high' },
          { label: '주된 수입원 (70%↑), 사실상 전속', score: 3.5, tag: '근로자↑', cls: 'high' },
          { label: '여러 수입원 중 하나 (50% 미만)', score: 1.5, tag: '중립', cls: 'mid' },
          { label: '다수 거래처 보유, 특정 사용자에 비종속', score: 0, tag: '사업자↑↑', cls: 'zero' },
        ],
      },
      {
        id: 'q10',
        text: '제3자를 고용하여 업무를 대행시킬 수 있습니까?',
        refs: ['대법원 94다22859'],
        hint: '노무의 대체성: 본인이 직접 수행해야 한다면 근로자성 강화',
        weight: 3,
        options: [
          { label: '절대 불가, 반드시 본인이 직접 수행', score: 5, tag: '근로자↑↑', cls: 'high' },
          { label: '원칙적 불가, 예외적으로 허용', score: 3, tag: '근로자↑', cls: 'high' },
          { label: '사전 승인 시 가능', score: 1.5, tag: '중립', cls: 'mid' },
          { label: '자유롭게 제3자(보조인력) 투입 가능', score: 0, tag: '사업자↑↑', cls: 'zero' },
        ],
      },
      {
        id: 'q11',
        text: '비품·장비·원재료는 누가 소유·제공합니까?',
        refs: ['대법원 94다22859', '대법원 2004다29736'],
        hint: '사용자 제공 = 근로자 징표 / 본인 소유 투자 = 사업자 징표',
        weight: 2,
        options: [
          { label: '사용자가 전부 제공 (PC, 사무용품 등)', score: 5, tag: '근로자↑↑', cls: 'high' },
          { label: '주요 장비는 사용자, 소모품 일부 본인', score: 3, tag: '근로자↑', cls: 'high' },
          { label: '대부분 본인 장비, 일부 사용자 제공', score: 1.5, tag: '중립', cls: 'mid' },
          { label: '전부 본인 소유·투자 (상당한 자본 투입)', score: 0, tag: '사업자↑↑', cls: 'zero' },
        ],
      },
      {
        id: 'q12',
        text: '독자적 사업자등록이 있고 실제 영리활동을 합니까?',
        refs: ['대법원 94다22859'],
        hint: '사업자등록 유무 자체보다 "독립하여 자신의 계산으로 사업을 영위할 수 있는지"가 핵심',
        weight: 2,
        options: [
          { label: '사업자등록 없음', score: 5, tag: '근로자↑↑', cls: 'high' },
          { label: '사업자등록 있으나 형식적 (실질 영업 없음)', score: 3.5, tag: '근로자↑', cls: 'high' },
          { label: '사업자등록 있고 다른 거래처도 간헐적', score: 1.5, tag: '중립', cls: 'mid' },
          { label: '독립 사업체 운영, 다수 거래처 보유', score: 0, tag: '사업자↑↑', cls: 'zero' },
        ],
      },
    ],
  },
  {
    id: 'platform',
    tag: 'STEP 4 / 5',
    title: '플랫폼·간접 통제 (타다 판례 특별기준)',
    desc: '2024년 타다 대법원 판결이 제시한 플랫폼 노동 특별 판단기준입니다. 알고리즘·앱을 통한 간접적 통제, 중간 협력업체 구조 등을 판단합니다.',
    questions: [
      {
        id: 'q13',
        text: '앱·플랫폼·알고리즘을 통해 업무가 배정·관리됩니까?',
        refs: ['타다 2024두32973'],
        hint: '대법원: "온라인 플랫폼의 알고리즘이나 복수의 사업참여자가 관여하는 노무관리의 특성을 고려"',
        weight: 3,
        options: [
          { label: '플랫폼/앱이 업무 배정·평가·보수 전부 관리', score: 5, tag: '근로자↑↑', cls: 'high' },
          { label: '앱으로 배정받으나 수락 거부 자유', score: 3, tag: '근로자↑', cls: 'high' },
          { label: '플랫폼은 중개만, 업무 관리는 본인', score: 1, tag: '중립', cls: 'mid' },
          { label: '해당 없음 (플랫폼 이용하지 않음)', score: 0, tag: '해당없음', cls: 'zero' },
        ],
      },
      {
        id: 'q14',
        text: '중간 협력업체(파견·용역업체)가 존재합니까?',
        refs: ['타다 2024두32973'],
        hint: '타다: "협력업체가 운전업무 독립성을 갖추지 못한 점" — 명목상 중간업체 통해 계약해도 실질 사용자 판단',
        weight: 3,
        options: [
          { label: '중간업체 있으나 실질 지시는 원청이 함', score: 5, tag: '근로자↑↑', cls: 'high' },
          { label: '중간업체 통해 계약, 중간업체의 독립성 약함', score: 3.5, tag: '근로자↑', cls: 'high' },
          { label: '중간업체가 독자적 사업 능력 보유', score: 1, tag: '사업자↑', cls: 'low' },
          { label: '해당 없음 (직접 계약)', score: 0, tag: '해당없음', cls: 'zero' },
        ],
      },
      {
        id: 'q15',
        text: '서비스 품질 기준·고객평가·페널티 시스템이 있습니까?',
        refs: ['타다 2024두32973'],
        hint: '평가 시스템을 통한 간접 통제 = 지휘·감독의 현대적 형태',
        weight: 2,
        options: [
          { label: '엄격한 품질 기준 + 평점 하락 시 불이익', score: 5, tag: '근로자↑↑', cls: 'high' },
          { label: '품질 기준은 있으나 페널티는 약함', score: 2.5, tag: '중립', cls: 'mid' },
          { label: '기본 가이드만, 구속력 없음', score: 1, tag: '사업자↑', cls: 'low' },
          { label: '해당 없음', score: 0, tag: '해당없음', cls: 'zero' },
        ],
      },
    ],
  },
  {
    id: 'formal',
    tag: 'STEP 5 / 5',
    title: '형식적 지표 (보충적 판단요소)',
    desc: '세금 처리, 사회보험 가입, 계약 명칭 등 외형적 요소입니다. 대법원은 "사용자가 경제적으로 우월한 지위를 이용하여 임의로 정할 여지가 크다"고 하여 보충적으로만 고려합니다.',
    questions: [
      {
        id: 'q16',
        text: '소득세는 어떻게 처리됩니까?',
        refs: ['대법원 2004다29736'],
        hint: '판례: "근로소득세를 원천징수하였는지…사용자가 경제적 우월한 지위를 이용하여 임의로 정할 여지가 크다"',
        weight: 1.5,
        options: [
          { label: '근로소득세 원천징수 (갑종근로소득)', score: 5, tag: '근로자↑↑', cls: 'high' },
          { label: '사업소득 3.3% 원천징수', score: 1.5, tag: '중립', cls: 'mid' },
          { label: '본인이 종합소득세 직접 신고', score: 0, tag: '사업자↑', cls: 'zero' },
          { label: '잘 모르겠음', score: 2.5, tag: '-', cls: 'mid' },
        ],
      },
      {
        id: 'q17',
        text: '4대 사회보험에 가입되어 있습니까?',
        refs: ['대법원 94다22859'],
        hint: '국민연금·건강보험·고용보험·산재보험. 미가입이 곧 비근로자를 의미하지는 않음',
        weight: 1.5,
        options: [
          { label: '4대 보험 모두 직장가입자', score: 5, tag: '근로자↑↑', cls: 'high' },
          { label: '일부만 가입 (산재보험 등)', score: 3, tag: '근로자↑', cls: 'high' },
          { label: '미가입 (지역가입자/피부양자)', score: 1, tag: '중립', cls: 'mid' },
          { label: '잘 모르겠음', score: 2.5, tag: '-', cls: 'mid' },
        ],
      },
      {
        id: 'q18',
        text: '계약서상 명칭은 무엇입니까?',
        refs: ['대법원 2004다29736'],
        hint: '"계약의 형식이 고용계약인지 도급계약인지보다 그 실질에 있어…판단하여야 한다"',
        weight: 1,
        options: [
          { label: '근로계약서 (표준근로계약서 등)', score: 5, tag: '근로자↑↑', cls: 'high' },
          { label: '위촉·촉탁 계약서', score: 3, tag: '중립', cls: 'mid' },
          { label: '도급·용역·업무위탁 계약서', score: 1.5, tag: '사업자↑', cls: 'low' },
          { label: '프리랜서·외주 계약서', score: 0.5, tag: '사업자↑', cls: 'low' },
          { label: '서면 계약 없음', score: 2, tag: '중립', cls: 'mid' },
        ],
      },
      {
        id: 'q19',
        text: '퇴직금·연차휴가·각종 수당이 지급됩니까?',
        refs: ['대법원 94다22859'],
        hint: '근로기준법상 보호 규정 적용 여부. 미지급이 곧 비근로자를 의미하지 않음',
        weight: 1.5,
        options: [
          { label: '퇴직금·연차·수당 모두 지급', score: 5, tag: '근로자↑↑', cls: 'high' },
          { label: '일부만 지급 (상여금·명절수당 등)', score: 3, tag: '근로자↑', cls: 'high' },
          { label: '미지급이나 별도 보상 있음', score: 1.5, tag: '중립', cls: 'mid' },
          { label: '전혀 지급되지 않음', score: 0, tag: '사업자↑↑', cls: 'zero' },
        ],
      },
    ],
  },
]

export const MAX_SCORE = CATEGORIES.reduce(
  (sum, cat) => sum + cat.questions.reduce((s, q) => s + q.weight * 5, 0),
  0,
)

export const PRESUMPTION_KEYS = ['q1', 'q2', 'q4', 'q5', 'q6'] as const
export const PRESUMPTION_LABELS = [
  '업무내용 결정',
  '지휘·감독',
  '업무거부 불이익',
  '근무시간 지정',
  '근무장소 지정',
]
