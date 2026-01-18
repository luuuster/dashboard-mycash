import { useState, useEffect } from 'react';
import { X, User, Check, Palette } from 'lucide-react';
import { FamilyMember } from '../../types';

interface AddMemberModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (member: Omit<FamilyMember, 'id'>) => void;
    memberToEdit?: FamilyMember | null;
}

const AVATAR_COLORS = ['84CC16', '3B82F6', 'F59E0B', 'EF4444', '8B5CF6', '10B981'];

export default function AddMemberModal({ isOpen, onClose, onSave, memberToEdit }: AddMemberModalProps) {
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [income, setIncome] = useState('');
    const [selectedColor, setSelectedColor] = useState(AVATAR_COLORS[0]);

    useEffect(() => {
        if (memberToEdit) {
            setName(memberToEdit.name);
            setRole(memberToEdit.role);
            setIncome(memberToEdit.monthlyIncome.toString());
            // Extract color from avatar URL if possible, or default
        } else {
            setName('');
            setRole('');
            setIncome('');
            setSelectedColor(AVATAR_COLORS[0]);
        }
    }, [memberToEdit, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Generate a simple avatar URL based on name and color
        const encodedName = encodeURIComponent(name);
        const avatarUrl = `https://ui-avatars.com/api/?name=${encodedName}&background=${selectedColor}&color=fff`;

        onSave({
            name,
            role,
            monthlyIncome: Number(income) || 0,
            avatarUrl
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity animate-fade-in">
            <div className="bg-surface w-full max-w-md rounded-2xl shadow-2xl border border-border overflow-hidden animate-scale-in">
                <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-gray-50/50">
                    <h2 className="text-xl font-bold text-text-primary">
                        {memberToEdit ? 'Editar Membro' : 'Novo Membro'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-text-secondary hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Avatar Preview */}
                    <div className="flex justify-center">
                        <div className="relative group">
                            <img
                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'Novo Membro')}&background=${selectedColor}&color=fff`}
                                alt="Preview"
                                className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
                            />
                            <div className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md border border-gray-100">
                                <Palette size={16} className="text-gray-500" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1">Nome</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Ex: Ana Clara"
                                    className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-primary"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1">Papel na Família</label>
                            <select
                                required
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full px-4 py-2 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-primary appearance-none"
                            >
                                <option value="" disabled>Selecione...</option>
                                <option value="Pai">Pai</option>
                                <option value="Mãe">Mãe</option>
                                <option value="Filho">Filho(a)</option>
                                <option value="Outro">Outro</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1">Renda Mensal (Estimada)</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">R$</span>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={income}
                                    onChange={(e) => setIncome(e.target.value)}
                                    placeholder="0,00"
                                    className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-primary"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-2">Cor do Avatar</label>
                            <div className="flex flex-wrap gap-3 justify-center">
                                {AVATAR_COLORS.map(color => (
                                    <button
                                        key={color}
                                        type="button"
                                        onClick={() => setSelectedColor(color)}
                                        className={`w-8 h-8 rounded-full transition-transform hover:scale-110 focus:outline-none ring-2 ring-offset-2 ${selectedColor === color ? 'ring-primary scale-110' : 'ring-transparent'}`}
                                        style={{ backgroundColor: `#${color}` }}
                                    >
                                        {selectedColor === color && <Check size={14} className="text-white mx-auto" />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="pt-2 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-2.5 bg-primary text-white rounded-xl hover:bg-lime-600 transition-colors font-medium shadow-lg shadow-lime-500/20"
                        >
                            Salvar Membro
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
