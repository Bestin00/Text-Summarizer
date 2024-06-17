import classes from "./Button.module.css";

const ClearButton = (props) => {
  return (
    <button className={classes.button} onClick={props.onClick}>
      <span>Clear</span>
    </button>
  );
};

export default ClearButton;
