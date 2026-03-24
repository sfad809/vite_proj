export default function Book(props)
{
	return (<>
		<h2>이 책의 제목은 {props.title} 입니다.</h2>
		<p>이 책의 저자는 {props.author} 입니다.</p>
		<p>이 책은 {props.price}원 입니다.</p>
	</>)
};