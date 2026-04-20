# EcoSmart - Plataforma de Gestão Sustentável de Resíduos Sólidos

Sistema web completo para registro, acompanhamento e gestão de descartes de resíduos sólidos, com foco em sustentabilidade e educação ambiental.

## 🌿 Visão Geral

EcoSmart é uma plataforma digital colaborativa que conecta cidadãos, empresas, cooperativas e administradores em torno da gestão responsável de resíduos. O sistema oferece:

- ✅ Registro digital de descartes
- 📊 Indicadores de impacto ambiental
- 📚 Conteúdo educativo sobre reciclagem
- 🗺️ Mapeamento de pontos de coleta
- 🚛 Solicitação de coletas
- 👥 Gestão colaborativa institucional
- 🎯 Gamificação e recompensas

## 👥 Perfis de Usuário

### UC - Usuário Comum
- Registra descartes pessoais
- Consulta histórico
- Visualiza impacto ambiental básico
- Acessa conteúdo educativo

### UP - Usuário Premium
- Todas funcionalidades do UC
- Histórico detalhado
- Relatórios avançados
- Recompensas e benefícios expandidos

### UE - Usuário Empresarial
- Painel institucional
- Dados consolidados da organização
- Gestão de usuários vinculados
- Relatórios corporativos

### UA - Usuário Administrador
- Painel administrativo completo
- Gestão de usuários e permissões
- Gestão de conteúdos educativos
- Monitoramento do sistema

## 🏗️ Arquitetura

### Frontend
- **React 18** com TypeScript
- **React Router 7** para navegação
- **Tailwind CSS v4** para estilização
- **Recharts** para visualização de dados
- **Radix UI** para componentes acessíveis

### Backend (Fase Futura)
- **Supabase** como backend/database
- **PostgreSQL** via Supabase
- **Edge Functions** para lógica de negócio
- **Row Level Security (RLS)**

### Automação
- **Make** para notificações e integrações
- Alertas automáticos
- Sincronização de dados

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── components/          # Componentes compartilhados
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Table.tsx
│   │   └── TopBar.tsx
│   ├── layouts/            # Layouts da aplicação
│   │   ├── DashboardLayout.tsx
│   │   └── RootLayout.tsx
│   ├── pages/              # Páginas principais
│   │   ├── dashboard/      # Dashboards por perfil
│   │   ├── admin/          # Páginas administrativas
│   │   ├── LandingPage.tsx
│   │   ├── LoginPage.tsx
│   │   └── ...
│   ├── routes.tsx          # Configuração de rotas
│   └── App.tsx             # Componente raiz
├── contexts/               # Contextos React
│   └── AuthContext.tsx
├── lib/                    # Utilitários e mock data
│   └── mockData.ts
└── styles/
    ├── theme.css           # Variáveis CSS
    └── fonts.css
```

## 🎨 Design System

### Cores Principais
- **Verde Escuro (Primary)**: `#1a4d2e` - Identidade principal
- **Verde Médio (Secondary)**: `#4caf50` - Destaques e ações
- **Verde Claro (Accent)**: `#81c784` - Elementos secundários
- **Branco/Cinza**: Áreas de conteúdo

### Princípios de Design
- Interface limpa e sustentável
- Formas orgânicas e arredondadas
- Alta legibilidade e contraste
- Acessibilidade (WCAG 2.1)
- Responsivo desktop-first (1440px base)

## 📱 Páginas Implementadas

### Públicas
- ✅ Landing Page institucional
- ✅ Login
- ✅ Cadastro

### Usuário
- ✅ Dashboard (UC, UP, UE, UA)
- ✅ Registrar Descarte
- ✅ Histórico de Descartes
- ✅ Impacto Ambiental
- ✅ Central Educativa
- ✅ Conteúdo Educativo (Detalhes)
- ✅ Pontos de Coleta (com mapa)
- ✅ Pedidos de Coleta
- ✅ Novo Pedido de Coleta (wizard)
- ✅ Notificações
- ✅ Perfil e Configurações

### Administrativas
- ✅ Gestão de Usuários
- ✅ Gestão de Permissões
- ✅ Gestão de Conteúdos
- ✅ Arquitetura do Sistema

## 🔐 Credenciais de Teste

### Administrador
- Email: `admin@ecosmart.com`
- Senha: `admin123`

### Usuário Comum
- Email: `maria@email.com`
- Senha: `maria123`

### Usuário Premium
- Email: `ana@email.com`
- Senha: `ana123`

### Usuário Empresarial
- Email: `carlos@empresa.com`
- Senha: `carlos123`

## 🚀 Funcionalidades

### MVP (Implementado com Mock)
- ✅ Sistema de autenticação
- ✅ Controle de acesso por perfil
- ✅ Registro de descartes
- ✅ Histórico com filtros
- ✅ Métricas de impacto
- ✅ Conteúdo educativo
- ✅ Mapa de pontos de coleta
- ✅ Sistema de notificações
- ✅ Painel administrativo

### Próximos Passos
- 🔄 Integração com Supabase
- 🔄 Autenticação real
- 🔄 Persistência de dados
- 🔄 Upload de imagens
- 🔄 Exportação de relatórios

### Futuro (Roadmap)
- 📍 Geolocalização em tempo real
- 🤖 IA para reconhecimento de materiais
- 📱 App mobile nativo
- 🏆 Gamificação expandida
- 💳 Sistema de recompensas
- 🔗 Integração com órgãos públicos
- 📊 Analytics avançado

## 🗄️ Estrutura de Dados (Mock)

### Tabelas Principais
- **usuarios**: id, nome, email, perfil, status
- **descartes**: id, usuario_id, tipo_residuo, quantidade, data
- **entidades**: id, nome_entidade, tipo_entidade
- **notificacoes**: id, usuario_id, titulo, mensagem, lida
- **pedidos_coleta**: id, usuario_id, status, materiais
- **pontos_coleta**: id, nome, tipo, endereco, latitude, longitude
- **materiais**: id, nome, categoria, como_descartar
- **impactos**: usuario_id, pontos, reciclado_kg, emissao_evitada

## 🔌 Integração Supabase

Para conectar ao Supabase real:

1. Acesse as configurações do Make
2. Conecte seu projeto Supabase
3. Configure as variáveis de ambiente
4. O sistema migrará automaticamente do mock para o backend real

## 🎯 Diferenciais

- **Educação Ambiental**: Conteúdo rico sobre descarte correto
- **Impacto Mensurável**: Métricas claras de impacto positivo
- **Colaborativo**: Conecta múltiplos atores do ecossistema
- **Acessível**: Interface simples e intuitiva
- **Escalável**: Arquitetura preparada para crescimento
- **Sustentável**: Design e valores alinhados com o propósito

## 📊 Dados Mock

O sistema inclui:
- 5 usuários (1 admin, 2 comuns, 1 premium, 1 empresarial)
- 10 registros de descarte
- 4 pedidos de coleta
- 6 notificações
- 8 pontos de coleta
- 8 materiais educativos

## 🌍 Impacto Socioambiental

O EcoSmart contribui para:
- Redução de emissões de CO₂
- Economia de recursos naturais
- Geração de renda para cooperativas
- Educação ambiental contínua
- Dados para políticas públicas

## 📄 Licença

Sistema desenvolvido como protótipo de alta fidelidade para gestão sustentável de resíduos sólidos.

---

**EcoSmart** - Transformando o futuro através da gestão inteligente de resíduos 🌿♻️
