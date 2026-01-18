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
        <div className="bg-white rounded-[24px] md:rounded-[32px] p-6 md:p-8 flex flex-col justify-between min-h-[160px] md:min-h-[220px] shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
                <span className="text-xs md:text-sm font-bold text-gray-900">
                    {title}
                </span>
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center ${isIncome ? 'bg-gray-100' : 'bg-red-50'
                    }`}>
                    {isIncome ? (
                        <ArrowDownLeft size={16} className="text-gray-900 md:w-5 md:h-5" />
                    ) : (
                        <ArrowUpRight size={16} className="text-red-500 md:w-5 md:h-5" />
                    )}
                </div>
            </div>

            <div className="mt-auto">
                <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                    {formatCurrency(animatedAmount)}
                </h3>
            </div>
        </div>
    );
}
