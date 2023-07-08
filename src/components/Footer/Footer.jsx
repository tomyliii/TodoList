import "./footer.css";

const Footer = (props) => {
  return (
    <footer>
      <p
        className={props.darkMode === true ? "dark-mode-txt" : "light-mode-txt"}
      >
        Made with <span>React</span> at <span>Le Reacteur</span> by
        <span>Tomy Lii</span>
      </p>
    </footer>
  );
};

export default Footer;
