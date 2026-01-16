
import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function KPICard({ title, value, change, trend = 'neutral', icon: Icon }) {
    // trend: 'up' | 'down' | 'neutral'
    // logic: if 'up' is good (e.g. revenue), color green. If 'up' is bad (e.g. turnover), we might pass color prop.
    // For simplicity, let's assume trendColor is passed or derived.

    const isPositive = trend === 'up';

    return (
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-6 rounded-2xl hover:border-slate-600 transition-all duration-300 group">
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors">
                    <Icon className="text-blue-400" size={24} />
                </div>
                {change && (
                    <div className={`flex items-center space-x-1 text-sm font-medium ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                        <span>{change}%</span>
                    </div>
                )}
            </div>
            <div>
                <h3 className="text-slate-400 font-medium text-sm mb-1">{title}</h3>
                <div className="text-3xl font-bold text-white tracking-tight">{value}</div>
            </div>
        </div>
    );
}
