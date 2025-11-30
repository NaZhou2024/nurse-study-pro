// frontend/src/components/QuizPage.jsx
import { useEffect, useState } from "react";
import { getQuizById } from "../api"; // ✅ Use helper from api.js

export default function QuizPage({ topicId }) {
  const [quiz, setQuiz] = useState(null);
  const [score, setScore] = useState(null);

  // Fetch quiz when topicId changes
  useEffect(() => {
    async function fetchQuiz() {
      if (!topicId) return;
      
      try {
        const data = await getQuizById(topicId);
        setQuiz(data);
      } catch (err) {
        console.error("Failed to load quiz:", err);
      }
    }

    fetchQuiz();
  }, [topicId]);

  // Handle answer click
  const handleSelect = (qIndex, option) => {
    const updatedQuiz = { ...quiz };
    updatedQuiz.questions[qIndex].selected = option;
    setQuiz(updatedQuiz);
  };

  // Submit quiz
  const handleSubmit = () => {
    const result = quiz.questions.reduce(
      (acc, q) => acc + (q.selected === q.correctAnswer ? 1 : 0),
      0
    );
    setScore(result);
  };

  if (!quiz) return <p>Loading...</p>;

  return (
    <div>
      <h2>{quiz.title}</h2>

      {quiz.questions.map((q, i) => (
        <div key={i}>
          <p>{q.questionText}</p>

          {q.options.map((opt, j) => (
            <button
              key={j}
              onClick={() => handleSelect(i, opt)}
              style={{
                margin: "4px",
                background: q.selected === opt ? "#ffd27f" : "#eee",
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      ))}

      <button onClick={handleSubmit}>Submit</button>

      {score !== null && (
        <p>
          Your score: <strong>{score}</strong> / {quiz.questions.length}
        </p>
      )}
    </div>
  );
}
