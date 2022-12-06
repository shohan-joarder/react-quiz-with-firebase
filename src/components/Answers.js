import { Fragment } from "react";
import classes from "../styles/Answers.module.css";
import Checkbox from "./Checkbox";

export default function Answers({ options = [], handleChange, input }) {
  return (
    <div className={classes.answers}>
      {options.map((option, i) => (
        <Fragment key={i}>
          {input ? (
            <Checkbox
              key={i}
              className={classes.answer}
              text={option.title}
              value={i}
              checked={option.checked}
              onChange={(e) => handleChange(e, i)}
            />
          ) : (
            <Checkbox
              key={i}
              className={`${classes.answer} ${
                option.correct
                  ? classes.correct
                  : option.checked
                  ? classes.wrong
                  : null
              }`}
              text={option.title}
              defaultChecked={option.checked}
              disabaled={true}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
}
