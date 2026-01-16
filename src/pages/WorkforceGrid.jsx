
import React, { useState } from 'react';
import { Search, Filter, Download } from 'lucide-react';
import { MOCK_DATA } from '../data/mockData';

export default function WorkforceGrid() {
    const [searchTerm, setSearchTerm] = useState('');
    const [deptFilter, setDeptFilter] = useState('All');

    const filteredData = MOCK_DATA.filter(employee => {
        const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.position.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDept = deptFilter === 'All' || employee.department === deptFilter;
        return matchesSearch && matchesDept;
    });

    const handleExportCSV = () => {
        const headers = ['ID', 'Name', 'Department', 'Position', 'Status', 'Performance', 'Joined'];
        const rows = filteredData.map(emp => [
            emp.id,
            emp.name,
            emp.department,
            emp.position,
            emp.status,
            emp.performance,
            emp.startDate
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', 'workforce_export.csv');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-2xl p-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search employees..."
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex space-x-3 w-full md:w-auto">
                        <select
                            className="bg-slate-900 border border-slate-700 text-slate-300 rounded-lg px-4 py-2 outline-none"
                            value={deptFilter}
                            onChange={(e) => setDeptFilter(e.target.value)}
                        >
                            <option value="All">All Departments</option>
                            {['Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations'].map(d => (
                                <option key={d} value={d}>{d}</option>
                            ))}
                        </select>

                        <button
                            onClick={handleExportCSV}
                            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
                        >
                            <Download size={18} />
                            <span>Export</span>
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-400">
                        <thead className="bg-slate-900/50 uppercase font-medium">
                            <tr>
                                <th className="p-4 rounded-tl-lg">Employee</th>
                                <th className="p-4">Role</th>
                                <th className="p-4">Department</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Performance</th>
                                <th className="p-4 rounded-tr-lg">Joined</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {filteredData.slice(0, 50).map(emp => (
                                <tr key={emp.id} className="hover:bg-slate-800/30 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white">
                                                {emp.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <span className="text-white font-medium">{emp.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">{emp.position}</td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                            {emp.department}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold 
                        ${emp.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                                emp.status === 'Terminated' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                                            {emp.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex space-x-1">
                                            {[...Array(5)].map((_, i) => (
                                                <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < emp.performance ? 'bg-blue-400' : 'bg-slate-700'}`} />
                                            ))}
                                        </div>
                                    </td>
                                    <td className="p-4">{emp.startDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="p-4 text-center text-xs text-slate-500 border-t border-slate-800">
                        Showing {Math.min(filteredData.length, 50)} of {filteredData.length} entries
                    </div>
                </div>
            </div>
        </div>
    );
}
