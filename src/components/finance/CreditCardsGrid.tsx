import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import { CreditCard as CardIcon } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const CreditCardsGrid: React.FC = () => {
    const { cards } = useFinance();

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">Meus Cartões</h3>
                <button className="text-primary text-sm font-medium hover:underline">Ver todos</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cards.map((card) => (
                    <div
                        key={card.id}
                        className={cn(
                            "p-6 rounded-2xl border transition-all relative overflow-hidden group",
                            card.theme === 'black'
                                ? "bg-gradient-to-br from-gray-800 to-black border-border"
                                : "bg-primary border-primary/20"
                        )}
                    >
                        <div className="flex justify-between items-start relative z-10">
                            <div className={cn(
                                "p-2 rounded-lg",
                                card.theme === 'black' ? "bg-white/5" : "bg-black/10"
                            )}>
                                <CardIcon className={cn(
                                    "w-6 h-6",
                                    card.theme === 'black' ? "text-primary" : "text-black"
                                )} />
                            </div>
                            <span className={cn(
                                "text-xs font-bold uppercase tracking-widest",
                                card.theme === 'black' ? "text-gray-500" : "text-black/60"
                            )}>
                                Visa Infinite
                            </span>
                        </div>

                        <div className="mt-8 relative z-10">
                            <p className={cn(
                                "text-sm font-medium mb-1",
                                card.theme === 'black' ? "text-gray-400" : "text-black/60"
                            )}>
                                {card.name}
                            </p>
                            <p className={cn(
                                "text-xl font-bold tracking-tight",
                                card.theme === 'black' ? "text-white" : "text-black"
                            )}>
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(card.limit - card.used)}
                                <span className="text-xs ml-2 opacity-60">disponível</span>
                            </p>
                        </div>

                        <div className="mt-4 pt-4 border-t relative z-10" style={{ borderColor: card.theme === 'black' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}>
                            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tighter">
                                <span className={card.theme === 'black' ? "text-gray-500" : "text-black/40"}>Vencimento {card.due_date}/03</span>
                                <span className={card.theme === 'black' ? "text-primary" : "text-black"}>Ativo</span>
                            </div>
                        </div>

                        {/* Decorative circles */}
                        <div className={cn(
                            "absolute -right-4 -bottom-4 w-24 h-24 rounded-full opacity-10 blur-2xl",
                            card.theme === 'black' ? "bg-primary" : "bg-white"
                        )} />
                    </div>
                ))}
            </div>
        </div>
    );
};
