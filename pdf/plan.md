# 기획서

## 프로젝트명
수달의 한마디 (Otter Advice)

## 프로젝트 주제
- 한국어 명언 API에서 무작위 명언 받기
- 수달 캐릭터가 "오늘의 한마디"로 전달
- React 단일 페이지 웹앱 + 수달 사진 슬라이드쇼

## 기획 배경/목적
- 하루 한 번 위로/동기부여 감성 위젯
- 학습 목적: 상태 관리, 비동기 처리(로딩/에러), 컴포넌트 분리
- `use` 시리즈 훅 직접 설계하고 사용 (useState/useEffect/useReducer/useRef/useMemo/커스텀 훅)

## 사용 API
- 한국어 명언 오픈 API
  - URL: `https://korean-advice-open-api.vercel.app/api/advice`
  - 응답: `message`, `author`, `authorProfile`
  - 인증/키 불필요, GET 1회로 무작위 1건

## 화면 구성
- 좌측:  수달
  - 사진 있을 때: 슬라이드쇼(자동 넘김, 이전/다음/재생,정지, 점 인디케이터)
  - 사진 없을 때: CSS 수달
- 우측: 말풍선 카드
  - 제목, 명언(blockquote), 인물/소개, "다른 명언 보기" 버튼, 출처
  - 로딩 중 버튼 비활성("불러오는 중..."), 실패 시 에러 메시지
- 반응형: 760px 이하 1열, 말풍선 꼬리 위로
- 테마: 블랙(다크) 기반

## 데이터 흐름
1. 첫 렌더에서 `useEffect`가 `loadAdvice()` 호출
2. `loadAdvice`가 `fetchAdvice(signal)` (api/adviceApi.js) 호출하여 GET
3. 호출 직전 `loading=true`, `error=''`
4. 성공하면 `cleanQuote` 정제 후 `quote` 저장 / 실패하면 `error` 저장(AbortError 무시)
5. 완료되면 `loading=false`, `AbortController`로 언마운트/재요청 취소
6. 버튼 클릭하면 `loadAdvice()` 재실행
- 슬라이드쇼: `useSlideshow` 훅 - `useReducer`(index/playing), `useRef`(setInterval), `useMemo`(현재 사진)

## 컴포넌트 구조
```
otter-main.jsx                 진입점 (#root 마운트, otter.css 로드)
- OtterAdviceApp.jsx           최상위 상태(quote/loading/error), 데이터 호출
  - OtterCharacter.jsx         물가 배경 + CSS 수달
    - OtterGallery.jsx         로컬 사진 슬라이드쇼 (없으면 안내문)
      - useSlideshow.js        슬라이드쇼 커스텀 훅
  - QuoteCard.jsx              명언 표시 + 새로고침 버튼 (props only, presentational)
  - api/adviceApi.js           fetch/정제/기본값 (데이터 계층)
```
- 상태: `OtterAdviceApp`에 집중, 표시 컴포넌트는 props로만
- 훅: useState, useEffect, useCallback, useReducer, useRef, useMemo, useId, 커스텀 useSlideshow

## 기대 결과 및 추가 예정 기능
- 기대 결과: 버튼만으로 명언 교체 + 사진 자동 슬라이드 감성 페이지
- 추가 예정
  - 명언 즐겨찾기(localStorage)
  - 명언 이미지 카드 저장/공유
  - 사진-명언 분위기(키워드) 매칭

## 참고 자료
- React 공식 문서 - Hooks (useReducer, useRef, useMemo, useId)
- Vite `import.meta.glob` (정적 에셋 일괄 로드)
- 한국어 명언 오픈 API (korean-advice-open-api)

## 느낀점
- 데이터 로직(`adviceApi.js`)과 화면 분리하니 테스트/수정 쉬움
- 슬라이드쇼 상태 로직을 커스텀 훅으로 묶으니 가독성 좋아지고, `use` 훅별 역할 체감
