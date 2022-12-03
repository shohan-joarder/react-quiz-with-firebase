import classes from "../styles/Question.module.css";
import Answers from "./Answers";

export default function Question() {
  return (
    <div class={classes.question}>
      <div class={classes.qtitle}>
        <span class="material-icons-outlined"> help_outline </span>
        Here goes the question from Learn with Sumit?
      </div>
      <Answers />
    </div>
  );
}
