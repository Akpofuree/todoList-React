import React from "react";

const FilterButton = (props) => {
  const { name, isPressed, setFilter } = props;
  return (
    <div>
      <button
        type="button"
        className="btn toggle-btn"
        aria-pressed={isPressed}
        onClick={() => setFilter(name)}
      >
        <span className="visually-hidden">Show </span>
        <span>{name}</span>
        <span className="visually-hidden"> tasks</span>
      </button>
    </div>
  );
};

export default FilterButton;
