import { useEffect, useState } from "react";
import { Question } from "../Question/Question";
import "../styles.css";

export const Quiz = () => {
  const [originalData, setOriginalData] = useState([]);
  const [data, setData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [answerFeedback, setAnswerFeedback] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [lockedQuestions, setLockedQuestions] = useState([]);

  const handleNextQuestion = () => {
    const newAnswerFeedback = [...answerFeedback];

    if (
      selectedAnswer ===
      originalData.results[currentQuestionIndex].correct_answer
    ) {
      setScore(score + 1);
      newAnswerFeedback[currentQuestionIndex] = "correct";
    } else {
      newAnswerFeedback[currentQuestionIndex] = "incorrect";
    }

    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[currentQuestionIndex] = selectedAnswer;
    setUserAnswers(updatedUserAnswers);

    setAnswerFeedback(newAnswerFeedback);
    setShowFeedback(true);
    setLockedQuestions((prev) => [...prev, currentQuestionIndex]);

    setTimeout(() => {
      setShowFeedback(false);
      if (data && currentQuestionIndex < data.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
      }
      if (currentQuestionIndex === data.length - 1) {
        alert(`Your Final Score is ${score}/10`);
        window.location.reload();
      }
    }, 1000);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));

      [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array;
  }

  useEffect(() => {
    const previouslySelectedAnswer = userAnswers[currentQuestionIndex];
    if (previouslySelectedAnswer !== undefined) {
      setSelectedAnswer(previouslySelectedAnswer);
    } else {
      setSelectedAnswer(null);
    }
  }, [currentQuestionIndex, userAnswers]);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=50&difficulty=easy&type=multiple")
      .then((response) => response.json())
      .then((result) => {
        setOriginalData(result);

        const shuffledQuestions = shuffleArray(result.results);
        const selectedQuestions = shuffledQuestions.slice(0, 10);

        const transformedData = selectedQuestions.map((question) => {
          const answers = shuffleArray([
            ...question.incorrect_answers,
            question.correct_answer,
          ]);
          return {
            question: question.question,
            answers,
          };
        });

        setData(transformedData);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <Question
        result={data}
        index={currentQuestionIndex}
        handleNextQuestion={handleNextQuestion}
        handlePreviousQuestion={handlePreviousQuestion}
        setSelectedAnswer={setSelectedAnswer}
        selectedAnswer={selectedAnswer}
        answerFeedback={answerFeedback}
        showFeedback={showFeedback}
        score={score}
        userAnswers={userAnswers}
        setUserAnswers={setUserAnswers}
        lockedQuestions={lockedQuestions}
      />
    </div>
  );
};
