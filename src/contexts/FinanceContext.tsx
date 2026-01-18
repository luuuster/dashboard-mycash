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
    uploadFile: (file: File, bucket: 'avatars' | 'attachments') => Promise<string | null>;
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

export function FinanceProvider({ children }: { children: ReactNode }) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [goals, setGoals] = useState<Goal[]>([]);
    const [creditCards, setCreditCards] = useState<CreditCard[]>([]);
    const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
    const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
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

            if (txs) setTransactions(txs as Transaction[]);
            if (gs) setGoals(gs as Goal[]);
            if (cards) setCreditCards(cards as CreditCard[]);
            if (accs) setBankAccounts(accs as BankAccount[]);
            if (members) setFamilyMembers(members as FamilyMember[]);
            if (cats) setCategories(cats as Category[]);
        } catch (error) {
            console.error('Erro ao buscar dados do Supabase:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshData();

        // Setup Realtime Subscription
        const channels = supabase.channel('custom-all-channel')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public' },
                () => {
                    refreshData();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channels);
        }
    }, []);

    const uploadFile = async (file: File, bucket: 'avatars' | 'attachments') => {
        try {
            const fileName = `${Date.now()}-${file.name}`;
            const { data, error } = await supabase.storage.from(bucket).upload(fileName, file);
            if (error) throw error;

            const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(fileName);
            return publicUrl;
        } catch (error) {
            console.error('Erro ao fazer upload:', error);
            return null;
        }
    };

    const addTransaction = async (transaction: Omit<Transaction, 'id'>) => {
        const { error } = await supabase.from('transactions').insert([transaction]);
        if (error) console.error('Erro ao adicionar transação:', error);
        else refreshData();
    };

    const updateTransaction = async (id: string, updates: Partial<Transaction>) => {
        const { error } = await supabase.from('transactions').update(updates).eq('id', id);
        if (error) console.error('Erro ao atualizar transação:', error);
        else refreshData();
    };

    const deleteTransaction = async (id: string) => {
        const { error } = await supabase.from('transactions').delete().eq('id', id);
        if (error) console.error('Erro ao deletar transação:', error);
        else refreshData();
    };

    const addGoal = async (goal: Omit<Goal, 'id'>) => {
        const { error } = await supabase.from('goals').insert([goal]);
        if (error) console.error('Erro ao adicionar meta:', error);
        else refreshData();
    };

    const addCreditCard = async (card: Omit<CreditCard, 'id'>) => {
        const { error } = await supabase.from('credit_cards').insert([card]);
        if (error) console.error('Erro ao adicionar cartão:', error);
        else refreshData();
    };

    const addBankAccount = async (account: Omit<BankAccount, 'id'>) => {
        const { error } = await supabase.from('bank_accounts').insert([account]);
        if (error) console.error('Erro ao adicionar conta:', error);
        else refreshData();
    };

    const addFamilyMember = async (member: Omit<FamilyMember, 'id'>) => {
        const { error } = await supabase.from('family_members').insert([member]);
        if (error) console.error('Erro ao adicionar membro:', error);
        else refreshData();
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
        calculateTotalBalance, calculateIncomeForPeriod, calculateExpensesForPeriod, calculateExpensesByCategory, uploadFile
    };

    return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>;
}

export function useFinance() {
    const context = useContext(FinanceContext);
    if (!context) throw new Error('useFinance must be used within FinanceProvider');
    return context;
}
