import { useState, useEffect } from 'react';
import { X, Calendar, ArrowUpCircle, ArrowDownCircle, Info } from 'lucide-react';
import { useFinance } from '../../contexts/FinanceContext';
import { TransactionType } from '../../types';

interface TransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function TransactionModal({ isOpen, onClose }: TransactionModalProps) {
    const { addTransaction, familyMembers, categories } = useFinance();

    const [type, setType] = useState<TransactionType>('expense');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [memberId, setMemberId] = useState('');
    const [isRecurring, setIsRecurring] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Reset form when modal opens
    useEffect(() => {
        if (isOpen) {
            setType('expense');
            setDescription('');
            setAmount('');
            setCategory('');
            setDate(new Date().toISOString().split('T')[0]);
            setMemberId('');
            setIsRecurring(false);
            setIsSubmitting(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!description || !amount || !category || !date) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        setIsSubmitting(true);
        try {
            await addTransaction({
                type,
                description,
                amount: parseFloat(amount),
                category,
                date: new Date(date),
                accountId: '1', // Default account for now
                memberId: memberId || null,
                status: 'completed',
                isRecurring,
                installments: 1,
                isPaid: true
            });
            onClose();
        } catch (error) {
            console.error('Erro ao salvar transação:', error);
            alert('Erro ao salvar transação. Tente novamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const filteredCategories = categories.filter(c => c.type === type);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-lg bg-surface rounded-[32px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                <div className="px-8 py-6 border-b border-border flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-text-primary">Nova Transação</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X size={24} className="text-text-secondary" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-6">
                    {/* Type Toggle */}
                    <div className="flex bg-gray-50 p-1 rounded-2xl">
                        <button
                            type="button"
                            onClick={() => setType('expense')}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${type === 'expense'
                                ? 'bg-white text-red-500 shadow-sm'
                                : 'text-text-secondary hover:text-text-primary'
                                }`}
                        >
                            <ArrowDownCircle size={20} />
                            Despesa
                        </button>
                        <button
                            type="button"
                            onClick={() => setType('income')}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${type === 'income'
                                ? 'bg-white text-primary shadow-sm'
                                : 'text-text-secondary hover:text-text-primary'
                                }`}
                        >
                            <ArrowUpCircle size={20} />
                            Receita
                        </button>
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-text-secondary ml-1">Descrição</label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Ex: Aluguel, Supermercado..."
                            className="w-full px-5 py-4 bg-gray-50 border border-transparent focus:border-primary focus:bg-white rounded-2xl outline-none transition-all"
                            required
                        />
                    </div>

                    {/* Amount & Date */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-text-secondary ml-1">Valor (R$)</label>
                            <input
                                type="number"
                                step="0.01"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0,00"
                                className="w-full px-5 py-4 bg-gray-50 border border-transparent focus:border-primary focus:bg-white rounded-2xl outline-none transition-all"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-text-secondary ml-1">Data</label>
                            <div className="relative">
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full px-5 py-4 bg-gray-50 border border-transparent focus:border-primary focus:bg-white rounded-2xl outline-none transition-all appearance-none"
                                    required
                                />
                                <Calendar size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Category & Member */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-text-secondary ml-1">Categoria</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-5 py-4 bg-gray-50 border border-transparent focus:border-primary focus:bg-white rounded-2xl outline-none transition-all"
                                required
                            >
                                <option value="">Selecionar...</option>
                                {filteredCategories.map(cat => (
                                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-text-secondary ml-1">Membro</label>
                            <select
                                value={memberId}
                                onChange={(e) => setMemberId(e.target.value)}
                                className="w-full px-5 py-4 bg-gray-50 border border-transparent focus:border-primary focus:bg-white rounded-2xl outline-none transition-all"
                            >
                                <option value="">Eu (Geral)</option>
                                {familyMembers.map(member => (
                                    <option key={member.id} value={member.id}>{member.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Recurring Check */}
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${isRecurring ? 'bg-primary border-primary' : 'border-border group-hover:border-primary'
                            }`}>
                            {isRecurring && <X size={16} className="text-white rotate-45" />}
                        </div>
                        <input
                            type="checkbox"
                            className="hidden"
                            checked={isRecurring}
                            onChange={() => setIsRecurring(!isRecurring)}
                        />
                        <span className="text-sm font-medium text-text-secondary">Transação recorrente mensal</span>
                        <Info size={14} className="text-gray-400" />
                    </label>

                    <div className="flex gap-4 mt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-4 font-bold text-text-secondary hover:bg-gray-100 rounded-2xl transition-all"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`flex-1 py-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-2xl shadow-lg shadow-primary/20 transition-all ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isSubmitting ? 'Salvando...' : 'Confirmar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
