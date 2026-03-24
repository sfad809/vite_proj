import './App.css'

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

function week4Study()
{
}

export default function Week4App()
{
	return (<>
		<h2>week4</h2>
		<details><summary>study</summary>{week4Study()}</details>
	</>)
}