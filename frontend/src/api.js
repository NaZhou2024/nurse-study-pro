// frontend/src/api.js
console.log(">> NEW API.JS LOADED <<");

import axios from "axios";

// 1️⃣ Read backend URL from .env (Vercel will inject VITE_API_URL automatically), has to use render instead of vercel, because Vercel does NOT run server.js and does NOT support long-running Express servers.
console.log("API URL loaded:", import.meta.env.VITE_API_URL);
export const API_URL = import.meta.env.VITE_API_URL;


// 2️⃣ Login user
export async function loginUser(data) {
  const res = await fetch(`${API_URL}/api/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include", // Allow cookies/sessions
  });

  return res.json();
}

function getToken() {
  return localStorage.getItem("token");
}

// 3️⃣ Get ALL topics
export async function getTopics() {
  const res = await fetch(`${API_URL}/api/topics`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
});
  return res.json();
}

// 4️⃣ Get quizzes for one topic
export async function getQuizById(topicId) {
  const res = await axios.get(`${API_URL}/api/quizzes/topic/${topicId}`, {
    withCredentials: true,
  });
  return res.data;
}


