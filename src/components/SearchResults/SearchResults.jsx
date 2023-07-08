import "./searchResults.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const SearchResults = (props) => {
  const handleChange = (value) => {
    const index = props.tasks.findIndex((task) => task.task === value);

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

    const newArraytasksFounded = [...props.tasksFounded];

    newArraytasksFounded.sort((a, b) => {
      if (a.statue < b.statue) {
        return -1;
      }
      if (a.statue > b.statue) {
        return 1;
      }
    });
    props.setSearchResults(newArraytasksFounded);
  };

  const handleClick = (value, indexFinded) => {
    const index = props.tasks.findIndex((task) => task.task === value);
    const newArray = [...props.tasks];
    newArray.splice(index, 1);
    props.setTasks(newArray);

    const newArraytasksFounded = [...props.tasksFounded];
    newArraytasksFounded.splice(indexFinded, 1);
    props.setSearchResults(newArraytasksFounded);
  };
  return (
    <section>
      {props.tasksFounded.map((task, index) => {
        return (
          <div key={index + task.task}>
            <label htmlFor={task.task}>
              <input
                type="checkbox"
                checked={task.statue}
                onChange={() => {
                  handleChange(task.task);
                }}
                id={task.task}
              />
              <span
                className={task.statue === true ? "task line-through" : "task "}
              >
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
              </span>
            </label>
            <div
              onClick={() => {
                handleClick(task.task, index);
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

export default SearchResults;
