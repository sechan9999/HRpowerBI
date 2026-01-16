
import React, { useState } from 'react';
import { FileText, Download, Printer, Share2, Calendar } from 'lucide-react';
import { MOCK_DATA } from '../data/mockData';

export default function Reports() {
    const [reportType, setReportType] = useState('Executive Summary');

    // Stats for the report
    const totalHeadcount = MOCK_DATA.filter(e => e.status === 'Active').length;
    const newHires = MOCK_DATA.filter(e => {
        const d = new Date(e.startDate);
        const now = new Date();
        return (now - d) / (1000 * 60 * 60 * 24) < 90; // Last 90 days
    }).length;
    const turnoverCount = MOCK_DATA.filter(e => e.status === 'Terminated').length;

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="h-full flex flex-col animate-in fade-in duration-500">

            {/* Toolbar */}
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-2xl p-4 mb-6 flex flex-col md:flex-row justify-between items-center gap-4 print:hidden">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2">
                        <FileText className="text-blue-500" size={18} />
                        <select
                            value={reportType}
                            onChange={(e) => setReportType(e.target.value)}
                            className="bg-transparent text-white outline-none text-sm font-medium"
                        >
                            <option>Executive Summary</option>
                            <option>Headcount Analysis</option>
                            <option>Turnover Report</option>
                            <option>Diversity Audit</option>
                        </select>
                    </div>

                    <div className="flex items-center space-x-2 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2">
                        <Calendar className="text-slate-400" size={18} />
                        <span className="text-sm text-slate-300">Last 30 Days</span>
                    </div>
                </div>

                <div className="flex space-x-3">
                    <button
                        onClick={handlePrint}
                        className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
                        <Printer size={16} />
                        <span>Print</span>
                    </button>
                    <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
                        <Download size={16} />
                        <span>Export PDF</span>
                    </button>
                </div>
            </div>

            {/* Report Preview / Content */}
            <div className="flex-1 bg-white text-slate-900 rounded-xl shadow-2xl overflow-y-auto max-w-4xl mx-auto w-full p-12 print:p-0 print:shadow-none print:w-full print:max-w-none print:rounded-none">
                {/* Report Header */}
                <div className="flex justify-between items-start border-b-2 border-slate-100 pb-8 mb-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-2">
                            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xs">HR</div>
                            <span className="text-xl font-bold text-slate-800">Insight</span>
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">{reportType}</h1>
                        <p className="text-slate-500">Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</p>
                    </div>
                    <div className="text-right">
                        <div className="text-sm font-bold text-slate-900">CONFIDENTIAL</div>
                        <div className="text-xs text-slate-400">Internal Use Only</div>
                    </div>
                </div>

                {/* Report Content */}
                <div className="space-y-8">

                    <section>
                        <h2 className="text-lg font-bold text-slate-800 mb-3 border-l-4 border-blue-500 pl-3">Executive Overview</h2>
                        <p className="text-slate-600 leading-relaxed">
                            This report provides a comprehensive analysis of the current workforce dynamics.
                            As of today, the organization maintains a total headcount of <span className="font-bold text-slate-900">{totalHeadcount}</span> active employees.
                            Over the selected period, we have observed stable retention rates, with <span className="font-bold text-slate-900">{newHires}</span> new joiners onboarding successfully.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-slate-800 mb-3 border-l-4 border-blue-500 pl-3">Key Performance Indicators</h2>
                        <div className="grid grid-cols-3 gap-6">
                            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                                <div className="text-slate-500 text-sm mb-1">Active Headcount</div>
                                <div className="text-2xl font-bold text-blue-600">{totalHeadcount}</div>
                                <div className="text-green-600 text-xs font-medium mt-1">↑ 2.4% vs last month</div>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                                <div className="text-slate-500 text-sm mb-1">Total Terminations</div>
                                <div className="text-2xl font-bold text-slate-700">{turnoverCount}</div>
                                <div className="text-red-500 text-xs font-medium mt-1">↑ 1.2% vs last month</div>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                                <div className="text-slate-500 text-sm mb-1">New Hires (90 Days)</div>
                                <div className="text-2xl font-bold text-slate-700">{newHires}</div>
                                <div className="text-slate-400 text-xs font-medium mt-1">Stable pipeline</div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-slate-800 mb-3 border-l-4 border-blue-500 pl-3">Department Breakdown</h2>
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                                <tr>
                                    <th className="p-3">Department</th>
                                    <th className="p-3">Active Employees</th>
                                    <th className="p-3">Open Positions</th>
                                    <th className="p-3">Budget Utilization</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                <tr className="hover:bg-slate-50">
                                    <td className="p-3 font-medium text-slate-700">Engineering</td>
                                    <td className="p-3">142</td>
                                    <td className="p-3 text-red-500">12</td>
                                    <td className="p-3">94%</td>
                                </tr>
                                <tr className="hover:bg-slate-50">
                                    <td className="p-3 font-medium text-slate-700">Sales</td>
                                    <td className="p-3">89</td>
                                    <td className="p-3 text-red-500">8</td>
                                    <td className="p-3">98%</td>
                                </tr>
                                <tr className="hover:bg-slate-50">
                                    <td className="p-3 font-medium text-slate-700">Marketing</td>
                                    <td className="p-3">45</td>
                                    <td className="p-3">3</td>
                                    <td className="p-3">88%</td>
                                </tr>
                                <tr className="hover:bg-slate-50">
                                    <td className="p-3 font-medium text-slate-700">HR & Admin</td>
                                    <td className="p-3">24</td>
                                    <td className="p-3">1</td>
                                    <td className="p-3">92%</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                    <div className="mt-12 pt-8 border-t border-slate-200 text-center text-slate-400 text-sm">
                        <p>© {new Date().getFullYear()} HR Insight System. All Rights Reserved.</p>
                        <p>Generated by AdminOps AI</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
