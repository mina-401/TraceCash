# TraceCash — 개인 고정지출 관리 플랫폼

> "매달 자동으로 빠져나가는 모든 것"을 한 곳에서 관리하는 고정지출 추적 서비스입니다.

---

## 목차

1. [프로젝트 소개](#1-프로젝트-소개)
2. [기술 스택](#2-기술-스택)
3. [핵심 설계 결정](#3-핵심-설계-결정)
4. [데이터 모델](#4-데이터-모델)
5. [API 엔드포인트](#5-api-엔드포인트)
6. [인증 방식](#6-인증-방식)
7. [프로젝트 구조](#7-프로젝트-구조)

---

## 1. 프로젝트 소개

TraceCash는 구독 서비스·월세·통신비처럼 **매달 반복적으로 발생하는 고정지출**을 관리하는 서비스입니다.

기존 가계부 앱과의 차이점:
- 과거 지출 기록이 아닌 **미래에 발생할 반복 지출**에 집중
- 규칙을 한 번 등록하면 **스케줄러가 자동으로 결제 예정 건을 생성**
- 사용자는 캘린더처럼 조회하고, 결제 완료/건너뜀을 직접 체크

---

## 2. 기술 스택

### 백엔드 (`trace-cash/`)

| 분류 | 기술 |
|------|------|
| 프레임워크 | NestJS (TypeScript) |
| ORM | Prisma 6 |
| 데이터베이스 | MySQL 8 |
| 인증 | JWT + Passport |
| 스케줄러 | @nestjs/schedule |
| 날짜 처리 | date-fns |
| 비밀번호 암호화 | bcrypt |

### 프론트엔드 (`frontend/`)

| 분류 | 기술 |
|------|------|
| 프레임워크 | React 18 + TypeScript |
| 빌드 도구 | Vite |
| 스타일 | Tailwind CSS (Notion 디자인 시스템) |
| 라우팅 | React Router v6 |
| 아이콘 | Lucide React |
| 상태 관리 | React Context (AuthContext) |

---
## 3. 핵심 설계 결정

### 반복 규칙(RecurringExpense)과 실제 발생(ExpenseInstance) 분리

이 프로젝트의 가장 중요한 설계 결정입니다.

```
RecurringExpense (규칙)              ExpenseInstance (실제 발생 건)
"넷플릭스 매달 25일 17,000원"   →   "2026년 6월 25일 17,000원 PENDING"
                                →   "2026년 7월 25일 17,000원 PENDING"
                                →   "2026년 8월 25일 17,000원 PENDING"
```

규칙은 하나지만, 스케줄러가 매달 실제 결제 건을 자동으로 생성합니다. 이를 통해:
- 과거 인스턴스의 금액은 규칙이 변경되어도 보존됨 (금액 인상 추적 가능)
- 결제 예정일을 캘린더처럼 조회 가능
- 각 건별로 PAID/SKIPPED 상태 관리 가능

### 스케줄러 — 이번 달 + 다음 달 말까지 미리 생성

```
현재: 2026년 6월 12일  →  horizon: 2026년 7월 31일

→ 6월 25일 인스턴스 생성 (이번 달)
→ 7월 25일 인스턴스 생성 (다음 달 미리 보기)
```

10초마다 실행되며 `upsert`를 사용하므로 중복 생성 없이 안전합니다.  
사용자가 다음 달 대시보드를 미리 확인할 수 있습니다.

### 멱등성 보장

서버 재시작이나 중복 실행에도 **동일한 인스턴스가 중복 생성되지 않습니다.**

`@@unique([recurringId, dueDate])`로 DB 레벨에서 중복을 막고, `upsert`로 "없으면 생성, 있으면 그대로"를 보장합니다.

### 카테고리 공용 + 커스텀 하이브리드

| userId | 의미 |
|--------|------|
| `null` | 공용 카테고리 — 모든 사용자가 공유 (주거, 통신, 구독 서비스 등 8개) |
| 값 있음 | 해당 사용자의 커스텀 카테고리 |

조회 시 공용 + 내 커스텀을 함께 반환합니다.

```typescript
where: { OR: [{ userId: null }, { userId }] }
```

### 인스턴스 상태는 3가지만

`PENDING` / `PAID` / `SKIPPED`

`FAILED`는 의도적으로 제외했습니다. TraceCash는 실제 결제를 대행하지 않고 사용자가 직접 체크하는 가계부 서비스이므로, 시스템이 결제 실패를 자동 감지할 수단이 없습니다.

---

## 4. 데이터 모델

```
User
├── id           String   @id @default(cuid())
├── email        String   @unique
├── passwordHash String
└── createdAt    DateTime @default(now())

Category
├── id           String   @id @default(cuid())
├── userId       String?  (null = 공용)
├── name         String
├── domain       String
└── isEssential  Boolean  @default(false)

RecurringExpense (반복지출 규칙)
├── id           String    @id @default(cuid())
├── userId       String
├── categoryId   String?
├── name         String
├── amount       Int
├── frequency    Frequency (MONTHLY | YEARLY | WEEKLY)
├── interval     Int       @default(1)
├── dayOfMonth   Int?
├── startDate    DateTime  @db.Date
├── endDate      DateTime? @db.Date
├── isActive     Boolean   @default(true)
└── createdAt    DateTime  @default(now())

ExpenseInstance (지출 인스턴스)
├── id           String         @id @default(cuid())
├── recurringId  String
├── amount       Int            (생성 시점 규칙에서 복사)
├── dueDate      DateTime       @db.Date
├── status       InstanceStatus @default(PENDING)
└── createdAt    DateTime       @default(now())
   @@unique([recurringId, dueDate])
```

---

## 5. API 엔드포인트

`*` 표시는 JWT 인증이 필요합니다 (`Authorization: Bearer <token>`).

### Auth

| Method | Path | 설명 | 인증 |
|--------|------|------|------|
| POST | /auth/register | 회원가입 | - |
| POST | /auth/login | 로그인 → accessToken 발급 | - |
| GET | /auth/me | 내 정보 조회 | * |

### Categories

| Method | Path | 설명 | 인증 |
|--------|------|------|------|
| GET | /categories | 공용 + 내 커스텀 카테고리 목록 | * |
| POST | /categories | 커스텀 카테고리 생성 | * |
| GET | /categories/:id | 단일 조회 | * |
| PATCH | /categories/:id | 수정 | * |
| DELETE | /categories/:id | 삭제 | * |

### Recurring Expenses

| Method | Path | 설명 | 인증 |
|--------|------|------|------|
| GET | /recurring-expenses | 내 반복지출 규칙 목록 | * |
| POST | /recurring-expenses | 규칙 생성 | * |
| GET | /recurring-expenses/:id | 단일 조회 | * |
| PATCH | /recurring-expenses/:id | 수정 (`isActive` 포함) | * |
| DELETE | /recurring-expenses/:id | 삭제 | * |

### Expense Instances

| Method | Path | 설명 | 인증 |
|--------|------|------|------|
| GET | /expense-instances?from=&to= | 기간별 인스턴스 조회 | * |
| PATCH | /expense-instances/:id/pay | 결제 완료 표시 | * |
| PATCH | /expense-instances/:id/skip | 건너뜀 표시 | * |

---

## 6. 인증 방식

JWT Bearer 토큰 방식을 사용합니다.

```
1. POST /auth/login → { accessToken: "eyJ..." }
2. 이후 모든 요청 헤더에 포함:
   Authorization: Bearer eyJ...
3. 토큰 유효기간: 1일
4. 토큰 만료 시 401 → 프론트엔드에서 로그인 페이지로 리다이렉트
```

비밀번호는 bcrypt(salt rounds: 10)로 단방향 해싱하여 저장합니다.

보안상 "이메일 없음"과 "비밀번호 틀림"은 동일한 메시지를 반환합니다. 이메일 존재 여부를 외부에 노출하지 않기 위함입니다.

---

## 7. 프로젝트 구조

```
TraceCash/
├── docker-compose.yml               # MySQL 8 컨테이너 (호스트 3307 → 컨테이너 3306)
├── trace-cash/                      # 백엔드 (NestJS)
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── migrations/
│   │   └── seed.ts                  # 공용 카테고리 8개 초기 데이터
│   └── src/
│       ├── common/
│       │   ├── prisma/              # PrismaService (@Global)
│       │   └── decorators/          # @CurrentUser 데코레이터
│       └── modules/
│           ├── auth/                # 회원가입, 로그인, JWT 전략, 가드
│           ├── categories/          # 카테고리 CRUD
│           ├── recurring-expenses/  # 반복지출 규칙 CRUD
│           ├── expense-instances/   # 인스턴스 조회 + 상태 변경
│           └── scheduler/           # 자동 인스턴스 생성 (10초 간격, 다음 달 말까지)
└── frontend/                        # 프론트엔드 (React + Vite)
    └── src/
        ├── api/client.ts            # fetch 기반 API 클라이언트 (401 시 자동 로그아웃)
        ├── context/AuthContext.tsx  # JWT 토큰 + 유저 상태 관리
        ├── components/
        │   ├── Layout.tsx           # 사이드바 네비게이션
        │   └── ui/                  # Button, Input, Select, Card, Badge, Modal
        └── pages/
            ├── AuthPage.tsx              # 로그인 / 회원가입 (탭 토글)
            ├── DashboardPage.tsx         # 월별 지출 목록 + 결제/건너뜀 + 요약
            ├── RecurringExpensesPage.tsx # 반복 지출 규칙 CRUD
            └── CategoriesPage.tsx        # 공통 + 커스텀 카테고리 관리
```
