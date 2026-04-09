import './App.css'
import Book from './week4/Book'
import GreetingCard from './week4/GreetingCard'
import ColorButton from './week4/ColorButton'
import VideoList from './week4/VideoList'

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

function Study()
{
	return (<>
		<Book title="ham" author="apt" price={13}/>
		<Book title="egg" author="cls" price={8786}/>

		<GreetingCard name="hans" msg="carry"/>
		<GreetingCard name="caps" msg="awesome"/>

		<ColorButton text="quaa" bgColor="aqua"/>
		<ColorButton text="red" bgColor="red"/>

		<VideoList videos= {[
			{
				title: "react master",
				channel: "coding channel",
				views: "0.1천"
			},
			{
				title: "jsx introducing",
				channel: "jsx official",
				views: "1.2만"
			}
		]}/>
	</>)
}

export default function Week4App()
{
	return (<details><summary>week4</summary>
		<Study />
	</details>)
}