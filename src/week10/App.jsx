import { useState, useEffect } from 'react'
import Timer from './components/Timer'

// state hook
const basicWork = () =>
{
	console.log('default');
	return ['홍길동', '김철수'];
}

export default function App()
{
	// state hook
	const [names, setNames] = useState(basicWork());
	const [input, setInput] = useState('');
	const handleInputChange = (e) =
	{
		setInput(e.target.value);
	}
	const handleInput = () =>
	{
		setNames([...names, input]);
	}

	// effect
	const [name, setName] = useState('');
	const [count, setCount] = useState(1);

	const handleCountUpdate = () => { setCount(count+1); }
	const handleNameChange = (e) => { setName(e.target.value); }

	// useEffect(() => { console.log('change'); }
	useEffect(() => {
		console.log('count change')
	}, [count])

	const [showTimer, setShowTimer] = useState(false);

	return(<div>
		<input type="text" value={input} onChange={handleInputChange}/>
		<buton onClick={handleInput}>input</button>
		{ names.map((name,index) => <p key={index}>{name}</p>)}

		<p>Count : {count}</p>
		<button onClick={handleCountUpdate}>update</button>
		<div>
			<input type="text" value={name} onChange={handleNameChange}/>
			<div>Name : {name}</div>
		</div>

		{showTimer && <Timer />}
		<button onClick={() => setShowTimer(!showTimer)}>
		   Toggle Timer
		</button>
</div>);
}
