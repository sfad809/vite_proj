import { useId } from 'react'
import { useSlideshow } from '../hooks/useSlideshow.js'

// assets 폴더에 넣어 둔 이미지들을 빌드 시점에 모두 자동으로 불러옵니다.
const modules = import.meta.glob('../assets/*.{jpg,jpeg,png,webp,gif}', {
  eager: true,
  import: 'default',
})

const photos = Object.entries(modules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src]) => ({ src, name: path.split('/').pop() }))

export default function OtterGallery() {
  const titleId = useId()
  const { index, playing, current, count, next, prev, go, toggle } = useSlideshow(photos, {
    interval: 3500,
  })

  // 사진이 한 장도 없으면 갤러리를 숨기고, 뒤의 CSS 수달이 그대로 보이게 둡니다.
  if (count === 0) {
    return (
      <p className="gallery-empty">
        <code>src/assets/</code> 폴더에 수달 사진을 넣으면 슬라이드쇼가 켜집니다.
      </p>
    )
  }

  return (
    <figure className="gallery" aria-roledescription="carousel" aria-labelledby={titleId}>
      <span id={titleId} className="visually-hidden">
        수달 사진 슬라이드쇼
      </span>

      <img
        className="gallery-photo"
        src={current.src}
        alt={`수달 사진 ${index + 1} / ${count}`}
      />

      <div className="gallery-controls">
        <button type="button" onClick={prev} aria-label="이전 사진">
          {"<"}
        </button>
        <button type="button" onClick={toggle} aria-label={playing ? '일시정지' : '재생'}>
          {playing ? '정지' : '재생'}
        </button>
        <button type="button" onClick={next} aria-label="다음 사진">
          {">"}
        </button>
      </div>

      <div className="gallery-dots" role="tablist" aria-label="사진 선택">
        {photos.map((photo, i) => (
          <button
            key={photo.name}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`${i + 1}번 사진`}
            className={i === index ? 'is-active' : ''}
            onClick={() => go(i)}
          />
        ))}
      </div>
    </figure>
  )
}
