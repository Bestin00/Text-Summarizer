import React, { useState, Fragment, useEffect } from "react";
import classes from "./Input.module.css";
import Button from "../UI/Button";
import Output from "./Output";
import Card from "../UI/Card";
import ClearButton from "../UI/ClearButton";
import Modal from "../UI/Modal";

function Input() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSummarize = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    if (text.trim() === "") {
      setError("Please enter text to summarize");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const clear = () => {
    setText("");
    setSummary("");
  };

  let cName = "";
  let Modalstate = "";

  if (isLoading) {
    Modalstate = "Summarizing...";
    cName = classes.loading;
  }
  if (error) {
    Modalstate = error;
    cName = classes.error;
  }
  const close = () => {
    setIsLoading(false);
    setError(null);
  };
  return (
    <Fragment>
      {Modalstate.length > 0 && (
        <Modal onClose={isLoading ? null : close}>
          <p className={cName}>{Modalstate}</p>
          {error && (
            <button className={classes.okbutton} onClick={close}>
              Ok
            </button>
          )}
        </Modal>
      )}
      <div className={classes.container}>
        <Card>
          <h2>Summarizer</h2>
          <form onSubmit={handleSummarize}>
            <textarea
              className={`${classes.textarea} ${classes.left}`}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text to summarize..."
            />

            <br />
            <Button />
          </form>
        </Card>
        <Card>
          <h2>Summary</h2>
          <Output
            sum={summary}
            className={`${classes.output} ${classes.right}`}
          />
          <ClearButton onClick={clear} />
        </Card>
      </div>
    </Fragment>
  );
}

export default Input;
