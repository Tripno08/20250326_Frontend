# Innerview - Plataforma de Gestão RTI/MTSS

![Innerview Logo](./innerview/public/logo.png)

## Sobre o Projeto

Innerview é uma plataforma de gestão educacional focada em Response to Intervention (RTI) e Multi-Tiered System of Supports (MTSS). A aplicação permite que educadores gerenciem estudantes, intervenções, avaliações e monitorem o progresso de forma eficiente, facilitando a identificação e o suporte a estudantes com necessidades específicas.

## Repositório

Este projeto está disponível no GitHub:
[https://github.com/Tripno08/20250326_Frontend](https://github.com/Tripno08/20250326_Frontend)

## Funcionalidades Implementadas

### Fase 1: Fundação
- **Design System e Componentes Base**
  - Configuração do projeto Next.js com TypeScript
  - Implementação do Material UI e sistema de temas
  - Criação de componentes UI e formulários
  - Estabelecimento de diretrizes de acessibilidade (WCAG 2.2 AA)

- **Estrutura de Autenticação**
  - Implementação de fluxo de login/registro
  - Configuração de gestão de sessões
  - Proteção de rotas

- **Arquitetura de Dados**
  - Configuração de React Query
  - Estruturação do Zustand para estado global
  - Implementação de camada de serviços API
  - Configuração de MSW para mocks de desenvolvimento

- **Dashboard Básico**
  - Layout responsivo principal
  - Cards de métricas
  - Visualização RTI/MTSS básica

### Fase 2: Módulos Essenciais
- **Gestão de Estudantes (Concluído)**
  - Listagem e busca com paginação e filtros
  - Perfil detalhado com histórico acadêmico
  - Formulário de cadastro/edição
  - Upload e gestão de documentos com drag-and-drop

- **RTI/MTSS Core (Em andamento)**
  - Visualização da pirâmide RTI
  - Classificação por nível (Tier 1, 2, 3)
  - Planejamento de intervenções
  - Monitoramento de progresso

## Tecnologias Utilizadas

- **Frontend**
  - Next.js 14
  - TypeScript
  - Material UI
  - Zustand (gerenciamento de estado)
  - React Query (gerenciamento de dados)
  - TanStack Table (tabelas)
  - dayjs (manipulação de datas)

- **Tooling**
  - MSW (Mock Service Worker) para simulação da API
  - ESLint para qualidade de código
  - Jest e Testing Library para testes

## Status do Projeto

- **Progresso Total**: 70%
- **Fase Atual**: Módulos Essenciais
- **Próximos Passos**: Implementação do módulo RTI/MTSS Core

## Instalação e Execução

### Pré-requisitos
- Node.js 18+ 
- npm 9+

### Passos para instalar
```bash
# Clonar o repositório
git clone https://github.com/Tripno08/20250326_Frontend.git
cd 20250326_Frontend/innerview

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`.

### Credenciais para teste
- **Email**: admin@innerview.com
- **Senha**: password123

## Estrutura do Projeto

```
innerview/
├── src/
│   ├── app/                 # Páginas e rotas
│   │   ├── (public)/        # Rotas públicas
│   │   └── (authenticated)/ # Rotas que requerem autenticação
│   ├── components/          # Componentes reutilizáveis
│   │   ├── ui/              # Componentes básicos
│   │   └── dashboard/       # Componentes do dashboard
│   ├── lib/                 # Utilitários e hooks
│   │   └── hooks/           # Custom hooks
│   ├── mocks/               # Configuração de mocks para desenvolvimento
│   │   ├── handlers/        # Handlers da API mock
│   │   └── factories/       # Fábricas de dados
│   ├── services/            # Serviços de API
│   ├── store/               # Store global com Zustand
│   ├── styles/              # Estilos e tema
│   ├── types/               # Definições de tipos TS
│   │   └── domain/          # Tipos de domínio da aplicação
│   └── utils/               # Funções utilitárias
└── docs/                    # Documentação do projeto
```

## Documentação

A documentação do projeto está disponível na pasta `innerview/src/docs` e inclui:
- Documentação de componentes UI
- Implementação do dashboard
- Implementação da gestão de estudantes
- Plano de execução

## Equipe de Desenvolvimento

- **Responsável Frontend**: Rafael Ferraz

## Licença

© 2024 Innerview. Todos os direitos reservados. 