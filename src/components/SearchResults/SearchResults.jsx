import "./searchResults.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
const SearchResults = (props) => {
  const handleChange = (value) => {
    (async () => {
      const response = await axios.put(
        `http://localhost:3000/updatetasks?id=${value._id}`
      );
      response.data.data.sort((a, b) => {
        if (a.statue < b.statue) {
          return -1;
        }
        if (a.statue > b.statue) {
          return 1;
        }
        if (props.search) {
          const regexp = new RegExp(`${props.search}`, "ig");
          const filter = [];

          response.data.data.forEach((task) => {
            if (regexp.test(task.task)) {
              filter.push(task);

              console.log(regexp.test(task.task));
            }
          });
          props.setSearchResults(filter);
          console.log(filter);
        } else {
          props.setSearchResults([]);
        }
      });

      props.setTasks(response.data.data);
      const info = { color: "blue", txt: response.data.message };
      props.setInfo(info);
    })();
    // const newArraytasksFounded = [...props.searchResults];
    // const index = newArraytasksFounded.findIndex(
    //   (task) => task._id === value._id
    // );

    // console.log(newArraytasksFounded[index].statue);

    // {
    //   newArraytasksFounded[index].statue === true
    //     ? (newArraytasksFounded[index].statue = false)
    //     : (newArraytasksFounded[index].statue = true);
    //   console.log(newArraytasksFounded[index]);
    // }
    // newArraytasksFounded.sort((a, b) => {
    //   if (a.statue < b.statue) {
    //     return -1;
    //   }
    //   if (a.statue > b.statue) {
    //     return 1;
    //   }
    // });
    // props.setSearchResults(newArraytasksFounded);
    setTimeout(() => props.setInfo(""), 3000);
  };

  const handleClick = (value) => {
    (async () => {
      const response = await axios.delete(
        `http://localhost:3000/deletetask?id=${value._id}`
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

    const newArraytasksFounded = [...props.searchResults];
    const indexOfTask = newArraytasksFounded.findIndex(
      (task) => task._id === value._id
    );

    newArraytasksFounded.splice(indexOfTask, 1);
    props.setSearchResults(newArraytasksFounded);
  };
  return (
    <section>
      {props.searchResults.map((task) => {
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

export default SearchResults;
