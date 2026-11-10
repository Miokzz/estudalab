const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
// Read trusted repository data expressions without executing the page or DOM code.
function declaration(subject,name,scope={}){
 const source=fs.readFileSync(path.join(__dirname,'..',subject,'app.js'),'utf8');
 const match=new RegExp('(?:const|let)\\s+'+name+'\\s*=').exec(source);if(!match)throw Error('Missing '+name);
 let start=match.index+match[0].length,depth=0,quote='',escape=false,end=start;
 for(;end<source.length;end++){
  const c=source[end];if(quote){if(escape)escape=false;else if(c==='\\')escape=true;else if(c===quote)quote='';continue}
  if(c==='"'||c==="'"||c==='`'){quote=c;continue}if('([{'.includes(c))depth++;if(')]}'.includes(c))depth--;if(c===';'&&depth===0)break;
 }
 return vm.runInNewContext('('+source.slice(start,end)+')',scope,{timeout:2000});
}
function pageData(subject,expression){
 const node={value:'',innerHTML:'',textContent:'',style:{},dataset:{},classList:{add(){},remove(){},toggle(){}},addEventListener(){},setAttribute(){},querySelector(){return node},querySelectorAll(){return []}};
 const context={document:{querySelector:()=>node,querySelectorAll:()=>[],getElementById:()=>node,addEventListener(){},body:node},window:{addEventListener(){},scrollTo(){}},location:{hash:''},history:{replaceState(){}},localStorage:{getItem:()=>null,setItem(){}},EstudaLabShell:{mount:()=>({setRoute(){},setProgress(){}})},EstudaLabStudyUI:{quizHTML:()=>'',flashHTML:()=>''},console,URL};
 vm.createContext(context);
 vm.runInContext(fs.readFileSync(path.join(__dirname,'..',subject,'app.js'),'utf8'),context,{timeout:2000});
 return vm.runInContext(expression,context);
}
module.exports={declaration,pageData};
