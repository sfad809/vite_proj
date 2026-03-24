function VideoCard({ title, channel, views }) {
	return (<>
		<h3>{title}</h3>
		<p>{channel}</p>
		<p>조회수 : {views}</p>
	</>)
}

export default function VideoList({videos})
{
	return (<>
		<ul>🎞️ 추천 영상
			{videos.map((video, index) => (
			<li>
				<VideoCard
					key={index}
					title={video.title}
					channel={video.channel}
					views={video.views}
				/>
			</li>
		))}</ul>
	</>)
}