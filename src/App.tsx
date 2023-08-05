import { useEffect, useState } from "react";
import "./App.css";
import { v4 as getId } from "uuid";

interface Todo {
  name: string;
  id: string;
  completed: boolean;
}

function App() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [todoName, setTodoName] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const obj: Todo = {
      name: todoName,
      id: getId(),
      completed: false,
    };
    setTodoList([...todoList, obj]);
    setTodoName("");
  };

  // const saveTodos = (todos:Todo[])=>{
  //   localStorage.setItem("todos", JSON.stringify(todos));
  // }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoName(e.target.value);
  };

  const handleDelete = (todo: Todo) => {
    const list = todoList.filter((todoElement) => todoElement.id !== todo.id);
    setTodoList(list);
  };

  const handleCheckbox = (
    e: React.ChangeEvent<HTMLInputElement>,
    todo: Todo
  ) => {
    const list = [...todoList];
    const listEl = list.find((el) => el.id === todo.id);
    if (listEl) {
      listEl.completed = e.target.checked;
      setTodoList(list);
    }
  };

  useEffect(() => {
    if (todoList.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todoList));
    }
  }, [todoList]);

  useEffect(() => {
    const todoString = localStorage.getItem("todos");

    if (todoString !== null) {
      setTodoList(JSON.parse(todoString));
    }
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={todoName}
          type="text"
          placeholder="Name of todo"
        />

        <button>Add todo</button>
      </form>

      {todoList.length > 0 &&
        todoList.map((todo, index) => (
          <div className="sol" key={todo.id}>
            <span>
              {index + 1} -{todo.name}
            </span>
            <input
              onChange={(e) => handleCheckbox(e, todo)}
              type="checkbox"
              checked={todo.completed}
            />
            <button onClick={() => handleDelete(todo)}>delete</button>
          </div>
        ))}
    </>
  );
}

export default App;
