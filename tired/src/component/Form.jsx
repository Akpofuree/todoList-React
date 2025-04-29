import React from "react";
import { useState } from "react";

const Form = (props) => {
  /*   useState a type of hook that allows you to add state to a functional component. 
It returns an array with two elements: the current state value and a function to update it. 
The first element is the current state value, and the second element is a function that
 can be used to update the state. */

  const [name, setName] = useState("");
  /*   useState is a hook that allows you to add state to a functional component.


  /*     handles the input field
   */ function handleChange(event) {
    setName(event.target.value);
  }

  /*   responsible for the add button content*/
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "") return;
    props.addTask(name);
    setName("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg">
            What needs to be done?
          </label>
        </h2>
        <input
          type="text"
          id="new-todo-input"
          className="input input__lg"
          name="text"
          autoComplete="off"
          value={name}
          onChange={handleChange}
        />

        <button type="submit" className="btn btn__primary btn__lg">
          add
        </button>
      </form>
    </div>
  );
};

export default Form;
