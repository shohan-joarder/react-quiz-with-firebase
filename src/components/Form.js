import React from "react";
import classes from "../styles/Form.module.css";

export default function Form({ children, className, ...rest }) {
  console.log(classes.signup);
  return (
    <form className={`${className} ${classes.form} `} action="#" {...rest}>
      {children}
    </form>
  );
}
