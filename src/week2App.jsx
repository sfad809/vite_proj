import './App.css'

function Study()
{
	// ===== ===== Modern JS ===== =====
	// use arrow function
	const welcome = (name) => { return "Welcome, " + name };

	// template literal
	const name = "NAME";
	const element = <h1 style={{ color: "blue", fontSize: "24px" }}>Hello, {name}</h1>

	// structure division

	// ...

	// 333

	// map / filter

	// async / await

	// ===== ===== JSX Rules ===== =====
	// 1. Attribute
	const attr1 = <button className="btn"></button> // use className
	const attr2 = <button style={{ color: "blue", fontSize: "24px" }}></button> // use Object

	// 2. one parent
	const useFragment = ( <> <div>one</div> <div>two</div> </> )

	// 3. JS in Blockquote
	{}

	// condition rendering
	const isLogin = true;
	const conditions = <div>{ isLogin ? <p>Welcome</p> : <p>Need Login</p> }</div>
		// check condition : JS
		// print : JSX

	// key
	const fruits = ["apple", "banana", "grape"];
	const fruitsMap = (
		<ul>
			{fruits.map((fruit, idx) => (	// 'map' is js
				<li key={idx}>{fruit}</li>
			))}
		</ul>
	);

	return (<>
		<h1>{welcome("Wallens")}</h1>
		{element}
		<div>{fruitsMap}</div>
	</>);
}

function Assignment()
{
	const name = "한재승"
	const welcomeMessage = "Welcome to my App!"
	const favorites = [
		'커피', '녹차', '홍차', '수달', '개'
	]
	let isLogin = false;
	const doLogin = () => {
		isLogin = !isLogin;
		alert("login : " + isLogin)
	}

	return (<>
		<h1>{welcomeMessage}</h1>
		<h4>{name}</h4>

		<div>난 좋아하다
			<ul>{favorites.map((f, idx) => (
				<li key={idx}>{f}</li>
			))}</ul>
		</div>

		<p>당신은 로그인 중{isLogin ? "이다" : "이 아니다"}</p>

		<button onClick={doLogin}>버튼</button>
	</>)
}

export default function Week2App()
{
	return (<details><summary>week2</summary>
		<Study />
		<Assignment />
	</details>)
}