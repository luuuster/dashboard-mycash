import { useMemo } from 'react';
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart
} from 'recharts';
import { useFinance } from '../../contexts/FinanceContext';

export default function FinancialFlowChart() {
    const { transactions } = useFinance();

    const data = useMemo(() => {
        const today = new Date();
        const last6Months = Array.from({ length: 6 }, (_, i) => {
            const d = new Date(today.getFullYear(), today.getMonth() - (5 - i), 1);
            return d;
        });

        return last6Months.map(date => {
            const monthName = new Intl.DateTimeFormat('pt-BR', { month: 'short' }).format(date);
            const monthKey = date.toISOString().slice(0, 7); // YYYY-MM

            const monthTransactions = transactions.filter(t => {
                const tDate = new Date(t.date);
                return tDate.toISOString().startsWith(monthKey);
            });

            const income = monthTransactions
                .filter(t => t.type === 'income')
                .reduce((acc, curr) => acc + curr.amount, 0);

            const expense = monthTransactions
                .filter(t => t.type === 'expense')
                .reduce((acc, curr) => acc + curr.amount, 0);

            return {
                name: monthName.charAt(0).toUpperCase() + monthName.slice(1),
                receitas: income,
                despesas: expense,
            };
        });
    }, [transactions]);

    return (
        <div className="bg-white rounded-[32px] p-8 flex flex-col gap-8 shadow-sm h-full shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Fluxo Financeiro</h2>
                    <p className="text-sm text-gray-500 mt-1">Comparativo mensal de receitas e despesas</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-lime-500" />
                        <span className="text-xs font-bold text-gray-600">Receitas</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                        <span className="text-xs font-bold text-gray-600">Despesas</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 min-h-[300px] w-full -ml-4">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#84CC16" stopOpacity={0.15} />
                                <stop offset="95%" stopColor="#84CC16" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.15} />
                                <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" opacity={0.5} />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 500 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 500 }}
                            width={40}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#fff',
                                borderRadius: '12px',
                                border: 'none',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
                            }}
                            itemStyle={{ fontWeight: '600', fontSize: '13px' }}
                            labelStyle={{ color: '#6B7280', marginBottom: '4px', fontSize: '12px' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="receitas"
                            stroke="#84CC16"
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
}
