import React from "react";
import "./App.css";
import Login from "./views/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Top } from "./views/Top";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<Login />}></Route>
        <Route path={`/Success`} element={<Top />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
