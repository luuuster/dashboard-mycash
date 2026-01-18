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
import { Plus } from 'lucide-react';

const mockChartData = [
    { name: 'JAN', receitas: 1000, despesas: 500 },
    { name: 'FEV', receitas: 3000, despesas: 1500 },
    { name: 'MAR', receitas: 5000, despesas: 2500 },
    { name: 'ABR', receitas: 9000, despesas: 6000 },
    { name: 'MAI', receitas: 9500, despesas: 7000 },
    { name: 'JUN', receitas: 8000, despesas: 7500 },
    { name: 'JUL', receitas: 7000, despesas: 6500 },
    { name: 'AGO', receitas: 7500, despesas: 6000 },
    { name: 'SET', receitas: 8500, despesas: 5500 },
    { name: 'OUT', receitas: 9500, despesas: 5000 },
    { name: 'NOV', receitas: 10500, despesas: 4500 },
    { name: 'DEZ', receitas: 12500, despesas: 6500 },
];

export const FinancialChart: React.FC = () => {
    return (
        <div className="w-full bg-white border border-gray-50 rounded-[2.5rem] p-8 h-[450px] flex flex-col shadow-sm shadow-black/5">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <span className="p-2 bg-gray-50 rounded-lg">
                        <Plus className="w-5 h-5 text-gray-400 rotate-[45deg]" />
                    </span>
                    <h3 className="font-bold text-lg text-black">Fluxo financeiro</h3>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-primary-val" />
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Receitas</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Despesas</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockChartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#BDFF00" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#BDFF00" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9CA3AF', fontSize: 10, fontWeight: '700' }}
                            dy={15}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9CA3AF', fontSize: 10, fontWeight: '700' }}
                            dx={-10}
                            tickFormatter={(value) => `R$ ${value >= 1000 ? (value / 1000).toFixed(1) + 'k' : value}`}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: 'white', border: 'none', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                            itemStyle={{ fontSize: '11px', fontWeight: '700' }}
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
