import fs from 'node:fs/promises';import assert from 'node:assert/strict';import crypto from 'node:crypto';
export async function verifyOptionalPDF(d){try{let bytes=await fs.readFile('dist/sources/'+d.file);assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),d.sha256);return true}catch(e){if(e.code!=='ENOENT')throw e;assert.equal(d.distributed,false);return false}}
