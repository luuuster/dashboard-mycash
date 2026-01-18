import React, { useState } from 'react';
import { X, DollarSign, Calendar, Tag, User } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';

interface NewTransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const NewTransactionModal: React.FC<NewTransactionModalProps> = ({ isOpen, onClose }) => {
    const { addTransaction, members } = useFinance();
    const [formData, setFormData] = useState({
        description: '',
        value: '',
        type: 'expense' as 'income' | 'expense',
        category: '',
        date: new Date().toISOString().split('T')[0],
        member: members[0]?.name || ''
    });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addTransaction({
            ...formData,
            value: Number(formData.value)
        });
        onClose();
        setFormData({
            description: '',
            value: '',
            type: 'expense',
            category: '',
            date: new Date().toISOString().split('T')[0],
            member: members[0]?.name || ''
        });
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-black">Nova Lançamento</h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Value & Type */}
                        <div className="flex gap-4">
                            <div className="flex-1 relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">R$</span>
                                <input
                                    required
                                    type="number"
                                    step="0.01"
                                    placeholder="0,00"
                                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-2xl font-bold text-black focus:outline-none focus:ring-2 focus:ring-primary-val/20"
                                    value={formData.value}
                                    onChange={e => setFormData({ ...formData, value: e.target.value })}
                                />
                            </div>
                            <div className="flex p-1 bg-gray-50 rounded-2xl border border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, type: 'income' })}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${formData.type === 'income' ? 'bg-primary-val text-black shadow-sm' : 'text-gray-400'}`}
                                >
                                    Entrada
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, type: 'expense' })}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${formData.type === 'expense' ? 'bg-red-500 text-white shadow-sm' : 'text-gray-400'}`}
                                >
                                    Saída
                                </button>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="relative">
                            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                required
                                type="text"
                                placeholder="Descrição (ex: Aluguel, Salário)"
                                className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-semibold text-black focus:outline-none focus:ring-2 focus:ring-primary-val/20"
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Category */}
                            <div className="relative">
                                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <select
                                    required
                                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3.5 pl-10 pr-4 text-sm font-semibold text-black focus:outline-none appearance-none"
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option value="" disabled>Categoria</option>
                                    <option value="Alimentação">Alimentação</option>
                                    <option value="Trabalho">Trabalho</option>
                                    <option value="Saúde">Saúde</option>
                                    <option value="Lazer">Lazer</option>
                                    <option value="Moradia">Moradia</option>
                                    <option value="Outros">Outros</option>
                                </select>
                            </div>

                            {/* Date */}
                            <div className="relative">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    required
                                    type="date"
                                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3.5 pl-10 pr-4 text-sm font-semibold text-black focus:outline-none appearance-none"
                                    value={formData.date}
                                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Member */}
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <select
                                required
                                className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3.5 pl-10 pr-4 text-sm font-semibold text-black focus:outline-none appearance-none"
                                value={formData.member}
                                onChange={e => setFormData({ ...formData, member: e.target.value })}
                            >
                                {members.map(m => (
                                    <option key={m.id} value={m.name}>{m.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-black text-white font-bold py-4 rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-black/10 text-lg"
                        >
                            Confirmar Lançamento
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
