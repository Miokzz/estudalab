# Contrato da correção assistida por IA

`POST /api/corrigir` é uma função CommonJS para Vercel, sem SDK, dependências adicionais, banco ou contas de usuário. Usa `fetch` do Node para Chat Completions do Vercel AI Gateway. Nenhuma redação ou resposta do provedor é persistida ou registrada pelo handler.

## Entrada

Envie `Content-Type: application/json` e somente:

```json
{"tema":"Educação ambiental no Brasil","modo":"completa","texto":"Texto da redação..."}
```

- `tema`: string não vazia, até 300 caracteres.
- `modo`: `introducao`, `d1`, `d2`, `conclusao` ou `completa`.
- `texto`: 70 caracteres após trim no mínimo; 12.000 caracteres na string original no máximo.
- JSON bruto recebido como string: até 64.000 bytes. O limite de análise do corpo antes do handler também depende da plataforma.
- Origem presente deve ser HTTP/HTTPS e corresponder exatamente ao host, sem caminho; `Sec-Fetch-Site: cross-site` é recusado. Requisições sem Origin continuam possíveis para clientes HTTP.

## Saída válida

O handler verifica o JSON contra o mesmo schema estrito enviado ao modelo. Não converte tipos, não inventa campos faltantes e não substitui critérios inválidos por zero.

Campos comuns a qualquer etapa:

| Campo | Forma |
| --- | --- |
| `origem`, `modelo` | `ia`, ID do modelo efetivamente selecionado (principal ou recuperação elegível) |
| `resumo` | string |
| `forcas` | até 3 strings, compatíveis com a interface existente |
| `evidenciasForcas` | mesma quantidade/ordem de `forcas`; objetos `{trecho, explicacao}` |
| `falhas` | até 3 objetos `{trecho, problema, comoMelhorar, ausencia, incerteza}` |
| `acoes` | exatamente 3 strings |
| `alertas` | até 5 strings |
| `checklist` | booleans obrigatórios: `tese`, `topico`, `argumentacao`, `coesao`, `agente`, `acao`, `meio`, `finalidade`, `detalhamento` |
| `evidenciasChecklist` | mesmas chaves, strings; evidência literal para cada `true`, string vazia para `false` |

Todos os `trecho` e itens de `evidencias` não vazios precisam existir como substring literal contínua do `texto` enviado, incluindo pontuação e acentos. Evidência de força é obrigatória. Uma falha sem trecho só passa com `ausencia: true` e `incerteza` não vazia, explicitando ausência aparente. Não há correspondência aproximada nem extração permissiva de JSON envolvido em markdown.

Somente em modo `completa`, a saída inclui:

```json
{
  "competencias": {"C1":160,"C2":160,"C3":120,"C4":160,"C5":120},
  "nota":720,
  "justificativas": {
    "C1": {
      "evidencias":["trecho literal existente na redação"],
      "analise":"Razão pedagógica para o nível atribuído.",
      "desconto":40,
      "motivoDesconto":"Por que este critério não atingiu 200.",
      "ausencia":"",
      "incerteza":""
    }
  }
}
```

O exemplo de `justificativas` está abreviado: **C1 até C5 são todos obrigatórios**, com a mesma estrutura. Cada nota deve ser inteiro em `0,40,80,120,160,200`; `desconto` deve ser exatamente `200 - nota`. Cada justificativa exige evidência literal ou, para elemento aparentemente ausente, `evidencias: []`, `ausencia` e `incerteza` não vazias. Nota 200 exige evidência positiva e nenhuma ausência declarada. `nota` é calculada no servidor somente depois de validar todos os campos; o modelo não pode enviar um total próprio.

Nas quatro etapas parciais, `competencias`, `nota` e `justificativas` **não existem na resposta pública**. No schema do modelo, competencias e justificativas são objetos obrigatoriamente vazios. Tentativas de introduzir notas em uma resposta parcial causam 503. A interface deve tratar campos ausentes como ausência de avaliação, sem completar notas com zero ou estimá-las.

## Falhas e limites

Erros contêm `{erro: string}`, sem notas: 400 entrada inválida; 403 origem recusada; 405 método incorreto (`Allow: POST`); 413 JSON bruto excessivo; 415 tipo de conteúdo incorreto; 429 limite (`Retry-After: 300`); 503 credencial ausente, indisponibilidade, timeout, recusa, truncamento, JSON/schema/evidência/desconto inválido. Falhas após a chamada externa também incluem `codigo`, de uma lista interna fixa, sem mensagens externas. Uma avaliação recusada não pode ser apresentada como nota zero. Todas as respostas usam `Cache-Control: no-store` e `X-Content-Type-Options: nosniff`.

Há quatro tentativas por cliente por janela fixa de cinco minutos e quatro solicitações simultâneas **por instância**. O mapa mantém no máximo 600 clientes; entradas expiradas são removidas e a saturação recusa novos clientes, sem apagar limites ativos. Em Vercel, a identidade de acesso usa metadata de encaminhamento da plataforma; fora dela usa o endereço do socket. O timeout de 23 segundos cobre o fluxo inteiro, incluindo conexão, descoberta de elegibilidade, única recuperação e consumo dos corpos, com o mesmo AbortSignal. Não há laços de repetição nem compras automáticas.

Esses controles não são autenticação de usuário nem limite global de gastos. Origin é uma defesa de navegador e pode ser omitido/forjado por clientes externos. Reinicialização e múltiplas instâncias renovam/dividem limites; clientes distribuídos podem abusar do endpoint público. Para garantia global são necessários controle na plataforma, orçamento do Gateway e/ou autenticação e armazenamento compartilhado, fora deste escopo. Nenhum desses serviços foi provisionado ou modificado.

## Credencial e fronteira de confiança

A precedência é `AI_GATEWAY_API_KEY` do servidor, `VERCEL_OIDC_TOKEN` do ambiente e, somente quando `process.env.VERCEL === '1'`, o token OIDC da invocação em `x-vercel-oidc-token`. Fora do runtime Vercel, um cabeçalho enviado pelo cliente é ignorado. A variável `VERCEL` pertence ao ambiente do servidor; nunca deve ser inferida de dados da requisição.

A documentação oficial atual descreve o cabeçalho OIDC como injetado pela Vercel em cada invocação e recomenda obter o token dentro do handler. Esse caminho depende dessa fronteira da plataforma; não é uma validação JWT implementada pela aplicação e não pode ser transplantado para outro proxy aceitando cabeçalhos arbitrários. O handler não imprime tokens, mensagens do provedor, exceções ou texto do aluno. Registra somente `correction_failed`, um código interno de uma lista fechada e, quando houver, o status HTTP numérico do Gateway. Serviços externos podem ter retenção própria: este código não garante nem configura a política de retenção do Gateway/provedor.

## Modelo e limitações pedagógicas

O catálogo público completo foi consultado em 2026-11-10: o modelo existente `openai/gpt-5.4-mini` estava disponível, anunciava `structured-output` e incluía `low` em `reasoning_options`. A integração usa `json_schema` com `strict: true`, `reasoning_effort: low`, limite de 6.000 tokens de saída e não habilita ferramentas. Não define temperatura para evitar depender da compatibilidade entre temperatura e nível de raciocínio. Não houve chamada paga de inferência nesta implementação.

Se a primeira inferência retornar HTTP 403, o handler consulta `GET /v1/models?include_availability` autenticado com a mesma credencial, sem enviar a redação nessa consulta. O catálogo público e o parâmetro público `freeTier=true` não demonstram elegibilidade da conta; a documentação atual limita os créditos gratuitos a um subconjunto de modelos.

Há uma única recuperação possível, nesta ordem fechada: `openai/gpt-4.1-mini`, `openai/gpt-4o-mini`, `google/gemini-2.5-flash`. O modelo precisa ter `model_eligibility.status: eligible`, `evaluated_runtime: http` e admissão HTTP `available` em `request_context_availability.http` (objeto com `status` ou valor string). Metadados presentes devem informar `no_training: all`, tag `structured-output` e parâmetros `response_format`/`structured_outputs`. Valores desconhecidos/ausentes de elegibilidade ou admissão não autorizam uma tentativa. Modelos experimentais gratuitos com treinamento permitido não participam da lista.

A recuperação omite `reasoning_effort`, mantém os mesmos limites e validação integral, e retorna o ID efetivamente selecionado em `modelo`. Um segundo 403 encerra o fluxo; não consulta ou tenta modelos adicionais. Nenhuma credencial, permissão, serviço ou cobrança é criada/modificada. A consulta não garante saldo, disponibilidade futura ou qualidade pedagógica. Códigos fixos distinguem `model_discovery_denied`, `model_discovery_invalid`, `account_unavailable`, `no_eligible_model` e `fallback_unavailable`; demais validações mantêm seus códigos. A elegibilidade real da conta e o formato real de seu retorno dependem da verificação no ambiente implantado.

O prompt trata redação e tema como dados não confiáveis; pede análise de tema, tese, desenvolvimento, repertório, coesão e cinco elementos da intervenção, com feedback pertinente à etapa. O schema e a presença literal de uma citação **não comprovam** correção semântica, interpretação, legitimidade de repertório, calibragem da nota nem resistência absoluta a prompt injection. Citações verdadeiras ainda podem sustentar análises inadequadas. O resultado continua sendo simulação pedagógica sujeita a revisão humana; testes com respostas simuladas não medem qualidade real do modelo.

## Verificação reproduzível

```sh
node --test tests/correction.test.cjs
```

A suíte usa somente `fetch` e relógios simulados. Cobre respostas completas fortes/fracas, quatro etapas parciais, critérios e justificativas ausentes/inválidos, evidências fabricadas, ausências com incerteza, descontos inconsistentes, recusa/truncamento/JSON inválido, método/origem/entrada, credenciais, fronteira Vercel, timeout após recebimento dos headers, saturação/expiração do mapa e concorrência. A recuperação inclui ordem da lista, elegibilidade/admissão desconhecida ou negada, metadados de treinamento/schema, consulta recusada, tentativa única, modelo efetivo, ausência de reasoning em modelos alternativos e timeout compartilhado. Não testa implantação, autorização de uma conta real, faturamento ou precisão pedagógica. Não há migrações ou operações em banco.

Fontes oficiais consultadas:

- [Chat Completions no AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions)
- [Structured Outputs](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/structured-outputs)
- [OIDC por invocação](https://vercel.com/docs/ai-gateway/authentication-and-byok/oidc)
- [Controle de raciocínio em Chat Completions](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/reasoning)
- [Elegibilidade por conta](https://vercel.com/docs/ai-gateway/sdks-and-apis/rest-api#team-availability-annotations)
- [Modelos do plano gratuito](https://vercel.com/docs/ai-gateway/pricing)
- [Catálogo público de modelos](https://ai-gateway.vercel.sh/v1/models)
