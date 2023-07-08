import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";

const Header = (props) => {
  const handleClick = () => {
    props.setDarkMode(!props.darkMode);
  };

  return (
    <header>
      <div>
        <FontAwesomeIcon
          icon={faListCheck}
          style={
            props.darkMode === true ? { color: "#fff" } : { color: "#5c48d3" }
          }
        />
        <h1 className={props.darkMode === true ? "dark-mode-txt " : ""}>
          todo list
        </h1>
      </div>
      <button
        onClick={handleClick}
        className={props.darkMode === true ? "dark-mode-btn " : ""}
      >
        {props.darkMode === true ? "Light Mode" : "Dark Mode"}
      </button>
    </header>
  );
};

export default Header;
