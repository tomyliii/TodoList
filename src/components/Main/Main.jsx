import "./main.css";
import Tasks from "../Tasks/Tasks";
import SearchResults from "../SearchResults/SearchResults";
import axios from "axios";

const Main = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const handleOnChange = (event, set) => {
    const value = event.target.value;

    set(value);
  };
  const handleOnclickSubmit = () => {
    if (props.inputValue) {
      const task = { task: props.inputValue, statue: false };

      (async () => {
        const response = await axios.post(
          "https://site--todolist--tzmxcvqjqbzq.code.run/addtask",
          task
        );
        console.log(response);
        response.data.data.sort((a, b) => {
          if (a.statue < b.statue) {
            return -1;
          }
          if (a.statue > b.statue) {
            return 1;
          }
        });
        props.setTasks(response.data.data);
        const info = { color: "green", txt: response.data.message };
        props.setInfo(info);
      })();
      setTimeout(() => props.setInfo(""), 3000);
      props.setInputValue("");
    } else {
      alert("You need to enter a task.");
    }
  };

  const handleOnKeyUp = () => {
    if (props.search) {
      const regexp = new RegExp(`${props.search}`, "ig");
      const filter = [];
      //const filter=props.tasks.filter(task=>regexp.test(task.task)
      props.tasks.forEach((task) => {
        if (regexp.test(task.task)) {
          filter.push(task);
          //si j enleve ce console log et qu un task a le meme nom qu un autre avec le meme statu il n y en a qu un qui sera affiché
          console.log(regexp.test(task.task));
        }
      });
      props.setSearchResults(filter);
      console.log(filter);
    } else {
      props.setSearchResults([]);
    }
  };

  return (
    <main>
      {props.info && <p className={props.info.color}>{props.info.txt}</p>}
      <Tasks
        tasks={props.tasks}
        setTasks={props.setTasks}
        setSearchResults={props.setSearchResults}
        searchResults={props.searchResults}
        darkMode={props.darkMode}
        setInfo={props.setInfo}
        info={props.info}
      />
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={props.inputValue}
            placeholder="New task"
            onChange={(event) => {
              handleOnChange(event, props.setInputValue);
            }}
          />
          <input type="submit" value="Add Task" onClick={handleOnclickSubmit} />
        </div>
        <div>
          <input
            type="text"
            value={props.search}
            placeholder="Task looking for"
            onChange={(event) => handleOnChange(event, props.setSearch)}
            onKeyUp={handleOnKeyUp}
          />
        </div>
      </form>
      <SearchResults
        darkMode={props.darkMode}
        searchResults={props.searchResults}
        setSearchResults={props.setSearchResults}
        tasks={props.tasks}
        setTasks={props.setTasks}
        setInfo={props.setInfo}
        info={props.info}
        setSearch={props.searchResults}
        search={props.search}
        handleOnKeyUp={handleOnKeyUp}
      />
    </main>
  );
};

export default Main;
