import fs from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';

const denied = p => /(^|\/)(node_modules|\.openai|\.sites-local|tmp|\.codex)(\/|$)|(^|\/)\.env(?:\.|$)|\.(pdf|pem|key|pfx|p12|zip|gz|log)$/i.test(p) || /(?:backup|tien-do).*\.json$/i.test(p);
const patterns = [
  ['GitHub token', /gh[pousr]_[A-Za-z0-9]{20,}/],
  ['private key', /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/],
  ['AWS key', /AKIA[A-Z0-9]{16}/],
  ['JWT', /eyJ[A-Za-z0-9_-]{15,}\.[A-Za-z0-9_-]{15,}\.[A-Za-z0-9_-]{15,}/],
  ['credential assignment', /(?:api[_-]?key|access[_-]?token|client[_-]?secret|password)\s*[:=]\s*["'][A-Za-z0-9_+\/-]{16,}["']/i],
  ['private machine path', /[A-Za-z]:[\\/](?:Users|HocTap)[\\/]/i],
  ['email address', /\b[A-Za-z0-9._%+-]+@(?!users\.noreply\.github\.com)[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/]
];
function inspect(name, text) {
  assert.ok(!denied(name), 'Forbidden file: ' + name);
  for (const [label, re] of patterns) assert.ok(!re.test(text), label + ' in ' + name);
}
async function filesIn(dir, prefix='') {
  let out=[];
  for (const entry of await fs.readdir(dir,{withFileTypes:true})) {
    if (['.git','node_modules'].includes(entry.name)) continue;
    let name=prefix+entry.name;
    if(entry.isDirectory()) out.push(...await filesIn(dir+'/'+entry.name,name+'/'));
    else out.push(name);
  }
  return out;
}
let files=await filesIn('.');
for(let name of files) inspect(name,await fs.readFile(name,'utf8'));
let blobs=0;
try {
  const objects=execFileSync('git',['rev-list','--objects','--all'],{encoding:'utf8'}).trim().split('\n').filter(Boolean);
  for(let row of objects){let [id,...rest]=row.split(' '),name=rest.join(' ');if(!name)continue;
    if(execFileSync('git',['cat-file','-t',id],{encoding:'utf8'}).trim()!=='blob')continue;
    inspect(name,execFileSync('git',['cat-file','-p',id],{encoding:'utf8',maxBuffer:5e6}));blobs++;
  }
} catch(error) { if(!String(error.stderr||'').includes('not a git repository')) throw error; }
console.log(`Public audit passed: ${files.length} files, ${blobs} historical blobs; no matching forbidden files or patterns. This is a scoped pattern scan, not a guarantee against every secret.`);
