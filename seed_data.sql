-- Dados de Exemplo (Seed Data)
-- Copie e cole no SQL Editor do Supabase para popular seu banco com dados iniciais.

-- 1. Limpar dados existentes (Opcional - remova se quiser manter dados atuais)
TRUNCATE table "transactions", "goals", "credit_cards", "bank_accounts", "family_members", "categories" RESTART IDENTITY CASCADE;

-- 2. Inserir Membros da Família
-- IDs fixos para garantir relacionamentos
INSERT INTO "family_members" (id, name, role, "avatarUrl", "monthlyIncome") VALUES
('11111111-1111-1111-1111-111111111111', 'Franklin Vieira', 'Pai', 'https://ui-avatars.com/api/?name=Franklin+V&background=84CC16&color=fff', 12000),
('22222222-2222-2222-2222-222222222222', 'Maria Silva', 'Mãe', 'https://ui-avatars.com/api/?name=Maria+S&background=080B12&color=fff', 8500),
('33333333-3333-3333-3333-333333333333', 'João Vieira', 'Filho', 'https://ui-avatars.com/api/?name=Joao+V&background=E5E7EB&color=080B12', 0);

-- 3. Inserir Categorias
INSERT INTO "categories" (name, color, type) VALUES
('Salário', '#84CC16', 'income'),
('Investimentos', '#A3E635', 'income'),
('Freelance', '#D1D5DB', 'income'),
('Alimentação', '#EF4444', 'expense'),
('Habitação', '#3B82F6', 'expense'),
('Transporte', '#F59E0B', 'expense'),
('Lazer', '#8B5CF6', 'expense'),
('Saúde', '#10B981', 'expense'),
('Educação', '#6366F1', 'expense');

-- 4. Inserir Contas Bancárias
INSERT INTO "bank_accounts" (id, name, type, balance, color, "holderId") VALUES
('a1111111-1111-1111-1111-111111111111', 'Nubank Conta', 'checking', 4500.50, '#8A05BE', '11111111-1111-1111-1111-111111111111'),
('a2222222-2222-2222-2222-222222222222', 'Itaú Personalité', 'checking', 12800.00, '#EC7000', '11111111-1111-1111-1111-111111111111'),
('a3333333-3333-3333-3333-333333333333', 'XP Investimentos', 'savings', 45000.00, '#000000', '11111111-1111-1111-1111-111111111111');

-- 5. Inserir Cartões de Crédito
INSERT INTO "credit_cards" (id, name, "closingDay", "dueDay", "limit", "currentBill", theme, "lastDigits", "holderId") VALUES
('c1111111-1111-1111-1111-111111111111', 'Nubank Ultravioleta', 15, 22, 15000, 3450.80, 'black', '5897', '11111111-1111-1111-1111-111111111111'),
('c2222222-2222-2222-2222-222222222222', 'Itaú Visa Infinite', 10, 17, 25000, 1200.50, 'lime', '1234', '22222222-2222-2222-2222-222222222222'),
('c3333333-3333-3333-3333-333333333333', 'Inter Mastercard', 5, 12, 5000, 450.00, 'white', '9988', '11111111-1111-1111-1111-111111111111');

-- 6. Inserir Metas
INSERT INTO "goals" (name, "targetAmount", "currentAmount", deadline, color, "memberId") VALUES
('Reserva de Emergência', 50000, 32500, '2026-12-31', '#84CC16', '11111111-1111-1111-1111-111111111111'),
('Viagem Disney', 25000, 8400, '2026-07-15', '#3B82F6', NULL),
('Novo iPhone 16', 8500, 2100, '2026-10-20', '#F59E0B', '33333333-3333-3333-3333-333333333333');

-- 7. Inserir Transações Recentes (Usando datas relativas ao momento da inserção)
INSERT INTO "transactions" (type, amount, description, category, date, "accountId", "memberId", status, "isRecurring", "isPaid") VALUES
('income', 12000, 'Salário Franklin', 'Salário', NOW() - INTERVAL '2 days', 'a2222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'completed', true, true),
('expense', 450.80, 'Supermercado Pão de Açúcar', 'Alimentação', NOW() - INTERVAL '1 day', 'c1111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'completed', false, true),
('expense', 3500, 'Aluguel Apartamento', 'Habitação', NOW() - INTERVAL '5 days', 'a2222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'completed', true, true),
('expense', 280, 'Posto Shell', 'Transporte', NOW() - INTERVAL '3 days', 'c2222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'completed', false, true);
