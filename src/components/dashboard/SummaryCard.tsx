import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { useCountUp } from '../../hooks/useCountUp';

interface SummaryCardProps {
    title: string;
    amount: number;
    type: 'income' | 'expense';
}

export default function SummaryCard({ title, amount, type }: SummaryCardProps) {
    const animatedAmount = useCountUp(amount);

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    };

    const isIncome = type === 'income';

    return (
        <div className="bg-surface border border-border rounded-[32px] p-8 flex flex-col justify-between min-h-[200px] shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
                <span className={`text-sm font-bold ${isIncome ? 'text-text-primary' : 'text-gray-500'}`}>
                    {title}
                </span>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isIncome ? 'bg-gray-100' : 'bg-red-50'
                    }`}>
                    {isIncome ? (
                        <ArrowDownLeft size={24} className="text-text-primary" />
                    ) : (
                        <ArrowUpRight size={24} className="text-red-500" />
                    )}
                </div>
            </div>

            <div className="mt-auto">
                <h3 className="text-2xl md:text-3xl font-bold text-text-primary tracking-tight">
                    {formatCurrency(animatedAmount)}
                </h3>
            </div>
        </div>
    );
}
