Atualize o protótipo web de alta fidelidade do sistema EcoSmart mantendo a identidade visual já definida do projeto, com foco nas seguintes alterações funcionais e de interface:

OBJETIVO DAS ALTERAÇÕES
Refinar o comportamento dos perfis Usuário Empresarial (UE) e Usuário Premium (UP), deixando o sistema mais coerente, rastreável e funcional dentro da proposta do MVP.

ALTERAÇÃO 1 — REGRA DE VÍNCULO ENTRE USUÁRIOS E ENTIDADE EMPRESARIAL
Implementar no protótipo a seguinte regra de negócio:

Sempre que um usuário do tipo UC (Usuário Comum) ou UP (Usuário Premium) estiver vinculado a um workspace ou entidade empresarial, todo descarte realizado por esse usuário deve ser registrado em dois níveis simultaneamente:
1. no histórico individual do próprio usuário;
2. no histórico consolidado da entidade empresarial à qual ele está vinculado.

Essa regra deve ficar clara visualmente no protótipo, para demonstrar que não existem registros soltos no sistema. Todo descarte de usuário vinculado deve alimentar automaticamente os indicadores da entidade correspondente.

COMO REPRESENTAR ESSA REGRA NO PROTÓTIPO
- Adicionar no dashboard do Usuário Empresarial um bloco ou card explicativo com a lógica:
  “Descartes realizados por membros vinculados também compõem automaticamente os indicadores da entidade.”
- Adicionar gráficos e tabelas no painel empresarial mostrando:
  - total de descartes da entidade
  - descartes por usuário vinculado
  - descartes por perfil (UC e UP)
  - descartes por setor, unidade ou equipe
  - resíduos por categoria
  - volume total consolidado da entidade
- Na tabela de registros da entidade, cada descarte deve exibir:
  - nome do usuário que realizou
  - perfil do usuário
  - entidade vinculada
  - setor/unidade, quando existir
  - data
  - tipo de resíduo
  - quantidade
- Na tela de registrar descarte do UC e do UP, quando o usuário estiver vinculado a uma entidade, mostrar de forma discreta e elegante algo como:
  “Este descarte também será vinculado à entidade [nome da entidade].”
- Criar um fluxo visual no protótipo mostrando que o descarte individual também alimenta automaticamente o painel institucional.

TELAS A AJUSTAR NO PERFIL EMPRESARIAL
No perfil UE, ajustar ou criar as seguintes áreas:

1. Dashboard Empresarial
- card “Usuários vinculados”
- card “Descartes recebidos dos membros”
- card “Volume total por categoria”
- card “Indicadores consolidados da entidade”
- gráfico de descartes por período
- gráfico de distribuição por perfil: UC x UP
- tabela de últimos registros vinculados
- filtro por usuário, perfil, setor, unidade e período

2. Tela de gestão do workspace empresarial
- listar os usuários vinculados à entidade
- diferenciar visualmente usuários UC e UP
- mostrar status do vínculo
- permitir visualizar detalhes do membro
- permitir filtrar por perfil, setor e unidade

3. Tela de detalhes do membro vinculado
- dados do usuário
- perfil do usuário
- entidade vinculada
- histórico individual de descartes
- contribuição desse usuário para os dados consolidados da entidade
- total descartado
- frequência de participação
- categorias mais recorrentes

ALTERAÇÃO 2 — DIFERENCIAÇÃO MAIS CLARA ENTRE USUÁRIO COMUM E USUÁRIO PREMIUM
Atualmente o perfil Premium está muito parecido com o perfil Comum. Ajustar o protótipo para que o Usuário Premium tenha identidade própria dentro do sistema.

CONCEITO DO PERFIL PREMIUM
O Usuário Premium deve ser representado como um perfil voltado para:
- catadores
- recicladores
- usuários com alta participação sustentável
- pessoas interessadas em benefícios, incentivos e acompanhamento ampliado

O Usuário Comum deve continuar sendo o perfil básico, simples e acessível, com foco em registro de descarte, consulta de histórico básico e acesso a informações educativas.

O Usuário Premium deve manter tudo que o UC já faz, mas com recursos adicionais e mais valor percebido.

FUNCIONALIDADES VISUAIS E DE UX PARA DIFERENCIAR O PREMIUM
Adicionar no dashboard do Usuário Premium:

- card “Volume coletado no mês”
- card “Pontuação acumulada”
- card “Benefícios disponíveis” ou “Benefícios futuros”
- card “Materiais mais registrados”
- gráfico de desempenho mensal
- bloco “Minha evolução”
- bloco “Meu impacto ambiental ampliado”
- botão “Exportar relatório”
- área “Histórico detalhado”
- área “Oportunidades de benefício”
- área “Metas ou desempenho sustentável”

REGRAS DE DIFERENCIAÇÃO ENTRE UC E UP
Usuário Comum:
- registro simples de descarte
- histórico básico
- participação ambiental simplificada
- acesso à central educativa
- acesso a pontos de coleta
- experiência mais enxuta

Usuário Premium:
- tudo que o UC faz
- histórico detalhado
- métricas ampliadas
- comparativos mensais
- acompanhamento de produtividade
- visualização de materiais mais registrados
- possibilidade futura de recompensas e benefícios
- relatórios pessoais
- exportação de dados
- painel mais robusto

AJUSTES NAS TELAS DO PREMIUM
1. Dashboard Premium
- manter a base do dashboard do usuário comum
- adicionar métricas mais completas
- dar mais destaque visual a desempenho, pontuação e benefícios
- deixar a interface com sensação de maior robustez analítica

2. Histórico Premium
- filtros mais detalhados
- comparativos por período
- tabela mais rica
- possibilidade visual de exportação

3. Tela de impacto Premium
- gráficos mais completos
- resumo de evolução
- comparativo entre meses
- sugestões personalizadas para aumentar impacto e benefícios

AJUSTES DE NAVEGAÇÃO E MICROCOPY
Adicionar textos curtos e claros no sistema para reforçar essas diferenças:
- no Premium: “Acompanhe seu desempenho e benefícios”
- no Empresarial: “Os registros dos membros vinculados compõem automaticamente os indicadores da entidade”
- no descarte vinculado: “Este registro também será contabilizado na entidade associada”

REQUISITOS VISUAIS
- manter identidade visual EcoSmart
- estética sustentável, tecnológica e amigável
- desktop-first
- sidebar verde escura
- cards arredondados
- gráficos limpos
- tabelas organizadas
- badges para diferenciar perfis UC, UP e UE
- destaque visual para usuários vinculados e para relatórios consolidados
- interface clara, acessível e profissional

INTERAÇÕES A ADICIONAR
1. Quando UE abrir detalhes de um membro vinculado:
- mostrar contribuição individual para a entidade

2. Quando UC ou UP registrar descarte estando vinculado a uma entidade:
- mostrar mensagem visual informando que o descarte também será computado na entidade

3. No dashboard empresarial:
- clicar em um usuário da tabela deve abrir seus detalhes
- clicar em um gráfico deve abrir visualização detalhada por período ou categoria

4. No dashboard premium:
- clicar em “Exportar relatório” abre modal de exportação
- clicar em “Benefícios” abre painel explicativo de vantagens futuras
- clicar em “Minha evolução” abre visão detalhada do desempenho

RESULTADO ESPERADO
O protótipo deve deixar claro que:
- o perfil empresarial consolida automaticamente os descartes dos usuários vinculados
- os registros permanecem rastreáveis por usuário e por entidade
- o perfil premium possui proposta de valor própria, diferente do usuário comum
- o sistema fica mais coerente, sem pontas soltas, e com melhor diferenciação entre os perfis