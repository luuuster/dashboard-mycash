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
        const months = ['Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez', 'Jan'];

        // Generate 7 months of data ending at current month
        return months.map((month, index) => {
            // For mock purposes, using deterministic mock values to match Figma
            const mockValues = [
                { income: 15400, expense: 12200 },
                { income: 18200, expense: 14500 },
                { income: 16800, expense: 13100 },
                { income: 21000, expense: 15800 },
                { income: 19500, expense: 14200 },
                { income: 20200, expense: 16500 },
                { income: 20500, expense: 13450 }, // Jan (based on current month mock data)
            ];

            return {
                name: month,
                receitas: mockValues[index].income,
                despesas: mockValues[index].expense,
            };
        });
    }, [transactions]);

    return (
        <div className="bg-surface border border-border rounded-[24px] md:rounded-[32px] p-6 md:p-8 flex flex-col gap-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-text-primary">Fluxo Financeiro</h2>
                    <p className="text-sm text-text-secondary">Comparativo mensal de receitas e despesas</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-primary" />
                        <span className="text-xs font-medium text-text-secondary">Receitas</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <span className="text-xs font-medium text-text-secondary">Despesas</span>
                    </div>
                </div>
            </div>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#84CC16" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="#84CC16" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94A3B8', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94A3B8', fontSize: 12 }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#fff',
                                borderRadius: '16px',
                                border: '1px solid #E2E8F0',
                                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
                            }}
                            itemStyle={{ fontWeight: '600' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="receitas"
                            stroke="#84CC16"
                            strokeWidth={4}
                            fillOpacity={1}
                            fill="url(#colorIncome)"
                        />
                        <Area
                            type="monotone"
                            dataKey="despesas"
                            stroke="#EF4444"
                            strokeWidth={4}
                            fillOpacity={1}
                            fill="url(#colorExpense)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
