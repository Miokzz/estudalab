/* Shared study sessions. Existing subject storage remains intact. */
(() => {
  'use strict';
  const engine=window.EstudaLabStudy;
  const configs=new Map(), sessions=new Map(), decks=new Map();
  const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const key=(type,subject)=>`estudalab.${type}.v1.${subject}`;
  let storageFailed=false;
  function read(k,fallback){try{const value=JSON.parse(localStorage.getItem(k)||'null');return value??fallback}catch{storageFailed=true;return fallback}}
  function write(k,value){try{localStorage.setItem(k,JSON.stringify(value));return true}catch{storageFailed=true;return false}}
  function hash(value){let h=2166136261;for(const c of String(value).normalize('NFKC').toLowerCase()){h=Math.imul(h^c.charCodeAt(0),16777619)}return(h>>>0).toString(36)}
  const notice=()=>storageFailed?'<p class="study-notice" role="status">O navegador não conseguiu acessar o armazenamento. Mantenha esta página aberta para continuar; o progresso desta sessão pode não ficar salvo.</p>':'';
  function history(subject){const v=read(key('attempts',subject),[]);return Array.isArray(v)?v.filter(x=>x&&Array.isArray(x.questions)&&x.questions.length===15&&Array.isArray(x.answers)&&x.answers.length===15&&Number.isInteger(x.correct)&&x.correct>=0&&x.correct<=15):[]}
  function configQuiz(subject,questions,options){
    const bank=questions.map(q=>({...q,id:String(q.id||hash(q.prompt))}));
    configs.set(subject,{questions:bank,...options});
    if(!sessions.has(subject)){
      const saved=read(key('session',subject),null);
      const valid=saved&&Array.isArray(saved.questions)&&saved.questions.length===15&&saved.questions.every(q=>q&&typeof q.prompt==='string'&&Array.isArray(q.options)&&Number.isInteger(q.answer)&&q.answer>=0&&q.answer<q.options.length)&&Array.isArray(saved.answers)&&saved.answers.length===15&&saved.answers.every((a,i)=>a===null||Number.isInteger(a)&&a>=0&&a<saved.questions[i]?.options.length)&&Number.isInteger(saved.index)&&saved.index>=0&&saved.index<15;
      sessions.set(subject,valid?saved:null);
    }
  }
  function quizBody(subject){
    const config=configs.get(subject),session=sessions.get(subject);
    if(!session){
      const topics=[...new Set(config.questions.map(q=>q.topic))];
      const attempts=history(subject),best=attempts.length?Math.max(...attempts.map(a=>a.correct)):null;
      return `<div class="study-heading"><span class="eyebrow">Praticar e entender</span><h1>Simulados de ${esc(config.label)}</h1><p>15 questões por sessão. O sorteio considera os assuntos e seu histórico para priorizar questões menos vistas.</p></div><section class="panel study-start"><h2>O que vamos treinar?</h2><label for="study-topic-${subject}">Assunto</label><select id="study-topic-${subject}" data-study-topic><option value="">Todos os assuntos</option>${topics.map(t=>{const n=config.questions.filter(q=>q.topic===t).length;return `<option value="${esc(t)}" ${n<15?'disabled':''}>${esc(t)} · ${n} questões${n<15?' (mínimo: 15)':''}</option>`}).join('')}</select><p class="muted">${config.questions.length} questões no banco. As alternativas mudam de posição; a explicação aparece na revisão final.</p><button class="btn" data-study-action="start">Começar 15 questões</button>${attempts.length?`<p>${attempts.length} sessões concluídas · melhor resultado: ${best}/15.</p>`:''}</section>${notice()}`;
    }
    if(session.finished){
      const correct=session.questions.filter((q,i)=>q.answer===session.answers[i]).length;
      const shown=session.onlyWrong?session.questions.map((q,i)=>({q,i})).filter(({q,i})=>q.answer!==session.answers[i]):session.questions.map((q,i)=>({q,i}));
      return `<div class="study-heading"><span class="eyebrow">Sessão concluída</span><h1>${correct} de 15 acertos</h1><p>Use as explicações para entender seu raciocínio e escolher o próximo assunto.</p></div><div class="study-actions"><button class="btn" data-study-action="restart">Escolher novo simulado</button><button class="btn secondary" data-study-action="filter">${session.onlyWrong?'Mostrar todas':'Revisar apenas os erros'}</button></div><div class="study-reviews">${shown.length?shown.map(({q,i})=>`<article class="panel"><p class="eyebrow">Questão ${i+1} · ${esc(q.topic)} · ${session.answers[i]===q.answer?'Acerto':'Revisar'}</p><h2>${esc(q.prompt)}</h2><p>Sua resposta: <strong>${esc(q.options[session.answers[i]])}</strong></p>${session.answers[i]!==q.answer?`<p>Resposta correta: <strong>${esc(q.options[q.answer])}</strong></p>`:''}<p>${esc(q.explanation)}</p></article>`).join(''):'<p class="panel">Você acertou todas as questões desta sessão.</p>'}</div>${notice()}`;
    }
    const q=session.questions[session.index],selected=session.answers[session.index];
    return `<div class="study-heading"><span class="eyebrow">${esc(config.label)} · ${esc(q.topic)}</span><h1>Questão ${session.index+1} de 15</h1><p>Você pode voltar e alterar respostas antes de finalizar.</p></div><progress class="study-progress" max="15" value="${session.answers.filter(a=>a!==null).length}" aria-label="Questões respondidas"></progress><section class="panel"><h2 class="study-question">${esc(q.prompt)}</h2><div class="study-options" role="group" aria-label="Alternativas">${q.options.map((o,i)=>`<button class="choice ${selected===i?'selected':''}" aria-pressed="${selected===i}" data-study-answer="${i}"><span>${String.fromCharCode(65+i)}</span>${esc(o)}</button>`).join('')}</div><div class="study-actions"><button class="btn secondary" data-study-action="previous" ${session.index===0?'disabled':''}>Anterior</button><button class="btn" data-study-action="next" ${selected===null?'disabled':''}>${session.index===14?'Finalizar e revisar':'Próxima questão'}</button></div></section><p class="muted">Seu simulado é salvo neste navegador a cada resposta.</p>${notice()}`;
  }
  function quizHTML(subject,questions,options={}){configQuiz(subject,questions,options);return `<div data-study-quiz="${subject}">${quizBody(subject)}</div>`}
  function repaintQuiz(subject,focus=false){const root=document.querySelector(`[data-study-quiz="${subject}"]`);if(!root)return;root.innerHTML=quizBody(subject);if(focus){const heading=root.querySelector('h1');heading.tabIndex=-1;heading.focus();heading.scrollIntoView({block:'start'})}}
  function complete(subject,s){
    s.finished=true;s.correct=s.questions.filter((q,i)=>q.answer===s.answers[i]).length;s.completedAt=Date.now();
    const attempts=history(subject);if(!attempts.some(a=>a.id===s.id)){attempts.push({...s});write(key('attempts',subject),attempts);configs.get(subject).onComplete?.(s.correct,15)}
  }
  document.addEventListener('click',event=>{
    const root=event.target.closest('[data-study-quiz]');if(!root)return;
    const subject=root.dataset.studyQuiz,config=configs.get(subject);let s=sessions.get(subject);
    const answer=event.target.closest('[data-study-answer]');
    if(answer&&s&&!s.finished){s.answers[s.index]=Number(answer.dataset.studyAnswer);write(key('session',subject),s);repaintQuiz(subject);document.querySelector(`[data-study-quiz="${subject}"] [data-study-answer="${answer.dataset.studyAnswer}"]`)?.focus();return}
    const action=event.target.closest('[data-study-action]')?.dataset.studyAction;if(!action)return;
    if(action==='start'){
      const topic=root.querySelector('[data-study-topic]').value;
      const pool=config.questions.filter(q=>!topic||q.topic===topic);
      let h=read(key('selection',subject),null);
      if(!h||typeof h!=='object'||Array.isArray(h)){
        const old=read('estudalab.quiz.variety.v3.'+config.legacyNamespace,[]);h={seen:{},last:[]};
        if(Array.isArray(old)){for(const q of pool){const id=String(q.legacyId||q.id);h.seen[q.id]=old.filter(x=>x===id).length;if(old.slice(-15).includes(id))h.last.push(q.id)}}
      }
      try{
        const picked=engine.selectQuestions(pool,{count:15,history:h,idOf:q=>q.id,topicOf:q=>q.topic,difficultyOf:q=>q.difficulty||'medium'});
        const questions=picked.questions.map(q=>{const shuffled=engine.shuffleAnswers(q.options,q.answer);return {...q,options:shuffled.options,answer:shuffled.answerIndex}});
        s={id:crypto.randomUUID(),startedAt:Date.now(),questions,index:0,answers:Array(15).fill(null),finished:false};
        sessions.set(subject,s);write(key('selection',subject),picked.history);
      }catch(error){root.insertAdjacentHTML('beforeend','<p role="alert">Não foi possível montar 15 questões diferentes para este filtro. Escolha todos os assuntos.</p>');return}
    }else if(action==='restart'){sessions.set(subject,null);s=null}
    else if(s&&action==='previous'){s.index=Math.max(0,s.index-1)}
    else if(s&&action==='next'&&s.answers[s.index]!==null){if(s.index===14){if(s.answers.every(a=>a!==null))complete(subject,s)}else s.index++}
    else if(s&&action==='filter'){s.onlyWrong=!s.onlyWrong}
    write(key('session',subject),s);repaintQuiz(subject,true);
  });
  function records(subject){const value=read(key('cards',subject),{});return value&&typeof value==='object'&&!Array.isArray(value)?value:{}}
  function flashHTML(subject,cards,options={}){
    if(!decks.has(subject)){
      const r=records(subject);
      // Legacy labels are retained; their unknown review date is due now.
      for(const card of cards){const legacy=options.legacy?.(card.id);if(!r[card.id]&&legacy)r[card.id]={due:0,interval:0,ease:2.5,repetitions:0,lapses:legacy==='again'?1:0,grade:legacy==='again'?'again':'good',imported:true}}
      decks.set(subject,{cards,records:r,filter:'due',index:0,flipped:false,...options});
    }
    return `<div data-study-flash="${subject}">${flashBody(subject)}</div>`;
  }
  function flashList(d){const now=Date.now();let cards=d.cards.filter(c=>d.filter==='all'||d.filter==='due'&&(!d.records[c.id]||d.records[c.id].due<=now)||d.filter==='hard'&&['again','hard'].includes(d.records[c.id]?.grade)||d.filter===c.topic);return engine.dueCards(cards,{records:d.records,idOf:c=>c.id,now})}
  function flashBody(subject){
    const d=decks.get(subject),cards=flashList(d);d.index=Math.min(d.index,Math.max(0,cards.length-1));const c=cards[d.index],mastered=Object.values(d.records).filter(r=>r.interval>=7&&r.grade!=='again').length;
    const nextDue=Math.min(...Object.values(d.records).map(r=>r.due).filter(n=>n>Date.now()));
    const options=[['due','Para revisar agora'],['all','Todos os cartões'],['hard','Difíceis e errados'],...[...new Set(d.cards.map(c=>c.topic))].map(t=>[t,t])];
    return `<div class="study-heading"><span class="eyebrow">Revisão espaçada · ${esc(d.label)}</span><h1>Um pouco hoje. Mais firme amanhã.</h1><p>Responda antes de virar. Sua dificuldade define quando o cartão volta.</p></div><div class="study-flash-toolbar"><label for="study-filter-${subject}">Cartões</label><select id="study-filter-${subject}" data-study-filter>${options.map(([v,l])=>`<option value="${esc(v)}" ${d.filter===v?'selected':''}>${esc(l)}</option>`).join('')}</select><span>${mastered} de ${d.cards.length} consolidados</span></div>${c?`<button type="button" class="study-flashcard" data-flash-action="flip" aria-pressed="${d.flipped}" aria-label="${d.flipped?'Ver pergunta':'Revelar resposta'}"><span class="eyebrow">${d.flipped?'Resposta':'Pergunta'} · ${esc(c.topic)}</span><span class="study-flash-text">${esc(d.flipped?c.back:c.front)}</span><small>${d.flipped?'Compare com sua resposta e escolha abaixo.':'Toque para conferir sua resposta.'}</small></button><div class="study-actions"><button class="btn secondary" data-flash-action="previous">Anterior</button><span>${d.index+1} de ${cards.length}</span><button class="btn secondary" data-flash-action="next">Próximo</button></div><div class="study-grades" aria-label="Como foi lembrar?">${[['again','Errei','10 minutos'],['hard','Difícil','Revisar mais cedo'],['good','Lembrei','Intervalo normal'],['easy','Fácil','Intervalo maior']].map(([g,l,h])=>`<button class="btn ${g==='good'?'':'secondary'}" data-flash-grade="${g}" ${d.flipped?'':'disabled'}>${l}<small>${h}</small></button>`).join('')}</div>`:`<div class="panel"><h2>Revisão em dia.</h2><p>${Number.isFinite(nextDue)?'Próxima revisão: '+new Date(nextDue).toLocaleString('pt-BR')+'.':'Não há cartões neste filtro.'} Você pode explorar todos os cartões quando quiser.</p><button class="btn secondary" data-flash-action="all">Ver todos os cartões</button></div>`}<p class="muted">Consolidado: intervalo de pelo menos 7 dias. Os dados ficam neste navegador.</p>${d.message?`<p class="study-notice" role="status">${esc(d.message)}</p>`:''}${notice()}`;
  }
  function repaintFlash(subject){const root=document.querySelector(`[data-study-flash="${subject}"]`);if(root)root.innerHTML=flashBody(subject)}
  document.addEventListener('change',event=>{if(!event.target.matches('[data-study-filter]'))return;const subject=event.target.closest('[data-study-flash]').dataset.studyFlash,d=decks.get(subject);d.filter=event.target.value;d.index=0;d.flipped=false;repaintFlash(subject)});
  document.addEventListener('click',event=>{
    const root=event.target.closest('[data-study-flash]');if(!root)return;
    const subject=root.dataset.studyFlash,d=decks.get(subject),cards=flashList(d),c=cards[d.index];
    const action=event.target.closest('[data-flash-action]')?.dataset.flashAction,grade=event.target.closest('[data-flash-grade]')?.dataset.flashGrade;
    if(action==='flip'&&c)d.flipped=!d.flipped;
    else if(action==='all'){d.filter='all';d.index=0;d.flipped=false}
    else if((action==='next'||action==='previous')&&cards.length){d.index=(d.index+(action==='next'?1:-1)+cards.length)%cards.length;d.flipped=false}
    else if(grade&&d.flipped&&c){d.records[c.id]=engine.schedule(d.records[c.id],grade,Date.now());write(key('cards',subject),d.records);d.onGrade?.(c.id,grade);d.message='Próxima revisão deste cartão: '+new Date(d.records[c.id].due).toLocaleString('pt-BR')+'.';if(d.filter!=='due')d.index=(d.index+1)%cards.length;d.flipped=false}
    else return;
    repaintFlash(subject);document.querySelector(`[data-study-flash="${subject}"] [data-flash-action="flip"]`)?.focus();
  });
  window.EstudaLabStudyUI={quizHTML,flashHTML,hash,history,records};
})();
