# 수달의 한마디: React Hook 탐구 발표 구성

## 발표 방향

이 발표는 프로젝트의 주요 기능이나 기획 의도를 길게 설명하지 않고, **React의 `use` 시리즈 Hook을 프로젝트 안에서 각각 어떻게 사용했는지**를 중심으로 구성한다.

핵심 메시지:

> 저는 공공데이터나 지도 API처럼 외부 기능의 규모를 키우기보다는, React의 상태 관리와 컴포넌트 분리를 직접 탐구하는 데 초점을 맞췄습니다.

---

## 1. 제목

### 수달의 한마디: React Hook 탐구

부제:

- 작은 명언 앱 안에서 React Hook을 어떻게 나눠 썼는가
- 발표 초점: 기능 소개보다 Hook의 역할과 사용 이유

발표 멘트:

> 이 프로젝트는 API나 지도 기능을 크게 확장하기보다, React Hook들이 실제 앱 구조 안에서 어떤 역할을 하는지 탐구하는 데 초점을 맞췄습니다.

---

## 2. 전체 Hook 사용 지도

### Hook 사용 위치 한눈에 보기

```text
OtterAdviceApp.jsx
- useState
- useEffect
- useCallback

useSlideshow.js
- useReducer
- useRef
- useMemo
- useCallback
- useEffect

OtterGallery.jsx
- useId
- custom hook: useSlideshow
```

발표 멘트:

> 명언 데이터 쪽은 `OtterAdviceApp`에서 관리하고, 슬라이드쇼처럼 상태 변화가 많은 부분은 `useSlideshow`라는 커스텀 훅으로 분리했습니다.

---

## 3. useState: 화면 상태 저장

### useState: 명언, 로딩, 에러 상태 관리

사용한 상태:

- `quote`: 현재 화면에 보여줄 명언
- `loading`: API 요청 중인지 여부
- `error`: 실패 메시지 저장

코드 예시:

```jsx
const [quote, setQuote] = useState(defaultQuote)
const [loading, setLoading] = useState(false)
const [error, setError] = useState('')
```

설명:

- `quote`가 바뀌면 명언 카드의 내용이 바뀐다.
- `loading`이 바뀌면 버튼 문구와 비활성화 여부가 바뀐다.
- `error`가 생기면 사용자에게 실패 메시지를 보여준다.

발표 멘트:

> `useState`는 화면에 바로 영향을 주는 단순 상태를 관리하는 데 사용했습니다. 명언, 로딩 여부, 에러 메시지는 각각 독립적으로 바뀌고 바로 UI에 반영되기 때문에 `useState`가 적합했습니다.

---

## 4. useEffect + useCallback: API 호출 흐름

### useEffect: 처음 렌더링될 때 명언 불러오기

역할:

- 첫 화면 진입 시 자동으로 API 호출
- `AbortController`로 컴포넌트가 사라질 때 요청 취소
- `useCallback`으로 `loadAdvice` 함수 재사용

코드 예시:

```jsx
const loadAdvice = useCallback(async (signal) => {
  setLoading(true)
  setError('')

  try {
    const nextQuote = await fetchAdvice(signal)
    setQuote(nextQuote)
  } catch (err) {
    if (err.name !== 'AbortError') {
      setError('명언을 불러오지 못했습니다.')
    }
  } finally {
    if (!signal?.aborted) {
      setLoading(false)
    }
  }
}, [])

useEffect(() => {
  const controller = new AbortController()
  loadAdvice(controller.signal)

  return () => controller.abort()
}, [loadAdvice])
```

설명:

- `useEffect`는 컴포넌트가 화면에 나타난 뒤 실행되는 외부 작업에 사용했다.
- API 요청은 비동기 작업이므로 로딩과 에러 처리를 함께 넣었다.
- `AbortController`를 사용해 컴포넌트가 사라지거나 요청이 취소될 때 불필요한 상태 갱신을 막았다.
- `loadAdvice`는 버튼 클릭에서도 재사용되므로 `useCallback`으로 분리했다.

발표 멘트:

> `useEffect`는 화면이 처음 나타났을 때 실행되는 작업에 사용했습니다. API 요청은 React 내부 계산이 아니라 외부와 통신하는 작업이기 때문에 effect로 분리했고, `useCallback`을 통해 같은 함수를 초기 호출과 버튼 클릭에서 재사용했습니다.

---

## 5. useReducer: 슬라이드쇼 상태 관리

### useReducer: 여러 동작이 있는 상태 관리

슬라이드쇼에 필요한 동작:

- 다음 사진
- 이전 사진
- 특정 사진으로 이동
- 재생/정지 전환

코드 예시:

```jsx
const initialState = { index: 0, playing: true }

function reducer(state, action) {
  switch (action.type) {
    case 'next':
      return { ...state, index: (state.index + 1) % action.count }
    case 'prev':
      return { ...state, index: (state.index - 1 + action.count) % action.count }
    case 'go':
      return { ...state, index: action.index }
    case 'toggle':
      return { ...state, playing: !state.playing }
    default:
      return state
  }
}
```

설명:

- 슬라이드쇼는 `index`와 `playing` 상태가 함께 움직인다.
- 버튼마다 상태를 바꾸는 방식이 다르다.
- `useState` 여러 개로 흩어두는 것보다 `reducer` 안에 상태 전환 규칙을 모으는 편이 읽기 쉽다.

발표 멘트:

> 슬라이드쇼는 단순히 값 하나만 바꾸는 구조가 아니라, 여러 버튼 동작이 같은 상태를 바꿉니다. 그래서 `useState` 여러 개보다 `useReducer`가 더 적합하다고 판단했습니다.

---

## 6. useRef + useMemo: 타이머와 계산값 관리

### useRef: 렌더링과 무관한 값 저장

사용 목적:

- `setInterval`의 타이머 ID 저장
- 값이 바뀌어도 화면을 다시 그릴 필요가 없음

코드 예시:

```jsx
const timerRef = useRef(null)
```

설명:

- 타이머 ID는 화면에 표시되는 값이 아니다.
- 따라서 `useState`로 관리하면 불필요한 렌더링이 생길 수 있다.
- 이런 값은 `useRef`에 저장하는 것이 적합하다.

### useMemo: 현재 사진 계산

사용 목적:

- 현재 보여줄 사진을 계산
- 이미지 배열과 index가 바뀔 때만 다시 계산

코드 예시:

```jsx
const current = useMemo(
  () => (count > 0 ? items[state.index % count] : null),
  [items, state.index, count],
)
```

설명:

- `current`는 직접 저장하는 상태라기보다 `items`, `index`, `count`에서 계산되는 값이다.
- 이런 파생값은 `useMemo`로 계산하면 의존성이 분명해진다.

발표 멘트:

> `useRef`는 화면에 직접 표시되지 않는 타이머 값을 저장하는 데 사용했습니다. 반면 `useMemo`는 현재 사진처럼 상태에서 파생되는 계산값을 관리하는 데 사용했습니다.

---

## 7. useId + Custom Hook: 구조 분리

### useId: 접근성을 위한 고유 ID

사용 목적:

- 슬라이드쇼 제목과 영역을 연결
- 컴포넌트마다 안정적인 고유 ID 생성

코드 예시:

```jsx
const titleId = useId()
```

설명:

- `aria-labelledby`와 연결되는 ID가 필요했다.
- 직접 문자열 ID를 만들면 여러 컴포넌트가 있을 때 충돌할 수 있다.
- `useId`를 사용하면 React가 안정적인 ID를 만들어준다.

### Custom Hook: useSlideshow

사용 목적:

- 슬라이드쇼 관련 로직을 컴포넌트 밖으로 분리
- UI 컴포넌트는 이미지 표시와 버튼 클릭만 담당

코드 예시:

```jsx
const {
  index,
  playing,
  current,
  count,
  next,
  prev,
  go,
  toggle,
} = useSlideshow(photos)
```

설명:

- `OtterGallery`는 UI를 담당한다.
- `useSlideshow`는 상태 전환, 타이머, 현재 이미지 계산을 담당한다.
- 결과적으로 화면 코드와 로직 코드가 분리된다.

발표 멘트:

> 커스텀 훅을 사용하면서 슬라이드쇼 로직을 컴포넌트 밖으로 분리했습니다. 그래서 `OtterGallery`는 화면을 보여주는 역할에 집중하고, 상태 변화 로직은 `useSlideshow` 안에서 관리할 수 있었습니다.

---

## 마무리

### 발표 결론

이 프로젝트에서 Hook을 사용한 방식:

- `useState`: 화면 상태 관리
- `useEffect`: 외부 작업 처리
- `useCallback`: 재사용 함수 안정화
- `useReducer`: 복잡한 상태 전환 관리
- `useRef`: 렌더링과 무관한 값 저장
- `useMemo`: 상태에서 파생되는 계산값 관리
- `useId`: 접근성 ID 생성
- `useSlideshow`: 슬라이드쇼 로직을 커스텀 훅으로 분리

마지막 멘트:

> 이 프로젝트에서 가장 중점적으로 본 부분은 기능의 크기보다 React Hook의 역할 분리였습니다. `useState`는 화면 상태, `useEffect`는 외부 작업, `useReducer`는 복잡한 상태 전환, `useRef`는 렌더링과 무관한 값, `useMemo`는 계산값, `useId`는 접근성에 사용했습니다.

한 문장 요약:

> 저는 이 프로젝트를 통해 React Hook을 단순히 문법으로 쓰는 것이 아니라, 각각의 역할에 맞게 상태와 로직을 분리하는 방식으로 사용해봤습니다.

---

## 5분 발표 시간 배분

| 구간 | 내용 | 시간 |
| --- | --- | --- |
| 1 | 제목 및 발표 초점 | 30초 |
| 2 | Hook 사용 지도 | 40초 |
| 3 | useState | 40초 |
| 4 | useEffect + useCallback | 1분 |
| 5 | useReducer | 50초 |
| 6 | useRef + useMemo | 50초 |
| 7 | useId + Custom Hook / 마무리 | 50초 |

