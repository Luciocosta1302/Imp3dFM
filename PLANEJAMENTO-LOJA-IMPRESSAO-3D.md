# Loja de impressão 3D do Felipe

**Plano de implementação para o Claude Code · versão 1.1 · 16 de novembro de 2026**

> **Atualização 1.1:** Felipe informou que pagou **R$ 120 pelo quilo do rolo**, ou seja, **R$ 0,12/g** de filamento. Faltam confirmar o material desse rolo, o peso líquido (se é rolo de 1 kg) e o custo por hora da máquina.

## 1. O que será entregue

Uma loja responsiva, publicada em um domínio do Felipe, com vitrine de peças prontas, pedidos de impressão personalizada e painel administrativo privado. O diferencial é o cliente enviar um STL e receber uma **estimativa antes de solicitar**. Felipe recebe o arquivo e o preço mostrado ao cliente, confere ambos e confirma ou ajusta o orçamento pelo WhatsApp.

| Entrega | Escopo combinado | Valor de referência da conversa |
|---|---|---:|
| 1. Loja e painel | Vitrine, formulário, anexos privados, WhatsApp, login, calculadora interna, gestão de pedidos e catálogo, publicação | R$ 1.800 |
| 2. Estimativa automática | Fatiamento no servidor, cálculo prévio, valor mostrado ao cliente salvo no pedido e fluxo de revisão | R$ 1.200 |
| Total | Duas etapas, com a primeira funcionando de forma independente | **R$ 3.000** |

Os valores são a proposta discutida. Confirme o valor e o prazo da segunda etapa depois do protótipo com a impressora do Felipe. Registre à parte os custos recorrentes de domínio, infraestrutura e eventual manutenção. O domínio, a produção e as respectivas cobranças devem ficar sob titularidade do Felipe, com acesso de desenvolvimento delegado ao Lúcio.

**Recorte para lançar.** Um perfil de impressora, um material inicial e STL para a estimativa. O cliente pode pedir análise manual com descrição, medidas e fotos mesmo sem STL. A vitrine exibe peças prontas com preço publicado e contato por WhatsApp. Pagamento online, conta do cliente, rastreamento público, marketplaces, múltiplas impressoras e cálculo com 3MF/OBJ ficam para versões futuras.

## 2. Decisões e dados para obter do Felipe

| Informação | Quando será necessária |
|---|---|
| Nome da loja, logo, cores, WhatsApp, localização de atendimento e entrega/retirada | Antes de publicar a vitrine. Em desenvolvimento, usar conteúdo de demonstração identificado. |
| Modelo e dimensões úteis da impressora, bico, perfil exportado do fatiador, configuração de suportes e material inicial | Antes de validar o protótipo de estimativa. Usar o perfil que Felipe realmente utiliza, com versão identificada. |
| Preço e peso do rolo, tarifa de energia, consumo médio, preço da impressora e vida útil estimada, ou custo por hora aprovado | Antes de publicar valores. Nenhum valor fictício deve aparecer ao cliente. **Recebido:** R$ 120/kg (R$ 0,12/g). **Pendente:** material do rolo, peso líquido, custo por hora (energia + desgaste). |
| Acréscimo sobre o custo, pedido mínimo, regra de acabamento e frete | Antes de habilitar a estimativa. Proposta inicial: estimativa cobre a impressão. Frete e acabamento, quando houver, são confirmados à parte. |
| Fotos, descrições, preços das peças prontas e permissão de uso das imagens | Antes de preencher o catálogo real. |
| E-mail da conta admin, contato para privacidade, prazos de retenção e backup, e quem cuidará da manutenção | Antes de receber pedidos reais. |

## 3. Telas e fluxos

| Tela | Conteúdo e ações |
|---|---|
| Início e catálogo | Apresentação da loja, produtos publicados, fotos, preço e botões para solicitar impressão personalizada ou falar pelo WhatsApp. Produto indisponível tem indicação clara. |
| Detalhe do produto | Fotos, descrição, material, dimensões, preço e botão de WhatsApp com referência da peça. |
| Solicitar impressão | Upload de STL, confirmação das dimensões em milímetros, quantidade, material disponível, cor, prazo desejado e observações. Segundo caminho com descrição, medidas e fotos para análise manual. |
| Resultado da estimativa | Estados de envio, fila, processamento, estimativa pronta e análise manual. Exemplo de interface: **Estimativa para 2 unidades · R$ 130,19**. Texto: “Felipe vai revisar o modelo e confirmar o preço final pelo WhatsApp”. O valor do exemplo é ilustrativo. Contato só é solicitado na hora de enviar o pedido. |
| Confirmação da solicitação | Protocolo e botão opcional de WhatsApp. A mensagem leva o protocolo e, se pertinente, o valor estimado. A solicitação é salva antes de mostrar a confirmação. |
| Painel administrativo | Contagem e lista por status, busca por protocolo/nome e filtros de período e status, com paginação. Ficha com contato, anexos, dimensões, prazo, quantidade, estimativa, orçamento final e histórico. |
| Calculadora e configurações | Calculadora na ficha e uso avulso para precificar o catálogo. Cadastro de materiais, custo da máquina, acréscimo e pedido mínimo. Felipe pode confirmar ou ajustar o valor e abrir o WhatsApp com a mensagem do orçamento. |
| Gestão do catálogo | Criar, editar, publicar e despublicar produtos. Aplicar preço calculado é uma ação explícita. |

**Fluxo administrativo:** Novo → Orçado → Aprovado → Imprimindo → Pronto → Entregue. Cancelado é um encerramento possível. Felipe registra **Orçado** após comunicar o valor final e **Aprovado** após o cliente aceitar. Abrir o WhatsApp apenas prepara a mensagem. O painel não consegue confirmar que ela foi enviada ou aceita.

**Fallback público:** “Ainda dá para solicitar. Felipe vai analisar o arquivo e responder pelo WhatsApp.” Usar quando não houver STL, o perfil estiver indisponível, a fila estiver no limite, o arquivo não for processável ou a peça exigir revisão. Arquivo inválido é rejeitado; o cliente pode substituí-lo ou enviar descrição e fotos. Alterar STL, escala, material ou quantidade invalida a estimativa atual e aciona um novo cálculo.

## 4. Arquitetura e responsabilidades

| Componente | Responsabilidade |
|---|---|
| **Next.js com TypeScript** | Vitrine, formulário, painel, sessões de admin, validação no servidor e integração entre serviços. Um repositório privado no GitHub. |
| **Supabase Postgres, Auth e Storage** | Dados de pedidos, orçamentos, fila, login administrativo, políticas RLS e armazenamento de arquivos. Bucket privado para anexos de clientes. Bucket separado para fotos prontas para divulgação, ou entrega pública controlada se Felipe precisar manter fotos de rascunho privadas. |
| **Processador em Docker** | Serviço separado na produção para rodar o fatiador. Buscar trabalhos em uma fila no Postgres, validar o modelo, rodar com perfil aprovado e registrar peso, tempo e resultado. Pode ser um worker na Render ou serviço equivalente. Validar o consumo de CPU, RAM e tempo antes de contratar a instância. |
| **WhatsApp** | Link de contato aberto pelo usuário ou pelo Felipe. A confirmação acontece na conversa. |
| **Claude Code** | Ajuda a planejar, escrever e revisar o código. Integração MCP do Supabase, se usada, apontada ao projeto de desenvolvimento. Produção é operada pelo app e pelo processador, com credenciais próprias e escopo restrito. |

**Sequência do fluxo automático:** navegador → Next.js cria sessão temporária e autoriza upload → Supabase Storage privado recebe o arquivo → Next.js valida a conclusão e enfileira → processador roda o fatiador → servidor calcula a estimativa → navegador consulta o resultado → cliente envia os dados de contato → Postgres cria o pedido e vincula o arquivo e a estimativa → painel mostra o pedido.

- O navegador recebe autorização de upload apenas para um caminho aleatório criado pelo servidor. Validar arquivo efetivamente armazenado e associá-lo à sessão antes de enfileirar. Restringir quem pode consultar o andamento e reutilizar o resultado por sessão; o identificador de uma estimativa ou protocolo sozinho não concede acesso.
- Usar sessão temporária com expiração e vínculo com o navegador. Retornar no endpoint público somente o estado necessário, o valor estimado, o total de unidades e mensagens apropriadas. Preço, status e IDs de objetos recebidos do navegador passam por verificação no servidor.
- Iniciar com concorrência limitada. A fila deve ter aquisição atômica, prazo de posse e recuperação de execuções interrompidas. Conclusões só são aceitas enquanto o processador detiver a tentativa ativa. Repetir falhas transitórias de forma limitada e encaminhar falhas definitivas à análise manual.
- A criação do pedido, a vinculação aos registros já verificados, a cópia da estimativa e o primeiro evento de status acontecem na mesma transação. Upload e banco são sistemas diferentes. Limpar arquivos abandonados em tarefa de expiração, conferindo o vínculo com o pedido antes de remover. Reenvios da mesma solicitação devem recuperar o protocolo original.
- O processador busca apenas o próprio trabalho e o objeto aprovado, usando identidade ou rota interna com permissões específicas. A fila e as configurações de preço são privadas. Evitar conceder ao processador a chave que dá acesso irrestrito ao banco. HTTPS, criptografia dos serviços gerenciados e acessos separados por ambiente.

## 5. Modelo de dados inicial

| Registro | Campos e invariantes principais |
|---|---|
| `products` | Nome, slug único, preço em centavos, descrição, fotos, disponibilidade e estado de publicação. Exposição pública limitada aos campos da vitrine e produtos publicados. |
| `materials` e `pricing_settings` | Peso e preço do rolo, custo por hora, acréscimo, pedido mínimo e estado ativo. Configurações privadas e versionadas. |
| `print_profiles` | Modelo da máquina, material, dimensões da mesa, identificador e versão do perfil, versão do fatiador. Perfis aprovados por Felipe. |
| `estimate_jobs` | Sessão, objeto de entrada, dimensões, escala, material, quantidade, perfil, estado, tentativas, prazo de posse, tempo, peso, valor sugerido e expiração. Guardar o contexto do cálculo. |
| `orders` | ID interno, protocolo público, nome, telefone, descrição, cor, material, prazo, dimensões, quantidade, status, chave única de idempotência e datas. Sem leitura pública. |
| `order_files` | Pedido, caminho privado, nome original para identificação, tamanho, formato e validação. Nome interno gerado pelo servidor. |
| `quotes` | Revisões imutáveis com estimativa exibida, valor final, versão dos parâmetros, entradas, componentes de custo e autor. Ajustes geram nova revisão. |
| `order_status_history` | Pedido, status anterior e novo, autor e data. Mudança e evento gravados juntos. |
| `admin_memberships` | Usuário do Supabase Auth autorizado a administrar. A concessão de acesso acontece por processo controlado pelo responsável. |

Criar migrações SQL versionadas, chaves estrangeiras e restrições de preço e quantidade, índices para status/data e para aquisição de fila. Habilitar RLS em tabelas expostas pela API. Aplicar políticas e permissões com negação por padrão, escopo mínimo e validação de papel administrativo. Mudanças simultâneas no status usam versão ou verificação do estado esperado para evitar sobrescrever outra alteração.

## 6. Regra de preço e fatiamento

```text
custo_material = peso_total_g × (preço_rolo ÷ peso_rolo_g)
horas_decimais = horas + (minutos ÷ 60)
custo_máquina = horas_decimais × custo_por_hora
custo_total = custo_material + custo_máquina
preço_lote = max(pedido_mínimo, custo_total × (1 + acréscimo_percentual ÷ 100))
```

- `custo_por_hora` já inclui energia e desgaste. Para formar esse valor, Felipe pode usar `consumo_médio_kW × tarifa_R$/kWh + preço_impressora ÷ vida_útil_em_horas`. Evitar somar energia novamente. `135%` significa acréscimo sobre o custo. Teste do briefing: **134 g a R$ 0,10/g + 10h30 a R$ 4/h = R$ 55,40 de custo; preço de R$ 130,19** com acréscimo de 135%, se o mínimo não for maior. Esse caso fica como teste fixo da fórmula. **Com o preço real do rolo informado pelo Felipe (R$ 120/kg = R$ 0,12/g)** e mantendo provisoriamente R$ 4/h: 134 g × R$ 0,12 = R$ 16,08 + R$ 42,00 de máquina = **R$ 58,08 de custo; preço de R$ 136,49**. O custo por hora ainda precisa ser confirmado por Felipe.
- Usar números decimais de precisão definida internamente e gravar dinheiro como centavos inteiros. Arredondar o total para centavos ao final. Se exibir valor unitário, indicar arredondamento e manter o total oficial do lote. Gramas e horas da calculadora são sempre do lote. Aplicar o mínimo uma vez à solicitação.
- Padronizar: STL será interpretado em milímetros após confirmação das dimensões. Fixar versão do fatiador e perfil com impressora, material, camada, paredes, preenchimento, orientação e suportes. Fixar a forma de distribuir as cópias na mesa e usar peso e tempo do lote. Se o lote não couber no processo validado, enviar à avaliação manual até suportar múltiplas mesas.
- A estimativa depende do fatiamento do modelo com esse perfil. Começar com três ou mais STLs de referência aprovados por Felipe, incluindo uma peça que precise de suporte e um lote de múltiplas peças. Comparar peso e tempo com o mesmo perfil na ferramenta do Felipe; diferenças além da tolerância acordada devem ser explicadas antes da publicação. Registrar também latência e pico de memória com arquivo real representativo.
- Selecionar o fatiador no protótipo conforme compatibilidade com a impressora. Verificar a CLI da versão escolhida e interpretar a saída com amostras reais. Peso/tempo ausentes, não finitos ou fora das regras de negócio resultam em análise manual. O G-code é temporário e só serve ao cálculo; não é oferecido como download nem enviado à impressora.

## 7. Sequência de implementação com prompts para copiar

No repositório, salve este plano e o `BRIEFING.md`. Em cada sessão, informe o nome do arquivo e cole apenas o prompt da fase. Comece explorando o repositório com o modo de planejamento, se disponível. Execute em desenvolvimento com dados fictícios e migrations revisadas. Depois de cada fase, examine o diff e peça ao Claude o resumo, os comandos executados, os resultados dos testes e as pendências reais. Faça um commit pequeno por entrega que funcione.

### Fase 0 · Preparação e protótipo do fatiador

> Leia o briefing e o plano. Inspecione o repositório e proponha a estrutura mínima em Next.js e TypeScript com um processo Docker independente. Crie um `CLAUDE.md` curto com comandos, regras de preço, separação de ambientes, limites de dados e critérios de entrega. Use repositório privado e credenciais locais fora do Git. Faça um protótipo do fatiador separado da aplicação: com um STL de referência e um perfil aprovado por Felipe, devolva peso e tempo em formato estruturado e documente como reproduzir. Meça latência e memória. Se faltar o perfil real, marque a validação como pendente e siga com as fases da loja.

**Entrega:** projeto local reproduzível, entradas conhecidas e resultado do protótipo comparável ao fatiador do Felipe. O teste com perfil real precede o compromisso com a etapa automática.

### Fase 1 · Banco, autenticação e estrutura do site

> Implemente a estrutura do app, config validada por ambiente e migrations para a etapa de loja e painel. Configure Supabase Auth SSR seguindo a documentação atual, login administrativo sem cadastro público, MFA e políticas RLS. Valide identidade, papel e nível de autenticação no servidor e no banco nas operações privadas. Crie buckets separados e feed público do catálogo com projeção explícita de campos. Use somente dados fictícios em preview. Entregue testes de acesso para anônimo, usuário autenticado sem papel e admin com MFA.

**Entrega:** login e logout testados, catálogo público com escopo mínimo, e acesso a pedidos bloqueado a usuários comuns mesmo pela API direta. Guardar o esquema e as políticas no Git.

### Fase 2 · Vitrine, formulário, anexos e WhatsApp

> Construa início, catálogo, detalhe do produto e formulário de impressão. Implemente o caminho manual com descrição/fotos e envio de STL para revisão. Valide campos e arquivos no servidor, use autorização de upload limitada por objeto, aplique limites, confirme que o arquivo existe antes de anexá-lo e trate reenvio com idempotência. Persista a solicitação antes de mostrar protocolo e link opcional de WhatsApp. Implemente privacidade, estados de carregamento, navegação móvel e mensagens de erro acessíveis.

**Entrega:** pedido com arquivo válido ou descrição/fotos é salvo uma vez e aparece no painel. Falha de upload é recuperável. Fechar o WhatsApp não perde o pedido.

### Fase 3 · Painel, calculadora e catálogo editável

> Construa painel com contagem, filtros, busca, paginação, detalhe e download privado. Implemente a calculadora como módulo de regras reutilizado pelo servidor e pela área administrativa, usando precisão decimal e os parâmetros editáveis. Registre versões do orçamento e mudanças de status com autor e data. Permita Felipe editar o catálogo e publicar preço calculado. Monte o link de WhatsApp com o valor final e registre a aprovação do cliente como ação administrativa explícita. Teste o caso de R$ 130,19, o pedido mínimo, lote e alteração posterior de custos.

**Entrega:** Felipe recebe e gerencia um pedido completo em homologação, desde **Novo** até **Entregue**, e consegue precificar e publicar uma peça.

### Fase 4 · Estimativa automática na solicitação

> Integre o protótipo do fatiador ao upload de STL e à solicitação. Implemente fila com estado, posse de execução e prazo, autorização por sessão, tentativas limitadas e limpeza de entradas temporárias. Rode o fatiador com perfil e argumentos definidos pelo servidor, processo sem privilégios, recursos e tempo limitados e sem acesso à rede durante o fatiamento. Use a função de preço existente, salve o perfil e os custos empregados e mostre a estimativa antes de pedir o contato. Se o cliente solicitar, associe ao pedido o resultado que ele viu. Se falhar, mantenha o caminho de análise manual. Faça testes de fila, expiração, isolamento e arquivos inválidos e compare amostras reais com Felipe.

**Entrega:** cliente visualiza estimativa antes de solicitar. Felipe vê estimativa e preço final em campos próprios. Solicitações manuais continuam possíveis durante indisponibilidade e quando o recurso automático estiver desligado por configuração.

### Fase 5 · Revisão, homologação e publicação

> Faça uma revisão defensiva do código, das migrations, das configurações e da infraestrutura com os 19 itens deste plano. Use apenas ambiente autorizado de teste e dados fictícios. Para cada item, registre arquivo ou configuração, teste executado e conclusão. Corrija as falhas encontradas e repita as verificações. Monte o roteiro de deploy e reversão, valide backups e recuperação e prepare a entrega ao Felipe. Publique somente no ambiente previsto para a entrega aprovada, com domínio e TLS configurados. Faça um teste completo pelo celular e pelo painel de produção com um pedido de teste e remova os dados de demonstração.

**Entrega:** release identificada no Git, instalação publicada, Felipe com acesso e instruções, resultados dos 19 controles, backup verificado e procedimento de reversão. Se faltar a validação do fatiador, a loja pode entrar no ar com o fluxo manual.

## 8. Os 19 pontos de segurança da imagem

Os pontos 12, 13 e 16 aparecem abreviados na imagem. Neste plano, significam **erros que revelam informações, dependências vulneráveis e dados sensíveis expostos**. Os testes abaixo são verificações defensivas para o próprio projeto, em desenvolvimento ou homologação, com dados fictícios e entradas de teste controladas.

| Nº | Ponto da imagem | Implementação neste projeto | Evidência de aceite |
|---:|---|---|---|
| 1 | `.env` exposta | Guardar segredos no gerenciador da hospedagem e em arquivos locais ignorados pelo Git. `.env.example` só com nomes e exemplos fictícios. Somente configurações públicas usam `NEXT_PUBLIC_`. A chave secreta Supabase fica no servidor. Habilitar verificação de segredos no CI e rotacionar chaves se houver exposição. | Verificar arquivos, histórico, logs e build do navegador. A URL e a chave publicável podem aparecer; a chave privilegiada nunca aparece. |
| 2 | Falta de validação no frontend | Campos obrigatórios, dimensões e quantidade positivas, formulário acessível, seleção permitida de tipos e aviso de tamanho. Erros ao lado do campo e recuperação sem apagar todo o formulário. | Em desktop e celular, entradas fora dos limites recebem uma mensagem inteligível e o foco chega ao primeiro campo com erro. |
| 3 | Falta de validação no backend | Validar todo corpo de requisição, aplicar tipos, faixas, comprimentos e enumerações. Buscar material ativo e estimativa válida no servidor. Banco também aplica restrições. | Testes de API confirmam rejeição de campos inválidos, IDs fora da sessão e valores de preço enviados pelo navegador. |
| 4 | SQL injection | Usar consultas parametrizadas via SDK ou cliente do banco. Revisar funções SQL e RPCs, evitar concatenação de entrada em consultas e restringir colunas de ordenação e filtros. | Revisão confirma uso de parâmetros e teste de integração confirma que entradas de busca com pontuação são tratadas como dados. |
| 5 | Autenticação fraca | Supabase Auth, conta admin criada por convite ou provisionamento, MFA por TOTP, e verificação de papel e nível `aal2` nas operações administrativas. Sem cadastro público. Configurar recuperação e acesso administrativo ao provedor em nome de Felipe. | Usuário autenticado sem papel e admin antes do segundo fator ficam sem acesso a dados e alterações. Admin com MFA consegue operar. |
| 6 | Exposição IDOR | Autorizar cada pedido, arquivo, orçamento e trabalho temporário no servidor. RLS e políticas de Storage por papel. Protocolo serve para referência. URLs de download são geradas após autorização e têm prazo curto. | Sessão A não lê objeto da sessão B. Anônimo e usuário sem papel não consultam pedido nem baixam anexo mesmo com um ID conhecido. |
| 7 | Senhas direto no banco | Delegar credenciais e recuperação ao Supabase Auth. Não criar campo de senha nas tabelas da aplicação, em logs, seeds ou automações. | Revisar esquema, código e logs de teste. Senha aparece apenas no fluxo protegido de autenticação. |
| 8 | Força bruta | Manter proteção de autenticação do Supabase, MFA, limites por conta e origem conforme a operação e mensagens genéricas. Monitorar repetição de falhas. | Verificação controlada confirma limitação e respostas equivalentes para conta inexistente e senha inválida. |
| 9 | Bloquear durante envio | Desabilitar/reabilitar o botão enquanto o envio estiver em andamento. No servidor, chave idempotente vinculada à sessão e restrição única. Reuso da chave com dados diferentes gera conflito controlado. | Clique duplo, duas requisições simultâneas e repetição após timeout geram um único protocolo para o mesmo envio. |
| 10 | CSRF | Manter alterações em métodos próprios, validar a origem nas operações autenticadas por cookie e aplicar proteção antifalsificação conforme o fluxo, incluindo token quando a arquitetura exigir. Usar `SameSite` compatível com login e recuperação. | Requisição de alteração oriunda de outro site é rejeitada. Alteração iniciada no painel legítimo funciona. |
| 11 | Upload sem validação | Permitir STL e fotos JPEG/PNG/WebP conforme o campo. Validar tamanho, conteúdo e estrutura, sem depender só do nome ou MIME. Limitar contagem, pixels e complexidade geométrica. Gerar nomes próprios, manter anexos privados, sanitizar/reprocessar fotos e isolar o processo que lê o STL. | Formato incompatível, arquivo excedente, imagem ilegível e STL inválido não entram no processamento. Anexos válidos funcionam e não podem ser listados publicamente. |
| 12 | Erros revelando informações | Em produção, responder com mensagem simples e ID de correlação. Manter detalhes em logs internos com redação de dados. Desativar respostas de depuração. Renderizar campos e erros como texto. | Forçar falha controlada em homologação e confirmar que a resposta não contém stack, SQL, segredos ou caminhos internos. |
| 13 | Dependências vulneráveis | Registrar lockfile e fixar versões de runtime, fatiador e imagem Docker. Rodar auditoria de dependências e imagem no CI. Atualizar regularmente e documentar exceções justificadas e com prazo. | Registrar resultados de auditoria e build. Corrigir achados críticos e altos exploráveis no contexto do projeto antes de publicar. |
| 14 | Tokens mal configurados | Usar o ciclo de sessão e atualização do Supabase Auth. Verificar identidade, validade e nível de autenticação no servidor. Separar tokens de admin, sessão temporária, upload e comunicação interna. Restringir escopo e validade. Definir logout/expiração e testar redirecionamentos autorizados. | Sessão expirada, token com finalidade errada e tentativa sem MFA são recusados. Logout encerra a sessão do navegador. |
| 15 | Rate limit | Aplicar limites compartilhados entre instâncias às rotas de upload, criação de estimativas, consulta de status e envio de pedidos. Limitar fila, concorrência e bytes por sessão/origem. Usar a origem identificada pelo proxy confiável. Resposta pública com possibilidade de repetir ou continuar manualmente. | Teste com volume pequeno e controlado confirma `429` ou limite de fila, recuperação após a janela e continuidade do fluxo manual. |
| 16 | Dados sensíveis expostos | Minimizar contato e anexos, restringir permissões, desativar cache público em respostas privadas, remover dados de logs e monitoramento, estabelecer prazo de retenção e limpeza. Revisar mensagens de WhatsApp para não incluir URLs privadas ou custos. | Inspecionar bundle, catálogo, API pública, cabeçalhos e logs. Contatos, custos, credenciais e modelos de clientes estão ausentes. |
| 17 | SSRF | Receber arquivos por upload. Referências do cliente ficam como texto. Quando baixar um arquivo para processar, resolver pelo bucket e ID aprovados no servidor. O processo do fatiador recebe somente arquivos locais e roda sem acesso à rede. | Teste do fluxo confirma que o backend não acessa destinos fornecidos pelo usuário. O processador busca somente o objeto autorizado. |
| 18 | Cookies inseguros | Usar `Secure` em produção, `SameSite` apropriado e escopo de domínio e caminho restrito. Usar `HttpOnly` nos cookies que a arquitetura mantém exclusivamente no servidor. Compatibilizar sessão e renovação com o Supabase SSR. | Conferir cookies em HTTPS e testar login, renovação, recuperação e logout com os atributos definidos. |
| 19 | CORS | Site e API sob a mesma origem. Quando navegador precisar de acesso à Storage, usar autorização específica por objeto. Se houver API própria entre origens, permitir apenas origens, métodos e cabeçalhos necessários. Nunca combinar origem curinga com credenciais. | Origem autorizada funciona e origem externa não recebe permissão CORS. Autorização das rotas continua exigida independentemente de CORS. |

**Controles específicos do fatiador.** Argumentos montados como lista fixa de opções permitidas pelo servidor, sem interpretação por shell. Executar o processo sem privilégios e sem segredos no ambiente, com diretório temporário descartável, acesso mínimo ao sistema de arquivos, limites de CPU/RAM/tempo e rede indisponível para o processo de fatiamento. O worker pode usar rede para buscar trabalhos e registrar resultados, com identidade própria. Antes de habilitar publicamente, verificar se o provedor escolhido permite impor o isolamento. Em caso de falha ou limite, encerrar o processo, limpar temporários e preservar a alternativa manual.

**Privacidade e navegador.** Exibir aviso claro sobre uso do nome, WhatsApp e arquivos para orçamento e produção, com canal para solicitar atendimento sobre os dados. Definir com Felipe prazos diferentes para upload abandonado, orçamento não concluído e pedido entregue. Aplicar CSP compatível com a origem do app e dos recursos necessários, proteção contra enquadramento, `X-Content-Type-Options: nosniff` e política de referenciador adequada. Escapar texto informado pelo cliente. Servir arquivos de clientes como download autenticado, com URLs assinadas de prazo curto quando o fluxo exigir.

## 9. Testes e aceite da entrega

| Cenário | Resultado esperado |
|---|---|
| Catálogo público | Carrega em celular. Exibe somente campos e produtos publicados. Mostra corretamente preço, fotos, disponibilidade e acesso ao WhatsApp. |
| Solicitação manual | Descrição com medidas e fotos, ou STL para análise, gera protocolo único e aparece no painel. A confirmação não depende de abrir o WhatsApp. |
| Cálculo | Referência de R$ 130,19 (R$ 0,10/g) e caso com o rolo real de R$ 120/kg resultando em R$ 136,49 (com R$ 4/h provisório), mínimo superior ao preço, conversão 10h30, arredondamento e quantidade de um lote conferem. Alterar custos depois não modifica revisão antiga. |
| Estimativa automática | Preço aparece antes dos dados de contato. Alterar modelo, escala, material ou quantidade exige reestimativa. Valor exibido é salvo e separado do preço final. |
| Arquivo problemático | Arquivo inválido é recusado. Peça fora da mesa, falha do fatiador ou tempo limite produzem mensagem clara e oferecem fluxo manual. |
| Interrupções | Fechar o WhatsApp não apaga o registro. Tentar de novo após timeout não duplica o pedido. Worker interrompido libera o trabalho para nova tentativa, e conclusão obsoleta é ignorada. |
| Painel | Felipe abre pedidos e anexos, confirma ou ajusta preço, registra aprovação e muda status. Ações simultâneas usam estado esperado e ficam no histórico. |
| Segurança e acesso | Verificações dos 19 pontos executadas com status **passou**, **falhou** ou **não se aplica**, com justificativa e evidência. Falhas que expõem dados ou permitem acesso indevido impedem a publicação do fluxo afetado. |
| Operação | Executar um teste de recuperação de backup em ambiente separado. Verificar uso de banco/arquivos, falhas de fila e alertas. Testar desativação da estimativa mantendo pedidos manuais. |

**Comandos no CI:** instalar pelo lockfile, executar lint, verificação TypeScript, testes de preço, migrações e políticas em banco de teste, testes de integração e fluxo de ponta a ponta, build e auditoria de dependências. Registrar os comandos reais no README. Usar fixtures sem dados de clientes. Conferir duas contas de acesso com papéis diferentes, além de visitante e sessão expirada.

## 10. Publicação, custos e manutenção

1. **Desenvolvimento:** use projeto local ou Supabase de dev. Versione schema, RLS e políticas de Storage em migrações. Guarde credenciais de dev e produção separadamente. Use só dados fictícios no MCP e no preview.
2. **Homologação:** Felipe testa pelo celular e valida a fórmula, as amostras reais de STL, o WhatsApp e os status. Medir latência, pico de memória, tamanho típico dos arquivos e taxa de falhas. Use a medição para fixar limites de tamanho/complexidade, capacidade da fila e tempo máximo de processamento.
3. **Produção:** preparar banco e buckets com migrações revisadas; configurar app e worker com identidades próprias; conectar o domínio e validar DNS, HTTPS e URLs de login. Ativar estimativa por configuração depois do teste de ponta a ponta. Manter uma versão anterior do app disponível e registrar como reverter código sem perder pedidos. Migrar banco de forma compatível ou planejar recuperação antes de mudanças irreversíveis.
4. **Rotina:** monitorar erros do app, fila, duração do processamento, uso de arquivos, falhas de login e avisos de cobrança. Agendar exportação e cópia de arquivos conforme a frequência combinada. Backup de banco e cópia dos anexos exigem procedimentos próprios. Definir quem recebe alertas e quem corrige problemas.
5. **Entrega ao Felipe:** domínio no nome dele, acesso ao painel e aos serviços, guia curto para cadastrar produto e material, configurar preço, orçar e atualizar status. Entregar também repositório com documentação, instruções de publicação, backup, rotação de chaves e liga/desliga da estimativa. Definir por escrito o que é suporte à entrega, manutenção recorrente e mudança de escopo.

**Referências de infraestrutura consultadas para o planejamento.** Registro.br informa R$ 40/ano pelo domínio. Supabase Free publica 500 MB de banco e 1 GB para arquivos, sem backup automático do banco e com pausa por inatividade. Serve para iniciar, com rotina de cópias e acompanhamento do uso. Na Render, os valores dependem da instância, do número de serviços e do consumo do fatiador. O plano inicial deve ser dimensionado após o protótipo. Se a opção escolhida para o site for a Vercel, use um plano compatível com a operação comercial. [Registro.br](https://registro.br/dominio/) · [Supabase Pricing](https://supabase.com/pricing) · [Backups do Supabase](https://supabase.com/docs/guides/platform/backups) · [Render Pricing](https://render.com/pricing) · [Vercel Hobby](https://vercel.com/docs/plans/hobby)

## 11. Primeiro comando para o Claude Code

```text
Leia BRIEFING.md e PLANEJAMENTO-LOJA-IMPRESSAO-3D.md. Quando houver diferença de escopo, siga o plano: o cliente deve ver uma estimativa a partir do STL antes de enviar a solicitação, e o Felipe confirma o valor final depois. Comece pela Fase 0. Mostre o que já existe no repositório, proponha a estrutura mínima e indique quais informações da impressora precisa para testar peso e tempo com um STL real. Use desenvolvimento e dados fictícios. Se o perfil do Felipe ainda não estiver disponível, prepare a base e o teste reproduzível e identifique a validação que depende dele. Ao concluir, informe arquivos alterados, testes executados e próximo passo.
```

### Documentação técnica

- [Claude Code Desktop e modos de permissão](https://code.claude.com/docs/pt/desktop)
- [Supabase Auth SSR com Next.js](https://supabase.com/docs/guides/auth/server-side/nextjs) · [MFA](https://supabase.com/docs/guides/auth/auth-mfa) · [RLS](https://supabase.com/docs/guides/database/postgres/row-level-security) · [Buckets e controles de acesso](https://supabase.com/docs/guides/storage/buckets/fundamentals) · [MCP](https://supabase.com/docs/guides/ai-tools/mcp)
- [Prusa EasyPrint e estimativas de peso e tempo](https://help.prusa3d.com/article/easyprint_898029) · [Docker na Render](https://render.com/docs/docker) · [Workers na Render](https://render.com/docs/background-workers)
- [OWASP: upload](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html) · [CSRF](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html) · [SSRF](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html) · [sessões](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html) · [autorização](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)
- [ANPD: guia de segurança da informação para agentes de pequeno porte](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia-orientativo-sobre-seguranca-da-informacao-para-agentes-de-tratamento-de-pequeno-porte)
