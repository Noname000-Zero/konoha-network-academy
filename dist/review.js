export const dayKey=t=>new Date(t).toLocaleDateString('en-CA',{timeZone:'Asia/Ho_Chi_Minh'});
export const isMastered=r=>!!r&&r.stage>=3&&r.days?.length>=3&&r.recallSuccess>=1;
export function updateReview(state,id,quality,format,now=Date.now()){
 state.memory??={};let prev=state.memory[id]||{attempts:0,stage:0,days:[],recallSuccess:0,lapses:0},r={...prev,days:[...prev.days],attempts:prev.attempts+1,lastAt:now,lastGrade:quality};
 if(quality===0){r.stage=0;r.days=[];r.recallSuccess=0;r.lapses++;r.due=now+10*60000}
 else if(quality===1){r.stage=Math.max(0,r.stage-1);r.due=now+8*3600000}
 else {let day=dayKey(now);if(!r.days.includes(day)){r.days.push(day);r.stage=Math.min(4,r.stage+1)}if(format==='recall'&&quality===3)r.recallSuccess++;r.due=now+[1,1,3,7,14][r.stage]*86400000}
 state.memory[id]=r;if(state.records[id])state.records[id].due=r.due;return r;
}
export function cleanMemory(raw,ids){let out={};if(!raw||typeof raw!=='object')return out;for(let id of ids){let r=raw[id];if(!r||![r.attempts,r.stage,r.due,r.recallSuccess,r.lapses,r.lastAt,r.lastGrade].every(Number.isFinite))continue;if(r.stage<0||r.stage>4||r.attempts<0||!Array.isArray(r.days))continue;out[id]={attempts:r.attempts,stage:r.stage,due:r.due,recallSuccess:r.recallSuccess,lapses:r.lapses,lastAt:r.lastAt,lastGrade:r.lastGrade,days:[...new Set(r.days.filter(d=>typeof d==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(d)))].slice(-30)}}return out}
