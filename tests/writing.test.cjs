const {test}=require('node:test');const assert=require('node:assert/strict');
const core=require('../assets/writing-core.js');const {declaration}=require('./helpers.cjs');
function memory(initial={}){const m=new Map(Object.entries(initial));return {getItem:k=>m.get(k)||null,setItem:(k,v)=>m.set(k,v)}}
test('drafts migrate legacy fields and persist different themes, modes and custom title',()=>{
 const old={tema:'Acesso à leitura',modo:'d1',campos:{introducao:'Introdução anterior',d1:'Argumento anterior'}};
 const storage=memory({'estudalab.redacao.v1':JSON.stringify(old)}),store=core.createStore(storage,'Outro');
 assert.equal(store.active().campos.d1,old.campos.d1);store.save(store.active(),true,1000);
 const next=store.get('Mobilidade urbana');next.campos.conclusao='Intervenção';next.modo='conclusao';store.save(next,true,2000);
 assert.equal(store.get(old.tema).campos.d1,old.campos.d1);assert.equal(core.createStore(storage,'X').active().modo,'conclusao');
 const custom=store.get('Personalizar tema…');custom.customTema='Tema específico';custom.campos.introducao='Meu texto';store.save(custom,true,3000);
 assert.equal(core.createStore(storage,'X').active().customTema,'Tema específico');
});
test('versions preserve original before replacing a field and do not duplicate identical snapshots',()=>{
 const store=core.createStore(memory(),'Tema');const d=store.active();d.campos.d1='Primeira versão';store.save(d,true,1);store.save(d,true,2);d.campos.d1='Segunda';store.save(d,true,3);
 const versions=store.list()[0].versions;assert.equal(versions.length,2);assert.equal(versions[1].campos.d1,'Primeira versão');
});
test('malformed local state is safe and quota failure is reported without dropping in-memory draft',()=>{
 const storage=memory({[core.KEY]:'{"entries":false}','estudalab.redacao.v1':'{"campos":{"d1":null},"modo":"oops"}'});const store=core.createStore(storage,'Tema');assert.equal(store.active().modo,'introducao');
 storage.setItem=()=>{throw Error('quota')};const draft=store.active();draft.campos.d1='Texto não salvo';assert.equal(store.save(draft),false);assert.equal(draft.campos.d1,'Texto não salvo');
});
test('structural feedback never pretends keyword detection is semantic evaluation or a score',()=>{
 for(const mode of core.modes){const result=core.structural('Portanto o governo deve agir por meio de medidas a fim de resolver o problema.',mode);assert.equal(result.origem,'local');assert.equal(result.nota,undefined);assert.equal(result.competencias,undefined);assert.equal(result.checklist,undefined);assert.ok(result.perguntas.length>=3)}
 const t=Array(50).fill('palavra').join(' ')+'.';assert.equal(core.structural(t,'d1').falhas[0].trecho,t);assert.equal(core.words('ação, educação e inclusão'),4);
});
test('all 60 writing proposals have unique IDs and three original motivating texts',()=>{
 const topics=declaration('redacao','TOPICS');assert.equal(topics.length,60);assert.equal(new Set(topics.map(t=>t.id)).size,60);for(const t of topics){assert.equal(t.texts.length,3);assert.ok(t.texts.every(x=>x.body.length>50))}assert.ok(topics.find(t=>t.id==='mob1').category.includes('mobilidade'));
});

test('free topic full essay survives reload, versions and partial-mode edits',()=>{
 const storage=memory(),store=core.createStore(storage,'Tema');const d=store.get('Personalizar tema…');
 d.customTema='A democratização do acesso à leitura';d.modo='completa';d.campos.introducao='Treino anterior';
 assert.equal(core.text(d),'Treino anterior');
 d.textoCompleto='Introdução livre.\n\nDesenvolvimento independente.\n\nConclusão.';store.save(d,true,100);
 const loaded=core.createStore(storage,'Outro').active();assert.equal(core.text(loaded),d.textoCompleto);assert.equal(loaded.customTema,d.customTema);
 loaded.modo='d1';loaded.campos.d1='Treino isolado';assert.equal(core.text(loaded),'Treino isolado');store.save(loaded,true,200);
 loaded.modo='completa';assert.equal(core.text(loaded),d.textoCompleto);loaded.textoCompleto='';assert.equal(core.text(loaded),'');
 assert.equal(store.list()[0].versions[1].textoCompleto,d.textoCompleto);
});
