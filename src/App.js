import React, { useState, useEffect, useRef } from "react";
import EachTask from "./components/eachTask";

const App = () => {
  const [tasks, setTasks] = useState([
    { label: "Make the bed", done: false },
    { label: "Walk the dog", done: false },
    { label: "Do the replits", done: false },
  ]);

  const handleSubmit =(e, tasks, setStasks)=>{
      e.preventDefault()

      setTasks([...tasks, {label: input, done: false}])
      setInput('')

  }

  const [input, setInput] = useState('')

  const handleRemove = i =>{
      const temp= [...tasks];
      temp.splice(i, 1);

      setTasks(temp);

  }

  return (
    <div className="container">
      <h1>Todo's list</h1>

      {/* Formulario */}
      <form className="form-inline" onSubmit={(e) => {
          input !== '' ? handleSubmit(e, tasks, setTasks, input, setInput) : 
          alert("you can't add an empty task");
          
      }}>
        <div className="form-group">
          <input
            type="text"
            className="form-control mb-2 mr-sm-3"
            placeholder="write your to do"
            onChange={(e) => setInput(e.target.value)} value={input}
            />
        </div>
        <button type="submit" className="btn btn-primary mb-2">
          Add task
        </button>
      </form>

      {/* Lista de tareas */}
      <ul className="list-group">
          {
              tasks === [] ?
              <li className="list-group-item">Empty List</li>

              :

              tasks.map((task, index) =>

              <li key={index} className="list-group-item">{task.label}<button type="button" className="btn btn-light rounded-pill" 
              onClick={()=> {handleRemove(index)}}><i className="fa fa-trash"></i></button></li>
              )
              
          }


      </ul>
    </div>
  );
};

export default App;
