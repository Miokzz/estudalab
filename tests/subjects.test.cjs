const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
for(const subject of ['biologia','fisica','matematica','redacao']){
 test(`${subject}: shared shell, local assets, unique static IDs and valid script`,()=>{
  const html=fs.readFileSync(path.join(root,subject,'index.html'),'utf8');
  assert.match(html,/\/assets\/app-shell.js/);assert.match(html,/\/assets\/design-system.css/);
  assert.match(html,/id="subject-content"/);
  assert.doesNotMatch(html,/<style>|<script>/);
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(ids.length,new Set(ids).size,'Static IDs must be unique');
  for(const m of html.matchAll(/(?:src|href)="([^"]+)"/g)){
   if(/^(https?:|#)/.test(m[1]))continue;
   const p=m[1].startsWith('/')?path.join(root,m[1]):path.resolve(root,subject,m[1]);
   assert.ok(fs.existsSync(p),m[1]);
  }
  const script=fs.readFileSync(path.join(root,subject,'app.js'),'utf8');
  new vm.Script(script);
  assert.match(script,/EstudaLabShell.mount/);
  assert.doesNotMatch(script,/\$\('#(?:sidebar|scrim|crumb|themeBtn|tabs)'\)/);
 });
}
