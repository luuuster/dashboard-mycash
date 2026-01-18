import { FamilyMember } from '../../types';
import { Trash2, Edit2, TrendingDown, Wallet } from 'lucide-react';

interface MemberCardProps {
    member: FamilyMember;
    totalExpenses: number;
    contributionPercentage: number;
    onEdit?: (member: FamilyMember) => void;
    onDelete?: (id: string) => void;
}

export default function MemberCard({ member, totalExpenses, contributionPercentage, onEdit, onDelete }: MemberCardProps) {
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    return (
        <div className="bg-surface p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all duration-300 group relative overflow-hidden">
            {/* Decorative Background Blur */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-gray-100 rounded-full blur-3xl opacity-50 group-hover:bg-lime-100 transition-colors duration-500" />

            <div className="relative flex items-start justify-between">
                <div className="flex items-center gap-4">
                    <img
                        src={member.avatarUrl}
                        alt={member.name}
                        className="w-16 h-16 rounded-full object-cover border-4 border-background shadow-sm"
                    />
                    <div>
                        <h3 className="text-lg font-bold text-text-primary">{member.name}</h3>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {member.role}
                        </span>
                    </div>
                </div>

                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => onEdit?.(member)}
                        className="p-2 text-text-secondary hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                        title="Editar"
                    >
                        <Edit2 size={18} />
                    </button>
                    <button
                        onClick={() => onDelete?.(member.id)}
                        className="p-2 text-text-secondary hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remover"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>

            <div className="mt-6 space-y-4 relative">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 text-green-700 rounded-lg">
                            <Wallet size={18} />
                        </div>
                        <span className="text-sm font-medium text-text-secondary">Renda Mensal</span>
                    </div>
                    <span className="font-semibold text-green-700">{formatCurrency(member.monthlyIncome)}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-100 text-red-700 rounded-lg">
                            <TrendingDown size={18} />
                        </div>
                        <span className="text-sm font-medium text-text-secondary">Gastos (Mês)</span>
                    </div>
                    <span className="font-semibold text-text-primary">{formatCurrency(totalExpenses)}</span>
                </div>
            </div>

            <div className="mt-6">
                <div className="flex justify-between text-xs text-text-secondary mb-2">
                    <span>Contribuição nas despesas</span>
                    <span>{contributionPercentage.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div
                        className="bg-primary h-full rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${contributionPercentage}%` }}
                    />
                </div>
            </div>
        </div>
    );
}
