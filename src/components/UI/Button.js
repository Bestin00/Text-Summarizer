import classes from "./Button.module.css";

const Button = () => {
  return (
    <button className={classes.button} type="submit">
      <span>Summarize</span>
    </button>
  );
};

export default Button;
