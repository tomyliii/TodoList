import "./tasks.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const Tasks = (props) => {
  const handleChange = (value) => {
    (async () => {
      const response = await axios.put(
        `site--todolist--tzmxcvqjqbzq.code.run/updatetasks?id=${value._id}`
      );

      response.data.data.sort((a, b) => {
        if (a.statue < b.statue) {
          return -1;
        }
        if (a.statue > b.statue) {
          return 1;
        }
      });
      props.setTasks(response.data.data);
      const info = { color: "blue", txt: response.data.message };
      props.setInfo(info);
    })();
    setTimeout(() => props.setInfo(""), 3000);
  };

  const handleClick = (value) => {
    (async () => {
      console.log(value);
      const response = await axios.delete(
        `site--todolist--tzmxcvqjqbzq.code.run/deletetask?id=${value._id}`
      );
      response.data.data.sort((a, b) => {
        if (a.statue < b.statue) {
          return -1;
        }
        if (a.statue > b.statue) {
          return 1;
        }
      });
      props.setTasks(response.data.data);
      const info = { color: "red", txt: response.data.message };
      props.setInfo(info);
    })();
    setTimeout(() => props.setInfo(""), 3000);
  };
  return (
    <section>
      {props.tasks.map((task) => {
        return (
          <div key={task._id}>
            <label htmlFor={task._id}>
              <input
                type="checkbox"
                checked={task.statue}
                onChange={() => {
                  handleChange(task);
                }}
                id={task._id}
              />
              <span
                className={`${
                  props.darkMode === true ? "dark-mode-txt" : "light-mode-txt"
                } ${task.statue === true && "line-through"}`}
              >
                {task.task}
              </span>
            </label>
            <div
              onClick={() => {
                handleClick(task);
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
