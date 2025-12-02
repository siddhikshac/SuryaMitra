import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Calculator from './pages/Calculator';
import Challenges from './pages/Challenges';
import Assistant from './pages/Assistant';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/assistant" element={<Assistant />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
