import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Agents from './pages/Agents';
import Intents from './pages/Intents';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/intents" element={<Intents />} />
          <Route path="*" element={<div className="text-center py-20">Page not found</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
