import { getDatabase, ref, set } from "firebase/database";
import _ from "lodash";
import { useEffect, useReducer, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import useQuestions from "../../hooks/useQuestions";
import Answers from "../Answers";
import MiniPlayer from "../MiniPlayer";
import ProgressBar from "../ProgressBar";

const initalState = null;
const reducer = (state, action) => {
  switch (action.type) {
    case "questions":
      action.value.forEach((question) => {
        question.options.forEach((option) => {
          option.checked = false;
        });
      });
      return action.value;
    case "answer":
      const questions = _.cloneDeep(state);
      questions[action.questionId].options[action.optionIndex].checked =
        action.value;
      return questions;
    default:
      return state;
  }
};

export default function Quiz() {
  const { id } = useParams();
  const { loading, error, questions } = useQuestions(id);
  const [currentQuestions, setCurrentQuestions] = useState(0);
  const [qna, dispatch] = useReducer(reducer, initalState);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // const { state } = location;
  // const { videoTitle } = state;
  console.log(location);

  useEffect(() => {
    dispatch({
      type: "questions",
      value: questions,
    });
  }, [questions]);

  const handleAnswerChange = (e, i) => {
    dispatch({
      type: "answer",
      questionId: currentQuestions,
      optionIndex: i,
      value: e.target.checked,
    });
  };

  // handle when user clicks next button to get the next questions
  const nextQuestions = () => {
    if (currentQuestions + 1 < questions.length) {
      setCurrentQuestions((prevCurrent) => prevCurrent + 1);
    }
  };

  // handle when user clicks prev button to get the next questions
  const previousQuestions = () => {
    if (currentQuestions >= 1 && currentQuestions <= questions.length) {
      setCurrentQuestions((prevCurrent) => prevCurrent - 1);
    }
  };

  // submit quiz
  const submit = async () => {
    const { uid } = currentUser;

    const db = getDatabase();
    const resultRef = ref(db, `result/${uid}`);

    await set(resultRef, {
      [id]: qna,
    });

    navigate(`/result/${id}`, {
      state: {
        qna: qna,
      },
    });
  };

  // calculate percentage of progress
  const percentage =
    questions.length > 0
      ? ((currentQuestions + 1) / questions.length) * 100
      : 0;

  return (
    <>
      {loading && <div>Loading</div>}
      {!loading && qna.length > 0 && (
        <>
          <h1>{qna[currentQuestions].title}</h1>
          <h4>Question can have multiple answers</h4>
          <Answers
            input={true}
            options={qna[currentQuestions].options}
            handleChange={handleAnswerChange}
          />
          <ProgressBar
            next={nextQuestions}
            prev={previousQuestions}
            progress={percentage}
            submit={submit}
          />
          <MiniPlayer
            id={id}
            title={qna[currentQuestions].title}
            videoTitle="{videoTitle}"
          />
        </>
      )}
    </>
  );
}
