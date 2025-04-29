import { nanoid } from "nanoid";
import "./App.css";

import FilterButton from "./component/FilterButton";
import Form from "./component/Form";
import Todo from "./component/Todo";

import { useState, useRef, useEffect } from "react";

// Custom hook to track previous value
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]); // Add `value` as a dependency
  return ref.current;
}

// Filter definitions
const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  // State for tasks and filter
  const [tasks, setTasks] = useState(props.tasks || []);
  const [filter, setFilter] = useState("All");

  // Refs
  const listHeadingRef = useRef(null);

  // Custom hook to track previous task length
  const previousTaskLength = usePrevious(tasks.length);

  // Add a new task
  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask]);
  }

  // Toggle task completion
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  // Delete a task
  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  // Edit a task
  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  // Focus the heading when tasks are deleted
  useEffect(() => {
    if (tasks.length < previousTaskLength) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, previousTaskLength]);

  // Filter tasks based on the selected filter
  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  // Generate filter buttons
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  // Determine the correct noun for the task count
  const tasksNoun = taskList.length <= 1 ? "task" : "tasks";
  const headingTextCounter = `${taskList.length} ${tasksNoun} remaining`;

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">{filterList}</div>
      <h2
        id="list-heading"
        tabIndex="-1"
        ref={listHeadingRef} // Fix: Use `listHeadingRef`
      >
        {headingTextCounter}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
