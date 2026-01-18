import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import { DollarSign, ArrowDown, ArrowUp } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface StatCardProps {
    label: string;
    value: number;
    type: 'balance' | 'income' | 'expense';
}

const StatCard: React.FC<StatCardProps> = ({ label, value, type }) => {
    const isBalance = type === 'balance';
    const isIncome = type === 'income';
    const isExpense = type === 'expense';

    const Icon = isIncome ? ArrowDown : isExpense ? ArrowUp : DollarSign;
    const iconColor = isIncome ? "text-primary-val" : isExpense ? "text-red-500" : "text-black";

    return (
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-50 flex flex-col gap-6 shadow-sm shadow-black/5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
                <Icon className={cn("w-6 h-6", iconColor)} />
                <span className="text-sm font-semibold text-gray-500">{label}</span>
            </div>
            <div>
                <p className={cn(
                    "text-3xl font-bold tracking-tight",
                    isBalance ? "text-primary-val" : "text-black"
                )}>
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)}
                </p>
            </div>
        </div>
    );
};

export const SummaryCards: React.FC = () => {
    const { totals } = useFinance();

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard label="Saldo total" value={totals.balance} type="balance" />
            <StatCard label="Receitas" value={totals.income} type="income" />
            <StatCard label="Despesas" value={totals.expenses} type="expense" />
        </div>
    );
};
