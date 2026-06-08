export default function QuoteCard({ quote, loading, error, onRefresh }) {
  return (
    <article className="speech">
      <p className="eyebrow">한국어 명언 API</p>
      <h1>수달이 건네는 오늘의 한마디</h1>
      <blockquote>{quote.message}</blockquote>
      <p className="author">
        {quote.author}
        <span>{quote.authorProfile}</span>
      </p>
      {error && <p className="error">{error}</p>}
      <button type="button" onClick={onRefresh} disabled={loading}>
        {loading ? '불러오는 중...' : '다른 명언 보기'}
      </button>
      <p className="source">출처: korean-advice-open-api</p>
    </article>
  )
}
