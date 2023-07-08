import { useEffect } from "react";
import "./tasks.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const Tasks = (props) => {
  const handleChange = (value, index) => {
    const newArray = [...props.tasks];
    newArray[index].statue === true
      ? (newArray[index].statue = false)
      : (newArray[index].statue = true);
    newArray.sort((a, b) => {
      if (a.statue < b.statue) {
        return -1;
      }
      if (a.statue > b.statue) {
        return 1;
      }
    });
    props.setTasks(newArray);
  };

  const handleClick = (index, value) => {
    const newArray = [...props.tasks];
    newArray.splice(index, 1);
    props.setTasks(newArray);
    if (props.searchResults.find((task) => task.task === value)) {
      const newSearchResultsArray = [...props.searchResults];
      const index = props.searchResults.findIndex(
        (task) => task.task === value
      );
      newSearchResultsArray.splice(index, 1);
      props.setSearchResults(newSearchResultsArray);
    }
  };
  return (
    <section>
      {props.tasks.map((task, index) => {
        return (
          <div key={index + task.task}>
            <label htmlFor={task.task}>
              <input
                type="checkbox"
                checked={task.statue}
                onChange={() => {
                  handleChange(task, index);
                }}
                id={task.task}
              />
              {props.darkMode === true ? (
                <span
                  className={
                    task.statue === true
                      ? "dark-mode-txt line-through"
                      : "dark-mode-txt "
                  }
                >
                  {task.task}
                </span>
              ) : (
                <span
                  className={
                    task.statue === true
                      ? "light-mode-txt line-through"
                      : "light-mode-txt "
                  }
                >
                  {task.task}
                </span>
              )}
            </label>
            <div
              onClick={() => {
                handleClick(index, task.task);
              }}
            >
              <FontAwesomeIcon
                icon={faTrashCan}
                style={
                  props.darkMode === true
                    ? { color: "#fff" }
                    : { color: "#5c48d3" }
                }
              />
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Tasks;
