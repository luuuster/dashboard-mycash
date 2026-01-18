import React, { useMemo } from 'react';
import { useFinance } from '../../context/FinanceContext';

interface CategoryMetricProps {
    label: string;
    value: number;
    percentage: number;
}

const CategoryMetric: React.FC<CategoryMetricProps> = ({ label, value, percentage }) => {
    // SVG Circle calculations
    const radius = 35;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="bg-white p-6 rounded-[2.5rem] border border-gray-50 flex flex-col items-center justify-center text-center shadow-sm shadow-black/5 hover:shadow-md transition-shadow h-full">
            <div className="relative w-20 h-20 flex items-center justify-center mb-4">
                {/* Background Circle */}
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx="40"
                        cy="40"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="6"
                        fill="transparent"
                        className="text-gray-50"
                    />
                    {/* Progress Circle */}
                    <circle
                        cx="40"
                        cy="40"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="6"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={isNaN(offset) ? circumference : offset}
                        strokeLinecap="round"
                        className="text-primary-val transition-all duration-1000 ease-out"
                    />
                </svg>
                <span className="absolute text-[10px] font-bold text-gray-500">{Math.round(percentage)}%</span>
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
            <p className="text-sm font-bold text-black">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)}
            </p>
        </div>
    );
};

export const CategoryMetricsGrid: React.FC = () => {
    const { transactions, totals } = useFinance();

    const categories = useMemo(() => {
        const expenseTransactions = transactions.filter(t => t.type === 'expense');
        const catMap: Record<string, number> = {};

        expenseTransactions.forEach(t => {
            catMap[t.category] = (catMap[t.category] || 0) + t.value;
        });

        return Object.entries(catMap)
            .map(([label, value]) => ({
                label,
                value,
                percentage: totals.expenses > 0 ? (value / totals.expenses) * 100 : 0
            }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 4);
    }, [transactions, totals.expenses]);

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {categories.map((cat) => (
                <CategoryMetric key={cat.label} {...cat} />
            ))}
            {categories.length === 0 && (
                <div className="col-span-4 py-12 text-center text-gray-400 font-bold uppercase text-xs tracking-widest bg-white rounded-[2.5rem] border border-gray-50">
                    Nenhuma despesa para este período
                </div>
            )}
        </div>
    );
};
