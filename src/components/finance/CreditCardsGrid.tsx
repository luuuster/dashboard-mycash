import React from 'react';
import { Plus, ChevronRight, CreditCard } from 'lucide-react';

export const CreditCardsGrid: React.FC = () => {

    const mockAccounts = [
        { id: '1', name: 'Nubank', value: 120.00, dueDay: 10, number: '5897', theme: 'purple' },
        { id: '2', name: 'Inter', value: 2300.00, dueDay: 21, number: '5897', theme: 'orange' },
        { id: '3', name: 'Picpay', value: 17000.00, dueDay: 12, number: '5897', theme: 'green' },
    ];

    return (
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm shadow-black/5 flex flex-col">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <span className="p-2 bg-gray-50 rounded-lg">
                        <CreditCard className="w-5 h-5 text-gray-400" />
                    </span>
                    <h3 className="font-bold text-lg text-black">Cards & contas</h3>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                        <Plus className="w-5 h-5 text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                </div>
            </div>

            <div className="space-y-6">
                {mockAccounts.map((acc) => (
                    <div key={acc.id} className="flex items-center justify-between group cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center",
                                acc.theme === 'purple' ? "bg-purple-100 text-purple-600" :
                                    acc.theme === 'orange' ? "bg-orange-100 text-orange-600" :
                                        "bg-green-100 text-green-600"
                            )}>
                                <CreditCard className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-black">{acc.name}</span>
                                <span className="text-[10px] font-bold text-gray-400 uppercase">Vence dia {acc.dueDay}</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-sm font-bold text-black">
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(acc.value)}
                            </span>
                            <span className="text-[10px] font-bold text-gray-300">**** {acc.number}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
