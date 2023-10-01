import "../styles.css";

export const Score = ({ score, index }) => {
  console.log(score);

  return (
    <div className="score-box">
      <p>Your Score is: {score}/10</p>
      <p>Question number: {index}/10</p>
    </div>
  );
};
