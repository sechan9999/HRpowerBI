
import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import WorkforceGrid from './pages/WorkforceGrid';
import Turnover from './pages/Turnover';
import Reports from './pages/Reports';

function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === 'Dashboard' && <Dashboard />}
      {activeTab === 'Workforce' && <WorkforceGrid />}
      {activeTab === 'Turnover' && <Turnover />}
      {activeTab === 'Reports' && <Reports />}
      {activeTab === 'Settings' && (
        <div className="flex flex-col items-center justify-center h-full text-slate-400">
          <p className="text-xl font-medium mb-2">System Configuration</p>
        </div>
      )}
    </Layout>
  );
}

export default App;
