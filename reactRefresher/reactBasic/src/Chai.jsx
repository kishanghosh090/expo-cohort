import React, { useState } from "react";

function Chai() {
  // const [count, setCount] = useState(0);
  // const [theme, setTheme] = useState("#1a1a1a")
  // const
  const [task, setTask] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [taskDate, setTaskDate] = useState(null);

  function handleTaskText(e) {
    console.log(e.target.value);
    setTaskText(e.target.value);
  }
  function handleDate(e) {
    console.log(e.target.value);
    setTaskDate(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log(taskText);
    console.log(taskDate);
    console.log(task);

    setTask((prev) => [...prev, { taskText, taskDate }]);
  }
  return (
    <div className="">
      <input type="text" name="task" id="" onChange={handleTaskText} />
      <input type="date" name="" id="" onChange={handleDate} />
      <button onClick={handleSubmit}>Add Task</button>
      {task.length != 0 ? (
        <ul>
          {task.map((element) => {
            return (
              <>
                <li>{element.taskText}</li>
                <li>{element.taskDate}</li>
              </>
            );
          })}
        </ul>
      ) : (
        <div>no task found</div>
      )}
    </div>
  );
}

export default Chai;
