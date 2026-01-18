import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import {
    Transaction,
    Goal,
    CreditCard,
    BankAccount,
    FamilyMember,
    Category,
    GlobalFilters,
    DateRange,
    TransactionType
} from '../types';

interface FinanceContextType {
    transactions: Transaction[];
    goals: Goal[];
    creditCards: CreditCard[];
    bankAccounts: BankAccount[];
    familyMembers: FamilyMember[];
    categories: Category[];
    filters: GlobalFilters;
    loading: boolean;
    addTransaction: (transaction: Omit<Transaction, 'id'>) => Promise<void>;
    updateTransaction: (id: string, transaction: Partial<Transaction>) => Promise<void>;
    deleteTransaction: (id: string) => Promise<void>;
    addGoal: (goal: Omit<Goal, 'id'>) => Promise<void>;
    addCreditCard: (card: Omit<CreditCard, 'id'>) => Promise<void>;
    addBankAccount: (account: Omit<BankAccount, 'id'>) => Promise<void>;
    addFamilyMember: (member: Omit<FamilyMember, 'id'>) => Promise<void>;
    setSelectedMember: (memberId: string | null) => void;
    setDateRange: (range: DateRange | null) => void;
    setTransactionType: (type: 'all' | TransactionType) => void;
    setSearchText: (text: string) => void;
    refreshData: () => Promise<void>;
    getFilteredTransactions: () => Transaction[];
    calculateTotalBalance: () => number;
    calculateIncomeForPeriod: () => number;
    calculateExpensesForPeriod: () => number;
    calculateExpensesByCategory: () => Array<{ category: string; value: number; percentage: number }>;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

// Advanced Mock Data - Fallback
const mockMembers: FamilyMember[] = [
    { id: '1', name: 'Franklin Vieira', role: 'Pai', avatarUrl: 'https://ui-avatars.com/api/?name=Franklin+V&background=84CC16&color=fff', monthlyIncome: 12000 },
    { id: '2', name: 'Maria Silva', role: 'Mãe', avatarUrl: 'https://ui-avatars.com/api/?name=Maria+S&background=080B12&color=fff', monthlyIncome: 8500 },
    { id: '3', name: 'João Vieira', role: 'Filho', avatarUrl: 'https://ui-avatars.com/api/?name=Joao+V&background=E5E7EB&color=080B12', monthlyIncome: 0 },
];

const mockCategories: Category[] = [
    { id: '1', name: 'Salário', color: '#84CC16', type: 'income' },
    { id: '2', name: 'Investimentos', color: '#A3E635', type: 'income' },
    { id: '3', name: 'Freelance', color: '#D1D5DB', type: 'income' },
    { id: '4', name: 'Alimentação', color: '#EF4444', type: 'expense' },
    { id: '5', name: 'Habitação', color: '#3B82F6', type: 'expense' },
    { id: '6', name: 'Transporte', color: '#F59E0B', type: 'expense' },
    { id: '7', name: 'Lazer', color: '#8B5CF6', type: 'expense' },
    { id: '8', name: 'Saúde', color: '#10B981', type: 'expense' },
    { id: '9', name: 'Educação', color: '#6366F1', type: 'expense' },
];

const mockAccounts: BankAccount[] = [
    { id: 'acc1', name: 'Nubank Conta', type: 'checking', balance: 4500.50, color: '#8A05BE', holderId: '1' },
    { id: 'acc2', name: 'Itaú Personalité', type: 'checking', balance: 12800.00, color: '#EC7000', holderId: '1' },
    { id: 'acc3', name: 'XP Investimentos', type: 'savings', balance: 45000.00, color: '#000000', holderId: '1' },
];

const mockCards: CreditCard[] = [
    { id: 'card1', name: 'Nubank Ultravioleta', closingDay: 15, dueDay: 22, limit: 15000, currentBill: 3450.80, theme: 'black', lastDigits: '5897', holderId: '1' },
    { id: 'card2', name: 'Itaú Visa Infinite', closingDay: 10, dueDay: 17, limit: 25000, currentBill: 1200.50, theme: 'lime', lastDigits: '1234', holderId: '2' },
    { id: 'card3', name: 'Inter Mastercard', closingDay: 5, dueDay: 12, limit: 5000, currentBill: 450.00, theme: 'white', lastDigits: '9988', holderId: '1' },
];

const generateMockTransactions = (): Transaction[] => {
    const transactions: Transaction[] = [];
    const now = new Date();
    transactions.push({ id: 't1', type: 'income', amount: 12000, description: 'Salário Franklin', category: 'Salário', date: new Date(now.getFullYear(), now.getMonth(), 5), accountId: 'acc2', memberId: '1', installments: 1, status: 'completed', isRecurring: true, isPaid: true });
    transactions.push({ id: 't2', type: 'income', amount: 8500, description: 'Salário Maria', category: 'Salário', date: new Date(now.getFullYear(), now.getMonth(), 5), accountId: 'acc1', memberId: '2', installments: 1, status: 'completed', isRecurring: true, isPaid: true });
    const expenseData = [
        { desc: 'Supermercado Pão de Açúcar', cat: 'Alimentação', val: 450.80, day: 2, acc: 'card1', member: '2' },
        { desc: 'Aluguel Apartamento', cat: 'Habitação', val: 3500, day: 10, acc: 'acc2', member: '1' },
        { desc: 'Posto Shell', cat: 'Transporte', val: 280, day: 12, acc: 'card2', member: '1' },
        { desc: 'Restaurante Coco Bambu', cat: 'Alimentação', val: 320, day: 15, acc: 'card1', member: '1' },
        { desc: 'Farmácia Raia', cat: 'Saúde', val: 125.50, day: 18, acc: 'acc1', member: '2' },
        { desc: 'Netflix', cat: 'Lazer', val: 55.90, day: 20, acc: 'card1', member: null },
        { desc: 'iFood', cat: 'Alimentação', val: 89, day: 21, acc: 'card1', member: '3' },
        { desc: 'Academia', cat: 'Saúde', val: 150, day: 5, acc: 'acc1', member: '1' },
        { desc: 'Energia Enel', cat: 'Habitação', val: 245.30, day: 15, acc: 'acc2', member: null },
        { desc: 'Internet Vivo', cat: 'Habitação', val: 120, day: 10, acc: 'acc2', member: null },
        { desc: 'Uber Viagem', cat: 'Transporte', val: 45.20, day: 22, acc: 'card2', member: '3' },
        { desc: 'Amazon Compra', cat: 'Lazer', val: 299.90, day: 23, acc: 'card1', member: '1' },
        { desc: 'Padaria Real', cat: 'Alimentação', val: 42.50, day: 24, acc: 'acc1', member: '2' },
        { desc: 'Spotify', cat: 'Lazer', val: 34.90, day: 25, acc: 'card3', member: '3' },
        { desc: 'Escola João', cat: 'Educação', val: 1800, day: 1, acc: 'acc2', member: '1' },
    ];
    expenseData.forEach((ex, i) => {
        transactions.push({
            id: `te${i}`,
            type: 'expense',
            amount: ex.val,
            description: ex.desc,
            category: ex.cat,
            date: new Date(now.getFullYear(), now.getMonth(), ex.day),
            accountId: ex.acc,
            memberId: ex.member,
            installments: 1,
            status: 'completed',
            isRecurring: ex.day === 10 || ex.day === 20,
            isPaid: true
        });
    });
    return transactions;
};

const mockTransactions = generateMockTransactions();
const mockGoals: Goal[] = [
    { id: 'g1', name: 'Reserva de Emergência', targetAmount: 50000, currentAmount: 32500, deadline: new Date(2026, 11, 31), color: '#84CC16', memberId: '1' },
    { id: 'g2', name: 'Viagem Disney', targetAmount: 25000, currentAmount: 8400, deadline: new Date(2026, 6, 15), color: '#3B82F6', memberId: null },
    { id: 'g3', name: 'Novo iPhone 16', targetAmount: 8500, currentAmount: 2100, deadline: new Date(2026, 9, 20), color: '#F59E0B', memberId: '3' },
];

export function FinanceProvider({ children }: { children: ReactNode }) {
    const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
    const [goals, setGoals] = useState<Goal[]>(mockGoals);
    const [creditCards, setCreditCards] = useState<CreditCard[]>(mockCards);
    const [bankAccounts, setBankAccounts] = useState<BankAccount[]>(mockAccounts);
    const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(mockMembers);
    const [categories, setCategories] = useState<Category[]>(mockCategories);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState<GlobalFilters>({
        selectedMember: null,
        dateRange: null,
        transactionType: 'all',
        searchText: '',
    });

    const refreshData = async () => {
        setLoading(true);
        try {
            const [
                { data: txs },
                { data: gs },
                { data: cards },
                { data: accs },
                { data: members },
                { data: cats }
            ] = await Promise.all([
                supabase.from('transactions').select('*').order('date', { ascending: false }),
                supabase.from('goals').select('*'),
                supabase.from('credit_cards').select('*'),
                supabase.from('bank_accounts').select('*'),
                supabase.from('family_members').select('*'),
                supabase.from('categories').select('*')
            ]);

            if (txs && txs.length > 0) setTransactions(txs as Transaction[]);
            if (gs && gs.length > 0) setGoals(gs as Goal[]);
            if (cards && cards.length > 0) setCreditCards(cards as CreditCard[]);
            if (accs && accs.length > 0) setBankAccounts(accs as BankAccount[]);
            if (members && members.length > 0) setFamilyMembers(members as FamilyMember[]);
            if (cats && cats.length > 0) setCategories(cats as Category[]);
        } catch (error) {
            console.error('Erro ao buscar dados do Supabase:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshData();
    }, []);

    const addTransaction = async (transaction: Omit<Transaction, 'id'>) => {
        const { data, error } = await supabase.from('transactions').insert([transaction]).select();
        if (error) {
            console.error('Erro ao adicionar transação:', error);
            // Fallback: adicionar localmente com ID temporário
            setTransactions(prev => [{ ...transaction, id: crypto.randomUUID() }, ...prev]);
        } else if (data) {
            setTransactions(prev => [data[0] as Transaction, ...prev]);
        }
    };

    const updateTransaction = async (id: string, updates: Partial<Transaction>) => {
        const { error } = await supabase.from('transactions').update(updates).eq('id', id);
        if (error) {
            console.error('Erro ao atualizar transação:', error);
        }
        setTransactions(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
    };

    const deleteTransaction = async (id: string) => {
        const { error } = await supabase.from('transactions').delete().eq('id', id);
        if (error) {
            console.error('Erro ao deletar transação:', error);
        }
        setTransactions(prev => prev.filter(t => t.id !== id));
    };

    const addGoal = async (goal: Omit<Goal, 'id'>) => {
        const { data, error } = await supabase.from('goals').insert([goal]).select();
        if (error) console.error('Erro ao adicionar meta:', error);
        else if (data) setGoals(prev => [...prev, data[0] as Goal]);
    };

    const addCreditCard = async (card: Omit<CreditCard, 'id'>) => {
        const { data, error } = await supabase.from('credit_cards').insert([card]).select();
        if (error) console.error('Erro ao adicionar cartão:', error);
        else if (data) setCreditCards(prev => [...prev, data[0] as CreditCard]);
    };

    const addBankAccount = async (account: Omit<BankAccount, 'id'>) => {
        const { data, error } = await supabase.from('bank_accounts').insert([account]).select();
        if (error) console.error('Erro ao adicionar conta:', error);
        else if (data) setBankAccounts(prev => [...prev, data[0] as BankAccount]);
    };

    const addFamilyMember = async (member: Omit<FamilyMember, 'id'>) => {
        const { data, error } = await supabase.from('family_members').insert([member]).select();
        if (error) console.error('Erro ao adicionar membro:', error);
        else if (data) setFamilyMembers(prev => [...prev, data[0] as FamilyMember]);
    };

    const setSelectedMember = (memberId: string | null) => setFilters(prev => ({ ...prev, selectedMember: memberId }));
    const setDateRange = (range: DateRange | null) => setFilters(prev => ({ ...prev, dateRange: range }));
    const setTransactionType = (type: 'all' | TransactionType) => setFilters(prev => ({ ...prev, transactionType: type }));
    const setSearchText = (text: string) => setFilters(prev => ({ ...prev, searchText: text }));

    const getFilteredTransactions = (): Transaction[] => {
        return transactions.filter(t => {
            if (filters.transactionType !== 'all' && t.type !== filters.transactionType) return false;
            if (filters.selectedMember && t.memberId !== filters.selectedMember) return false;
            if (filters.dateRange) {
                const tDate = new Date(t.date);
                if (tDate < filters.dateRange.startDate || tDate > filters.dateRange.endDate) return false;
            }
            if (filters.searchText) {
                const search = filters.searchText.toLowerCase();
                return t.description.toLowerCase().includes(search) || t.category.toLowerCase().includes(search);
            }
            return true;
        }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    };

    const calculateTotalBalance = () => bankAccounts.reduce((sum, acc) => sum + acc.balance, 0) - creditCards.reduce((sum, card) => sum + card.currentBill, 0);
    const calculateIncomeForPeriod = () => getFilteredTransactions().filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const calculateExpensesForPeriod = () => getFilteredTransactions().filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

    const calculateExpensesByCategory = () => {
        const filtered = getFilteredTransactions().filter(t => t.type === 'expense');
        const totalExpense = filtered.reduce((sum, t) => sum + t.amount, 0);
        const grouped = filtered.reduce((acc, t) => {
            acc[t.category] = (acc[t.category] || 0) + t.amount;
            return acc;
        }, {} as Record<string, number>);

        return Object.entries(grouped)
            .map(([category, value]) => ({
                category,
                value,
                percentage: totalExpense > 0 ? (value / totalExpense) * 100 : 0,
            }))
            .sort((a, b) => b.value - a.value);
    };

    const value: FinanceContextType = {
        transactions, goals, creditCards, bankAccounts, familyMembers, categories, filters, loading,
        addTransaction, updateTransaction, deleteTransaction, addGoal, addCreditCard, addBankAccount, addFamilyMember,
        setSelectedMember, setDateRange, setTransactionType, setSearchText, refreshData, getFilteredTransactions,
        calculateTotalBalance, calculateIncomeForPeriod, calculateExpensesForPeriod, calculateExpensesByCategory
    };

    return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>;
}

export function useFinance() {
    const context = useContext(FinanceContext);
    if (!context) throw new Error('useFinance must be used within FinanceProvider');
    return context;
}
