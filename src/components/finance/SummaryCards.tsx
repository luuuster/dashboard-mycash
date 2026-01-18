import React from 'react';
import { useFinance } from '../../context/FinanceContext';
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
    const isIncome = type === 'income';
    const isExpense = type === 'expense';

    return (
        <div className="bg-surface p-6 rounded-2xl border border-border flex flex-col justify-between h-32 hover:border-white/20 transition-all group">
            <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm font-medium">{label}</span>
                <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center border",
                    isIncome ? "bg-primary/10 border-primary/20" :
                        isExpense ? "bg-red-500/10 border-red-500/20" :
                            "bg-white/5 border-white/10"
                )}>
                    <div className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        isIncome ? "bg-primary shadow-[0_0_8px_rgba(189,255,0,0.5)]" :
                            isExpense ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" :
                                "bg-white"
                    )} />
                </div>
            </div>
            <span className={cn(
                "text-2xl lg:text-3xl font-bold tracking-tight",
                isIncome ? "text-primary" : isExpense ? "text-red-500" : "text-white"
            )}>
                {isIncome && "+ "}
                {isExpense && "- "}
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)}
            </span>
        </div>
    );
};

export const SummaryCards: React.FC = () => {
    const { totals } = useFinance();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            <StatCard label="Saldo Total" value={totals.balance} type="balance" />
            <StatCard label="Receitas" value={totals.income} type="income" />
            <StatCard label="Despesas" value={totals.expenses} type="expense" />
        </div>
    );
};
