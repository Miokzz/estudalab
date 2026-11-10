(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.EstudaLabWritingCore=factory()})(typeof globalThis!=='undefined'?globalThis:this,function(){
 'use strict';
 const KEY='estudalab.redacao.drafts.v2',LEGACY='estudalab.redacao.v1';
 const parts=['introducao','d1','d2','conclusao'],modes=[...parts,'completa'];
 const empty=()=>Object.fromEntries(parts.map(p=>[p,'']));
 function clean(value){const v=value&&typeof value==='object'?value:{};return {tema:typeof v.tema==='string'?v.tema.slice(0,300):'',customTema:typeof v.customTema==='string'?v.customTema.slice(0,300):'',modo:modes.includes(v.modo)?v.modo:'introducao',campos:Object.fromEntries(parts.map(p=>[p,typeof v.campos?.[p]==='string'?v.campos[p]:'']))}}
 function read(storage,key,fallback){try{return JSON.parse(storage.getItem(key))??fallback}catch{return fallback}}
 function text(v){return (v.modo==='completa'?parts:[v.modo]).map(p=>v.campos[p]?.trim()||'').filter(Boolean).join('\n\n')}
 function words(t){return (String(t).match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu)||[]).length}
 function createStore(storage,initialTopic){
  let raw=read(storage,KEY,{});let entries=Array.isArray(raw.entries)?raw.entries.filter(x=>x&&typeof x.tema==='string').map(x=>({...clean(x),updatedAt:Number(x.updatedAt)||0,versions:Array.isArray(x.versions)?x.versions.filter(v=>v&&typeof v==='object').slice(0,12):[]})):[];
  const legacy=clean(read(storage,LEGACY,{}));
  if(!entries.length&&legacy.tema)entries.push({...legacy,updatedAt:0,versions:[]});
  let active=typeof raw.active==='string'?raw.active:legacy.tema||initialTopic;
  function get(tema){return clean(entries.find(e=>e.tema===tema)||{tema,campos:empty()})}
  function save(value,snapshot=false,now=Date.now()){
   const v=clean(value);if(!v.tema)return false;
   let old=entries.find(e=>e.tema===v.tema);let versions=old?.versions||[];
   const signature=x=>JSON.stringify([x.campos,x.customTema]);
   if(snapshot&&Object.values(v.campos).some(Boolean)&&(!versions[0]||signature(versions[0])!==signature(v)))versions=[{...v,at:now},...versions].slice(0,12);
   const next=[{...v,updatedAt:now,versions},...entries.filter(e=>e.tema!==v.tema)];
   try{storage.setItem(KEY,JSON.stringify({version:2,active:v.tema,entries:next}));entries=next;active=v.tema;try{storage.setItem(LEGACY,JSON.stringify(v))}catch{}return true}catch{return false}
  }
  return {get,save,active:()=>get(active),list:()=>entries.map(e=>({...clean(e),updatedAt:e.updatedAt,versions:e.versions.map(v=>({...clean(v),at:v.at}))}))};
 }
 const questions={introducao:['Qual posicionamento sua tese defende sobre o recorte do tema?','A contextualização explica o problema ou apenas cita uma referência?','Quais caminhos de argumentação você vai desenvolver?'],d1:['Qual ideia este parágrafo prova?','Que relação de causa, consequência ou comparação sustenta a ideia?','Como o repertório ajuda a demonstrar o argumento, além de ser citado?'],d2:['Este argumento acrescenta algo diferente do primeiro desenvolvimento?','Há explicação e evidência suficientes para ligar a ideia à tese?','A transição entre os parágrafos corresponde à relação lógica pretendida?'],conclusao:['Quem executa a intervenção (agente) e o que fará (ação)?','Por qual meio, com qual finalidade e com que detalhamento concreto?','A intervenção responde ao problema discutido e respeita direitos humanos?']};
 function structural(t,mode){
  const paragraphs=String(t).trim().split(/\n\s*\n/).filter(Boolean),sentences=String(t).match(/[^.!?]+[.!?]+|[^.!?]+$/g)||[];
  const long=sentences.filter(s=>words(s)>45);
  return {origem:'local',resumo:`Seu texto tem ${words(t)} palavras, ${paragraphs.length} bloco(s) de texto e ${sentences.length} segmento(s) separados por pontuação. Essas medidas não avaliam a qualidade da redação.`,forcas:[],falhas:long.slice(0,2).map(s=>({trecho:s.trim(),problema:'Período com mais de 45 palavras.',comoMelhorar:'Releia a pontuação e confira se as relações estão claras. O tamanho, sozinho, não significa erro.'})),acoes:[],perguntas:mode==='completa'?Object.values(questions).flat():questions[mode]||questions.introducao,alertas:['Revisão estrutural local: não identifica tese, qualidade da argumentação, repertório ou erros gramaticais. Nenhuma nota foi atribuída.']};
 }
 return {KEY,parts,modes,empty,clean,text,words,createStore,structural};
});
