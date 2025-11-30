import { useEffect, useState } from "react";
import { getTopics } from "../api";

export default function TopicList() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics().then((data) => setTopics(data));
  }, []);

  return (
    <div>
      <h2>Topics</h2>
      <ul>
        {topics.map((t) => (
          <li key={t._id}>{t.name}</li>
        ))}
      </ul>
    </div>
  );
}
