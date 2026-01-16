
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend } from 'recharts';

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

export const HeadcountTrend = ({ data }) => (
    <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorHeadcount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis
                    dataKey="month"
                    stroke="#94a3b8"
                    tickLine={false}
                    axisLine={false}
                    tick={({ x, y, payload }) => (
                        <text x={x} y={y + 15} fill="#94a3b8" fontSize={12} textAnchor="middle">{payload.value}</text>
                    )}
                />
                <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#3b82f6', strokeWidth: 2 }} />
                <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorHeadcount)"
                />
            </AreaChart>
        </ResponsiveContainer>
    </div>
);

export const DepartmentDistribution = ({ data }) => (
    <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={true} vertical={false} />
                <XAxis type="number" stroke="#94a3b8" hide />
                <YAxis
                    dataKey="name"
                    type="category"
                    stroke="#94a3b8"
                    tickLine={false}
                    axisLine={false}
                    width={100}
                    tick={{ fill: '#e2e8f0', fontSize: 13 }}
                />
                <Tooltip cursor={{ fill: '#334155', opacity: 0.4 }} content={<CustomTooltip />} />
                <Bar dataKey="value" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
        </ResponsiveContainer>
    </div>
);

export const DemographicsPie = ({ data }) => {
    const COLORS = ['#3b82f6', '#f43f5e', '#10b981', '#f59e0b'];

    return (
        <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(0,0,0,0)" />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
