import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import QuizPage from "./components/QuizPage";
import TopicList from "./components/TopicList";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/topics" element={<TopicList />} />
        <Route path="/quiz/:topicId" element={<QuizPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
