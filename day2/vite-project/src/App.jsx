import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [todo, setTodo] = useState([]);
  const [filter,setFilter]=useState('all');

  useEffect(() => {
    const saved = localStorage.getItem("todo");
    if (saved) {
      setTodo(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo));
  },[todo]);

  function handleInputChange(e) {
    setInput(e.target.value);
  }

  function handleClick() {
    if (input.trim() === "") {
      return;
    }
    setTodo((prev) => [
      ...prev,
      { text: input, completed: false, id: Date.now() },
    ]);
    setInput("");
  }

  function handleDeleteClick(index) {
    let filteredTodo = todo.filter((item, i) => item.id != index);
    setTodo(filteredTodo);
  }

  function handleToggle(index) {
    let updatedTodo = todo.map((item, i) => {
      if (item.id === index) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setTodo(updatedTodo);
  }


  let filteredTodo=todo;
if(filter==='active'){
  filteredTodo=todo.filter(item=>!item.completed)
}

if(filter==='completed'){
  filteredTodo=todo.filter(item=>item.completed);
}

  return (
    <>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleClick();
          }
        }}
      />

      <button onClick={handleClick}>Add</button>

      <div>
<button onClick={()=>setFilter('all')}>All</button>
<button onClick={()=>setFilter("active")}>Active</button>
<button onClick={()=>setFilter("completed")}>Completed</button>

      </div>

      {filteredTodo.map((item, index) => (
        <div key={item.id}>
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => handleToggle(item.id)}
          ></input>
          <span
            style={{ textDecoration: item.completed ? "line-through" : "none" }}
          >
            {item.text}
          </span>
          
          <button onClick={() => handleDeleteClick(item.id)}>Delete</button>
        </div>
      ))}
    </>
  );
}

export default App;
