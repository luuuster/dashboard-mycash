import React, { createContext, useContext, useState, useMemo } from 'react';
import type { Transaction, Goal, CreditCard, FamilyMember } from '../types/finance';

interface FinanceContextData {
    transactions: Transaction[];
    goals: Goal[];
    cards: CreditCard[];
    members: FamilyMember[];
    filters: {
        month: number;
        year: number;
        memberId: string | null;
        search: string;
    };
    setFilters: React.Dispatch<React.SetStateAction<FinanceContextData['filters']>>;
    totals: {
        balance: number;
        income: number;
        expenses: number;
    };
    addTransaction: (transaction: Omit<Transaction, 'id' | 'status'>) => void;
}

const FinanceContext = createContext<FinanceContextData>({} as FinanceContextData);

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Mock Data Inicial
    const [members] = useState<FamilyMember[]>([
        { id: '1', name: 'Lucas Marte', role: 'admin' },
        { id: '2', name: 'Ana Silva', role: 'member' }
    ]);

    const [cards] = useState<CreditCard[]>([
        { id: 'c1', name: 'Nubank', limit: 5000, used: 1200, closing_date: 5, due_date: 12, theme: 'black' },
        { id: 'c2', name: 'Inter', limit: 3000, used: 800, closing_date: 10, due_date: 17, theme: 'lime' }
    ]);

    const [transactions, setTransactions] = useState<Transaction[]>([
        { id: 't1', type: 'income', value: 12450, description: 'Salário Mensal', category: 'Trabalho', date: '2024-03-01', member: 'Lucas Marte', status: 'completed' },
        { id: 't2', type: 'expense', value: 450, description: 'Supermercado', category: 'Alimentação', date: '2024-03-05', member: 'Ana Silva', status: 'completed' },
        { id: 't3', type: 'expense', value: 120.50, description: 'Netflix', category: 'Assinatura', date: '2024-03-10', member: 'Lucas Marte', status: 'pending' },
    ]);

    const addTransaction = (transaction: Omit<Transaction, 'id' | 'status'>) => {
        const newTransaction: Transaction = {
            ...transaction,
            id: Math.random().toString(36).substr(2, 9),
            status: 'completed'
        };
        setTransactions(prev => [newTransaction, ...prev]);
    };

    const [goals] = useState<Goal[]>([
        { id: 'g1', title: 'Reserva de Emergência', target_value: 20000, current_value: 15000, deadline: '2024-12-31', status: 'on_track' }
    ]);

    const [filters, setFilters] = useState<FinanceContextData['filters']>({
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
        memberId: null,
        search: ''
    });

    const filteredTransactions = useMemo(() => {
        return transactions.filter(t => {
            const matchesSearch = t.description.toLowerCase().includes(filters.search.toLowerCase()) ||
                t.category.toLowerCase().includes(filters.search.toLowerCase());
            const matchesMember = !filters.memberId || t.member === members.find(m => m.id === filters.memberId)?.name;

            // Basic date check (just month/year for now)
            const tDate = new Date(t.date);
            const matchesMonth = tDate.getMonth() === filters.month;
            const matchesYear = tDate.getFullYear() === filters.year;

            return matchesSearch && matchesMember && matchesMonth && matchesYear;
        });
    }, [transactions, filters, members]);

    const totals = useMemo(() => {
        const income = filteredTransactions
            .filter(t => t.type === 'income')
            .reduce((acc, curr) => acc + curr.value, 0);
        const expenses = filteredTransactions
            .filter(t => t.type === 'expense')
            .reduce((acc, curr) => acc + curr.value, 0);

        return {
            income,
            expenses,
            balance: income - expenses
        };
    }, [filteredTransactions]);

    return (
        <FinanceContext.Provider value={{
            transactions: filteredTransactions,
            goals,
            cards,
            members,
            filters,
            setFilters,
            totals,
            addTransaction
        }}>
            {children}
        </FinanceContext.Provider>
    );
};

export const useFinance = () => useContext(FinanceContext);
