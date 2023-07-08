import { useState } from "react";
import "./App.css";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Main from "./components/Main/Main";
function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  return (
    <>
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
        />
        <Footer darkMode={darkMode} />
      </div>
    </>
  );
}

export default App;
