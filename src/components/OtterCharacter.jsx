import OtterGallery from './OtterGallery.jsx'

export default function OtterCharacter() {
  return (
    <div className="otter-wrap">
      <div className="water-ring water-ring-large" aria-hidden="true" />
      <div className="water-ring water-ring-small" aria-hidden="true" />
      <div className="otter" aria-hidden="true">
        <div className="ear left-ear" />
        <div className="ear right-ear" />
        <div className="head">
          <div className="eye left-eye" />
          <div className="eye right-eye" />
          <div className="nose" />
          <div className="whisker left-whisker" />
          <div className="whisker right-whisker" />
        </div>
        <div className="body" />
      </div>

      {/* 사진이 있으면 위 CSS 수달을 덮으며 슬라이드쇼가 표시됩니다. */}
      <OtterGallery />
    </div>
  )
}
