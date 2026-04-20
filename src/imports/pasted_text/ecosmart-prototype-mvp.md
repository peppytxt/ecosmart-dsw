Crie um protótipo WEB de alta fidelidade para o sistema EcoSmart, uma plataforma digital colaborativa para gestão sustentável de resíduos sólidos, com foco em descarte correto, registro de resíduos, histórico, indicadores ambientais, educação ambiental, coleta seletiva, acompanhamento institucional e gestão administrativa.

O protótipo deve ser WEB, desktop-first, pensado para navegação em navegador, com largura principal de 1440px. Criar também comportamento responsivo para notebook e tablet, mas priorizar a experiência desktop.

A interface deve reutilizar a identidade visual já existente do projeto:
- verde escuro como cor principal
- verde claro como destaque
- branco e cinza claro para áreas de conteúdo
- formas curvas orgânicas
- logo EcoSmart
- ícones ambientais
- aparência limpa, acessível, tecnológica e sustentável

Objetivo do sistema:
Organizar digitalmente o registro de descartes de resíduos, permitir o acompanhamento do histórico dos usuários, incentivar práticas sustentáveis e oferecer uma plataforma colaborativa entre cidadãos, empresas, cooperativas, instituições e administradores.

Base conceitual do projeto:
- o sistema deve centralizar informações sobre descarte de resíduos
- deve incentivar a participação da população em práticas sustentáveis
- deve gerar indicadores ambientais com base em dados reais
- deve ser uma plataforma web colaborativa, simples e acessível
- o MVP deve priorizar cadastro, login, controle por perfil, registro digital de descartes, armazenamento, histórico e painel administrativo
- recursos mais avançados devem aparecer como expansão futura, sem desorganizar o MVP

Perfis do sistema:
1. UC – Usuário Comum
- cria conta
- faz login
- registra descartes
- consulta o próprio histórico
- visualiza informações básicas de participação ambiental

2. UP – Usuário Premium
- faz tudo que o UC faz
- acessa histórico detalhado
- visualiza dados ampliados dos próprios registros
- pode futuramente acessar recompensas, benefícios e relatórios mais completos

3. UE – Usuário Empresarial
- acessa um painel institucional
- acompanha registros vinculados à entidade
- visualiza dados consolidados
- acompanha participação ambiental da organização
- gerencia um workspace empresarial
- pode vincular usuários UC e UP ao workspace da empresa
- pode convidar, aprovar, remover e visualizar membros vinculados
- pode organizar usuários por unidade, setor, equipe ou filial
- pode visualizar relatórios consolidados por membros vinculados
- pode filtrar registros por colaborador, perfil, setor e período

4. UA – Usuário Administrador
- acessa painel administrativo
- gerencia usuários
- controla permissões
- monitora registros, atividades e funcionamento geral da plataforma

Regra obrigatória do projeto:
Dentro do módulo do Usuário Empresarial deve existir a funcionalidade de vincular Usuários Comuns e Usuários Premium ao workspace empresarial. Essa funcionalidade deve estar visível no dashboard empresarial e em uma tela específica de gestão do workspace.

Arquitetura que deve ser refletida no protótipo:
- Front-end web
- API / lógica de negócio
- Painel Administrativo
- Banco de Dados
- serviços auxiliares como autenticação, sessões, notificações e integrações

Tecnologia e funcionamento:
- Supabase: plataforma de banco de dados e backend real do sistema
- mock de dados: dados fictícios usados inicialmente para preencher telas, testar fluxos e validar a interface
- Make: ferramenta de automação e integração entre sistemas, usada para notificações, confirmações, alertas e sincronizações
- migrar para conexão real: trocar o ambiente de teste com mock pelas tabelas reais do Supabase, mantendo a mesma lógica da interface

Observação importante do escopo:
- o protótipo deve mostrar claramente o MVP funcional
- funcionalidades como gamificação expandida, descontos automáticos, integração com órgãos públicos, IA avançada, app mobile nativo, sensores e automações sofisticadas devem ser apresentadas como roadmap ou módulos futuros

Estrutura de dados sugerida:
- usuarios: id, nome, email, telefone, endereco, perfil, status, created_at
- descartes: id, usuario_id, tipo_residuo, quantidade, unidade, data_descarte, local, observacao, foto_url, created_at
- entidades: id, nome_entidade, tipo_entidade, responsavel, created_at
- usuario_entidade: id, usuario_id, entidade_id, vinculo
- workspaces: id, entidade_id, nome_workspace, descricao, created_at
- workspace_membros: id, workspace_id, usuario_id, perfil_usuario, setor, unidade, status_vinculo, data_vinculo
- convites_workspace: id, workspace_id, email_convidado, perfil_sugerido, status_convite, created_at
- notificacoes: id, usuario_id, titulo, mensagem, lida, created_at
- pedidos_coleta: id, usuario_id, status, endereco, observacao, data_solicitacao, coletor_id
- pontos_coleta: id, nome, tipo, endereco, latitude, longitude
- materiais: id, nome, icone, categoria
- impactos: id, usuario_id, pontos, reciclado_kg, emissao_evitar, economia_gerada
- logs_admin: id, admin_id, acao, descricao, created_at

Mock de dados para prototipação:
- 1 administrador
- 2 usuários comuns
- 1 usuário premium
- 1 usuário empresarial
- 1 cooperativa cadastrada
- 1 workspace empresarial
- 3 membros vinculados ao workspace
- 2 convites pendentes para vínculo
- 10 registros de descarte
- 4 pedidos de coleta com status variados
- 6 notificações
- 8 pontos de coleta
- conteúdos educativos sobre lâmpadas, esmaltes, eletrônicos, óleo de cozinha e recicláveis comuns

Estrutura geral da interface web:
- header superior com logo, busca, notificações, perfil do usuário
- sidebar lateral fixa com navegação principal
- área central com dashboard, cards, gráficos, tabelas e mapas
- breadcrumb em telas internas
- filtros laterais ou superiores
- modais para cadastro, confirmação e edição
- tabelas com paginação e busca
- estados vazios, estados preenchidos e feedback de sucesso/erro

Criar as seguintes telas web:

1. Landing page institucional
- hero principal com logo EcoSmart
- headline sobre gestão sustentável de resíduos
- subtítulo explicando a proposta da plataforma
- botões: “Entrar” e “Criar conta”
- seção “como funciona”
- seção com diferenciais: descarte correto, histórico, indicadores, educação ambiental, colaboração institucional
- seção sobre impacto socioambiental
- seção com parceiros e fontes futuras de dados: prefeituras, cooperativas, órgãos ambientais, universidades
- footer com links institucionais

2. Tela de login
- login por e-mail/usuário
- senha
- botão entrar
- link “esqueci minha senha”
- link “criar conta”
- opção de login social como visual opcional
- painel lateral com mensagem institucional do projeto

3. Tela de cadastro
- nome
- e-mail
- telefone
- endereço
- senha
- confirmar senha
- seleção inicial de perfil de entrada: UC, UP, UE
- checkbox de aceite de termos
- botão criar conta

4. Dashboard web do Usuário Comum
- saudação personalizada
- cards com resumo: total de descartes, últimos registros, impacto estimado, pontos acumulados
- gráfico simples de descartes por mês
- atalho para “Registrar descarte”
- atalho para “Ver histórico”
- atalho para “Aprender a reciclar”
- área com dicas rápidas
- bloco com campanhas e notificações recentes

5. Tela de registrar descarte
- formulário web com:
  tipo de resíduo
  quantidade
  unidade
  data
  local
  observação
  upload de foto
- botão salvar registro
- confirmação visual após salvar
- opção de salvar rascunho
- layout em duas colunas

6. Tela de histórico de descartes
- tabela com colunas:
  data
  tipo de resíduo
  quantidade
  local
  status
- filtros por período, material e status
- busca textual
- botão para exportar
- cards de resumo no topo
- visualização em tabela e em cards

7. Tela de participação ambiental / impacto
- cards com métricas:
  quantidade reciclada
  impacto acumulado
  pontos
  frequência de uso
- gráfico de linha e gráfico de barras
- comparativo mensal
- textos explicativos acessíveis
- bloco “sugestões para melhorar seu impacto”

8. Central educativa
- listagem de conteúdos educativos em cards
- categorias: lâmpadas, esmalte, eletrônicos, óleo, papel, plástico, vidro, metal
- busca por material
- filtros por categoria
- card clicável abre página detalhada

9. Página de conteúdo educativo individual
- título do material
- subtítulo “como descartar”
- imagem ou ilustração
- 3 a 5 orientações práticas
- alertas de cuidado ambiental
- CTA para ver pontos de coleta
- CTA para registrar descarte relacionado

10. Tela de pontos de coleta / mapa
- mapa amplo ocupando boa parte da tela
- barra lateral com filtros:
  tipo de material
  distância
  categoria do ponto
- busca por endereço ou bairro
- lista de pontos à esquerda ou à direita
- clicar em um ponto abre painel com detalhes
- botão “ver rota”
- botão “solicitar coleta”
- botão “salvar ponto”

11. Tela de pedidos de coleta
- resumo com cards: solicitadas, agendadas, finalizadas, canceladas
- tabela de pedidos
- botão “Novo pedido de coleta”
- filtros por status e período
- modal de criação de novo pedido
- visão detalhada do pedido em painel lateral

12. Tela de novo pedido de coleta
- upload de imagem do material
- seleção de materiais
- quantidade aproximada
- endereço da coleta
- observações
- escolha de ponto/coletor sugerido
- revisão do pedido
- botão enviar

13. Tela de notificações
- lista de notificações
- filtro por lidas e não lidas
- ações rápidas: marcar como lida, arquivar, abrir
- tipos de notificação:
  novo ponto de coleta
  coleta agendada
  coleta finalizada
  campanha ambiental
  novo conteúdo educativo
  recompensa futura
  convite para workspace
  aprovação de vínculo no workspace
  remoção do workspace

14. Tela de perfil e configurações
- foto/avatar
- nome
- e-mail
- perfil
- editar dados
- endereços cadastrados
- privacidade
- preferências de notificação
- sair da conta

15. Dashboard do Usuário Premium
- semelhante ao dashboard UC, porém com:
  métricas ampliadas
  histórico detalhado
  comparativos mais completos
  painel de desempenho
  visualização estendida dos próprios dados

16. Dashboard do Usuário Empresarial
- resumo institucional
- total de registros vinculados à entidade
- usuários associados
- volume de resíduos por categoria
- indicadores consolidados
- gráficos por período
- tabela de registros vinculados
- filtros por unidade, setor ou período
- bloco de relatórios futuros
- card específico “Gerenciar workspace”
- card específico “Vincular usuários”
- card específico “Convites pendentes”
- card específico “Membros ativos por perfil”
- widget com distribuição UC x UP dentro do workspace

17. Tela de gestão do workspace empresarial
- título “Workspace da organização”
- dados do workspace: nome, entidade, responsável, status
- resumo com cards:
  total de membros
  usuários comuns vinculados
  usuários premium vinculados
  convites pendentes
- tabela de membros vinculados
- filtros por perfil, setor, unidade, status
- busca por nome ou e-mail
- botão “Vincular usuário existente”
- botão “Convidar novo usuário”
- botão “Remover vínculo”
- botão “Editar vínculo”
- botão “Aprovar solicitação”
- botão “Rejeitar solicitação”

18. Modal ou drawer de vincular usuário ao workspace
- busca de usuário por nome ou e-mail
- seleção do perfil do usuário: UC ou UP
- seleção de unidade, setor ou equipe
- tipo de vínculo
- status inicial
- botão confirmar vínculo
- mensagem visual de sucesso

19. Tela de detalhes do membro vinculado
- dados do usuário
- perfil: UC ou UP
- setor/unidade
- histórico de descartes vinculados
- participação ambiental individual
- permissões dentro do workspace
- botão editar vínculo
- botão remover do workspace

20. Painel administrativo
- visão geral do sistema
- total de usuários por perfil
- total de descartes
- total de pedidos de coleta
- notificações do sistema
- logs recentes
- indicadores de uso
- atalhos para gerenciar usuários, permissões, entidades e conteúdos

21. Gestão de usuários no admin
- tabela de usuários
- busca
- filtros por perfil e status
- editar usuário
- bloquear/ativar usuário
- redefinir permissões
- visualizar perfil completo

22. Gestão de permissões
- matriz de permissões por perfil
- UC, UP, UE, UA em colunas
- ações em linhas
- checkboxes visuais
- botão salvar alterações

23. Gestão de conteúdos e campanhas
- cadastrar novo conteúdo educativo
- editar campanha
- publicar aviso
- associar conteúdo a materiais específicos

24. Tela técnica / arquitetura do sistema
Criar uma tela ou painel explicativo dentro do protótipo, em estilo dashboard técnico, mostrando:
- Front-end web
- API
- Painel Administrativo
- Banco de Dados
- Supabase como backend real
- mock de dados como fase inicial de testes
- Make como ferramenta de automação
- migração para conexão real como transição do mock para a base real

Módulos que devem aparecer claramente no protótipo:
- autenticação e controle de acesso
- gestão de usuários
- registro de descartes
- acompanhamento de informações
- módulo administrativo
- conteúdo educativo
- notificações
- coleta e pontos de coleta
- impacto ambiental
- relatórios e indicadores
- gestão de workspace empresarial
- vínculo de UC e UP ao workspace
- integrações futuras

Direção visual:
- usar estética sustentável, tecnológica e amigável
- fundo claro nas áreas de conteúdo e verde nas áreas de identidade
- sidebar verde escura
- botões arredondados
- cards com leve sombra
- ícones ambientais e de reciclagem
- gráficos simples e elegantes
- tabelas limpas e organizadas
- UI de dashboard profissional

Componentes web necessários:
- sidebar
- topbar
- cards de KPI
- tabela com paginação
- filtros
- formulário em múltiplas colunas
- modal
- drawer lateral
- mapa com painel
- dropdown de perfil
- toast de sucesso
- badges de status
- breadcrumbs
- empty states
- loading states
- gráficos de barras e linhas

Acessibilidade:
- contraste adequado
- tipografia legível
- linguagem clara
- boa hierarquia visual
- botões e links evidentes
- navegação simples
- estados visuais claros

Tom do produto:
- educativo
- confiável
- tecnológico
- sustentável
- colaborativo
- voltado para impacto social e ambiental

Crie o protótipo com todas as conexões entre telas e com interações configuradas para navegação web.

Configure as interações do protótipo web da seguinte forma:

1. Landing page
- botão “Entrar” leva para Login
- botão “Criar conta” leva para Cadastro
- cards e seções podem ter scroll suave por âncora
- links do header levam para seções internas da landing page

2. Login
- botão entrar leva ao dashboard conforme perfil
- “esqueci minha senha” abre modal
- “criar conta” leva para Cadastro
- mostrar validação inline de campos obrigatórios

3. Cadastro
- botão criar conta leva para dashboard inicial ou onboarding web
- botão voltar retorna para Login
- validações em tempo real
- checkbox de termos obrigatório

4. Sidebar
- Dashboard
- Registrar descarte
- Histórico
- Impacto ambiental
- Conteúdo educativo
- Pontos de coleta
- Pedidos de coleta
- Notificações
- Perfil
- Empresarial aparece para UE
- Admin aparece para UA

5. Dashboard UC e UP
- card “Registrar descarte” abre formulário
- card “Ver histórico” leva para Histórico
- card “Aprender a reciclar” leva para Central educativa
- card de campanha abre conteúdo
- card de notificação abre detalhes

6. Registrar descarte
- botão salvar mostra loading curto
- depois exibe toast de sucesso
- opção de voltar ao dashboard
- opção de ir para histórico
- upload de foto abre seletor de arquivo

7. Histórico
- filtros atualizam tabela
- busca textual filtra resultados em tempo real
- clicar em uma linha abre drawer lateral com detalhes
- exportar abre modal de formato: PDF ou CSV

8. Impacto ambiental
- filtros por período atualizam gráficos
- hover em gráficos mostra tooltip
- botão “ver detalhes” abre painel com métricas ampliadas

9. Central educativa
- busca filtra cards
- clicar em card abre página detalhada do material
- filtro por categoria reorganiza a grade

10. Conteúdo educativo individual
- botão “ver pontos de coleta” leva para tela de mapa filtrada pelo material
- botão “registrar descarte” leva para formulário já com material pré-selecionado

11. Pontos de coleta / mapa
- clicar em marcador abre painel lateral com detalhes
- botão “ver rota” abre modal ilustrativo
- botão “solicitar coleta” leva para novo pedido
- filtro por tipo altera marcadores exibidos

12. Pedidos de coleta
- botão “Novo pedido” abre formulário ou wizard
- clicar em pedido abre detalhes
- abas por status atualizam a tabela

13. Novo pedido de coleta
- fluxo em etapas:
  etapa 1 upload de imagem
  etapa 2 seleção de materiais
  etapa 3 quantidade
  etapa 4 endereço
  etapa 5 revisão
  etapa 6 confirmação
- botões avançar e voltar em cada etapa
- envio final mostra confirmação visual

14. Notificações
- clicar em uma notificação abre detalhe
- ao abrir, marcar como lida
- filtros lidas/não lidas atualizam a lista
- ação “marcar todas como lidas”

15. Perfil
- editar dados abre formulário lateral
- alterar preferências salva com toast
- sair da conta abre modal de confirmação

16. Dashboard empresarial
- filtros por período atualizam gráficos e tabelas
- clicar em um card abre relatório detalhado
- clicar em tabela abre registro vinculado
- clicar em “Gerenciar workspace” abre a tela de workspace empresarial
- clicar em “Vincular usuários” abre modal de vínculo
- clicar em “Convites pendentes” abre lista de solicitações

17. Gestão do workspace empresarial
- botão “Vincular usuário existente” abre modal com busca
- botão “Convidar novo usuário” abre formulário de convite
- clicar em membro abre tela de detalhes do membro
- filtros por perfil UC e UP atualizam a tabela
- botão remover vínculo pede confirmação
- botão editar vínculo abre drawer lateral
- botão aprovar solicitação atualiza status e mostra toast

18. Fluxo de vínculo no workspace
- UE seleciona usuário UC ou UP
- define setor, unidade ou equipe
- confirma vínculo
- sistema mostra feedback visual
- usuário vinculado passa a aparecer no workspace empresarial
- registros do usuário vinculado podem ser visualizados no painel consolidado da empresa

19. Painel administrativo
- cards levam para módulos de gestão
- clicar em “Usuários” abre tabela de usuários
- clicar em “Permissões” abre matriz de permissões
- clicar em “Logs” abre monitoramento
- clicar em “Conteúdos” abre gestão de campanhas e materiais educativos

20. Gestão de usuários
- busca filtra tabela em tempo real
- editar abre modal ou drawer
- salvar alterações mostra feedback de sucesso
- bloquear usuário pede confirmação

21. Gestão de permissões
- toggles alteram permissões por perfil
- botão salvar mostra toast
- botão restaurar volta à configuração padrão

22. Tela técnica do sistema
- cards clicáveis explicam:
  Supabase
  mock de dados
  Make
  migração para conexão real
- usar hover com explicações curtas

Usar transições suaves entre páginas, modais em overlay, drawers laterais, hover states em cards, botões e tabelas, além de feedback visual claro em ações principais.
