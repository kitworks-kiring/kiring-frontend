# Kiring: 회사 생활의 연결고리

![대표 이미지](https://github.com/user-attachments/assets/03dbb6af-f9f8-4ef0-ac03-566c5cb59b0e)

오늘 점심에는 무엇을 먹을지, 일정을 한 눈에 확인할 수 없을지, 퇴근은 또 어떻게 할지.. 회사원이라면 한번 쯤 해본 고민들입니다.

키링은 **회사 근처 식당 리스트, 교통 정보, 캘린터, 커뮤니티 기능 등 회사 생활에 필요한 정보를 통합하여 한 곳에서 제공**하는 것을 목표로 했습니다.

회사 생활을 더욱 편리하게 만들어주는 올인원 플랫폼 키링에서, 유용한 정보를 쉽고 빠르게 확인해보세요!

<br />

## 1️⃣ 프론트엔드 기술 스택

![FE 기술 스택](https://github.com/user-attachments/assets/5745aff1-cc34-4833-9768-856faf1546b3)

| **스택**           | **버전** | **선정 이유 및 효과**                                                                                                                                                                                                                                                                    |
| ------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Next.js**        | 15.3.1   | · 서버 사이드 렌더링과 정적 사이트 생성을 모두 지원해 성능이 뛰어나며, App Routes를 통해 보안이 필요한 API Key도 안전하게 서버 측에서 처리할 수 있었습니다. <br /> · 자동 최적화와 빠른 개발 사이클, Vercel과의 원활한 통합으로 대규모 서비스에 적합한 확장성과 유지보수성을 제공합니다. |
| **Tailwind CSS**   | 4.0.0    | · 낮은 러닝커브로 빠른 UI 개발이 가능하고, 디자인 토큰과 연동해 스타일을 중앙에서 관리리하고 디자인 시스템의 일관성을 쉽게 유지할 수 있었습니다.                                                                                                                                         |
| **TypeScript**     | 5.0.0    | · 명확한 타입 정의로 런타임 오류를 줄이고, 복잡한 상태 관리와 API 연동 시 안정성을 높여 유지보수가 용이합니다.                                                                                                                                                                           |
| **Zustand**        | 5.0.5    | · npm 트렌드가 높고 꾸준히 업데이트가 되고 있으며, 러닝커브가 낮은 장점이 있습니다. <br /> · 최소한의 코드로 빠르게 상태 관리를 구현할 수 있으며, 경량 구조와 높은 성능, 모듈화된 스토어로 확장성까지 고려할 수 있었습니다.                                                              |
| **Tanstack-Query** | 5.74.4   | · 서버 상태를 자동으로 동기화하고, 캐싱·백그라운드 갱신·에러 처리 등 복잡한 데이터 패칭 로직을 간결하게 관리할 수 있어 API 호출을 효율적으로 최적화할 수 있었습니다.                                                                                                                     |

<br />

## 2️⃣ 주요 구현 전략

### 📱 배포 자동화 및 PWA 적용

![CI/CD, PWA](https://github.com/user-attachments/assets/94f9a3af-05db-48d0-912f-9beb214c3d65)

#### **☑️ 자동 동기화 및 배포 흐름**

- 별도의 수동 동기화 없이 GitHub Actions를 활용해 fork된 배포용 레포지토리를 원본과 자동으로 동기화하며, Vercel과 연동된 CI/CD 파이프라인을 통해 Preview 및 Production 배포가 원활하게 이루어집니다.

#### **☑️ 배포용 레포지토리와 Vercel 연동**

- develop 브랜치에 변경사항이 병합되면 Preview 환경(kiring-develop.vercel.app)에 배포되어 개발 시 실시간 검증이 가능합니다.

- 이후 PR을 통해 main 브랜치에 병합되면 Production 환경(kiring.vercel.app)에 최종 배포를 자동으로 수행합니다.

#### **☑️ PWA(Progressive Web App) 적용**

- 모바일 환경에서도 네이티브 앱과 같은 직관적이고 빠른 사용자 경험을 제공하기 위해 PWA를 도입했습니다.

- 이를 통해 사용자는 별도 앱 설치 없이도 홈 화면에 앱 아이콘 추가, 오프라인 접근 등 앱 수준의 편리한 기능을 활용할 수 있습니다.

<br />

### 🎨 디자인 시스템 구현 및 자동화

![디자인 시스템 자동화](https://github.com/user-attachments/assets/8ed16f5d-d478-406c-b0be-dc3eb1b6a6a5)

- 디자인 시스템을 구축하고 Figma의 Style Dictionary로 관리한 디자인 토큰(JSON)을 Tailwind에 연동했습니다.

- 디자인 시스템에서 정의한 스타일 값이 코드에 자동으로 반영되어, UI의 일관성을 쉽게 유지할 수 있고 디자인 변경 시에도 모든 화면에 신속하게 적용되어 개발과 유지보수의 효율성이 높아졌습니다.

<br />

### 🧩 컴포넌트 기반 UI 구조화

![UI 컴포넌트](https://github.com/user-attachments/assets/d9d296eb-a623-481f-a77a-323ba18cf0a7)

- 반복적으로 사용되는 UI 요소를 컴포넌트로 분리하여, 코드의 중복을 줄이고 UI 구조를 명확하게 확립했습니다.

- 또한 다양한 상황에서도 재사용할 수 있도록 props 기반으로 설계하여, 유연성과 확장성을 높였습니다.

<br />

### ⚡ 인터랙티브 UI 구현

![인터랙티브 UI](https://github.com/user-attachments/assets/d845571c-cd4d-45c8-94cf-c14ce4a1e694)

- 사용자가 서비스 이용 과정에서 더 많은 재미와 몰입감을 느낄 수 있도록, 다양한 인터랙티브 UI 요소를 도입했습니다.

- 사용자와의 적극적인 상호작용을 유도하여 서비스 경험이 더욱 생동감 있고 즐거웠다는 긍정적인 피드백을 받을 수 있었습니다.

<br />

## 3️⃣ 협업 과정

### 🗃️ Github을 이용한 개발 과정 문서화

![협업1: Github](https://github.com/user-attachments/assets/dcba8364-c333-4d8d-af4b-fba6d39892f8)

<br />

### 🐰 코드 리뷰 AI 도입

![협업2: 코드리뷰 AI](https://github.com/user-attachments/assets/71c95a0b-6d9d-4fb5-a99b-4a289ddbed66)

<br />

### 📔 Notion을 이용한 로드맵 관리

![협업3: Notion](https://github.com/user-attachments/assets/6394a73b-1b42-41fc-badb-dcb9a9163213)

<br />

## 4️⃣ 주요 기능

### 🔐 소셜 로그인

![소셜 로그인 이미지](https://github.com/user-attachments/assets/e81c4725-0c10-4840-bce7-1208523ce170)

<br />

### 🏠 홈

![메인 페이지 이미지](https://github.com/user-attachments/assets/8cb0f297-1824-4b56-9862-283af192a6ca)

<br />

### 🍴 플레이스

![플레이스 페이지 이미지](https://github.com/user-attachments/assets/344666c5-a2a7-4194-88cd-3b841a1d3709)

<br />

### 🚍 교통

![교통 페이지 이미지](https://github.com/user-attachments/assets/c216fe28-4893-4511-8816-33a05948a2d7)

<br />

### 📅 캘린더

![캘린더 페이지 이미지](https://github.com/user-attachments/assets/cf47f2c1-fcf9-45fc-906a-c3fa9ef51f35)

<br />

### 💬 커뮤니티

![커뮤니티 페이지 이미지](https://github.com/user-attachments/assets/52fda276-6f09-431c-8448-5a103c19b127)

<br />

### 💌 종이비행기

![종이비행기 페이지 이미지](https://github.com/user-attachments/assets/b4fecb2c-d0b2-4a92-b3fd-850d0d4eb279)

<br />

### 📄 마이페이지

![마이페이지 이미지](https://github.com/user-attachments/assets/26b35cb6-2415-4ff6-9b7d-7c7431ff268d)

<br />

## 5️⃣ 키링 개발팀

|                                                                         프론트엔드                                                                         |                                                                         프론트엔드                                                                         |                                                                         프론트엔드                                                                         |                                                                           백엔드                                                                           |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://pub-cf3b9667253a490495a16433a99bd7ca.r2.dev/main-profile-img/%ED%94%84%EB%A1%A0%ED%8A%B8/%EC%96%91%EB%8B%A4%EC%9C%97.png" width="150" /> | <img src="https://pub-cf3b9667253a490495a16433a99bd7ca.r2.dev/main-profile-img/%ED%94%84%EB%A1%A0%ED%8A%B8/%EA%B9%80%ED%95%9C%EC%86%94.png" width="150" /> | <img src="https://pub-cf3b9667253a490495a16433a99bd7ca.r2.dev/main-profile-img/%ED%94%84%EB%A1%A0%ED%8A%B8/%EB%B0%B1%ED%98%9C%EC%9D%B8.png" width="150" /> | <img src="https://pub-cf3b9667253a490495a16433a99bd7ca.r2.dev/main-profile-img/%EB%B0%B1%EC%97%94%EB%93%9C/%EA%B9%80%ED%83%9C%EB%AF%BC.png" width="150" /> |
|                        [양다윗](https://github.com/kitworks-kiring/kiring-frontend/pulls?q=is%3Apr+assignee%3Aydw1996+is%3Aclosed)                         |                    [김한솔](https://github.com/kitworks-kiring/kiring-frontend/pulls?q=is%3Apr+is%3Aclosed+assignee%3Ahansololiviakim)                     |                       [백혜인](https://github.com/kitworks-kiring/kiring-frontend/pulls?q=is%3Apr+is%3Aclosed+assignee%3Ahyein0112)                        |                                                [김태민](https://github.com/kitworks-kiring/kiring-backend)                                                 |
