/*
===== Component =====
	: minimal unit

function component
	declare	: export default [COM_NAME]
	usage	: <[COM_NAME] />

rules : first letter is uppercase

===== Props =====
params :
	<[COM_NAME] [P1_NAME]="" [P2_NAME]={} />
args :
	function Profile(props) {
		return (<>
			{props.name} {props.age}
		</>)
	}

distructuring args :
	function Profile({name, age}) {
		...
	}

rules :
	props is constant, readonly
	parent to child (one direction)

===== DOM ===== (document object model)
DOM : node hierachy like tree

virtual DOM
	diffing
*/
import './App.css'

function Book(props)
{
	return (<>
		<h2>이 책의 제목은 {props.title} 입니다.</h2>
		<p>이 책의 저자는 {props.author} 입니다.</p>
		<p>이 책은 {props.price}원 입니다.</p>
	</>)
};

function ColorButton({text, bgColor})
{
	return (<>
		<button style={{ backgroundColor: bgColor, color:"white" }}>
			{text}
		</button>
	</>)
}

function GreetingCard({name, msg})
{
	return (<>
		<p>{name}님 {msg}</p>
	</>)
};

export default function Week4App()
{
	return (
	<details>
		<summary>week4</summary>
		
		<Book title="ham" author="apt" price={13}/>
		<Book title="egg" author="cls" price={8786}/>

		<GreetingCard name="hans" msg="carry"/>
		<GreetingCard name="caps" msg="awesome"/>

		<ColorButton text="quaa" bgColor="aqua"/>
		<ColorButton text="red" bgColor="red"/>
	</details>)
}