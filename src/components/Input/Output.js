import classes from "./Input.module.css";
import { Fragment } from "react";

const Output = (props) => {
  return (
    <Fragment>
      <span>
        <textarea className={classes.textarea} value={props.sum} />
      </span>
    </Fragment>
  );
};

export default Output;
