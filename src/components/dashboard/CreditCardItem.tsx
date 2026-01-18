import { Wifi } from 'lucide-react';

interface CreditCardItemProps {
    name: string;
    limit: number;
    currentBill: number;
    lastDigits: string;
    theme: 'black' | 'lime' | 'white' | string;
    bankName: string;
}

export default function CreditCardItem({ name, limit, currentBill, lastDigits, theme, bankName }: CreditCardItemProps) {
    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    };

    const getThemeStyles = () => {
        switch (theme) {
            case 'black':
                return 'bg-gradient-to-br from-[#1C1C1C] to-[#080B12] text-white';
            case 'lime':
                return 'bg-gradient-to-br from-[#84CC16] to-[#4D7C0F] text-white';
            case 'white':
                return 'bg-gradient-to-br from-white to-[#F8FAFC] text-text-primary border border-border';
            default:
                // Default to a dark theme
                return 'bg-[#080B12] text-white';
        }
    };

    const availableLimit = limit - currentBill;
    const progress = (currentBill / limit) * 100;

    return (
        <div className={`flex-shrink-0 w-80 h-48 rounded-[32px] p-6 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:scale-[1.02] transition-transform ${getThemeStyles()}`}>
            {/* Decorative blobs for cards */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 blur-3xl rounded-full" />

            <div className="flex justify-between items-start relative z-10">
                <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">{bankName}</span>
                    <span className="text-sm font-bold mt-1">{name}</span>
                </div>
                <Wifi size={20} className="rotate-90 opacity-40" />
            </div>

            <div className="relative z-10">
                <div className="flex items-center gap-1 opacity-80 mb-1">
                    <span className="text-[10px] font-medium">•••• •••• ••••</span>
                    <span className="text-xs font-bold">{lastDigits}</span>
                </div>

                <div className="mt-4">
                    <div className="flex justify-between items-end mb-1">
                        <div>
                            <p className="text-[10px] font-medium opacity-60">Fatura Atual</p>
                            <p className="text-lg font-bold">{formatCurrency(currentBill)}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-medium opacity-60">Limite Disp.</p>
                            <p className="text-sm font-bold">{formatCurrency(availableLimit)}</p>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-black/10 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all duration-1000 ${theme === 'white' ? 'bg-primary' : 'bg-white'
                                }`}
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
