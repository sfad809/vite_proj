const ADVICE_API_URL = 'https://korean-advice-open-api.vercel.app/api/advice'

export const defaultQuote = {
  message: '수달이 명언을 고르는 중입니다.',
  author: '수달',
  authorProfile: '물가의 조언자',
}

function cleanQuote(data) {
  return {
    message: data?.message || defaultQuote.message,
    author: data?.author || '익명',
    authorProfile: data?.authorProfile || '출처 정보 없음',
  }
}

export async function fetchAdvice(signal) {
  const response = await fetch(ADVICE_API_URL, { signal })

  if (!response.ok) {
    throw new Error('API request failed')
  }

  const data = await response.json()
  return cleanQuote(data)
}
