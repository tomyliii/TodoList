import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Main from "./components/Main/Main";
function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [info, setInfo] = useState({});

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        "https://site--todolist--tzmxcvqjqbzq.code.run/gettasks"
      );
      data.data.sort((a, b) => {
        if (a.statue < b.statue) {
          return -1;
        }
        if (a.statue > b.statue) {
          return 1;
        }
      });
      setTasks(data.data);
    })();
  }, []);

  useEffect(() => {
    if (search && tasks.length !== 0) {
      const regexp = new RegExp(`${search}`, "ig");
      const filter = tasks.filter((task) => regexp.test(task.task));
      console.log(search, "search");

      console.log(filter);
      setSearchResults(filter);
    } else {
      setSearchResults([]);
    }
  }, [tasks, search]);

  return (
    <div className={darkMode === true ? "dark-mode body" : "body"}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <Main
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        tasks={tasks}
        setTasks={setTasks}
        inputValue={inputValue}
        setInputValue={setInputValue}
        search={search}
        setSearch={setSearch}
        searchResults={searchResults}
        setSearchResults={setSearchResults}
        info={info}
        setInfo={setInfo}
      />
      <Footer darkMode={darkMode} />
    </div>
  );
}

export default App;
