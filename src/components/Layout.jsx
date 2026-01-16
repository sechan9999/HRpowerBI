
import React from 'react';
import { LayoutDashboard, Users, TrendingUp, Settings, FileText, PieChart } from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${active
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
    >
        <Icon size={20} />
        <span className="font-medium">{label}</span>
    </button>
);

export default function Layout({ children, activeTab, setActiveTab }) {

    return (
        <div className="flex h-screen bg-slate-900 text-slate-100 overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col p-4">
                <div className="flex items-center space-x-2 px-4 py-6 mb-6">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                        <span className="font-bold text-white">HR</span>
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                        Insight
                    </span>
                </div>

                <nav className="space-y-2 flex-1">
                    <SidebarItem
                        icon={LayoutDashboard}
                        label="Overview"
                        active={activeTab === 'Dashboard'}
                        onClick={() => setActiveTab('Dashboard')}
                    />
                    <SidebarItem
                        icon={Users}
                        label="Workforce"
                        active={activeTab === 'Workforce'}
                        onClick={() => setActiveTab('Workforce')}
                    />
                    <SidebarItem
                        icon={TrendingUp}
                        label="Turnover"
                        active={activeTab === 'Turnover'}
                        onClick={() => setActiveTab('Turnover')}
                    />
                    <SidebarItem
                        icon={FileText}
                        label="Reports"
                        active={activeTab === 'Reports'}
                        onClick={() => setActiveTab('Reports')}
                    />
                </nav>

                <div className="pt-4 border-t border-slate-800">
                    <SidebarItem
                        icon={Settings}
                        label="Settings"
                        active={activeTab === 'Settings'}
                        onClick={() => setActiveTab('Settings')}
                    />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-slate-900/50 p-8">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-white">{activeTab}</h1>
                        <p className="text-slate-400 text-sm">Real-time HR analytics and reporting</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="text-right">
                            <p className="text-sm font-medium text-white">Admin User</p>
                            <p className="text-xs text-slate-400">HR Manager</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 shadow-lg border-2 border-slate-900"></div>
                    </div>
                </header>

                {children}
            </main>
        </div>
    );
}
