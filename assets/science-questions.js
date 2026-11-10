(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.EstudaLabScience = factory();
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";
  return {
  "biologia": [
    {
      "id": "bio-new-01",
      "topic": "Sistema nervoso",
      "scope": "Sistema nervoso",
      "prompt": "Em um experimento, um estímulo ultrapassa o limiar de um axônio. Aumentar mais a intensidade do estímulo torna cada potencial de ação maior?",
      "options": [
        "Sim, sua amplitude cresce sem limite",
        "Não; a amplitude segue o princípio do tudo ou nada",
        "Sim, mas apenas em axônios mielinizados",
        "Não ocorre mais nenhum potencial"
      ],
      "answer": 1,
      "explanation": "Após o limiar, a amplitude do potencial de ação não codifica a intensidade; a frequência pode variar.",
      "difficulty": "medium",
      "source": "https://openstax.org/books/anatomy-and-physiology-2e/pages/12-4-the-action-potential"
    },
    {
      "id": "bio-new-02",
      "topic": "Sistema nervoso",
      "scope": "Sistema nervoso",
      "prompt": "Um fármaco experimental bloqueia canais de Na⁺ dependentes de voltagem em um axônio. Qual etapa fica diretamente prejudicada?",
      "options": [
        "Liberação de hormônios pela tireoide",
        "Produção de mielina pelo sangue",
        "Fase rápida de despolarização do potencial de ação",
        "Separação de cromossomos"
      ],
      "answer": 2,
      "explanation": "O influxo de Na⁺ por esses canais produz a fase ascendente típica do potencial de ação.",
      "difficulty": "medium",
      "source": "https://openstax.org/books/anatomy-and-physiology-2e/pages/12-4-the-action-potential"
    },
    {
      "id": "bio-new-03",
      "topic": "Sistema nervoso",
      "scope": "Sistema nervoso",
      "prompt": "Dois axônios têm diâmetro semelhante; um possui mielina íntegra. Qual observação é esperada nesse axônio?",
      "options": [
        "Regeneração do potencial nos nódulos de Ranvier e condução mais rápida",
        "Ausência de qualquer canal iônico",
        "Transmissão apenas por hormônios",
        "Desaparecimento do potencial de membrana"
      ],
      "answer": 0,
      "explanation": "A mielina favorece a condução saltatória entre nódulos.",
      "difficulty": "easy",
      "source": "https://openstax.org/books/anatomy-and-physiology-2e/pages/12-2-nervous-tissue"
    },
    {
      "id": "bio-new-04",
      "topic": "Sistema nervoso",
      "scope": "Sistema nervoso",
      "prompt": "Ao tocar acidentalmente uma superfície quente, a mão é retirada antes da percepção consciente da dor. Isso mostra que:",
      "options": [
        "O encéfalo nunca recebe a informação",
        "O músculo detecta sozinho toda a dor",
        "O reflexo exige decisão voluntária prévia",
        "Circuitos medulares podem iniciar a retirada"
      ],
      "answer": 3,
      "explanation": "A integração do reflexo pode ocorrer na medula; sinais também seguem ao encéfalo.",
      "difficulty": "easy",
      "source": "https://openstax.org/books/anatomy-and-physiology-2e/pages/14-3-motor-responses"
    },
    {
      "id": "bio-new-05",
      "topic": "Sistema nervoso",
      "scope": "Sistema nervoso",
      "prompt": "Em um modelo de reflexo de retirada, o neurônio sensitivo funciona, mas a via motora ao músculo é interrompida. Qual resultado é mais coerente?",
      "options": [
        "A sensação torna-se obrigatoriamente impossível",
        "O comando não chega ao músculo por essa via",
        "O músculo secreta TSH para substituir o neurônio",
        "A informação sensitiva passa a sair pelo axônio motor"
      ],
      "answer": 1,
      "explanation": "A via eferente conduz o comando do sistema nervoso ao efetor.",
      "difficulty": "medium",
      "source": "https://openstax.org/books/anatomy-and-physiology-2e/pages/14-3-motor-responses"
    },
    {
      "id": "bio-new-06",
      "topic": "Sistema nervoso",
      "scope": "Sistema nervoso",
      "prompt": "Uma sinapse química é estudada com a entrada de Ca²⁺ no terminal pré-sináptico bloqueada. O efeito imediato esperado é:",
      "options": [
        "Aumento obrigatório da síntese de DNA",
        "Conversão do axônio em dendrito",
        "Redução da liberação de neurotransmissor por vesículas",
        "Duplicação da mielina"
      ],
      "answer": 2,
      "explanation": "A entrada de Ca²⁺ no terminal desencadeia a exocitose de vesículas sinápticas.",
      "difficulty": "hard",
      "source": "https://openstax.org/books/anatomy-and-physiology-2e/pages/12-5-communication-between-neurons"
    },
    {
      "id": "bio-new-07",
      "topic": "Sistema nervoso",
      "scope": "Sistema nervoso",
      "prompt": "Em uma sinapse química, o neurotransmissor é liberado, mas seus receptores pós-sinápticos estão bloqueados. Qual conclusão é adequada?",
      "options": [
        "O sinal químico pode deixar de produzir sua resposta pós-sináptica",
        "O neurotransmissor transforma-se em impulso luminoso",
        "O bloqueio faz o neurônio perder todos os cromossomos",
        "A ligação ao receptor deixa de ser necessária"
      ],
      "answer": 0,
      "explanation": "A resposta depende da interação do neurotransmissor com receptores apropriados.",
      "difficulty": "medium",
      "source": "https://openstax.org/books/anatomy-and-physiology-2e/pages/12-5-communication-between-neurons"
    },
    {
      "id": "bio-new-08",
      "topic": "Sistema nervoso",
      "scope": "Sistema nervoso",
      "prompt": "Após uma situação de susto, observam-se aumento da frequência cardíaca e dilatação das pupilas. Qual divisão participa desse padrão?",
      "options": [
        "Somática exclusivamente",
        "Parassimpática exclusivamente",
        "Sistema reprodutor",
        "Simpática"
      ],
      "answer": 3,
      "explanation": "O simpático participa da resposta de alerta.",
      "difficulty": "easy",
      "source": "https://openstax.org/books/anatomy-and-physiology-2e/pages/15-1-divisions-of-the-autonomic-nervous-system"
    },
    {
      "id": "bio-new-09",
      "topic": "Sistema nervoso",
      "scope": "Sistema nervoso",
      "prompt": "Durante o repouso após uma refeição, qual combinação é compatível com ação parassimpática?",
      "options": [
        "Aceleração cardíaca e inibição digestiva",
        "Redução da frequência cardíaca e estímulo digestivo",
        "Ovulação e produção de testosterona",
        "Bloqueio de toda atividade glandular"
      ],
      "answer": 1,
      "explanation": "A atividade parassimpática favorece repouso e digestão.",
      "difficulty": "easy",
      "source": "https://openstax.org/books/anatomy-and-physiology-2e/pages/15-1-divisions-of-the-autonomic-nervous-system"
    },
    {
      "id": "bio-new-10",
      "topic": "Sistema nervoso",
      "scope": "Sistema nervoso",
      "prompt": "Um estudante diz que todo movimento de músculo esquelético é consciente porque pertence ao sistema somático. O reflexo de retirada permite corrigir essa frase porque:",
      "options": [
        "Todo reflexo é produzido pelo pâncreas",
        "Músculos esqueléticos nunca recebem nervos",
        "O sistema somático também participa de respostas involuntárias",
        "O sistema somático controla somente glândulas"
      ],
      "answer": 2,
      "explanation": "A classificação somática refere-se ao efetor e à via, não exige consciência em toda resposta.",
      "difficulty": "hard",
      "source": "https://openstax.org/books/anatomy-and-physiology-2e/pages/14-3-motor-responses"
    },
    {
      "id": "bio-new-11",
      "topic": "Hipotálamo, hipófise e tireoide",
      "scope": "Endocrinologia",
      "prompt": "Em um modelo com hipotálamo e hipófise íntegros, aumenta-se T4 no sangue. Qual resposta do eixo é esperada?",
      "options": [
        "Redução de TRH e TSH por feedback negativo",
        "Aumento simultâneo obrigatório de TRH e TSH",
        "Transformação de TSH em insulina",
        "Liberação de TSH pelos rins"
      ],
      "answer": 0,
      "explanation": "O aumento de hormônios tireoidianos inibe o estímulo hipotalâmico e hipofisário.",
      "difficulty": "medium",
      "source": "https://openstax.org/books/anatomy-and-physiology-2e/pages/17-4-the-thyroid-gland"
    },
    {
      "id": "bio-new-12",
      "topic": "Hipotálamo, hipófise e tireoide",
      "scope": "Endocrinologia",
      "prompt": "Em uma cultura, células tireoidianas recebem TSH, mas perderam o receptor desse hormônio. Qual princípio explica a menor resposta?",
      "options": [
        "Hormônios agem igualmente em qualquer célula",
        "TSH só funciona dentro de neurônios",
        "A presença do hormônio dispensa receptores",
        "A resposta exige receptor funcional na célula-alvo"
      ],
      "answer": 3,
      "explanation": "O reconhecimento do sinal depende do receptor; sua perda reduz a resposta ao TSH.",
      "difficulty": "medium",
      "source": "https://openstax.org/books/anatomy-and-physiology-2e/pages/17-4-the-thyroid-gland"
    },
    {
      "id": "bio-new-13",
      "topic": "Glândulas e suas funções",
      "scope": "Endocrinologia",
      "prompt": "Após absorver carboidratos, qual processo ajuda a impedir uma elevação prolongada da glicemia?",
      "options": [
        "Glucagon bloquear o fígado permanentemente",
        "Insulina favorecer armazenamento de glicose como glicogênio",
        "TSH impedir toda entrada de glicose",
        "ADH converter glicose em cálcio"
      ],
      "answer": 1,
      "explanation": "A insulina favorece captação em tecidos responsivos e armazenamento, inclusive como glicogênio.",
      "difficulty": "easy",
      "source": "https://openstax.org/books/anatomy-and-physiology-2e/pages/17-9-the-endocrine-pancreas"
    },
    {
      "id": "bio-new-14",
      "topic": "Glândulas e suas funções",
      "scope": "Endocrinologia",
      "prompt": "Em um modelo de jejum, a glicemia diminui. Qual resposta hepática ao glucagon contribui para recuperá-la?",
      "options": [
        "Converter todo o sangue em glicogênio",
        "Impedir qualquer liberação de glicose",
        "Degradar glicogênio e liberar glicose",
        "Produzir espermatozoides"
      ],
      "answer": 2,
      "explanation": "O glucagon estimula a produção e a liberação hepática de glicose.",
      "difficulty": "medium",
      "source": "https://openstax.org/books/anatomy-and-physiology-2e/pages/17-9-the-endocrine-pancreas"
    },
    {
      "id": "bio-new-15",
      "topic": "ADH e controle da água",
      "scope": "Endocrinologia",
      "prompt": "Após perda de água pelo suor, sem reposição, a osmolaridade plasmática aumenta. Em um organismo saudável, qual ajuste ajuda a conservar água?",
      "options": [
        "Aumento de ADH e da reabsorção de água nos ductos coletores",
        "Queda de ADH e menor permeabilidade à água",
        "Produção de ADH pelos túbulos seminíferos",
        "Eliminação obrigatória de toda a água ingerida"
      ],
      "answer": 0,
      "explanation": "O ADH aumenta a permeabilidade à água dos ductos coletores e reduz perdas urinárias.",
      "difficulty": "medium",
      "source": "https://openstax.org/books/anatomy-and-physiology-2e/pages/17-3-the-pituitary-gland-and-hypothalamus"
    },
    {
      "id": "bio-new-16",
      "topic": "ADH e controle da água",
      "scope": "Endocrinologia",
      "prompt": "Um diagrama mostra neurônios do hipotálamo com axônios terminando na hipófise posterior. Qual legenda descreve corretamente o ADH?",
      "options": [
        "Produzido e destruído somente no rim",
        "Produzido na hipófise anterior e liberado no ovário",
        "Produzido na tireoide e transportado à medula",
        "Sintetizado no hipotálamo e liberado por terminações na neuro-hipófise"
      ],
      "answer": 3,
      "explanation": "A neuro-hipófise armazena e libera ADH sintetizado em neurônios hipotalâmicos.",
      "difficulty": "easy",
      "source": "https://openstax.org/books/anatomy-and-physiology-2e/pages/17-3-the-pituitary-gland-and-hypothalamus"
    },
    {
      "id": "bio-new-17",
      "topic": "Tabela dos hormônios",
      "scope": "Endocrinologia",
      "prompt": "Em uma situação didática de amamentação, há leite produzido, mas sua ejeção precisa ser estimulada. Qual hormônio atua diretamente nessa ejeção?",
      "options": [
        "Prolactina",
        "Ocitocina",
        "TSH",
        "Glucagon"
      ],
      "answer": 1,
      "explanation": "A ocitocina provoca contração de células mioepiteliais; prolactina favorece produção do leite.",
      "difficulty": "easy",
      "source": "https://openstax.org/books/anatomy-and-physiology-2e/pages/17-3-the-pituitary-gland-and-hypothalamus"
    },
    {
      "id": "bio-new-18",
      "topic": "Tabela dos hormônios",
      "scope": "Endocrinologia",
      "prompt": "O estiramento do colo uterino aumenta a liberação de ocitocina, fortalecendo contrações que aumentam esse estiramento. O circuito exemplifica:",
      "options": [
        "Feedback negativo da tireoide",
        "Ausência de controle hormonal",
        "Feedback positivo",
        "Ação exclusiva da insulina"
      ],
      "answer": 2,
      "explanation": "A resposta amplifica o estímulo inicial até o término do processo.",
      "difficulty": "hard",
      "source": "https://openstax.org/books/anatomy-and-physiology-2e/pages/17-3-the-pituitary-gland-and-hypothalamus"
    },
    {
      "id": "bio-new-19",
      "topic": "Glândulas e suas funções",
      "scope": "Endocrinologia",
      "prompt": "No pâncreas, uma secreção segue para um ducto digestivo e outra chega ao sangue. Qual caracteriza a função endócrina?",
      "options": [
        "Liberação de insulina pelas ilhotas no sangue",
        "Liberação de enzimas digestivas em ductos",
        "Transporte de alimento pelo esôfago",
        "Armazenamento de urina"
      ],
      "answer": 0,
      "explanation": "As ilhotas pancreáticas secretam hormônios no sangue; a secreção por ductos é exócrina.",
      "difficulty": "easy",
      "source": "https://openstax.org/books/anatomy-and-physiology-2e/pages/17-9-the-endocrine-pancreas"
    },
    {
      "id": "bio-new-20",
      "topic": "Hipotálamo, hipófise e tireoide",
      "scope": "Endocrinologia",
      "prompt": "Em um experimento, a hipófise anterior deixa de liberar TSH, mantendo-se a tireoide inicialmente íntegra. Qual mudança é esperada sem reposição hormonal?",
      "options": [
        "T4 necessariamente elevado",
        "Tireoide passa a produzir insulina",
        "ADH substitui integralmente TSH",
        "Menor estímulo à produção tireoidiana de T3/T4"
      ],
      "answer": 3,
      "explanation": "O TSH estimula a tireoide; sua falta reduz esse estímulo, diferentemente de uma alteração primária da própria tireoide.",
      "difficulty": "hard",
      "source": "https://openstax.org/books/anatomy-and-physiology-2e/pages/17-4-the-thyroid-gland"
    },
    {
      "id": "bio-new-21",
      "topic": "Ciclo menstrual e período fértil",
      "scope": "Reprodução",
      "prompt": "Em um gráfico, a progesterona sobe depois do pico ovulatório de LH. Qual estrutura explica essa subida?",
      "options": [
        "Hipófise posterior",
        "Corpo lúteo formado após a ovulação",
        "Próstata",
        "Medula espinhal"
      ],
      "answer": 1,
      "explanation": "O folículo ovulado origina o corpo lúteo, importante fonte de progesterona na fase lútea.",
      "difficulty": "medium",
      "source": "https://openstax.org/books/anatomy-and-physiology-2e/pages/27-2-anatomy-and-physiology-of-the-ovarian-reproductive-system"
    },
    {
      "id": "bio-new-22",
      "topic": "Ciclo menstrual e período fértil",
      "scope": "Reprodução",
      "prompt": "Uma turma usa um ciclo didático de 28 dias para prever a ovulação de todas as pessoas. Qual revisão é cientificamente adequada?",
      "options": [
        "Garantir ovulação sempre no dia 14",
        "Considerar todo sangramento prova de ovulação",
        "Reconhecer variação entre ciclos e limites do calendário",
        "Eliminar a fase folicular do modelo"
      ],
      "answer": 2,
      "explanation": "O modelo representa tendências; o dia de ovulação varia e não é determinado com segurança apenas pelo calendário.",
      "difficulty": "medium",
      "source": "https://openstax.org/books/anatomy-and-physiology-2e/pages/27-2-anatomy-and-physiology-of-the-ovarian-reproductive-system"
    },
    {
      "id": "bio-new-23",
      "topic": "Gráficos e menopausa",
      "scope": "Reprodução",
      "prompt": "Um gráfico pós-menopausa mostra menor atividade ovariana e FSH elevado. Qual relação explica o padrão?",
      "options": [
        "Menor feedback negativo dos hormônios ovarianos sobre a hipófise",
        "Maior produção de espermatozoides pelo ovário",
        "FSH passa a ser produzido no endométrio",
        "O ADH transforma-se em estrogênio"
      ],
      "answer": 0,
      "explanation": "A redução do feedback ovariano permite elevação das gonadotrofinas.",
      "difficulty": "medium",
      "source": "https://openstax.org/books/anatomy-and-physiology-2e/pages/27-2-anatomy-and-physiology-of-the-ovarian-reproductive-system"
    },
    {
      "id": "bio-new-24",
      "topic": "Sistema reprodutor masculino",
      "scope": "Reprodução",
      "prompt": "Uma amostra é coletada dos túbulos seminíferos e outra do epidídimo. Qual processo é associado principalmente à passagem pelo epidídimo?",
      "options": [
        "Produção de TSH",
        "Fecundação do ovócito",
        "Implantação do blastocisto",
        "Maturação dos espermatozoides"
      ],
      "answer": 3,
      "explanation": "A espermatogênese ocorre nos túbulos; o epidídimo participa da maturação e armazenamento.",
      "difficulty": "easy",
      "source": "https://openstax.org/books/anatomy-and-physiology-2e/pages/27-1-anatomy-and-physiology-of-the-testicular-reproductive-system"
    },
    {
      "id": "bio-new-25",
      "topic": "Sistema reprodutor masculino",
      "scope": "Reprodução",
      "prompt": "Em um modelo testicular, o receptor de LH das células de Leydig é bloqueado. Qual resposta direta tende a diminuir?",
      "options": [
        "Liberação de ADH pela neuro-hipófise",
        "Produção de testosterona estimulada por LH",
        "Produção de T4 pela tireoide",
        "Ovulação"
      ],
      "answer": 1,
      "explanation": "As células de Leydig respondem ao LH produzindo testosterona.",
      "difficulty": "medium",
      "source": "https://openstax.org/books/anatomy-and-physiology-2e/pages/27-1-anatomy-and-physiology-of-the-testicular-reproductive-system"
    },
    {
      "id": "bio-new-26",
      "topic": "Ovogênese e meiose",
      "scope": "Reprodução",
      "prompt": "Um ovócito secundário humano normal tem 23 cromossomos, ainda duplicados. Quantas cromátides existem nessa célula antes da conclusão da meiose II?",
      "options": [
        "23",
        "92",
        "46",
        "2"
      ],
      "answer": 2,
      "explanation": "Cada um dos 23 cromossomos possui duas cromátides: 23 × 2 = 46.",
      "difficulty": "hard",
      "source": "https://openstax.org/books/biology-2e/pages/11-1-the-process-of-meiosis"
    },
    {
      "id": "bio-new-27",
      "topic": "Ovogênese e meiose",
      "scope": "Reprodução",
      "prompt": "Na retomada da meiose I de um ovócito, qual separação reduz o número de conjuntos cromossômicos?",
      "options": [
        "Separação de cromossomos homólogos",
        "Separação de células de Leydig",
        "Separação de nucleotídeos do DNA",
        "Separação de hormônios da hipófise"
      ],
      "answer": 0,
      "explanation": "Na primeira divisão meiótica, os homólogos se segregam; as cromátides-irmãs separam-se na segunda.",
      "difficulty": "medium",
      "source": "https://openstax.org/books/anatomy-and-physiology-2e/pages/27-2-anatomy-and-physiology-of-the-ovarian-reproductive-system"
    },
    {
      "id": "bio-new-28",
      "topic": "Fecundação, nidação e endométrio",
      "scope": "Reprodução",
      "prompt": "Durante a clivagem inicial, o número de células aumenta sem aumento equivalente do volume total. Qual explicação é correta?",
      "options": [
        "Cada divisão é uma nova fecundação",
        "O embrião perde todos os cromossomos",
        "Ocorre produção de gametas por meiose",
        "O citoplasma é repartido em blastômeros menores"
      ],
      "answer": 3,
      "explanation": "As clivagens são divisões mitóticas iniciais que repartem o volume do concepto.",
      "difficulty": "hard",
      "source": "https://openstax.org/books/anatomy-and-physiology-2e/pages/28-2-embryonic-development"
    },
    {
      "id": "bio-new-29",
      "topic": "Fecundação, nidação e endométrio",
      "scope": "Reprodução",
      "prompt": "Uma sequência coloca implantação antes de fecundação. Qual ordem representa o desenvolvimento humano inicial usual?",
      "options": [
        "Nidação → zigoto → fecundação",
        "Fecundação → clivagens → blastocisto → implantação",
        "Ovulação → implantação → formação dos gametas",
        "Blastocisto → ovogônia → zigoto"
      ],
      "answer": 1,
      "explanation": "O zigoto divide-se durante o trajeto e forma o blastocisto antes da implantação uterina.",
      "difficulty": "easy",
      "source": "https://openstax.org/books/anatomy-and-physiology-2e/pages/28-2-embryonic-development"
    },
    {
      "id": "bio-new-30",
      "topic": "Fecundação, nidação e endométrio",
      "scope": "Reprodução",
      "prompt": "No início da gestação, o hCG mantém temporariamente o corpo lúteo. Qual consequência favorece o endométrio?",
      "options": [
        "Interromper toda produção hormonal ovariana",
        "Transformar o endométrio em epidídimo",
        "Manter secreção de progesterona pelo corpo lúteo",
        "Provocar imediatamente uma nova menstruação"
      ],
      "answer": 2,
      "explanation": "O suporte ao corpo lúteo mantém a progesterona nas primeiras etapas da gestação.",
      "difficulty": "medium",
      "source": "https://openstax.org/books/anatomy-and-physiology-2e/pages/28-2-embryonic-development"
    }
  ],
  "fisica": [
    {
      "id": "fis-new-01",
      "topic": "Espelhos esféricos",
      "scope": "Óptica",
      "prompt": "Um espelho de maquiagem côncavo tem f = +12 cm. O rosto está a p = 8 cm. Na aproximação paraxial, onde se forma a imagem?",
      "options": [
        "p′ = +24 cm, real",
        "p′ = −24 cm, virtual",
        "p′ = +4,8 cm, real",
        "p′ = −4 cm, virtual"
      ],
      "answer": 1,
      "explanation": "p′ = fp/(p − f) = 96/(−4) = −24 cm; o sinal negativo indica imagem atrás do espelho.",
      "difficulty": "medium",
      "source": "https://openstax.org/books/university-physics-volume-3/pages/2-2-spherical-mirrors"
    },
    {
      "id": "fis-new-02",
      "topic": "Espelhos esféricos",
      "scope": "Óptica",
      "prompt": "Um objeto de 2 cm está a 30 cm de um espelho côncavo com f = +10 cm. Qual é a altura algébrica da imagem?",
      "options": [
        "+1 cm",
        "−2 cm",
        "−1 cm",
        "+4 cm"
      ],
      "answer": 2,
      "explanation": "p′ = 10×30/20 = 15 cm; A = −15/30 = −0,5 e h′ = −1 cm.",
      "difficulty": "hard",
      "source": "https://openstax.org/books/university-physics-volume-3/pages/2-2-spherical-mirrors"
    },
    {
      "id": "fis-new-03",
      "topic": "Espelhos esféricos",
      "scope": "Óptica",
      "prompt": "Um espelho de segurança convexo tem f = −20 cm. Para um objeto real a 60 cm, qual é p′?",
      "options": [
        "−15 cm",
        "+15 cm",
        "−30 cm",
        "+30 cm"
      ],
      "answer": 0,
      "explanation": "Pela equação dos espelhos, p′ = (−20×60)/(60+20) = −15 cm. O sinal negativo indica uma imagem virtual, atrás do espelho.",
      "difficulty": "medium",
      "source": "https://openstax.org/books/university-physics-volume-3/pages/2-2-spherical-mirrors"
    },
    {
      "id": "fis-new-04",
      "topic": "Espelhos esféricos",
      "scope": "Óptica",
      "prompt": "No espelho convexo de f = −20 cm, um objeto real está a 60 cm. Sabendo p′ = −15 cm, qual aumento linear resulta?",
      "options": [
        "−4",
        "+4",
        "−0,25",
        "+0,25"
      ],
      "answer": 3,
      "explanation": "A = −p′/p = −(−15)/60 = +0,25: imagem direita e reduzida.",
      "difficulty": "medium",
      "source": "https://openstax.org/books/university-physics-volume-3/pages/2-2-spherical-mirrors"
    },
    {
      "id": "fis-new-05",
      "topic": "Espelhos esféricos",
      "scope": "Óptica",
      "prompt": "Uma tela recebe uma imagem nítida de uma vela produzida por um espelho. O que isso permite afirmar sobre a imagem?",
      "options": [
        "É obrigatoriamente virtual",
        "É real, pois os raios refletidos convergem na tela",
        "É sempre maior que a vela",
        "Só pode vir de espelho convexo com objeto real"
      ],
      "answer": 1,
      "explanation": "Uma imagem real pode ser projetada sobre uma tela.",
      "difficulty": "easy",
      "source": "https://openstax.org/books/university-physics-volume-3/pages/2-2-spherical-mirrors"
    },
    {
      "id": "fis-new-06",
      "topic": "Espelhos esféricos",
      "scope": "Óptica",
      "prompt": "Um objeto real se aproxima de um espelho côncavo, saindo de uma posição além de C e chegando entre C e F. Como muda a imagem?",
      "options": [
        "Torna-se sempre direita",
        "Passa a ser virtual em C",
        "Passa de menor a maior, mantendo-se real e invertida",
        "Desaparece em todas as posições"
      ],
      "answer": 2,
      "explanation": "A imagem tem mesmo tamanho em C e torna-se ampliada ao entrar na região entre C e F.",
      "difficulty": "medium",
      "source": "https://openstax.org/books/university-physics-volume-3/pages/2-2-spherical-mirrors"
    },
    {
      "id": "fis-new-07",
      "topic": "Espelhos esféricos",
      "scope": "Óptica",
      "prompt": "Um objeto pontual está no foco de um espelho côncavo ideal, na aproximação paraxial. O que ocorre com o feixe refletido?",
      "options": [
        "Sai paralelo ao eixo, sem imagem a distância finita",
        "Converge sempre no vértice",
        "Forma imagem virtual em C",
        "É completamente absorvido"
      ],
      "answer": 0,
      "explanation": "No foco, a equação fornece 1/p′ = 0; descreve-se imagem no infinito.",
      "difficulty": "medium",
      "source": "https://openstax.org/books/university-physics-volume-3/pages/2-2-spherical-mirrors"
    },
    {
      "id": "fis-new-08",
      "topic": "Espelhos esféricos",
      "scope": "Óptica",
      "prompt": "Um côncavo tem raio de curvatura de módulo 60 cm e um objeto real está em C. Qual é o par (p′, A)?",
      "options": [
        "(+15 cm, −0,25)",
        "(−60 cm, +1)",
        "(+30 cm, −0,5)",
        "(+60 cm, −1)"
      ],
      "answer": 3,
      "explanation": "f = +30 cm e p = 60 cm dão p′ = +60 cm e A = −1.",
      "difficulty": "medium",
      "source": "https://openstax.org/books/university-physics-volume-3/pages/2-2-spherical-mirrors"
    },
    {
      "id": "fis-new-09",
      "topic": "Espelhos esféricos",
      "scope": "Óptica",
      "prompt": "Em um esquema de raios paraxiais de um espelho côncavo, um raio incidente paralelo ao eixo principal é refletido:",
      "options": [
        "Sem mudar de direção em qualquer ponto",
        "Passando pelo foco principal",
        "Passando obrigatoriamente pelo vértice",
        "Como se viesse de um foco atrás do espelho"
      ],
      "answer": 1,
      "explanation": "A regra paraxial do côncavo leva o raio paralelo pelo foco real.",
      "difficulty": "easy",
      "source": "https://openstax.org/books/university-physics-volume-3/pages/2-2-spherical-mirrors"
    },
    {
      "id": "fis-new-10",
      "topic": "Espelhos esféricos",
      "scope": "Óptica",
      "prompt": "Uma imagem de objeto real em espelho tem p′ = −18 cm. Pela convenção real-positivo, qual interpretação é correta?",
      "options": [
        "A imagem está na frente e é real",
        "O objeto tem massa negativa",
        "A imagem é virtual e está atrás do espelho",
        "A imagem é necessariamente invertida"
      ],
      "answer": 2,
      "explanation": "Distância de imagem negativa indica posição atrás do espelho e imagem virtual nessa convenção.",
      "difficulty": "easy",
      "source": "https://openstax.org/books/university-physics-volume-3/pages/2-2-spherical-mirrors"
    },
    {
      "id": "fis-new-11",
      "topic": "Espelhos esféricos",
      "scope": "Óptica",
      "prompt": "Um espelho forma uma imagem real a 40 cm do espelho, quando o objeto também está a 40 cm dele. Qual é a distância focal?",
      "options": [
        "+20 cm",
        "+80 cm",
        "−20 cm",
        "−80 cm"
      ],
      "answer": 0,
      "explanation": "1/f = 1/40 + 1/40 = 1/20; f = +20 cm.",
      "difficulty": "medium",
      "source": "https://openstax.org/books/university-physics-volume-3/pages/2-2-spherical-mirrors"
    },
    {
      "id": "fis-new-12",
      "topic": "Espelhos esféricos",
      "scope": "Óptica",
      "prompt": "Para usar f = R/2 em um espelho esférico real, uma estudante escolhe raios próximos do eixo e pequena abertura. Qual efeito essa escolha reduz?",
      "options": [
        "A existência de reflexão",
        "A velocidade da luz no vácuo",
        "A carga elétrica do espelho",
        "A aberração esférica associada a raios afastados do eixo"
      ],
      "answer": 3,
      "explanation": "A aproximação paraxial reduz diferenças de convergência dos raios.",
      "difficulty": "hard",
      "source": "https://openstax.org/books/university-physics-volume-3/pages/2-2-spherical-mirrors"
    },
    {
      "id": "fis-new-13",
      "topic": "Corrente produz campo magnético",
      "scope": "Eletromagnetismo",
      "prompt": "Um fio longo conduz 3 A. A 2 cm do fio, qual campo aproximado no vácuo? Use μ₀ ≈ 4π×10⁻⁷ T·m/A.",
      "options": [
        "3 μT",
        "30 μT",
        "300 μT",
        "0,3 μT"
      ],
      "answer": 1,
      "explanation": "B = 2×10⁻⁷×3/0,02 = 3×10⁻⁵ T = 30 μT.",
      "difficulty": "medium",
      "source": "https://openstax.org/books/university-physics-volume-2/pages/12-2-magnetic-field-due-to-a-thin-straight-wire"
    },
    {
      "id": "fis-new-14",
      "topic": "Corrente produz campo magnético",
      "scope": "Eletromagnetismo",
      "prompt": "A corrente em um fio longo passa de 2 A para 6 A, enquanto a distância de observação passa de 4 cm para 8 cm. Qual é Bnovo/Binicial?",
      "options": [
        "6",
        "0,5",
        "1,5",
        "3"
      ],
      "answer": 2,
      "explanation": "B ∝ I/r; a razão é (6/2)/(8/4) = 3/2.",
      "difficulty": "medium",
      "source": "https://openstax.org/books/university-physics-volume-2/pages/12-2-magnetic-field-due-to-a-thin-straight-wire"
    },
    {
      "id": "fis-new-15",
      "topic": "Corrente produz campo magnético",
      "scope": "Eletromagnetismo",
      "prompt": "Um fio vertical no plano da página conduz corrente para cima. Em um ponto à direita do fio, qual é o sentido de B?",
      "options": [
        "Entrando na página",
        "Saindo da página",
        "Para a direita",
        "Para cima"
      ],
      "answer": 0,
      "explanation": "A regra da mão direita com polegar para cima indica B entrando no plano à direita do fio.",
      "difficulty": "medium",
      "source": "https://openstax.org/books/university-physics-volume-2/pages/12-2-magnetic-field-due-to-a-thin-straight-wire"
    },
    {
      "id": "fis-new-16",
      "topic": "Corrente produz campo magnético",
      "scope": "Eletromagnetismo",
      "prompt": "Uma espira vista de frente conduz corrente no sentido horário. O campo que ela produz no centro aponta:",
      "options": [
        "Para cima no plano",
        "Para a direita no plano",
        "Para fora da página",
        "Para dentro da página"
      ],
      "answer": 3,
      "explanation": "Dedos da mão direita acompanham a corrente horária; o polegar aponta para dentro.",
      "difficulty": "medium",
      "source": "https://openstax.org/books/university-physics-volume-2/pages/11-4-magnetic-force-on-a-current-carrying-conductor"
    },
    {
      "id": "fis-new-17",
      "topic": "Corrente produz campo magnético",
      "scope": "Eletromagnetismo",
      "prompt": "Um solenoide longo no vácuo tem 1000 espiras/m e corrente de 0,5 A. Qual é B interno aproximado? Use μ₀ ≈ 4π×10⁻⁷ T·m/A e π ≈ 3,14.",
      "options": [
        "6,28 T",
        "6,28×10⁻⁴ T",
        "6,28×10⁻⁷ T",
        "0 T"
      ],
      "answer": 1,
      "explanation": "B ≈ μ₀nI = 4π×10⁻⁷×1000×0,5 ≈ 6,28×10⁻⁴ T.",
      "difficulty": "medium",
      "source": "https://openstax.org/books/university-physics-volume-2/pages/12-6-solenoids-and-toroids"
    },
    {
      "id": "fis-new-18",
      "topic": "Corrente produz campo magnético",
      "scope": "Eletromagnetismo",
      "prompt": "Dois fios longos paralelos têm correntes iguais para cima. No ponto médio entre eles, os campos têm mesmo módulo. Qual é o campo resultante?",
      "options": [
        "O dobro do campo de um fio",
        "Sempre dirigido para cima",
        "Zero, pois os campos têm sentidos opostos",
        "Infinito"
      ],
      "answer": 2,
      "explanation": "Entre os fios, a mão direita fornece campos opostos; na metade, os módulos iguais se cancelam.",
      "difficulty": "hard",
      "source": "https://openstax.org/books/university-physics-volume-2/pages/12-2-magnetic-field-due-to-a-thin-straight-wire"
    },
    {
      "id": "fis-new-19",
      "topic": "Força magnética",
      "scope": "Eletromagnetismo",
      "prompt": "Uma carga positiva move-se para a direita na página em B saindo da página. Para onde aponta a força magnética?",
      "options": [
        "Para baixo na página",
        "Para cima na página",
        "Para fora da página",
        "Para a direita"
      ],
      "answer": 0,
      "explanation": "Para q > 0, F segue v × B: direita × para fora resulta para baixo.",
      "difficulty": "medium",
      "source": "https://openstax.org/books/university-physics-volume-2/pages/11-2-magnetic-fields-and-lines"
    },
    {
      "id": "fis-new-20",
      "topic": "Força magnética",
      "scope": "Eletromagnetismo",
      "prompt": "Um elétron move-se para a direita na página em B saindo da página. Qual é o sentido da força magnética?",
      "options": [
        "Para baixo",
        "Para a esquerda",
        "Para fora da página",
        "Para cima"
      ],
      "answer": 3,
      "explanation": "O produto v × B aponta para baixo; a carga negativa inverte esse sentido.",
      "difficulty": "medium",
      "source": "https://openstax.org/books/university-physics-volume-2/pages/11-2-magnetic-fields-and-lines"
    },
    {
      "id": "fis-new-21",
      "topic": "Força magnética",
      "scope": "Eletromagnetismo",
      "prompt": "Uma carga de módulo 4 μC tem rapidez 200 m/s em B = 0,5 T, com ângulo de 30° entre v e B. Qual é a força?",
      "options": [
        "4×10⁻² N",
        "2×10⁻⁴ N",
        "4×10⁻⁴ N",
        "2 N"
      ],
      "answer": 1,
      "explanation": "Usando F = |q|vB sen θ, com sen 30° = 0,5, obtemos F = 4×10⁻⁶×200×0,5×0,5 = 2×10⁻⁴ N.",
      "difficulty": "medium",
      "source": "https://openstax.org/books/university-physics-volume-2/pages/11-2-magnetic-fields-and-lines"
    },
    {
      "id": "fis-new-22",
      "topic": "Força magnética",
      "scope": "Eletromagnetismo",
      "prompt": "Em um seletor experimental, uma carga move-se perpendicularmente a um campo magnético uniforme, sob ação apenas da força magnética. Qual grandeza permanece constante?",
      "options": [
        "Direção da velocidade",
        "Vetor velocidade completo",
        "Energia cinética",
        "Vetor força completo"
      ],
      "answer": 2,
      "explanation": "A força é perpendicular à velocidade e não realiza trabalho sobre a carga pontual.",
      "difficulty": "medium",
      "source": "https://openstax.org/books/university-physics-volume-2/pages/11-3-motion-of-a-charged-particle-in-a-magnetic-field"
    },
    {
      "id": "fis-new-23",
      "topic": "Força magnética",
      "scope": "Eletromagnetismo",
      "prompt": "Um trecho retilíneo de 0,20 m conduz 3 A perpendicularmente a B = 0,40 T. Qual é o módulo da força?",
      "options": [
        "0,24 N",
        "2,4 N",
        "0,024 N",
        "6 N"
      ],
      "answer": 0,
      "explanation": "Como o fio é perpendicular ao campo, sen θ = 1. Portanto, F = BIL = 0,40×3×0,20 = 0,24 N.",
      "difficulty": "medium",
      "source": "https://openstax.org/books/university-physics-volume-2/pages/11-4-magnetic-force-on-a-current-carrying-conductor"
    },
    {
      "id": "fis-new-24",
      "topic": "Força magnética",
      "scope": "Eletromagnetismo",
      "prompt": "Uma partícula não relativística entra perpendicularmente em B uniforme e descreve raio r. Se B dobrar, mantendo massa, carga e rapidez iniciais, o novo raio será:",
      "options": [
        "2r",
        "4r",
        "r",
        "r/2"
      ],
      "answer": 3,
      "explanation": "r = mv/(|q|B); dobrar B reduz o raio à metade.",
      "difficulty": "hard",
      "source": "https://openstax.org/books/university-physics-volume-2/pages/11-3-motion-of-a-charged-particle-in-a-magnetic-field"
    },
    {
      "id": "fis-new-25",
      "topic": "Indução eletromagnética",
      "scope": "Eletromagnetismo",
      "prompt": "Uma espira plana de área 0,020 m² está em B = 0,30 T, que faz 60° com a normal. Qual é o fluxo?",
      "options": [
        "6×10⁻³ Wb",
        "3×10⁻³ Wb",
        "1,2×10⁻² Wb",
        "0 Wb"
      ],
      "answer": 1,
      "explanation": "Φ = BA cos60° = 0,30×0,020×0,5 = 0,003 Wb.",
      "difficulty": "medium",
      "source": "https://openstax.org/books/university-physics-volume-2/pages/13-1-faradays-law"
    },
    {
      "id": "fis-new-26",
      "topic": "Indução eletromagnética",
      "scope": "Eletromagnetismo",
      "prompt": "Em 50 espiras, o fluxo por espira cai de 0,008 Wb para 0,002 Wb em 0,10 s. Qual é o módulo da fem média?",
      "options": [
        "0,06 V",
        "0,3 V",
        "3 V",
        "30 V"
      ],
      "answer": 2,
      "explanation": "|εmédia| = 50×|0,002−0,008|/0,10 = 3 V.",
      "difficulty": "medium",
      "source": "https://openstax.org/books/university-physics-volume-2/pages/13-1-faradays-law"
    },
    {
      "id": "fis-new-27",
      "topic": "Indução eletromagnética",
      "scope": "Eletromagnetismo",
      "prompt": "O campo externo que entra na página aumenta através de uma espira fechada. Vista de frente, qual corrente induzida se opõe a essa mudança?",
      "options": [
        "Anti-horária, produzindo campo para fora",
        "Horária, produzindo campo para dentro",
        "Nula porque a espira está parada",
        "Radial, do centro para fora"
      ],
      "answer": 0,
      "explanation": "Lenz exige campo induzido para fora; a mão direita corresponde à corrente anti-horária.",
      "difficulty": "hard",
      "source": "https://openstax.org/books/university-physics-volume-2/pages/13-2-lenzs-law"
    },
    {
      "id": "fis-new-28",
      "topic": "Indução eletromagnética",
      "scope": "Eletromagnetismo",
      "prompt": "O campo externo que entra na página diminui através de uma espira fechada. Qual é a resposta de Lenz?",
      "options": [
        "Campo induzido para fora, sempre oposto ao original",
        "Nenhum efeito em circuitos fechados",
        "Corrente anti-horária, sem campo",
        "Corrente horária, produzindo campo para dentro"
      ],
      "answer": 3,
      "explanation": "A corrente tenta manter o fluxo que entra, opondo-se à diminuição.",
      "difficulty": "hard",
      "source": "https://openstax.org/books/university-physics-volume-2/pages/13-2-lenzs-law"
    },
    {
      "id": "fis-new-29",
      "topic": "Indução eletromagnética",
      "scope": "Eletromagnetismo",
      "prompt": "O fluxo de uma bobina aberta varia com o tempo. Qual afirmação distingue fem e corrente?",
      "options": [
        "Sem circuito fechado não pode existir fem",
        "Pode existir fem entre terminais sem corrente de condução sustentada no circuito aberto",
        "A corrente torna-se obrigatoriamente infinita",
        "A fem depende apenas da cor do fio"
      ],
      "answer": 1,
      "explanation": "A variação de fluxo produz fem; um caminho condutor fechado é necessário para a corrente usual do circuito.",
      "difficulty": "medium",
      "source": "https://openstax.org/books/university-physics-volume-2/pages/13-1-faradays-law"
    },
    {
      "id": "fis-new-30",
      "topic": "Indução eletromagnética",
      "scope": "Eletromagnetismo",
      "prompt": "Uma espira gira em B uniforme e constante. Por que ainda pode surgir fem?",
      "options": [
        "Porque B tem de aumentar sempre",
        "Porque o número de prótons muda",
        "Porque muda o ângulo da normal e, portanto, o fluxo",
        "Porque a área precisa necessariamente aumentar"
      ],
      "answer": 2,
      "explanation": "Mesmo com B e área constantes, Φ = BA cosθ varia quando θ muda.",
      "difficulty": "medium",
      "source": "https://openstax.org/books/university-physics-volume-2/pages/13-1-faradays-law"
    }
  ]
};
});
