# EstudaLab

Portal educativo independente com aulas, flashcards, simulados de 15 questões e prática de redação no estilo ENEM.

## Matérias

- Biologia
- Física
- Matemática
- Produção Textual

## Como usar

Acesse a versão online pela Vercel ou abra as páginas HTML em um navegador. O progresso de estudo fica salvo localmente no navegador. A função `api/corrigir.js` foi escrita para execução na Vercel; a correção remota depende de disponibilidade e configuração do AI Gateway. A nota estimada de redação não substitui a avaliação oficial.

## Privacidade

O site não inclui informações pessoais, nomes de estudantes, instituições escolares ou cidades. Nomes de professores e cientistas citados como referência pública são preservados.

## Publicação

Projeto estático com endpoint serverless em `api/corrigir.js`, sem necessidade de framework de front-end.

## Desenvolvimento e verificações

Para testar a página inicial: `node --test tests/home.test.cjs` (Node.js 22 ou superior). Não há dependências de front-end nem etapa de build.

Para pré-visualizar: `python -m http.server 4173 --bind 127.0.0.1`, depois abra `http://127.0.0.1:4173/`. A API serverless continua dependendo da Vercel.

A direção visual e o escopo do primeiro incremento estão em `docs/interface-audit.md`. Os renders decorativos da entrada ficam em `assets/*-3d.webp`; a página mantém as chaves de progresso existentes e nunca grava dados de estudo.
