import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  console.log("Token:", token);

  if (!token) {
    console.log("Redirecting to signup...");
    window.location.href = `${process.env.REACT_APP_FRONTEND_URL}/signup`;
    return null;
  }

  return children;
}



const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );