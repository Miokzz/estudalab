const {test}=require('node:test');const assert=require('node:assert/strict');
const {declaration,pageData}=require('./helpers.cjs');
const normalizer=require('../assets/question-bank.js');
const math=require('../assets/math-questions.js');const writing=require('../assets/writing-questions.js');
const science=require('../assets/science-questions.js');const engine=require('../assets/study-engine.js');
test('new contextual banks have distinct choices, correct indices and editorial difficulty',()=>{
 for(const q of [...math,...writing,...science.biologia,...science.fisica]){assert.equal(q.options.length,4,q.id);assert.equal(new Set(q.options).size,4,q.id);assert.ok(q.options[q.answer],q.id);assert.ok(['easy','medium','hard'].includes(q.difficulty));assert.ok(q.explanation.length>35)}
 assert.equal(new Set([...math,...writing].map(q=>q.id)).size,math.length+writing.length);
});
test('science scopes support exactly 15 questions with valid shuffled keys',()=>{
 const bio=pageData('biologia','BANK.map(q=>({id:q.id,topic:L.find(l=>l.id===q.topic)?.title||q.topic,prompt:q.q,options:q.opts,answer:q.a,explanation:q.why}))');
 const physics=pageData('fisica','[...QUIZ,...EXTRA_QUIZ_V7].map(q=>({id:q.id,topic:LESSONS.find(l=>l.id===q.area)?.title||q.area,prompt:q.q,options:q.o,answer:q.a,explanation:q.e}))');
 for(const [subject,old] of [['biologia',bio],['fisica',physics]]){
  const {questions}=normalizer.prepare(subject,[...old,...science[subject]]);
  for(const scope of new Set(questions.map(q=>q.scope))){const pool=questions.filter(q=>q.scope===scope);assert.ok(pool.length>=15,scope+': '+pool.length);const picked=engine.selectQuestions(pool,{idOf:q=>q.id,count:15,topicOf:q=>q.topic,difficultyOf:q=>q.difficulty,familyOf:q=>q.family});assert.equal(picked.questions.length,15);for(const q of picked.questions){const shuffled=engine.shuffleAnswers(q.options,q.answer);assert.equal(shuffled.options[shuffled.answerIndex],q.options[q.answer])}}
 }
});
test('same-template variants do not fill a session while other families remain',()=>{
 const bank=Array.from({length:40},(_,i)=>({id:String(i),topic:'Tema',difficulty:'easy',family:i<20?'powers':'family'+i}));
 const picked=engine.selectQuestions(bank,{count:15,familyOf:q=>q.family,rng:()=>.3});assert.equal(new Set(picked.questions.map(q=>q.family)).size,15);
});
test('54 generated mathematics answers agree with independent arithmetic',()=>{
 const bank=declaration('matematica','EXTRA_QUESTIONS');let verified=0;
 const poly=(s,x)=>{const terms=s.replace(/−/g,'-').match(/[+-]?[^+-]+/g);return terms.reduce((sum,t)=>{if(!t.includes('x'))return sum+Number(t);const [a,tail]=t.split('x');const c=a===''||a==='+'?1:a==='-'?-1:Number(a);return sum+c*x**(tail==='²'?2:tail==='³'?3:1)},0)};
 for(const q of bank){const [topic,prompt,options,answer]=q;const actual=options[answer];let m,expected;
  if(m=prompt.match(/Quanto vale i\^(\d+)/))expected=['1','i','−1','−i'][Number(m[1])%4];
  else if(m=prompt.match(/conjugado de z=([+-]?\d+)([+-]\d+)i/)){const a=Number(m[1]),b=-Number(m[2]);expected=`${a}${b>=0?'+':''}${b}i`}
  else if(m=prompt.match(/P\(x\)=([^,]+), qual é P\((-?\d+)\)/))expected=String(poly(m[1],Number(m[2])));
  else if(m=prompt.match(/resto de P\(x\)=(.+) ao dividir por x([+-]\d+)/))expected=String(poly(m[1],-Number(m[2])));
  else if(m=prompt.match(/soma dos coeficientes de P\(x\)=(.+)\?/))expected=String(poly(m[1],1));
  else if(m=prompt.match(/Para x([+-]\d+) ser fator de P\(x\)=x²\+nx([+-]\d+)/)){const x=-Number(m[1]);expected=String(-(x*x+Number(m[2]))/x)}
  else throw Error('Unverified template: '+prompt);
  assert.equal(String(actual),expected,prompt);verified++;
 }assert.equal(verified,54);
});
test('original 23 mathematics keys match independently worked solutions',()=>{
 const expected=['−1 ± i','x=±3','(−1,6)','4/5+i','(−1−7i)/5','2−2i','−i','−2','0','−1','64','−64','0,2,3','Q=x−3; R=2x+1','−6','19','16x+71','7','0','−2','3x³+5x²−12x+7','−4','Resto não nulo tem grau menor que o divisor'];
 const b=declaration('matematica','QUESTIONS');assert.equal(b.length,expected.length);b.forEach((q,i)=>assert.equal(q[2][q[3]],expected[i],q[1]));
});
test('semantic duplicate detection keeps different concepts and flags equivalent prompts',()=>{
 const base={topic:'Biologia',options:['Leydig','Sertoli','Neurônios','Ovócitos'],answer:0,explanation:'Células intersticiais produzem testosterona.'};
 const result=normalizer.prepare('biologia',[{...base,id:'a',prompt:'Quais células produzem testosterona nos testículos?'},{...base,id:'b',prompt:'Qual célula produz testosterona nos testículos?'}]);
 assert.equal(result.questions.length,1);assert.equal(result.duplicates.length,1);
});
test('mathematics and writing scopes support complete 15-question sessions after deduplication',()=>{
 const mathOld=pageData('matematica','[...QUESTIONS,...EXTRA_QUESTIONS]').map(q=>({topic:q[0],prompt:q[1],options:q[2],answer:q[3],explanation:q[4]}));
 const wrOld=pageData('redacao','[...BANK,...EXTRA_BANK_V7].map(q=>({topic:writingArea(q),prompt:q[0],options:q[1],answer:q[2],explanation:q[3]}))');
 for(const [subject,all] of [['matematica',[...mathOld,...math]],['redacao',[...wrOld,...writing]]]){const {questions}=normalizer.prepare(subject,all);const scopes={};questions.forEach(q=>scopes[q.scope]=(scopes[q.scope]||0)+1);for(const [scope,n] of Object.entries(scopes))assert.ok(n>=15,`${subject}/${scope}: ${n}`)}
});
