import { useState } from 'react';
import { useFinance } from '../contexts/FinanceContext';
import MemberCard from '../components/members/MemberCard';
import AddMemberModal from '../components/members/AddMemberModal';
import { Plus } from 'lucide-react';

export default function Members() {
    const { familyMembers, transactions, addFamilyMember } = useFinance();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Calculate totals for the current month
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const currentMonthTransactions = transactions.filter(t => {
        const tDate = new Date(t.date);
        return tDate.getMonth() === currentMonth &&
            tDate.getFullYear() === currentYear &&
            t.type === 'expense';
    });

    const totalExpenses = currentMonthTransactions.reduce((sum, t) => sum + t.amount, 0);

    const getMemberExpenses = (memberId: string) => {
        return currentMonthTransactions
            .filter(t => t.memberId === memberId)
            .reduce((sum, t) => sum + t.amount, 0);
    };

    const handleSaveMember = async (memberData: any) => {
        await addFamilyMember(memberData);
        setIsAddModalOpen(false);
    };

    return (
        <div className="flex flex-col gap-8 max-w-dashboard mx-auto p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-text-primary">Membros da Família</h1>
                    <p className="text-text-secondary">Gerencie os membros e visualize seus gastos individuais.</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center justify-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl hover:bg-lime-600 transition-colors shadow-lg shadow-lime-500/20 font-medium active:scale-95"
                >
                    <Plus size={20} />
                    <span>Novo Membro</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {familyMembers.map(member => {
                    const expenses = getMemberExpenses(member.id);
                    const percentage = totalExpenses > 0 ? (expenses / totalExpenses) * 100 : 0;

                    return (
                        <MemberCard
                            key={member.id}
                            member={member}
                            totalExpenses={expenses}
                            contributionPercentage={percentage}
                            onEdit={(m) => console.log('Edit', m)}
                            onDelete={(id) => console.log('Delete', id)}
                        />
                    );
                })}

                {/* Card de Adicionar (Empty State lookalike) */}
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex flex-col items-center justify-center gap-4 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-6 min-h-[300px] hover:border-primary hover:bg-lime-50/30 transition-all duration-300 group text-text-secondary hover:text-primary cursor-pointer"
                >
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                        <Plus size={32} className="text-gray-400 group-hover:text-primary transition-colors" />
                    </div>
                    <span className="font-medium">Adicionar novo membro</span>
                </button>
            </div>

            <AddMemberModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSave={handleSaveMember}
            />
        </div>
    );
}
