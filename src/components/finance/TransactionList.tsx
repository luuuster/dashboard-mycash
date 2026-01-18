import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const TransactionList: React.FC = () => {
    const { transactions } = useFinance();

    return (
        <div className="w-full bg-surface border border-border rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-border flex items-center justify-between">
                <h3 className="font-bold text-lg">Últimas Transações</h3>
                <button className="text-primary text-sm font-medium hover:underline">Ver todas</button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-black/20 text-gray-500 text-xs uppercase tracking-wider">
                            <th className="px-6 py-4 font-semibold">Descrição</th>
                            <th className="px-6 py-4 font-semibold">Membro</th>
                            <th className="px-6 py-4 font-semibold">Categoria</th>
                            <th className="px-6 py-4 font-semibold text-right">Valor</th>
                            <th className="px-6 py-4 font-semibold text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {transactions.map((t) => (
                            <tr key={t.id} className="hover:bg-white/5 transition-colors group">
                                <td className="px-6 py-4">
                                    <p className="font-medium text-white">{t.description}</p>
                                    <p className="text-xs text-gray-500">{new Date(t.date).toLocaleDateString('pt-BR')}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                                            <span className="text-[10px] text-primary font-bold">
                                                {t.member.charAt(0)}
                                            </span>
                                        </div>
                                        <span className="text-sm text-gray-300">{t.member}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 bg-black rounded-full text-xs text-gray-400 border border-border">
                                        {t.category}
                                    </span>
                                </td>
                                <td className={cn(
                                    "px-6 py-4 text-right font-bold text-sm",
                                    t.type === 'income' ? "text-primary" : "text-white"
                                )}>
                                    {t.type === 'income' ? '+ ' : '- '}
                                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(t.value)}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className={cn(
                                        "inline-block w-2 h-2 rounded-full",
                                        t.status === 'completed' ? "bg-primary" : "bg-yellow-500"
                                    )} title={t.status} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
