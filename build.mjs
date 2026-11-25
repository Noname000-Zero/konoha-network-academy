import fs from 'node:fs/promises';import {execFileSync} from 'node:child_process';import assert from 'node:assert/strict';
import {sources,sourceMeta,lessons,questions} from './dist/data.js';
for(let f of await fs.readdir('dist'))if(f.endsWith('.js'))execFileSync(process.execPath,['--check','dist/'+f]);
for(let file of ['index.html','style.css','visual.css','app.js','source-audit.json','coverage.html'])assert.ok((await fs.stat('dist/'+file)).size>0,file);
const audit=JSON.parse(await fs.readFile('dist/source-audit.json','utf8'));for(let ch=0;ch<4;ch++){assert.equal(audit.documents[ch].actualPages,sourceMeta[ch].pages);assert.equal(audit.documents[ch].questionCount,questions.filter(q=>q.ch===ch).length)}
assert.equal(audit.lessonCrosswalk.length,lessons.length);console.log('Static build verified: '+lessons.length+' lessons, '+questions.length+' questions; all assets, JS syntax and PDF metadata valid.');
