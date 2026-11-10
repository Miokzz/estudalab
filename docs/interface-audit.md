# Primeira melhoria: entrada do EstudaLab

## Direção e escopo

Preservar a estética jovem do produto: blocos coloridos, verde profundo e lima, títulos expressivos e linguagem descontraída. Profissionalizar o acabamento sem converter a plataforma em uma interface corporativa. Combinar ilustrações 3D na navegação com experiências interativas nos laboratórios em incrementos posteriores.

Este incremento altera somente a página inicial e seus assets. As quatro páginas de estudo e a API permanecem sem alterações. Os renders são ilustrações decorativas, não modelos científicos interativos.

## Auditoria da interface existente

Inspeção visual em navegador da entrada e das quatro áreas, acompanhada de leitura do HTML/CSS e de pontos relevantes do JavaScript. Não é uma auditoria funcional, científica ou de segurança completa da plataforma.

- **Entrada:** quatro áreas em grade de três colunas deixavam Redação isolada; ilustrações absolutas competiam com texto; grandes sombras e gradientes repetiam a mesma ênfase. O botão de Redação tinha texto verde escuro sobre fundo escuro. A barra de 100% de Redação era decorativa, mas parecia progresso.
- **Biologia e Física:** banners, estatísticas e cards têm muitos elementos com peso visual semelhante. Ícones e marca variam entre as áreas.
- **Matemática:** navegação e marca divergem das demais áreas; há afirmações sobre material e fotos do estudante sem contexto na página pública.
- **Redação:** repetição de painéis, categorias com emojis e área de meta competem com escolher um tema e escrever. A confiabilidade da avaliação exige revisão própria.
- **Código:** páginas monolíticas com CSS e JS inline, múltiplas camadas de overrides e ausência de suíte de testes no checkout inicial.
- **Achado prioritário fora do escopo:** `safeOutput` em `api/corrigir.js` substitui competências ausentes ou inválidas por zero e soma uma nota. Isso deve ser tratado antes de ampliar a correção. Não foi alterado nesta entrega.

## Implementação

- Grade 2 × 2 no desktop e uma coluna no celular, mantendo quatro blocos e suas cores.
- Família de quatro ilustrações 3D com luz/material consistentes, em área própria, sem sobrepor textos. Imagens decorativas com `alt=""`, dimensões explícitas e WebP. Total: 79.642 bytes.
- Capa mais compacta, reunindo as ilustrações e o asterisco da marca.
- Tipografia, sombras, bordas, botões e espaçamento consistentes; estados de foco e redução de movimento.
- Progresso real com elementos `progress`; nenhuma barra fictícia na oficina de redação.
- Leitura de progresso isolada por matéria, resistente a dados inválidos e armazenamento indisponível. Atualiza ao voltar para a página e em alterações de outra aba. Não escreve nem migra dados.
- CSS e JavaScript da entrada extraídos em arquivos próprios. Sem novas dependências no produto.

## Verificação

- `node --test tests/home.test.cjs`: sete testes de regressão para progresso, falhas de armazenamento, atualização e destinos de links/assets.
- `node --check assets/home.js` e compilação sintática dos quatro scripts inline das áreas existentes.
- Verificações em navegador: registradas na entrega e na memória do projeto. O teste de progresso usa a origem local, sem alterar dados em produção.
- Projeto estático, sem etapa de build, TypeScript ou lint configurados. A API de correção remota não é exercitada neste incremento.

## Próximo incremento sugerido

Corrigir o tratamento de competências ausentes na avaliação de redação, com testes que impeçam uma resposta incompleta de produzir nota confiável. Depois, avançar nos layouts de estudo e nos laboratórios 3D, um fluxo por vez.

### Evidências deste incremento

- Navegador real: 320 × 740, 390 × 844, 768 × 1024 e 1280 × 900; largura da página e dos cards sem overflow horizontal, imagens carregadas e inspeção visual concluída.
- Quatro links dos cards abrem as áreas correspondentes. Origem local sem erros de console capturados durante esses fluxos.
- Teclado: atalho para matérias, foco transferido à seção e próximo Tab no primeiro card, contorno de foco visível.
- Concluir uma aula de Biologia na origem local e retornar à entrada mostrou `1 de 10 aulas concluídas`.
- Contraste calculado para texto principal, descrições e botões: razões entre 4,68:1 e 7,51:1. Não equivale a uma auditoria WCAG completa.
- Redução de movimento inspecionada no CSS; preferência do sistema não foi emulada no navegador disponível.
- Revisão independente de direção visual nas capturas desktop/mobile: sem bloqueadores de legibilidade, sobreposição ou identidade.
