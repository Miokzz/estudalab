# Revisão científica: Biologia e Física

Data: 2026-11-10. Escopo: leitura dos objetos de conteúdo `L`, `FC`, `EXTRA` e `BANK` de Biologia e `LESSONS`, `CARDS`, `QUIZ` e `EXTRA_QUIZ_V7` de Física. O resultado é uma revisão editorial delimitada e 60 questões originais, não uma certificação de todo o site, dos laboratórios ou de suas interações.

## Banco novo

`assets/science-questions.js` exporta `EstudaLabScience` no navegador e `module.exports` em CommonJS. Cada registro tem id estável, título de aula existente em `topic`, escopo, enunciado, quatro alternativas distintas, índice da resposta, explicação, dificuldade e URL oficial. As situações e alternativas foram redigidas para este projeto; as fontes conferem os conceitos, sem reproduzir exercícios do livro.

| Biologia: tópico | Novas questões |
|---|---:|
| Sistema nervoso | 10 |
| Hipotálamo, hipófise e tireoide | 3 |
| Glândulas e suas funções | 3 |
| ADH e controle da água | 2 |
| Tabela dos hormônios | 2 |
| Ciclo menstrual e período fértil | 2 |
| Gráficos e menopausa | 1 |
| Sistema reprodutor masculino | 2 |
| Ovogênese e meiose | 2 |
| Fecundação, nidação e endométrio | 3 |

Escopos de Biologia: Sistema nervoso 10, Endocrinologia 10, Reprodução 10. Dificuldades: easy 10, medium 14, hard 6. O recorte de sistema nervoso inclui também os itens suplementares do banco anterior. Após a integração e deduplicação, os três escopos comportam sessões de 15 questões, cobertas por teste automatizado.

| Física: tópico | Novas questões |
|---|---:|
| Espelhos esféricos | 12 |
| Corrente produz campo magnético | 6 |
| Força magnética | 6 |
| Indução eletromagnética | 6 |

Escopos de Física: Óptica 12 e Eletromagnetismo 18. Dificuldades: easy 3, medium 21, hard 6. Há perguntas de aplicação, hipótese experimental, direção vetorial, interpretação de sinais e cálculo. Objetos ópticos são reais salvo indicação explícita, e os cálculos usam a aproximação paraxial e a convenção real-positivo.

## Correções e ressalvas no conteúdo anterior

As seis correções abaixo foram aplicadas aos dois `app.js` nesta etapa.

1. Física, `CARDS`, frente “Qual espelho sempre gera imagem virtual, direita e menor?”: acrescentar **para objetos reais**. A afirmação sem qualificação não cobre objetos virtuais. A aula e a questão `e3` já explicitam a condição. Fonte: [espelhos esféricos](https://openstax.org/books/university-physics-volume-3/pages/2-2-spherical-mirrors).
2. Física, `CARDS`, frente “Qual relação entre foco e raio da curvatura?” com resposta `f = R/2`: esclarecer que R é algébrico, ou escrever `|f| = |R|/2` quando R for dado em módulo. O corpo da aula deve usar a mesma convenção; f é negativo no convexo.
3. Física, `EXTRA_QUIZ_V7`, `plus12`, “Se a velocidade de uma carga dobra e o ângulo é mantido, a força magnética...”: explicitar campo, carga e **ângulo de 90°**, ou outro ângulo de força não nula. Com θ = 0°, “Dobra” e “Vira zero” descrevem ambiguamente uma força que já era zero. Fonte: [forças e campos](https://openstax.org/books/university-physics-volume-2/pages/11-2-magnetic-fields-and-lines).
4. Física, aula `corrente`, trecho `μ₀ = 4π × 10⁻⁷`: tratar como aproximação didática (`≈`) em vez de valor SI exato. Nenhuma resposta numérica escolar existente muda na precisão dada. Fonte: [NIST, revisão do SI e permeabilidade](https://www.nist.gov/publications/permeability-vacuum-and-revised-international-system-units).
5. Biologia, aula `nervoso`, arco de retirada: explicitar um ou mais **interneurônios na medula** entre sensitivo e motor. O diagrama atual resume a integração medular, mas pode induzir leitura monossináptica do reflexo de retirada; reflexos monossinápticos existem, porém não representam essa retirada. Fonte: [respostas motoras](https://openstax.org/books/anatomy-and-physiology-2e/pages/14-3-motor-responses).
6. Biologia, macete `glandulas`, “INSULINA põe glicose para dentro das células”: útil como resumo, mas convém dizer “favorece captação em tecidos responsivos e armazenamento”; nem toda captação celular de glicose depende de insulina. A explicação mais completa evita universalização. Fonte: [pâncreas endócrino](https://openstax.org/books/anatomy-and-physiology-2e/pages/17-9-the-endocrine-pancreas).

Não foi encontrado gabarito numérico incorreto nos exemplos e questões numéricas dos bancos de Física lidos: fio 5 A/5 cm = 20 μT, força da carga = 10⁻³ N, bobina 10×0,04/0,2 = 2 V, espelho f=20/p=60 → p′=30 cm, fio 3×2×0,5 = 3 N, fluxo 6/3 = 2 V e bobina 10×0,2/1 = 2 V. Isso não testa o código dos simuladores.

## Duplicação conceitual no banco anterior

São pares que avaliam essencialmente a mesma recuperação de informação, mesmo com palavras/ordem de alternativas diferentes; não são alegações de strings idênticas. A numeração E de Biologia é baseada no índice zero de `EXTRA`.

| Arquivo / ids | Enunciados ou identificação inequívoca | Ação editorial sugerida |
|---|---|---|
| Biologia `L7` / `E18` | “Quais células produzem testosterona nos testículos?” / “Qual associação está correta?” com Leydig → testosterona | Reescrever um item como aplicação ou conservar só um |
| Física `h3` / `plus1` | “Se você quebrar um ímã ao meio...” / “Um ímã em forma de barra é dividido...” | Conservar um |
| Física `f2` / `plus9` | Carga movendo-se paralelamente a B / partícula positiva paralela a B | Conservar um |
| Física `i1` / `plus14` | Espira parada em campo constante / ímã parado junto a espira, sem mudanças | Variar a situação de fluxo |
| Física `i4` / `plus13` | Lenz: oposição à variação do fluxo | Conservar um |
| Física `e1` / `plus20` | Raio 40 cm → foco de módulo 20 cm | Conservar o item com convenção explícita |
| Física `e3` / `plus17` | Imagem de objeto real diante de convexo: virtual, direita e menor | Conservar um |

Também há repetição deliberada entre aula, flashcard e simulado. Exemplos: questão da aula `corrente` e `plus5` (dobrar I dobra B); questão da aula `espelhos`, `e3` e `plus17`; questão da aula `forca`, `f2` e `plus9`. Não remover flashcards só por compartilharem um objetivo com a aula; a redundância problemática é principalmente entre questões equivalentes no mesmo sorteio.

## Fontes oficiais consultadas

OpenStax é um projeto da Rice University. Os links específicos também estão em cada questão; os conceitos do banco foram cotejados com estas seções:

- [Tecido nervoso](https://openstax.org/books/anatomy-and-physiology-2e/pages/12-2-nervous-tissue), [potencial de ação](https://openstax.org/books/anatomy-and-physiology-2e/pages/12-4-the-action-potential), [sinapses](https://openstax.org/books/anatomy-and-physiology-2e/pages/12-5-communication-between-neurons), [respostas motoras](https://openstax.org/books/anatomy-and-physiology-2e/pages/14-3-motor-responses), [sistema autônomo](https://openstax.org/books/anatomy-and-physiology-2e/pages/15-1-divisions-of-the-autonomic-nervous-system).
- [Hipófise e hipotálamo](https://openstax.org/books/anatomy-and-physiology-2e/pages/17-3-the-pituitary-gland-and-hypothalamus), [tireoide](https://openstax.org/books/anatomy-and-physiology-2e/pages/17-4-the-thyroid-gland), [pâncreas endócrino](https://openstax.org/books/anatomy-and-physiology-2e/pages/17-9-the-endocrine-pancreas).
- [Sistema reprodutor testicular](https://openstax.org/books/anatomy-and-physiology-2e/pages/27-1-anatomy-and-physiology-of-the-testicular-reproductive-system), [sistema reprodutor ovariano](https://openstax.org/books/anatomy-and-physiology-2e/pages/27-2-anatomy-and-physiology-of-the-ovarian-reproductive-system), [meiose](https://openstax.org/books/biology-2e/pages/11-1-the-process-of-meiosis), [desenvolvimento embrionário](https://openstax.org/books/anatomy-and-physiology-2e/pages/28-2-embryonic-development).
- [Forças e campos magnéticos](https://openstax.org/books/university-physics-volume-2/pages/11-2-magnetic-fields-and-lines), [movimento de cargas](https://openstax.org/books/university-physics-volume-2/pages/11-3-motion-of-a-charged-particle-in-a-magnetic-field), [força sobre fio](https://openstax.org/books/university-physics-volume-2/pages/11-4-magnetic-force-on-a-current-carrying-conductor), [campo de fio longo](https://openstax.org/books/university-physics-volume-2/pages/12-2-magnetic-field-due-to-a-thin-straight-wire), [solenoides](https://openstax.org/books/university-physics-volume-2/pages/12-6-solenoids-and-toroids).
- [Faraday](https://openstax.org/books/university-physics-volume-2/pages/13-1-faradays-law), [Lenz](https://openstax.org/books/university-physics-volume-2/pages/13-2-lenzs-law), [espelhos esféricos](https://openstax.org/books/university-physics-volume-3/pages/2-2-spherical-mirrors).

## Verificações realizadas e limites

- `node --check assets/science-questions.js`: sintaxe aprovada.
- Verificação Node dos 60 registros: campos obrigatórios, ids e enunciados únicos, quatro alternativas distintas e não vazias, gabarito inteiro 0–3, dificuldade permitida, URL OpenStax. Exportações CommonJS e global em contexto VM verificadas.
- 14 verificações aritméticas independentes com `assert`: posições/aumentos de espelhos, campo de fio, razão de campos, solenoide, forças, fluxo, fem e 23×2 cromátides. Sentidos foram conferidos por produto vetorial/mão direita e Lenz.
- O script está integrado ao catálogo central e usa ids estáveis. Os testes de conteúdo verificam o catálogo deduplicado, escopos de 15 itens e preservação dos gabaritos ao embaralhar.
- Dificuldade é classificação editorial, sem calibração por desempenho real. Modelos fisiológicos são introdutórios; não constituem interpretação clínica ou orientação contraceptiva. Não foram auditadas todas as exceções biomédicas, história científica em detalhe ou simuladores.
