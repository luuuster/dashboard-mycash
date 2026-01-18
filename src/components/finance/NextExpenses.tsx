import React from 'react';
import { Check, Plus } from 'lucide-react';

interface ExpenseItem {
    id: string;
    title: string;
    dueDate: string;
    cardName: string;
    cardNumber: string;
    value: number;
}

const mockNextExpenses: ExpenseItem[] = [
    { id: '1', title: 'Conta de Luz', dueDate: '21/01', cardName: 'Crédito Nubank', cardNumber: '5897', value: 154.00 },
    { id: '2', title: 'Conta de Luz', dueDate: '21/01', cardName: 'Crédito Nubank', cardNumber: '5897', value: 154.00 },
    { id: '3', title: 'Conta de Luz', dueDate: '21/01', cardName: 'Crédito Nubank', cardNumber: '5897', value: 154.00 },
    { id: '4', title: 'Conta de Luz', dueDate: '21/01', cardName: 'Crédito Nubank', cardNumber: '5897', value: 154.00 },
    { id: '5', title: 'Conta de Luz', dueDate: '21/01', cardName: 'Crédito Nubank', cardNumber: '5897', value: 154.00 },
];

export const NextExpenses: React.FC = () => {
    return (
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm shadow-black/5 flex flex-col h-full">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                    <span className="p-2 bg-gray-50 rounded-lg">
                        <Plus className="w-5 h-5 text-gray-400" />
                    </span>
                    <h3 className="font-bold text-lg text-black">Próximas despesas</h3>
                </div>
                <button className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                    <Plus className="w-5 h-5 text-gray-400" />
                </button>
            </div>

            <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar">
                {mockNextExpenses.map((expense, idx) => (
                    <div key={idx} className="flex items-center justify-between group">
                        <div className="flex flex-col">
                            <span className="font-bold text-black">{expense.title}</span>
                            <span className="text-xs text-gray-400 font-medium">Vence dia {expense.dueDate}</span>
                            <span className="text-[10px] text-gray-300 font-bold uppercase mt-1">{expense.cardName} **** {expense.cardNumber}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="font-bold text-black whitespace-nowrap">
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(expense.value)}
                            </span>
                            <button className="w-6 h-6 rounded-full border border-primary-val/20 bg-primary-val/10 flex items-center justify-center group-hover:bg-primary-val transition-all">
                                <Check className="w-3.5 h-3.5 text-primary-val group-hover:text-black transition-colors" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
