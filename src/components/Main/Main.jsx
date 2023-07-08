import "./main.css";
import Tasks from "../Tasks/Tasks";
import SearchResults from "../SearchResults/SearchResults";

const Main = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const handleOnChange = (event, set) => {
    const value = event.target.value;
    set(value);
  };
  const handleOnclickSubmit = () => {
    const task = { task: props.inputValue, statue: false };
    const newTasks = [...props.tasks];
    newTasks.push(task);
    newTasks.sort((a, b) => {
      if (a.statue < b.statue) {
        return -1;
      }
      if (a.statue > b.statue) {
        return 1;
      }
    });
    props.setTasks(newTasks);
    props.setInputValue("");
  };

  const handleOnKeyUp = () => {
    if (props.search) {
      const regexp = new RegExp(`${props.search}`, "ig");
      const filter = props.tasks.filter((task) => regexp.test(task.task));
      props.setSearchResults(filter);
    } else {
      props.setSearchResults([]);
    }
  };

  return (
    <main>
      <Tasks
        tasks={props.tasks}
        setTasks={props.setTasks}
        setSearchResults={props.setSearchResults}
        searchResults={props.searchResults}
        darkMode={props.darkMode}
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
        tasksFounded={props.searchResults}
        setSearchResults={props.setSearchResults}
        tasks={props.tasks}
        setTasks={props.setTasks}
      />
    </main>
  );
};

export default Main;
