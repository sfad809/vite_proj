import './App.css';
import { useState } from "react"; // react 에서 useState 기능을 import 하라

function VideoCard({ title, channel, views }) // 구조 분해 할당
{
  const [likes, setLikes] = useState(0); // likes를 0으로 초기화. set 함수 선언.
  const [clicks, setClicks] = useState(0); // clicks를 0으로 초기화. set 함수 선언.

  const handleCardClick = () => { // card click 시에 핸들링 할 콜백 함수
    setClicks(clicks + 1); // clicks++
  };
  
  const handleLikeClick = (event) => { // like 시에 핸들링 할 콜백 함수. 파라미터 event.
    event.stopPropagation(); // 카드 클릭과 좋아요 클릭이 동시에 실행되지 않도록 막기
    setLikes(likes + 1); // likes++
  };

  return (
    <div
      onClick={handleCardClick} // div 태그 onClick에 handleCardClick() 등록
      style={{ // style 'object'를 아래와 같이 설정
        border: "1px solid #ccc",
        borderRadius: "12px",
        padding: "16px",
        marginBottom: "12px",
        cursor: "pointer",
      }}
    >

      <h3>{title}</h3>
      <p>채널: {channel}</p>
      <p>조회수: {views}</p>
      <p>클릭 수: {clicks}</p>
      <p>좋아요 수: {likes}</p>
	  {/* button 태그 onClick에 handleLikeClick() 등록 */}
      <button onClick={handleLikeClick}> 좋아요</button>
    </div>
  );
}

// 파라미터로 받은 video 리스트를 VideoCard 클래스로 Display
function VideoList({ videos }) { // 파라미터 videos : video 오브젝트 리스트
  return (
    <div>
      {videos.map((video) => ( // videos 리스트에서 map을 호출하고 element에 video 라는 이름을 사용
        <VideoCard // VideoCard 클래스
          key={video.id} // key 값으로 video 오브젝트의 id 멤버를 할당
          title={video.title} // ...
          channel={video.channel}
          views={video.views}
        />
      ))}
    </div>
  );
}

export default function Week5App()
{
  const [filter, setFilter] = useState("전체"); // filter 변수를 set 함수와 같이 선언 후 "전체"로 초기화
  const videos = [ // videos는 리스트다
    { // 리스트 내부 오브젝트
      id: 1,
      title: "리액트 기초 강의",
      channel: "코딩채널",
      views: "10만",
      category: "공부",
    },
    {
      id: 2,
      title: "자바스크립트 완벽 정리",
      channel: "개발자TV",
      views: "25만",
      category: "자바스크립트",
    },
    {
      id: 3,
      title: "프론트엔드 취업 로드맵",
      channel: "코딩랩",
      views: "5만",
      category: "취업",
    },
    {
      id: 4,
      title: "React props 쉽게 이해하기",
      channel: "리액트쌤",
      views: "8만",
      category: "공부",
    },
  ];

  // 필터링 된 비디오들.
  // 초기화 값을 삼항 연산자로 구분하여 포함 여부를 결정한다.
  // re-rendering 시마다 재정의되므로 필터링이 변하는 효과를 기대할 수 있다.
  const filteredVideos =
    filter === "전체"
      ? videos
      : videos.filter((video) => video.category === filter);

	return (
	<details>
		<summary>week5</summary>

    <div style={{ padding: "20px" }}>
      <h1> 추천 영상</h1>

      <div style={{ marginBottom: "20px" }}>
		    {/* 클릭 시 lambda 함수를 실행하며, 함수는 setFilter("전체") 한 줄이다. */}
        <button onClick={() => setFilter("전체")}>전체</button>
		    {/* 클릭 시 lambda 함수를 실행하며, 함수는 setFilter("공부") 한 줄이다. */}
        <button onClick={() => setFilter("공부")} style={{ marginLeft: "8px" }}>
          공부
        </button>
		    {/* 클릭 시 lambda 함수를 실행하며, 함수는 setFilter("자바스크립트") 한 줄이다. */}
        <button onClick={() => setFilter("자바스크립트")} style={{ marginLeft: "8px" }}>
          자바스크립트
        </button>
		    {/* 클릭 시 lambda 함수를 실행하며, 함수는 setFilter("취업") 한 줄이다. */}
        <button onClick={() => setFilter("취업")} style={{ marginLeft: "8px" }}>
          취업
        </button>
      </div>
      
	    {/* 현재 필터 값을 표시 */}
      <p>현재 필터: {filter}</p>
	    {/* 필터링 된 리스트를 VideoList의 파라미터로 전송한다 */}
      <VideoList videos={filteredVideos} />
    </div>
	</details>)
}