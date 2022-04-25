import React  from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const token = localStorage.getItem("token");
  const exp = localStorage.getItem("exp");
  return (
    <Router>
      <Routes>
        { token && Date.now() <= exp * 1000 ? <Route exact path="/" element={<Dashboard />}/> : <Route exact path="/" element={<Login />}/> }
      </Routes>
    </Router>
  );
}

export default App;