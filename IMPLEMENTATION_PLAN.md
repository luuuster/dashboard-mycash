# Plano de Implementação: MyCash+ Dashboard

Este plano detalha as etapas para construir o sistema de gestão financeira familiar, seguindo a mentalidade de engenheiro sênior e as regras de projeto estabelecidas.

## 🟢 Fase 1: Fundação & Design System (Concluído)
- [x] Initial setup com Vite, React e TypeScript.
- [x] Configuração central do Tailwind com breakpoints oficiais.
- [x] Implementação de variáveis semânticas e primitivas no `index.css`.
- [x] Definição de tipos globais (`Transaction`, `Goal`, `CreditCard`).

## 🟡 Fase 2: Business Logic & Mock State (Concluído - Mocks)
- [ ] **Setup Supabase Client**: Instalação e configuração da conexão inicial.
- [x] **FinanceContext (`useFinance`)**: Criar o provider central para gerenciar:
    - Estado de transações, metas e cartões.
    - Filtros globais (Mês/Ano/Membro).
    - Busca inteligente em tempo real.
- [x] **Mock Data Engine**: Gerador de dados fictícios para desenvolvimento visual.

## 🔵 Fase 3: Layout Base & Navegação (Concluído)
- [x] **Layout Wrapper**: Estrutura fluida com `100% width`.
- [x] **Sidebar (Desktop ≥1280px)**: 
    - Estados: Expanded e Collapsed.
    - Animações suaves de transição.
- [x] **Header Mobile (<1280px)**:
    - Botão de Menu (Drawer).
    - Avatar e Ações Rápidas.
- [x] **Navigation Logic**: Sistema de rotas simples para Dashboard, Objetivos, etc.

## 🔴 Fase 4: Dashboard Core Components
- [ ] **Summary Cards**: Balanço Total, Receitas e Despesas (Layout responsivo).
- [ ] **Family Spending Charts**: Integração com bibliotecas leves de gráficos (ex: Recharts).
- [ ] **Transactions List**: Tabela/Lista fluida com busca inteligente integrada.

## 🟣 Fase 5: Funcionalidades Avançadas & Persistência
- [ ] **Modal "Nova Transação"**: Formulário completo com validação e tipagem.
- [ ] **Integração Supabase**: Substituir Mocks por chamadas reais via Hooks/Services.
- [ ] **Polimento UX**: Micro-interações, estados de Loading e tratativa de erros.

---

### 🛡️ Pre-flight Check Permanente
1. Layout 100% fluido (sem larguras fixas em containers).
2. Mobile-first sempre (Base < 768px).
3. Uso exclusivo de Tokens do Design System.
4. Zero barra de rolagem horizontal.
