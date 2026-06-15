import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react'

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

/**
 * 자동 넘김 슬라이드쇼 커스텀 훅.
 * @param {Array} items - 슬라이드로 보여줄 항목 배열
 * @param {{ interval?: number }} options - 자동 넘김 간격(ms)
 */
export function useSlideshow(items, { interval = 3500 } = {}) {
  const count = items.length
  const [state, dispatch] = useReducer(reducer, initialState)
  const timerRef = useRef(null)

  // dispatch 함수들을 메모이즈해서 자식에게 안정적으로 내려줍니다.
  const next = useCallback(() => dispatch({ type: 'next', count }), [count])
  const prev = useCallback(() => dispatch({ type: 'prev', count }), [count])
  const go = useCallback((index) => dispatch({ type: 'go', index }), [])
  const toggle = useCallback(() => dispatch({ type: 'toggle' }), [])

  // playing 상태일 때만 타이머를 돌리고, 정리(clear)는 useRef에 담아 둔 id로 합니다.
  useEffect(() => {
    if (!state.playing || count <= 1) return undefined

    timerRef.current = setInterval(() => {
      dispatch({ type: 'next', count })
    }, interval)

    return () => clearInterval(timerRef.current)
  }, [state.playing, state.index, count, interval])

  // 현재 보여줄 항목을 파생값으로 계산(범위를 벗어나면 안전하게 처리).
  const current = useMemo(
    () => (count > 0 ? items[state.index % count] : null),
    [items, state.index, count],
  )

  return {
    index: state.index,
    playing: state.playing,
    current,
    count,
    next,
    prev,
    go,
    toggle,
  }
}
