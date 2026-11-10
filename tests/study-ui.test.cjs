const {test}=require('node:test');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
const engine=require('../assets/study-engine.js');
function setup(initial={}){
 const data=new Map(Object.entries(initial)),listeners={};
 const document={addEventListener:(name,fn)=>(listeners[name]??=[]).push(fn),querySelector:()=>null};
 const context={window:{EstudaLabStudy:engine},document,localStorage:{getItem:k=>data.get(k)||null,setItem:(k,v)=>data.set(k,v)},crypto:require('node:crypto').webcrypto,Date,console};
 vm.runInNewContext(fs.readFileSync(require.resolve('../assets/study-ui.js'),'utf8'),context);
 function click(subject,type,attr,value){
  const root={dataset:{[type==='quiz'?'studyQuiz':'studyFlash']:subject},querySelector:()=>({value:''}),insertAdjacentHTML:()=>{throw Error('Unexpected error UI')}};
  const event={target:{closest:selector=>selector===`[data-study-${type}]`?root:selector===`[${attr}]`?{dataset:{[attr.replace(/^data-/,'').replace(/-([a-z])/g,(_,c)=>c.toUpperCase())]:value}}:null}};
  listeners.click.forEach(fn=>fn(event));
 }
 return {ui:context.window.EstudaLabStudyUI,data,click};
}
const bank=Array.from({length:30},(_,i)=>({id:'q'+i,topic:'Tema '+i%3,prompt:'Pergunta '+i,options:['A','B','C','D'],answer:i%4,explanation:'Explicação '+i}));
test('full session persists 15 answers, resumes, saves once and exposes wrong-answer review',()=>{
 let completed=0;const s=setup();s.ui.quizHTML('test',bank,{label:'Teste',onComplete:()=>completed++});
 s.click('test','quiz','data-study-action','start');
 let session=JSON.parse(s.data.get('estudalab.session.v1.test'));assert.equal(session.questions.length,15);
 for(let i=0;i<15;i++){s.click('test','quiz','data-study-answer','0');s.click('test','quiz','data-study-action','next')}
 const attempts=JSON.parse(s.data.get('estudalab.attempts.v1.test'));assert.equal(attempts.length,1);assert.equal(attempts[0].answers.length,15);assert.equal(completed,1);
 const restored=setup(Object.fromEntries(s.data));const html=restored.ui.quizHTML('test',bank,{label:'Teste'});assert.match(html,/Sessão concluída/);assert.match(html,/Revisar apenas os erros/);
});
test('corrupted session cannot replace a valid question bank or leak HTML',()=>{
 const s=setup({'estudalab.session.v1.test':'{"questions":[{}],"answers":[]}'});
 const html=s.ui.quizHTML('test',bank,{label:'<img src=x>'});assert.match(html,/Começar 15 questões/);assert.doesNotMatch(html,/<img/);
});
test('flashcards reveal only one side and a failed review schedules ten minutes',()=>{
 const s=setup();const cards=[{id:0,topic:'Tema',front:'Pergunta única',back:'Resposta reservada'}];
 const html=s.ui.flashHTML('test',cards,{label:'Teste'});assert.match(html,/Pergunta única/);assert.doesNotMatch(html,/Resposta reservada/);
 s.click('test','flash','data-flash-action','flip');s.click('test','flash','data-flash-grade','again');
 const record=JSON.parse(s.data.get('estudalab.cards.v1.test'))['0'];assert.equal(record.grade,'again');assert.equal(record.due-record.lastReviewed,600000);
});
