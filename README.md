# MyCash+ Dashboard

O MyCash+ Dashboard é uma aplicação web moderna para gestão financeira pessoal e familiar, desenvolvida com foco em UX premium e performance.

![Dashboard Preview](https://github.com/luuuster/dashboard-mycash/raw/main/public/preview.png)

## 🚀 Tecnologias

- **Frontend**: React 19, TypeScript 5.7
- **Estilização**: Tailwind CSS 4.0
- **Gráficos**: Recharts
- **Ícones**: Lucide React
- **Build Tool**: Vite 6
- **Backend/Persistência**: Supabase

## 🛠️ Pré-requisitos

- Node.js 18+
- NPM ou Yarn
- Conta no [Supabase](https://supabase.com)

## 📦 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/luuuster/dashboard-mycash.git
cd dashboard-mycash
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto com suas credenciais do Supabase:

```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

Acesse `http://localhost:5173` no seu navegador.

## 🏗️ Build e Deploy

Para gerar a versão de produção:

```bash
npm run build
```

Os arquivos estáticos serão gerados na pasta `dist`.

### Deploy na Vercel

1. Instale a Vercel CLI: `npm i -g vercel`
2. Execute `vercel` na raiz do projeto.
3. Configure as variáveis de ambiente (`VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`) no painel da Vercel.

## 🎨 Estrutura de Pastas

Consulte [ARCHITECTURE.md](./ARCHITECTURE.md) para detalhes técnicos sobre a estrutura e decisões de arquitetura.

## 🤝 Contribuição

1. Faça um Fork do projeto
2. Crie sua Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.
