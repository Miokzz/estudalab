(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.EstudaLabBank=factory()})(typeof globalThis!=='undefined'?globalThis:this,function(){
  const normalize=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/^\d+\.\s*/,'').replace(/−/g,'-').replace(/[^a-z0-9+\-±²³⁴⁵⁶⁷⁸⁹⁰¹^=]+/g,' ').trim();
  const tokens=s=>new Set(normalize(s).split(' ').filter(w=>w.length>2&&!['qual','quais','uma','para','como','que','dos','das','nos','por','com','principal','principalmente'].includes(w)).map(w=>w.replace(/s$/,'').replace(/(em|am)$/,'')));
  function similarity(a,b){const x=tokens(a),y=tokens(b);const overlap=[...x].filter(v=>y.has(v)).length;return overlap/(new Set([...x,...y]).size||1)}
  function scope(subject,q){
    if(q.scope)return q.scope;
    if(subject==='biologia'){if(/nervoso/i.test(q.topic))return 'Sistema nervoso';return /tireoide|glândula|ADH|hormônios/i.test(q.topic)?'Endocrinologia':'Reprodução'}
    if(subject==='fisica')return /espelho/i.test(q.topic)?'Óptica':'Eletromagnetismo';
    if(subject==='redacao')return /intervenção/i.test(q.topic)?'Intervenção':/coesão/i.test(q.topic)?'Coesão e linguagem':'Projeto de texto';
    return q.topic;
  }
  function prepare(subject,input){
    const questions=[],duplicates=[];
    for(const original of input){
      const retired={biologia:['E18','N17'],fisica:['plus1','plus9','plus14','plus13','plus20','plus17']};
      if((retired[subject]||[]).includes(original.id)){duplicates.push({removed:original.id,reason:'Equivalência conceitual revisada editorialmente'});continue}
      const q={...original,scope:scope(subject,original),difficulty:original.difficulty||'easy'};
      if(typeof q.prompt!=='string'||!Array.isArray(q.options)||q.options.length!==4||!Number.isInteger(q.answer)||q.answer<0||q.answer>3||!q.explanation)throw Error('Questão inválida: '+q.id);
      if(new Set(q.options.map(normalize)).size!==4)throw Error('Alternativas duplicadas: '+q.prompt);
      q.family=q.family||normalize(q.prompt.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g,'#').replace(/\d+/g,'#')).replace(/\bi\s*\b/g,'i');
      const duplicate=questions.find(old=>normalize(old.prompt)===normalize(q.prompt)||(old.scope===q.scope&&normalize(old.options[old.answer])===normalize(q.options[q.answer])&&similarity(old.prompt,q.prompt)>=.72));
      if(duplicate){duplicates.push({kept:duplicate.id||duplicate.prompt,removed:q.id||q.prompt,similarity:similarity(duplicate.prompt,q.prompt)});continue}
      questions.push(q);
    }
    return {questions,duplicates};
  }
  return {prepare,similarity,normalize};
});
