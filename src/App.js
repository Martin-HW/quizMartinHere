import React from "react";
import { useGlobalContext } from "./context";

import SetupForm from "./SetupForm";
import Loading from "./Loading";
import Modal from "./Modal";
function App() {
  const {
    waiting,
    loading,
    questions,
    index,
    correct,
    nextQuestion,
    checkAnswer,
  } = useGlobalContext();
  // console.log(useGlobalContext(), "useGlobalContext");
  const [correctAnswer, setCorrectAnswer] = React.useState([]);

  if (waiting) {
    return <SetupForm />;
  }
  if (loading) {
    return <Loading />;
  }

  const { question, incorrect_answers, correct_answer } = questions[index];
  // const answers = [...incorrect_answers, correct_answer]
  let answers = [...incorrect_answers];
  const tempIndex = Math.floor(Math.random() * 4);
  if (tempIndex === 3) {
    answers.push(correct_answer);
  } else {
    answers.push(answers[tempIndex]);
    answers[tempIndex] = correct_answer;
  }
  return (
    <main>
      <Modal />
      <section className="quiz">
        <p className="correct-answers">
          correct answers : {correct}/{index}
        </p>
        <article className="container">
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div className="btn-container">
            {answers.map((answer, index) => {
              return (
                <button
                  key={index}
                  className="answer-btn"
                  onClick={() => {
                    checkAnswer(correct_answer === answer);
                    setCorrectAnswer(correctAnswer.concat(correct_answer));
                  }}
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              );
            })}
            {correctAnswer.length > 0 && (
              <>
                <h3>The correct answer were:</h3>
                <ul>
                  {correctAnswer.map((val, ind) => {
                    return (
                      <li key={ind}>
                        {ind + 1}.- {val}
                      </li>
                    );
                  })}
                </ul>
                <button
                  className="erase-correct-ones"
                  onClick={() => {
                    setCorrectAnswer([]);
                  }}
                >
                  Erase the correct answers
                </button>
              </>
            )}
          </div>
        </article>
        <button className="next-question" onClick={nextQuestion}>
          next question
        </button>
      </section>
    </main>
  );
}

export default App;
