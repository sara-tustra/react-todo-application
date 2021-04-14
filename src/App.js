import React, { useState, useEffect } from "react";

const App = () => {
  const [url] = useState(
    "https://assets.breatheco.de/apis/fake/todos/user/saraisantiagom"
  );
  const [task, setTask] = useState("");
  const [todoList, setTodoList] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    let newTodoList = [...todoList, { label: task, done: false }];
    setTodoList(newTodoList);
    updateTodoList(url, newTodoList);
    setTask("");
  };
  const deleteTask = (i) => {
    todoList.splice(i, 1);
    setTodoList([...todoList]);
    updateTodoList(url, todoList);
  };
  useEffect(() => {
    getTodoList(url);
  }, []);

  const getTodoList = async (url) => {
    const resp = await fetch(url);
    //console.log(resp)
    if (!resp.ok) createTodoList(url);
    const data = await resp.json();
    setTodoList(data);
  };
  const createTodoList = async (url) => {
    const resp = await fetch(url, {
      method: "POST",
      body: JSON.stringify([]),
      headers: { "Content-Type": "application/json" },
    });
    console.log(resp);
    //if(!resp.ok) getTodoList(url);
    const data = await resp.json();
    if (data.result === "ok") getTodoList(url);
  };
  const updateTodoList = async (url, todoList) => {
    const resp = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoList),
    });

    if (!resp.ok) getTodoList(url);
  };

  const deleteTodoList = async (url) => {
    const resp = await fetch(url, {
      method: "DELETE",
    });
    console.log(resp);
    const data = await resp.json();
    if (data.result === "ok") getTodoList(url);
  };

  return (
    <div className="container">
      <h1>Todo's list</h1>

      {/* Formulario */}
      <form className="form-inline" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="task"
            className="form-control mb-2 mr-sm-3"
            placeholder="write a new task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary mb-2">
          Add task
        </button>
      </form>

      {/* Lista de tareas */}
      <ul className="list-group">
        {todoList.length > 0 ? (
          todoList.map((task, index) => (
            <li key={index} className="list-group-item">
              {task.label}
              <button
                type="button"
                className="btn btn-light rounded-pill"
                onClick={() => deleteTask(index)}
              >
                <i className="fa fa-trash"></i>
              </button>
            </li>
          ))
        ) : (
          <li className="list-group-item">Empty List</li>
        )}
      </ul>

      <button
        type="button"
        className="btn btn-danger my-4"
        onClick={() => deleteTodoList(url)}
      >
        Delete all the tasks
      </button>
    </div>
  );
};

export default App;
