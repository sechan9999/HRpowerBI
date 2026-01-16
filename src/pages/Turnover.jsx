
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { MOCK_DATA, DEPARTMENTS } from '../data/mockData';
import KPICard from '../components/KPICard';
import { TrendingDown, UserMinus, ShieldCheck, AlertCircle } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl">
                <p className="text-slate-300 text-sm font-medium mb-1">{label}</p>
                <p className="text-white text-lg font-bold">
                    {payload[0].value}
                </p>
            </div>
        );
    }
    return null;
};

export default function Turnover() {
    const analytics = useMemo(() => {
        const terminated = MOCK_DATA.filter(e => e.status === 'Terminated');
        const active = MOCK_DATA.filter(e => e.status === 'Active');

        // Voluntary vs Involuntary (Mock logic: Performance < 3 is Involuntary)
        const involuntary = terminated.filter(e => e.performance < 3).length;
        const voluntary = terminated.length - involuntary;

        // Turnover by Dept
        const turnoverByDept = DEPARTMENTS.map(dept => {
            const deptTotal = MOCK_DATA.filter(e => e.department === dept).length;
            const deptTerminated = terminated.filter(e => e.department === dept).length;
            return {
                name: dept,
                rate: deptTotal ? ((deptTerminated / deptTotal) * 100).toFixed(1) : 0,
                count: deptTerminated
            };
        }).sort((a, b) => b.rate - a.rate);

        // Retention Trend (Last 6 Months)
        const months = [];
        const today = new Date();
        for (let i = 5; i >= 0; i--) {
            const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
            months.push(d);
        }

        const retentionTrend = months.map(date => {
            const monthStr = date.toLocaleString('default', { month: 'short' });
            // Mock random fluctuation for demo
            const retention = 85 + Math.random() * 10;
            const turnover = 100 - retention;
            return { month: monthStr, retention: retention.toFixed(1), turnover: turnover.toFixed(1) };
        });

        return {
            voluntary,
            involuntary,
            turnoverByDept,
            retentionTrend,
            avgTenure: 2.1 // Mock average tenure in years
        };
    }, []);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPICard
                    title="Voluntary Turnover"
                    value={analytics.voluntary}
                    change={5}
                    trend="down" // Down is bad usually, but here 'Voluntary' going up is bad. Let's say down is neutral.
                    icon={UserMinus}
                />
                <KPICard
                    title="Involuntary Turnover"
                    value={analytics.involuntary}
                    change={-2}
                    trend="up"
                    icon={AlertCircle}
                />
                <KPICard
                    title="Retention Rate"
                    value="92%"
                    change={1.2}
                    trend="up"
                    icon={ShieldCheck}
                />
                <KPICard
                    title="Avg Tenure (Years)"
                    value={analytics.avgTenure}
                    change={0.1}
                    trend="up"
                    icon={TrendingDown}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Retention vs Turnover Trend */}
                <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-2xl p-6">
                    <h2 className="text-lg font-bold text-white mb-6">Retention vs Turnover Trend</h2>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={analytics.retentionTrend}>
                                <defs>
                                    <linearGradient id="colorRetention" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorTurnover" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                <XAxis dataKey="month" stroke="#94a3b8" />
                                <YAxis stroke="#94a3b8" />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend />
                                <Area type="monotone" dataKey="retention" name="Retention %" stroke="#10b981" fillOpacity={1} fill="url(#colorRetention)" />
                                <Area type="monotone" dataKey="turnover" name="Turnover %" stroke="#ef4444" fillOpacity={1} fill="url(#colorTurnover)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Turnover by Department */}
                <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-2xl p-6">
                    <h2 className="text-lg font-bold text-white mb-6">Turnover Rate by Department</h2>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={analytics.turnoverByDept} layout="vertical" margin={{ left: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={true} vertical={false} />
                                <XAxis type="number" stroke="#94a3b8" hide />
                                <YAxis dataKey="name" type="category" stroke="#94a3b8" width={100} tick={{ fill: '#cbd5e1' }} />
                                <Tooltip cursor={{ fill: '#334155', opacity: 0.4 }} content={<CustomTooltip />} />
                                <Bar dataKey="rate" name="Turnover %" fill="#f43f5e" radius={[0, 4, 4, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
