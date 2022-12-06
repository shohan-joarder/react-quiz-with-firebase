import _ from "lodash";
import { useLocation, useParams } from "react-router-dom";
import useAnswers from "../../hooks/useAnswers";
import Analysis from "../Analysis";
import Summary from "../Summary";

export default function Result() {
  const { id } = useParams();
  const { loading, answers } = useAnswers(id);
  const location = useLocation();
  const { state } = location;
  const { qna } = state;

  function calculate() {
    let score = 0;
    answers.forEach((question, i) => {
      let correctIndexces = [];
      let checkedIndexces = [];

      question.options.forEach((option, i2) => {
        if (option.correct) correctIndexces.push(i2);
        if (qna[i].options[i2].checked) {
          checkedIndexces.push(i2);
          option.checked = true;
        }
      });
      if (_.isEqual(correctIndexces, checkedIndexces)) {
        score = score + 5;
      }
    });
    return score;
  }

  const userScore = calculate();

  return (
    <>
      {loading && <div>Loading</div>}
      {answers && answers.length > 0 && (
        <>
          <Summary score={userScore} noq={answers.length} />
          <Analysis answers={answers} />
        </>
      )}
    </>
  );
}
