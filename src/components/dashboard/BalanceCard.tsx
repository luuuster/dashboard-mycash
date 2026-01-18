import { TrendingUp } from 'lucide-react';
import { useCountUp } from '../../hooks/useCountUp';

interface BalanceCardProps {
    amount: number;
    growth: number;
}

export default function BalanceCard({ amount, growth }: BalanceCardProps) {
    const animatedAmount = useCountUp(amount);

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    };

    return (
        <div className="relative bg-[#111827] rounded-[24px] md:rounded-[32px] p-6 md:p-8 overflow-hidden flex flex-col justify-between min-h-[180px] md:min-h-[220px] shadow-xl group hover:scale-[1.01] transition-transform duration-300">

            <div className="relative z-10">
                <span className="text-gray-400 text-xs md:text-sm font-medium tracking-wide">Saldo Total</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2 tracking-tight">
                    {formatCurrency(animatedAmount)}
                </h2>
            </div>

            <div className="relative z-10 mt-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#1F2937] rounded-full border border-white/5">
                    <TrendingUp size={14} className="text-lime-500" />
                    <span className="text-xs font-bold text-white">+{growth}% esse mês</span>
                </div>
            </div>
        </div>
    );
}
