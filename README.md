# 메이플 헬퍼 (Maple Helper)

메이플스토리 유저가 자주 사용하는 계산, 정보 확인, 편의 기능을 한 곳에서 사용할 수 있도록 만든 유틸리티 서비스입니다.

## 배포 링크

- 서비스 주소: [maple-helper.com](https://www.maple-helper.com/)

## 프로젝트 소개
메이플 헬퍼는 메이플스토리에서 주간 보스를 돌며 얻는 수익을 더 쉽고 빠르게 계산하기 위해 만든 서비스입니다.

비슷한 기능을 제공하는 기존 서비스도 있었지만, 직접 사용해 보며 편의성이 아쉽다고 느꼈습니다. 
이런 불편함을 해결하기 위해 직접 서비스를 제작했고, API Key를 입력하면 계정 내 캐릭터를 조회해 일괄 등록할 수 있도록 구현해 차별화를 두었습니다.

또한 실제 유저들의 의견을 반영하기 위해 커뮤니티와 오픈채팅방을 통해 피드백을 수집하고 있으며, 현재도 새로운 기능을 추가하며 서비스를 지속적으로 확장하고 있습니다.
## 기능

- 주간 보스 수익 계산기
  - 캐릭터명과 API Key를 등록하면 캐릭터의 전투력을 기준으로 도전 가능한 보스를 자동으로 선택해 예상 수익을 계산합니다.
  - API Key 입력 시 계정 내 캐릭터를 조회해 일괄 등록할 수 있습니다.

- 제네시스 해방 계산기
  - 제네시스 무기 해방 퀘스트의 완료 예상 시점을 계산합니다.

- 데스티니 해방 계산기
  - 데스티니 무기 해방 퀘스트의 완료 예상 시점을 계산합니다.

- 보조무기 석방 계산기
  - 보조무기 석방 퀘스트의 완료 예상 시점을 계산합니다.

- 보스 보상금 분배 계산기
  - 보스 클리어 후 획득한 보상금을 인원수에 맞게 나누어 계산합니다.
 
## 기술 스택

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Zustand

### Library
- Axios
- Swiper
- React Icons
- cookies-next

### Analytics / SEO
- Vercel Analytics
- next-sitemap

## 프로젝트 구조

```bash
src/
├── app/         # Next.js App Router 페이지 및 레이아웃
├── assets/      # 이미지, 아이콘 등 정적 리소스
├── components/  # 공통 UI 컴포넌트
├── constants/   # 상수 관리
├── data/        # 정적 데이터 및 서비스에서 사용하는 데이터 소스
├── hooks/       # 커스텀 훅
├── lib/         # 라이브러리 설정 및 공통 유틸성 모듈
├── stores/      # Zustand 전역 상태 관리
├── types/       # TypeScript 타입 정의
└── utils/       # 범용 유틸 함수
```

## 실행 방법

### 1. 저장소 클론

```bash
git clone <repository-url>
cd maplestory-helper
```
### 2. 패키지 설치
```bash
npm install
```
### 3. 환경 변수 설정
```env
NEXT_PUBLIC_MAPLEAPI_KEY={발급 받은 API KEY}
NEXT_PUBLIC_URL=https://open.api.nexon.com/maplestory
NEXT_PUBLIC_BACKEND_URL={실행 환경 URL}
```
### 4. 개발 서버 실행
```bash
npm run dev
```
### 5. 빌드 및 실행
```bash
npm run build
npm run start
```
