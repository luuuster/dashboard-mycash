# Arquitetura do Projeto MyCash+

Este documento descreve as decisões técnicas e a estrutura do projeto MyCash+ Dashboard.

## Visão Geral

O projeto segue uma arquitetura baseada em componentes funcionais React, utilizando Hooks para lógica de estado e Context API para gerenciamento de estado global. A estilização é feita inteiramente via utilitários do Tailwind CSS 4.0.

## Estrutura de Diretórios

```
src/
├── components/          # Componentes de UI reutilizáveis
│   ├── dashboard/       # Widgets específicos do dashboard (ex: cards, gráficos)
│   ├── layout/          # Componentes estruturais (Sidebar, Header)
│   └── modals/          # Modais da aplicação (ex: Nova Transação)
├── contexts/            # Contextos do React (FinanceContext)
├── hooks/               # Custom Hooks (useWindowSize, useCountUp)
├── lib/                 # Configurações de bibliotecas externas (Supabase)
├── types/               # Definições de tipos TypeScript globais
└── App.tsx              # Componente raiz e layout principal
```

## Decisões Técnicas

### 1. Gerenciamento de Estado (Context API)
Optamos pelo Context API (`FinanceContext`) em vez de Redux/Zustand devido à escopo focado da aplicação. O contexto gerencia:
- Transações
- Metas
- Cartões de Crédito
- Filtros Globais (Mês, Ano, Membro)

### 2. Persistência de Dados (Supabase)
Utilizamos o Supabase como Backend-as-a-Service (BaaS).
- **Cliente**: Inicializado em `src/lib/supabase.ts`.
- **Estratégia**: O app tenta conectar ao Supabase; se falhar (ex: falta de chaves), ele degrada graciosamente para dados "mock" locais para não bloquear a UI.

### 3. Estilização (Tailwind CSS 4)
- Uso extensivo de variáveis CSS nativas para cores (`--color-primary`, `--color-surface`).
- Design System extraído do Figma e codificado no arquivo CSS global.
- Responsividade "Mobile-First" aplicada em todos os grids e layouts.

### 4. Gráficos (Recharts)
Escolhida pela flexibilidade e integração nativa com React, permitindo customização total via props e componentes SVG.
