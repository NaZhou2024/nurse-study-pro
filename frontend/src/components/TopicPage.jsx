import { useEffect, useState } from "react";
import { getQuizById } from "../api";
import { useParams } from "react-router-dom";

export default function TopicPage() {
  const { topicId } = useParams();
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    if (!topicId) return;

    getQuizById(topicId)
      .then((data) => setQuizzes(data))
      .catch((err) => console.error("Failed to load quizzes", err));
  }, [topicId]);

  return (
    <div>
      <h2>Quizzes</h2>

      {quizzes.map((q) => (
        <div key={q._id} style={{ marginBottom: 20 }}>
          <h3>{q.question}</h3>
          <ul>
            {q.options.map((opt, index) => (
              <li key={index}>{opt}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
