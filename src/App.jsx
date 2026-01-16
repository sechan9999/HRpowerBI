
import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import WorkforceGrid from './pages/WorkforceGrid';

function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === 'Dashboard' && <Dashboard />}
      {activeTab === 'Workforce' && <WorkforceGrid />}
      {activeTab === 'Turnover' && (
        <div className="flex flex-col items-center justify-center h-full text-slate-400">
          <p className="text-xl font-medium mb-2">Detailed Turnover Analysis</p>
          <p className="text-sm">Coming soon in next sprint</p>
        </div>
      )}
      {activeTab === 'Reports' && (
        <div className="flex flex-col items-center justify-center h-full text-slate-400">
          <p className="text-xl font-medium mb-2">Custom Reports Processor</p>
          <p className="text-sm">Select metrics to export (Not implemented yet)</p>
        </div>
      )}
      {activeTab === 'Settings' && (
        <div className="flex flex-col items-center justify-center h-full text-slate-400">
          <p className="text-xl font-medium mb-2">System Configuration</p>
        </div>
      )}
    </Layout>
  );
}

export default App;
