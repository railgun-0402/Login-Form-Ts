import React from "react";
import { useNavigate } from "react-router-dom";

export const Top = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <h1>Top Page</h1>
      <button onClick={() => navigate("/")}>ログアウト</button>
    </div>
  );
};

export default Top;
