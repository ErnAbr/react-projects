import { Answers } from "../Answers/Answers";
import { Score } from "../Score/Score";
import "../styles.css";

export const Question = ({
  result,
  handleNextQuestion,
  index,
  handlePreviousQuestion,
  setSelectedAnswer,
  selectedAnswer,
  answerFeedback,
  score,
  userAnswers,
  setUserAnswers,
  lockedQuestions,
}) => {
  if (!result || !result[index]) {
    return <div>LOADING...</div>;
  }

  return (
    <div>
      <div className="question-box">{result[index].question}</div>

      <div>
        <Answers
          result={result}
          index={index}
          setSelectedAnswer={setSelectedAnswer}
          selectedAnswer={selectedAnswer}
          answerFeedback={answerFeedback}
          userAnswers={userAnswers}
          setUserAnswers={setUserAnswers}
          lockedQuestions={lockedQuestions}
        />
        <div className="button-box">
          <button
            disabled={index === 0}
            onClick={() => handlePreviousQuestion()}
          >
            PREVIOUS QUESTION
          </button>
          <button
            disabled={!selectedAnswer}
            onClick={() => handleNextQuestion()}
          >
            NEXT QUESTION
          </button>
        </div>
      </div>
      <div className="score-container">
        <Score score={score} index={index + 1} />
      </div>
    </div>
  );
};
