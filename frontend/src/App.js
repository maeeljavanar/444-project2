import React  from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />}/>
        <Route path="/list" element={<Dashboard />}/>
      </Routes>
    </Router>
  );
}

export default App;