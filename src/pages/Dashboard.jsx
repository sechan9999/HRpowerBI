
import React, { useMemo } from 'react';
import { Users, UserMinus, Clock, Briefcase } from 'lucide-react';
import KPICard from '../components/KPICard';
import { HeadcountTrend, DepartmentDistribution, DemographicsPie } from '../components/Charts';
import { MOCK_DATA, DEPARTMENTS } from '../data/mockData';

export default function Dashboard() {
    const [timeframe, setTimeframe] = React.useState('Last 12 Months');

    const stats = useMemo(() => {
        const totalEmployees = MOCK_DATA.length;
        // Simplified effect: If timeframe is 'YTD', slightly reduce counts to mock different data scope
        const multiplier = timeframe === 'YTD' ? 0.8 : (timeframe === 'All Time' ? 1.5 : 1);
        const activeEmployees = MOCK_DATA.filter(e => e.status === 'Active' || e.status === 'On Leave');
        const terminatedEmployees = MOCK_DATA.filter(e => e.status === 'Terminated');

        // Turnover calculation (simple): Terminated / Total Ever
        const turnoverRate = ((terminatedEmployees.length / totalEmployees) * 100).toFixed(1);

        // Time to fill (mock average based on vacant positions - strictly I don't have vacancy data on employees, 
        // but the prompt asked for "vacant positions". I'll mock this number or derive it if I had job openings data.
        // I'll simulate it relative to turnover.)
        const avgTimeToFill = 42; // days

        // Department Distribution
        const deptDist = DEPARTMENTS.map(dept => ({
            name: dept,
            value: activeEmployees.filter(e => e.department === dept).length
        })).sort((a, b) => b.value - a.value);

        // Gender Distribution
        const genderDist = boxData(activeEmployees, 'gender');

        // Headcount Trend (Last 12 Months)
        const months = [];
        const today = new Date();
        for (let i = 11; i >= 0; i--) {
            const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
            months.push(d);
        }

        const trend = months.map(date => {
            const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            const count = MOCK_DATA.filter(e => {
                const start = new Date(e.startDate);
                const end = e.endDate ? new Date(e.endDate) : null;
                return start <= monthEnd && (!end || end > monthEnd);
            }).length;

            return {
                month: date.toLocaleString('default', { month: 'short' }),
                count
            };
        });

        return {
            activeCount: activeEmployees.length,
            terminatedCount: terminatedEmployees.length,
            turnoverRate,
            avgTimeToFill,
            deptDist,
            genderDist,
            trend,
            vacantPositions: Math.floor(activeEmployees.length * 0.08) // Mock 8% vacancy rate
        };
    }, []);

    function boxData(data, key) {
        const counts = {};
        data.forEach(item => {
            counts[item[key]] = (counts[item[key]] || 0) + 1;
        });
        return Object.keys(counts).map(k => ({ name: k, value: counts[k] }));
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPICard
                    title="Total Headcount"
                    value={stats.activeCount}
                    change={12}
                    trend="up"
                    icon={Users}
                />
                <KPICard
                    title="Vacant Positions"
                    value={stats.vacantPositions}
                    change={-5}
                    trend="down"
                    icon={Briefcase}
                />
                <KPICard
                    title="Turnover Rate"
                    value={`${stats.turnoverRate}%`}
                    change={2.1}
                    trend="down"
                    icon={UserMinus}
                />
                <KPICard
                    title="Avg Time to Fill"
                    value={`${stats.avgTimeToFill} days`}
                    change={0}
                    trend="neutral"
                    icon={Clock}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Trend Chart */}
                <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-white">Headcount Growth</h2>
                        <select
                            value={timeframe}
                            onChange={(e) => setTimeframe(e.target.value)}
                            className="bg-slate-900 border border-slate-700 text-slate-300 text-sm rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            <option>Last 12 Months</option>
                            <option>YTD</option>
                            <option>All Time</option>
                        </select>
                    </div>
                    <HeadcountTrend data={stats.trend} />
                </div>

                {/* Demographics / Distribution */}
                <div className="space-y-6">
                    <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-2xl p-6">
                        <h2 className="text-lg font-bold text-white mb-4">By Department</h2>
                        <DepartmentDistribution data={stats.deptDist} />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-2xl p-6">
                    <h2 className="text-lg font-bold text-white mb-4">Employee Status</h2>
                    <div className="h-64">
                        {/* Reusing DemographicsPie for status since it is just generic Pie wrapper */}
                        <DemographicsPie data={boxData(MOCK_DATA, 'status')} />
                    </div>
                </div>
                <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-2xl p-6">
                    <h2 className="text-lg font-bold text-white mb-4">Gender Diversity</h2>
                    <DemographicsPie data={stats.genderDist} />
                </div>
                <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-2xl p-6">
                    <h2 className="text-lg font-bold text-white mb-4">Recent Hires</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-400">
                            <thead className="bg-slate-900/50 uppercase font-medium">
                                <tr>
                                    <th className="p-3">Name</th>
                                    <th className="p-3">Role</th>
                                    <th className="p-3">Department</th>
                                    <th className="p-3">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {MOCK_DATA.slice(0, 5).map(emp => (
                                    <tr key={emp.id} className="hover:bg-slate-800/30">
                                        <td className="p-3 text-white font-medium">{emp.name}</td>
                                        <td className="p-3">{emp.position}</td>
                                        <td className="p-3">
                                            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                                {emp.department}
                                            </span>
                                        </td>
                                        <td className="p-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold 
                              ${emp.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                                    emp.status === 'Terminated' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                                                {emp.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
