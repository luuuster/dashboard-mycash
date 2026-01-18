# Plano de Implementação: Instalação do Figma MCP Server

Este plano descreve as etapas para instalar, configurar e validar o servidor MCP do Figma no ambiente Antigravity.

## ✅ Passo 1: Pesquisa e Requisitos (Concluído)
- O servidor MCP oficial do Figma utiliza o pacote `@modelcontextprotocol/server-figma`.
- Requisito: Personal Access Token (PAT) do Figma com escopo de leitura.
- Requisito: Node.js e NPM instalados no sistema.

## ✅ Passo 2: Localização do Arquivo de Configuração (Concluído)
- Arquivo identificado em: `c:\Users\frank\.gemini\antigravity\mcp_config.json`.

## ✅ Passo 3: Configuração do Servidor (Concluído)
- Adição dos servidores `figma-dev-mode` e `figma-framelink` ao arquivo JSON.
- Injeção segura do token `figd_AGkj2...` nas variáveis de ambiente.

## 🟡 Passo 4: Validação e Troubleshooting (Em Andamento)
- [ ] Verificar se o Antigravity reconhece os novos servidores.
- [ ] Listar ferramentas disponíveis (`list_tools`).
- [ ] Realizar um teste de conexão real com a API do Figma via servidor MCP.

## ⚪ Passo 5: Walkthrough Final
- [ ] Documentar como utilizar as ferramentas do Figma dentro do chat.
- [ ] Fornecer exemplos de comandos (ex: "Leia este frame do Figma").
