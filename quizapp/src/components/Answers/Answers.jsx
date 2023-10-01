export const Answers = ({
  result,
  index,
  setSelectedAnswer,
  answerFeedback,
  userAnswers,
  setUserAnswers,
  lockedQuestions,
}) => {
  const currentAnswers = result[index].answers;
  const feedback = answerFeedback[index];
  const currentUserAnswer = userAnswers[index];

  return (
    <div className="answer-box">
      {currentAnswers.map((answer) => {
        let className = "answerBox";

        if (feedback) {
          if (answer === currentUserAnswer && feedback === "incorrect") {
            className += " wrong";
          } else if (answer === currentUserAnswer && feedback === "correct") {
            className += " correct";
          }
        }
        if (answer === currentUserAnswer) {
          className += " selected";
        }

        return (
          <div
            key={answer}
            className={className}
            onClick={() => {
              if (!lockedQuestions.includes(index)) {
                setSelectedAnswer(answer);
                const updatedUserAnswers = [...userAnswers];
                updatedUserAnswers[index] = answer;
                setUserAnswers(updatedUserAnswers);
              }
            }}
          >
            {answer}
          </div>
        );
      })}
    </div>
  );
};
