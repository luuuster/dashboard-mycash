import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const mockChartData = [
    { name: '01/03', receitas: 4000, despesas: 2400 },
    { name: '05/03', receitas: 3000, despesas: 1398 },
    { name: '10/03', receitas: 2000, despesas: 9800 },
    { name: '15/03', receitas: 2780, despesas: 3908 },
    { name: '20/03', receitas: 1890, despesas: 4800 },
    { name: '25/03', receitas: 2390, despesas: 3800 },
    { name: '30/03', receitas: 3490, despesas: 4300 },
];

export const FinancialChart: React.FC = () => {
    return (
        <div className="w-full bg-surface border border-border rounded-2xl p-6 h-[400px] flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="font-bold text-lg">Fluxo Financeiro</h3>
                    <p className="text-sm text-gray-500">Comparativo mensal de entradas e saídas</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-primary" />
                        <span className="text-xs text-gray-400">Receitas</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <span className="text-xs text-gray-400">Despesas</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#BDFF00" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#BDFF00" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2A2A2A" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6B7280', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6B7280', fontSize: 12 }}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#121212', border: '1px solid #2A2A2A', borderRadius: '12px' }}
                            itemStyle={{ fontSize: '12px' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="receitas"
                            stroke="#BDFF00"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorIncome)"
                        />
                        <Area
                            type="monotone"
                            dataKey="despesas"
                            stroke="#EF4444"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorExpense)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
