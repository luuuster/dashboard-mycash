import { Check } from 'lucide-react';
import { useFinance } from '../../contexts/FinanceContext';

export default function MemberWidget() {
    const { familyMembers, filters, setSelectedMember } = useFinance();

    return (
        <div className="flex items-center">
            <div className="flex -space-x-3 overflow-hidden p-1">
                {familyMembers.map((member) => {
                    const isSelected = filters.selectedMember === member.id;
                    return (
                        <button
                            key={member.id}
                            onClick={() => setSelectedMember(isSelected ? null : member.id)}
                            className={`relative inline-block h-10 w-10 rounded-full ring-2 transition-all duration-200 hover:scale-110 hover:z-10 group overflow-hidden ${isSelected ? 'ring-text-primary scale-110 z-10' : 'ring-surface'
                                }`}
                            title={member.name}
                        >
                            <img
                                className="h-full w-full object-cover"
                                src={member.avatarUrl}
                                alt={member.name}
                            />
                            {isSelected && (
                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                    <div className="bg-primary rounded-full p-0.5">
                                        <Check size={12} className="text-white" strokeWidth={4} />
                                    </div>
                                </div>
                            )}
                        </button>
                    );
                })}
                <button
                    className="relative inline-block h-10 w-10 rounded-full ring-2 ring-surface bg-gray-50 flex items-center justify-center text-text-secondary hover:bg-gray-100 transition-colors"
                    title="Adicionar Membro"
                >
                    <span className="text-xl">+</span>
                </button>
            </div>
        </div>
    );
}
