# Entrega integrada do EstudaLab

Arquitetura: preservar documentos estáticos e dados locais; extrair módulos compartilhados sem migração de framework. Marca verde/lima e blocos de aprendizagem permanecem. Cada etapa deve ser testada e publicada antes da próxima.

1. **Sistema visual e navegação** — extrair scripts/estilos por disciplina, shell compartilhado, marca, navegação, tema e drawer acessível. Aceite: quatro matérias com o mesmo shell; rotas e controles existentes preservados; desktop/mobile sem overflow; teclado e modo escuro; progresso anterior intacto. Evidências: testes Node, sintaxe, navegador e produção.
2. **Motor de estudo** — seleção de 15 questões, histórico, equilíbrio, embaralhamento e revisão espaçada compartilhados. Aceite: testes determinísticos de não repetição, gabarito, distribuição e agendamento; persistência tolerante a falhas; resultados e erros revisáveis.
3. **Conteúdo** — auditar bancos, duplicações, cálculos e explicações; ampliar exercícios contextualizados; referências científicas públicas. Aceite: validação de estrutura e respostas calculáveis, revisão documentada e recursos interativos preservados.
4. **Redação** — corrigir IDs de temas, rascunhos/histórico e diagnóstico; validar respostas semânticas e nunca converter ausência de avaliação em nota zero. Aceite: testes completos/parciais/malformados/indisponibilidade, fluxo real do editor e limites claros.
5. **Progresso integrado** — histórico, revisão recomendada, retomada, exportação/importação segura; avaliar sincronização sem contratar serviços. Aceite: compatibilidade dos dados antigos, estatísticas derivadas de eventos reais e recuperação validada.
6. **Entrega** — auditoria final responsiva, teclado, erros, testes, GitHub e produção. Documentar o que foi efetivamente verificado e limitações restantes.

## Estado

Etapa 1 em implementação. Achados: quatro cascas de navegação independentes; CSS repetido; IDs duplicados em temas; normalizador da API transforma competências ausentes em zero. Não há autenticação nem banco remoto configurado no código atual.
