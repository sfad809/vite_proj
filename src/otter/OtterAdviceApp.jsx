import { useCallback, useEffect, useState } from 'react'
import { defaultQuote, fetchAdvice } from './api/adviceApi.js'
import OtterCharacter from './components/OtterCharacter.jsx'
import QuoteCard from './components/QuoteCard.jsx'

export default function OtterAdviceApp() {
  const [quote, setQuote] = useState(defaultQuote)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const loadAdvice = useCallback(async (signal) => {
    setLoading(true)
    setError('')

    try {
      const nextQuote = await fetchAdvice(signal)
      setQuote(nextQuote)
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError('명언을 불러오지 못했습니다. 다시 눌러 주세요.')
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

  return (
    <main className="page">
      <section className="scene" aria-label="한국어 명언을 말하는 수달">
        <OtterCharacter />
        <QuoteCard
          quote={quote}
          loading={loading}
          error={error}
          onRefresh={() => loadAdvice()}
        />
      </section>
    </main>
  )
}
