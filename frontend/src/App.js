import React  from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const token = localStorage.getItem("token");
  return (
    <Router>
      <Routes>
        {token ? <Route exact path="/" element={<Dashboard />}/> : <Route exact path="/" element={<Login />}/> }
      </Routes>
    </Router>
  );
}

export default App;