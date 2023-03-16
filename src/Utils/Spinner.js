import React from "react";
import spinner from "../assets/spinner.gif";
import classes from "./Spinner.module.css";

function Spinner() {
  return (
    <div className={classes.wraper}>
      <img src={spinner} alt="spinner" className={classes.spinner} />
    </div>
  );
}

export default Spinner;
