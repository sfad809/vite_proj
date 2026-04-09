import './App.css'

function Study()
{
	const q1 = <h1>Start React</h1>
	const name = "jihoon"
	const q2 = <p>Hello, {name}</p>
	const q3 =
	(<>
		<h3>title : Today's Menu</h3>
		<h3>value : Kimchi-Boks</h3>
	</>)
	const q5 = <img
		src="https://tse4.mm.bing.net/th/id/OIP.AfcUeFn5eilTfzgt5uQfbwHaEK?rs=1&pid=ImgDetMain&o=7&rm=3"
		width = {350}
	/>
	const q6 = <div className="card">
		<h2>profile</h2>
		<p>developer</p>
	</div>
	const q7 = (food, price) => (<>
		<h3>food : {food}</h3>
		<h3>price : {price}</h3>
	</>)
	const q8 = <>
		<ul>
			<header>my_hobby</header>
			<li>game</li>
			<li>music</li>
		</ul>
	</>
	const q9 = <div style={{color : "blue"}}>style</div>
	const q10 = (name, age, hobby) => <div>
		<h1>name : {name}</h1>
		<p>age : {age}</p>
		<p>hobby : {hobby}</p>
	</div>

	return (<>
		{q1}{q2}{q3}{q5}{q6}{q7("pizza", 180)}{q8}{q9}{q10("han", 21, "music")}
	</>)
}

function Assignment()
{
	const name = "Han"; const age = 21; const major = "computer";
	const hobbies = ['game', 'music']
	const one =
	(<div style={{
		border: "2px solid white"
	}}>
		<h1>Profile</h1>
		<img
			src="https://tse4.mm.bing.net/th/id/OIP.AfcUeFn5eilTfzgt5uQfbwHaEK?rs=1&pid=ImgDetMain&o=7&rm=3"
			width={300}
		/>

		<h2>name : {name}</h2>
		<p>age : {age}</p>
		<p>major : {major}</p>

		<ul>hobby{hobbies.map(h => <li>{h}</li>)}</ul>
	</div>)

	return one
}

export default function Week3App()
{
	return (<details><summary>week3</summary>
		<Study />
		<Assignment />
	</details>)
}