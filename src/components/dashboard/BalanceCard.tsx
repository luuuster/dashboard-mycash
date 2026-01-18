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
        <div className="relative bg-[#080B12] rounded-[32px] p-8 overflow-hidden flex flex-col justify-between min-h-[200px] shadow-2xl">
            {/* Decorative Blur Circle */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 blur-[80px] rounded-full pointer-events-none" />

            <div className="relative z-10">
                <span className="text-gray-400 text-sm font-medium">Saldo Total</span>
                <h2 className="text-4xl md:text-5xl font-bold text-white mt-1 tracking-tight">
                    {formatCurrency(animatedAmount)}
                </h2>
            </div>

            <div className="relative z-10 mt-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
                    <TrendingUp size={16} className="text-primary" />
                    <span className="text-sm font-medium text-white">+{growth}% esse mês</span>
                </div>
            </div>
        </div>
    );
}
