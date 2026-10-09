# 기술 명세 문서 (Technical Specification Document)
> 인터렉티브 미디어 포트폴리오 웹사이트
> 최초 작성일: 2026-10-07 | 버전: 0.2 (개발 환경 반영)

---

## 1. 기술 스택 (사용할 기술 목록)

> **기술 스택**이란: 이 프로젝트를 만들기 위해 사용하는 도구들의 조합

### 1.1 핵심 기술

| 기술 | 역할 | 선택 이유 |
|------|------|-----------| 
| **HTML5** | 웹 페이지 뼈대 | 모든 웹 브라우저의 표준 언어 |
| **CSS3** | 스타일/레이아웃 | UI 요소 디자인 |
| **JavaScript (ES6+)** | 게임 로직 전체 | 웹에서 동작하는 유일한 프로그래밍 언어 |
| **Phaser.js (v3)** | 게임 엔진 | 아래 설명 참고 |

### 1.2 왜 Phaser.js인가?

> **게임 엔진**이란: 게임 개발에 필요한 기능들을 미리 만들어놓은 도구 모음

Phaser.js 없이 직접 구현해야 하는 것들:
- 화면에 캐릭터 그리기
- 키보드 입력 처리
- 충돌 감지 (벽에 막히기, 아이템 수집)
- 카메라 이동 (Follow Camera)
- 씬 전환 (외부 맵 ↔ 내부 맵)
- 스프라이트 애니메이션

Phaser.js는 위 기능들을 **이미 만들어서 제공**하기 때문에, AI에게 요청할 코드 양이 크게 줄어들고 오류 가능성도 낮아짐.

- **공식 사이트**: https://phaser.io/
- **라이선스**: MIT (무료, 상업적 사용 가능)
- **현재 최신 버전**: Phaser 3.x

### 1.3 개발 도구

| 도구 | 역할 | 상태 |
|------|------|------|
| **Antigravity (AGY)** | AI 코딩 어시스턴트 + 코드 편집기 | ✅ 사용 중 |
| **Live Server** | 코드 저장 시 브라우저 자동 새로고침 | ✅ 설치 완료 |
| **Git** | 버전 관리 (변경 이력 추적) | ❌ 설치 필요 |
| **GitHub** | 코드 온라인 저장 및 배포 | ✅ 계정 보유 |
| **GitHub Pages** | 무료 웹사이트 배포 호스팅 | ⏳ 추후 설정 |

> Phaser.js는 설치 불필요 — CDN 링크로 index.html에서 바로 사용 가능

---

## 2. 프로젝트 폴더 구조

```
📁 프로젝트 루트/
│
├── 📄 index.html              ← 게임 시작점 (브라우저에서 여는 파일)
│
├── 📁 src/                    ← 소스 코드 폴더
│   ├── 📄 main.js             ← 게임 초기화 설정
│   │
│   ├── 📁 scenes/             ← 각 씬(장면) 코드
│   │   ├── 📄 ExteriorScene.js    (외부 Isometric 맵)
│   │   ├── 📄 CinemaScene.js      (시네마 내부 2D 맵)
│   │   └── 📄 ShopScene.js        (상점 UI)
│   │
│   ├── 📁 objects/            ← 게임 오브젝트 코드
│   │   ├── 📄 Player.js           (플레이어 캐릭터)
│   │   ├── 📄 Building.js         (건물 오브젝트)
│   │   └── 📄 Collectible.js      (수집 아이템)
│   │
│   ├── 📁 ui/                 ← UI 컴포넌트 코드
│   │   ├── 📄 HUD.js              (재화 카운터 등 항상 보이는 UI)
│   │   ├── 📄 ShopUI.js           (상점 메뉴 UI)
│   │   └── 📄 MediaUI.js          (시네마 미디어 선택/재생 UI)
│   │
│   ├── 📁 systems/            ← 게임 시스템 코드
│   │   ├── 📄 SaveSystem.js       (localStorage 저장/불러오기)
│   │   └── 📄 InventorySystem.js  (인벤토리/재화 관리)
│   │
│   └── 📁 data/               ← 게임 데이터 (코드 아닌 내용물)
│       ├── 📄 shopData.js         (상점 아이템 목록, 가격)
│       ├── 📄 mediaData.js        (시네마 작품 목록, 설명)
│       └── 📄 mapData.js          (맵 레이아웃 정의)
│
├── 📁 assets/                 ← 리소스 파일 폴더
│   ├── 📁 sprites/            ← 픽셀아트 이미지 파일
│   │   ├── player.png
│   │   ├── buildings.png
│   │   └── tiles.png
│   ├── 📁 audio/              ← 음원 파일 (정식 버전용)
│   └── 📁 video/              ← 시네마 영상 파일 (.mp4)
│
└── 📁 docs/                   ← 기획/기술 문서 폴더
    ├── 📄 GDD.md
    ├── 📄 TSD.md
    ├── 📄 TODO.md
    └── 📄 CHANGELOG.md
```

---

## 3. 씬(Scene) 구조

> **씬**이란: 게임의 각 "장면". 영화의 씬처럼, 게임도 장면마다 분리된 코드로 관리

| 씬 이름 | 파일 | 설명 |
|---------|------|------|
| **BootScene** | boot.js | 게임 시작 전 에셋(이미지, 음악 등) 로딩 |
| **ExteriorScene** | ExteriorScene.js | 외부 Isometric 맵, 메인 탐험 공간 |
| **CinemaScene** | CinemaScene.js | 시네마 내부 2D 맵 + 미디어 재생 |
| **ShopScene** | ShopScene.js | 상점 RPG UI |

### 씬 전환 흐름
```
BootScene (로딩)
    ↓
ExteriorScene (외부 맵) ─── 시네마 건물 진입 ──▶ CinemaScene
                        └── 상점 건물 진입  ──▶ ShopScene
                        
CinemaScene / ShopScene ─── 나가기 ──▶ ExteriorScene
```

---

## 4. 핵심 기술 시스템

### 4.1 Isometric 렌더링
- Phaser 3의 타일맵 기능 활용
- Isometric 투영: 화면 X,Y 좌표를 게임 내 타일 좌표로 변환하는 수식 적용
- 타일셋(Tileset): 픽셀아트로 제작한 타일 이미지 파일 사용

### 4.2 씬 전환
- Phaser의 Scene Manager를 사용하여 씬 간 전환
- 전환 시 페이드 인/아웃 효과 적용 가능

### 4.3 localStorage 세이브 시스템
저장 데이터 구조:
```json
{
  "currency": 120,
  "inventory": ["album_01", "album_02"],
  "collectedItems": ["coin_03", "coin_07"]
}
```
- 재화 수집, 아이템 구매 시 자동 저장
- 페이지 로드 시 자동으로 불러옴

### 4.4 영상 재생 (시네마)
- HTML5 `<video>` 태그 사용
- Phaser 씬 위에 DOM 레이어로 오버레이
- 지원 형식: MP4 (H.264 권장)
- 상세 설명 오버레이: CSS 슬라이드업 애니메이션

### 4.5 상점 UI (RPG 스타일)
- Phaser의 Graphics + Text 객체로 텍스트 박스 직접 구현
- 픽셀 폰트 사용 (예: Press Start 2P — Google Fonts 무료 제공)
- 메뉴 선택: 키보드 방향키 + Enter

---

## 5. 배포 계획

| 항목 | 내용 |
|------|------|
| **플랫폼** | GitHub Pages (무료) |
| **도메인** | `https://[사용자명].github.io/[프로젝트명]` 형태 |
| **배포 방법** | GitHub 저장소에 코드 push 시 자동 배포 |
| **CDN** | Phaser.js는 CDN에서 직접 로드 (별도 설치 불필요) |

---

## 6. 개발 환경 설치 현황

| 도구 | 설치 여부 | 비고 |
|------|-----------|------|
| **Antigravity IDE** | ✅ 완료 | VS Code 대신 사용 |
| **Live Server** | ✅ 완료 | 브라우저 자동 새로고침 |
| **Git** | ❌ 미설치 | https://git-scm.com 에서 설치 필요 |
| **GitHub 계정** | ✅ 보유 | |
