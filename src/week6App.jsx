import "./App.css"
import { useState } from 'react'

function TodoList()
{
	const [ input, setInput ] = useState("")
	const [ todos, setTodos ] = useState([
    	{ id: 1, text: "React 복습하기", done: false },
    	{ id: 2, text: "과제 제출하기", done: false }
	]);

	const addTodo = () => {
    	if (input.trim() === "") return;

    	const newTodo = {
    	  id: Date.now(),
    	  text: input,
    	  done: false
    	};

    	setTodos([...todos, newTodo]);
    	setInput("");
	};
	const toggleTodo = (id) => setTodos(todos.map((item) => item.id === id ? {...item, done: !item.done} : item))
	const removeTodo = (id) => setTodos(todos.filter((item) => item.id !== id))
	
	return (<div>
      <h1>Todo List</h1>
	  <p key=""></p>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="할 일을 입력하세요"
      />
      <button onClick={addTodo}>추가</button>

      {todos.length === 0 ? (
        <p>등록된 할 일이 없습니다.</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.text} -
			  <button onClick={() => toggleTodo(todo.id)}>{todo.done ? "완료" : "미완료"}</button>
			  <button onClick={() => removeTodo(todo.id)}>삭제</button>
            </li>
          ))}
        </ul>
      )}
    </div>)
}

export default function Week6App()
{
	// && operator
	// 3 operator
	// conditional rendering

	return (<details><summary>week6</summary>
		<p>&&</p>
		<TodoList />
	</details>);
};