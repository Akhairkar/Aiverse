/* AI-Verse Phase 1 — public model metadata + explicitly simulated combat.
   Model catalogue source: Hugging Face Hub public API. No API keys required.
   Combat outcomes remain simulations; no model inference is performed. */
const robotDatabase = [
{id:'openai-gpt-4o',name:'GPT-4o',company:'OpenAI · public catalogue seed',version:'GPT-4o',tier:'TITAN',powerScore:0,color:'#66e6ff',context:'See provider documentation',description:'Public catalogue seed. The score is not a benchmark; model availability and specs can change.',heightPx:220,modelId:'openai/gpt-4o'},
{id:'google-gemma-3',name:'Gemma 3',company:'Google · public catalogue seed',version:'Gemma 3 family',tier:'WARRIOR',powerScore:0,color:'#a78bfa',context:'Varies by model variant',description:'Public catalogue seed. Verify specifications with the linked model card.',heightPx:175,modelId:'google/gemma-3-4b-it'},
{id:'meta-llama-3',name:'Llama',company:'Meta · public catalogue seed',version:'Llama family',tier:'SCOUT',powerScore:0,color:'#ffb86b',context:'Varies by model variant',description:'Public catalogue seed. Verify access conditions and specs with the linked model card.',heightPx:140,modelId:'meta-llama/Llama-3.3-70B-Instruct'}
];
const colors=['#6de7ff','#ff5db7','#b6a0ff','#ffc078','#63f5bb'];
function generateRobotSVG(model,scale=1){
 const h=(model.heightPx||160)*scale,w=h*.78,safeId=String(model.id).replace(/[^a-zA-Z0-9_-]/g,'');
 const accent=model.color||colors[0];
 return `<svg width="${w}" height="${h}" viewBox="0 0 120 160" role="img" aria-label="${escapeHTML(model.name)} industrial sci-fi combat machine concept" class="mech-render">
 <defs>
  <linearGradient id="steel-${safeId}" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f0f4f7"/><stop offset=".12" stop-color="#788895"/><stop offset=".29" stop-color="#293847"/><stop offset=".52" stop-color="#111b27"/><stop offset=".72" stop-color="#465665"/><stop offset="1" stop-color="#080d14"/></linearGradient>
  <linearGradient id="edge-${safeId}" x1="0" y1="0" x2=".9" y2="1"><stop stop-color="#dce8f0"/><stop offset=".28" stop-color="#536879"/><stop offset=".55" stop-color="#1c2b39"/><stop offset="1" stop-color="#080c12"/></linearGradient>
  <linearGradient id="visor-${safeId}" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#07111b"/><stop offset=".45" stop-color="${accent}"/><stop offset=".58" stop-color="#eafaff"/><stop offset=".72" stop-color="${accent}"/><stop offset="1" stop-color="#050912"/></linearGradient>
  <linearGradient id="core-${safeId}" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#f4ffff"/><stop offset=".25" stop-color="${accent}"/><stop offset="1" stop-color="#12334a"/></linearGradient>
  <filter id="shadow-${safeId}" x="-50%" y="-30%" width="200%" height="180%"><feGaussianBlur stdDeviation="2.2"/></filter>
  <pattern id="micro-${safeId}" width="4" height="4" patternUnits="userSpaceOnUse"><path d="M0 4L4 0" stroke="#dceaf2" stroke-opacity=".08" stroke-width=".6"/></pattern>
 </defs>
 <ellipse cx="60" cy="153" rx="34" ry="4" fill="#000" opacity=".7" filter="url(#shadow-${safeId})"/>
 <!-- heavy shoulder exoskeleton -->
 <path d="M39 42L22 40 9 52 5 70 17 82 31 72 38 60Z" fill="url(#steel-${safeId})" stroke="#8598a7" stroke-width="1.2"/>
 <path d="M81 42L98 40 111 52 115 70 103 82 89 72 82 60Z" fill="url(#steel-${safeId})" stroke="#8598a7" stroke-width="1.2"/>
 <path d="M13 54L28 48 31 60 19 70Z M107 54L92 48 89 60 101 70Z" fill="${accent}" opacity=".72"/>
 <path d="M17 56L25 53M95 53L103 56" stroke="#e4edf2" stroke-opacity=".7" stroke-width="1.4"/>
 <!-- compact armored head and recessed sensor band -->
 <path d="M39 8L49 3 71 3 81 8 86 23 78 40 69 47 51 47 42 40 34 23Z" fill="url(#steel-${safeId})" stroke="#b2c1cb" stroke-width="1.2"/>
 <path d="M38 19L48 14 72 14 82 19 78 29 69 34 51 34 42 29Z" fill="#03070d" stroke="#506272" stroke-width="1"/>
 <path d="M43 22L56 20 77 22 70 27 50 28Z" fill="url(#visor-${safeId})"/>
 <path d="M48 36L72 36 67 42 53 42Z" fill="#111c28" stroke="#6f8494" stroke-width=".8"/>
 <path d="M53 39L60 39 60 42 53 42Z" fill="${accent}" opacity=".85"/>
 <path d="M39 11L32 17 34 28M81 11L88 17 86 28" fill="none" stroke="#e0e9ef" stroke-opacity=".45" stroke-width="1"/>
 <!-- neck actuators -->
 <path d="M48 45L46 53 54 58 66 58 74 53 72 45" fill="url(#edge-${safeId})" stroke="#718391"/>
 <path d="M53 47L53 55M60 47L60 56M67 47L67 55" stroke="#0a1119" stroke-width="2"/>
 <!-- broad chest plates, vents and reactor -->
 <path d="M35 53L48 49 72 49 85 53 96 79 86 101 73 112 47 112 34 101 24 79Z" fill="url(#steel-${safeId})" stroke="#8fa1ae" stroke-width="1.3"/>
 <path d="M35 56L47 54 43 76 32 84 29 77Z M85 56L73 54 77 76 88 84 91 77Z" fill="url(#edge-${safeId})" stroke="#526575" stroke-width=".8"/>
 <path d="M36 58L43 57 39 72 34 76Z M84 58L77 57 81 72 86 76Z" fill="${accent}" opacity=".62"/>
 <path d="M45 57L75 57 70 72 60 78 50 72Z" fill="#07101a" stroke="#647b8d" stroke-width="1"/>
 <path d="M49 60L71 60 68 69 60 73 52 69Z" fill="url(#core-${safeId})"/>
 <circle cx="60" cy="65" r="2.6" fill="#fff" opacity=".95"/>
 <path d="M39 82L50 78 70 78 81 82 76 94 60 101 44 94Z" fill="url(#edge-${safeId})" stroke="#9eafba" stroke-width=".8"/>
 <path d="M46 84L54 82M46 88L54 86M66 82L74 84M66 86L74 88" stroke="#d0dbe3" stroke-opacity=".65" stroke-width="1"/>
 <path d="M57 80L63 80 64 94 60 97 56 94Z" fill="${accent}" opacity=".85"/>
 <path d="M29 79L36 84 33 94 26 89ZM91 79L84 84 87 94 94 89Z" fill="#101a26" stroke="#697d8b"/>
 <!-- articulated arms with pistons -->
 <path d="M17 82L29 77 35 91 31 107 21 111 15 101Z M103 82L91 77 85 91 89 107 99 111 105 101Z" fill="url(#steel-${safeId})" stroke="#788b99" stroke-width="1"/>
 <path d="M21 86L29 85 31 94 26 98Z M99 86L91 85 89 94 94 98Z" fill="${accent}" opacity=".55"/>
 <circle cx="25" cy="101" r="5" fill="#0b131d" stroke="#8a9ba7"/><circle cx="95" cy="101" r="5" fill="#0b131d" stroke="#8a9ba7"/>
 <path d="M25 106L22 119 28 125 35 121 36 109Z M95 106L98 119 92 125 85 121 84 109Z" fill="url(#edge-${safeId})" stroke="#718492"/>
 <path d="M22 115L31 113M89 113L98 115" stroke="${accent}" stroke-width="1.6"/>
 <!-- segmented waist -->
 <path d="M43 105L77 105 80 116 72 124 48 124 40 116Z" fill="url(#steel-${safeId})" stroke="#81929e"/>
 <path d="M49 110L71 110 67 117 53 117Z" fill="#08101a" stroke="#4e6271"/>
 <!-- heavy legs and magnetic boots -->
 <path d="M43 120L57 120 55 138 49 147 34 147 31 141 36 128Z M63 120L77 120 84 128 89 141 86 147 71 147 65 138Z" fill="url(#steel-${safeId})" stroke="#899aa7" stroke-width="1.1"/>
 <path d="M38 129L52 128 49 139 38 141Z M68 128L82 129 82 141 71 139Z" fill="url(#edge-${safeId})" stroke="#536777"/>
 <path d="M39 132L49 131M71 131L81 132" stroke="${accent}" stroke-width="1.4"/>
 <path d="M32 143L51 143 49 150 29 151 26 148Z M69 143L88 143 94 148 91 151 71 150Z" fill="#080d14" stroke="#91a0aa" stroke-width="1"/>
 <path d="M30 147L48 147M73 147L90 147" stroke="#b7c5ce" stroke-opacity=".5"/>
 <!-- fine panel seams, bolts and subtle wear -->
 <path d="M43 56L39 66M77 56L81 66M33 96L41 101M87 96L79 101M45 124L42 135M75 124L78 135" stroke="#dce5eb" stroke-opacity=".32" stroke-width=".8"/>
 <g fill="#d7e0e6" opacity=".75"><circle cx="31" cy="59" r="1"/><circle cx="89" cy="59" r="1"/><circle cx="35" cy="87" r="1"/><circle cx="85" cy="87" r="1"/><circle cx="45" cy="57" r="1"/><circle cx="75" cy="57" r="1"/></g>
 <path d="M24 79L96 79 86 101 73 112 47 112 34 101Z" fill="url(#micro-${safeId})" opacity=".35"/>
 </svg>`
}
function escapeHTML(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function renderEcosystem(){const container=document.getElementById('tier-container');container.innerHTML='';const tiers=[{key:'TITAN',title:'TITAN CLASS · VISUAL ARCHETYPES',badgeColor:'border-pink-500/50 bg-pink-950/30 text-pink-400'},{key:'WARRIOR',title:'WARRIOR CLASS · VISUAL ARCHETYPES',badgeColor:'border-cyan-500/50 bg-cyan-950/30 text-cyan-400'},{key:'SCOUT',title:'SCOUT CLASS · VISUAL ARCHETYPES',badgeColor:'border-amber-500/50 bg-amber-950/30 text-amber-400'}];tiers.forEach(t=>{const models=robotDatabase.filter(m=>m.tier===t.key);if(!models.length)return;const section=document.createElement('section');section.className='space-y-4';section.innerHTML=`<div class="flex flex-wrap items-center gap-3 border-b border-gray-800 pb-3"><span class="text-xs md:text-sm font-bold tracking-widest px-3 py-1 rounded border ${t.badgeColor} title-font">${t.title}</span><span class="text-xs text-gray-500 font-mono">(${models.length} catalogue entries)</span></div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-end">${models.map(m=>`<button type="button" data-model-id="${escapeHTML(m.id)}" class="model-card text-left group border rounded-xl p-4 flex flex-col items-center cursor-pointer transition w-full" style="--model-glow:${m.color}25"><div class="w-full flex justify-center pedestal pb-3 pt-4">${generateRobotSVG(m)}</div><div class="mt-3 text-center w-full"><span class="text-[10px] text-cyan-400 font-mono font-bold uppercase tracking-wider">${escapeHTML(m.company)}</span><h4 class="title-font font-bold text-base text-white group-hover:text-cyan-300">${escapeHTML(m.name)}</h4><div class="text-xs text-gray-400 mt-2 bg-gray-950 px-3 py-2 rounded border border-gray-800/80">POWER SCORE: <span class="text-amber-300">NOT RANKED</span></div><p class="data-note mt-2">Public metadata · combat avatar is fictional</p></div></button>`).join('')}</div>`;container.appendChild(section)});container.querySelectorAll('[data-model-id]').forEach(b=>b.addEventListener('click',()=>openSpecModal(b.dataset.modelId)));document.getElementById('stat-total').textContent=robotDatabase.length}
function openSpecModal(id){const m=robotDatabase.find(x=>x.id===id);if(!m)return;document.getElementById('spec-company').textContent=m.company;document.getElementById('spec-name').textContent=m.name;document.getElementById('spec-tier').textContent=m.tier+' CLASS · VISUAL ARCHETYPE';document.getElementById('spec-tier').className='inline-block px-2.5 py-0.5 text-xs font-bold rounded mt-1 bg-cyan-950 text-cyan-300 border border-cyan-500';document.getElementById('spec-power-num').textContent='Not ranked';document.getElementById('spec-power-bar').style.width='0%';document.getElementById('spec-version').textContent=m.version;document.getElementById('spec-context').textContent=m.context;document.getElementById('spec-desc').textContent=m.description;document.getElementById('spec-visual').innerHTML=generateRobotSVG(m,1.1);openModal('spec-modal')}
function openModal(id){document.getElementById(id).classList.remove('hidden');document.body.classList.add('modal-open')}
function closeModal(id){document.getElementById(id).classList.add('hidden');if(!document.querySelector('[role="dialog"]:not(.hidden)'))document.body.classList.remove('modal-open')}
function openArenaModal(){populateFighterSelects();updateFighterDisplay('a');updateFighterDisplay('b');document.getElementById('combat-status').textContent='SIMULATION STANDBY';openModal('arena-modal')}
function populateFighterSelects(){const a=document.getElementById('fighter-a-select'),b=document.getElementById('fighter-b-select'),pa=a.value,pb=b.value;a.innerHTML='';b.innerHTML='';robotDatabase.forEach((m,i)=>{a.add(new Option(m.name+' · simulated avatar',m.id));b.add(new Option(m.name+' · simulated avatar',m.id));if(m.id===pa||(!pa&&i===0))a.options[a.options.length-1].selected=true;if(m.id===pb||(!pb&&i===1))b.options[b.options.length-1].selected=true});if(a.value===b.value&&b.options.length>1)b.selectedIndex=1}
function updateFighterDisplay(c){const sel=document.getElementById('fighter-'+c+'-select'),stage=document.getElementById('fighter-'+c+'-stage'),m=robotDatabase.find(x=>x.id===sel.value);if(!m){stage.textContent='Select a model';return}stage.innerHTML=generateRobotSVG(m,.85)+'<div class="text-center mt-2"><div class="title-font font-bold text-sm text-white">'+escapeHTML(m.name)+'</div><div class="text-[10px] text-gray-400 font-mono">SIMULATED AVATAR</div></div>'}
function executeBattle(){const a=robotDatabase.find(m=>m.id===document.getElementById('fighter-a-select').value),b=robotDatabase.find(m=>m.id===document.getElementById('fighter-b-select').value);if(!a||!b||a.id===b.id){alert('Choose two different AI avatars.');return}const btn=document.getElementById('fight-btn'),status=document.getElementById('combat-status'),log=document.getElementById('combat-log'),ring=document.getElementById('battle-ring');btn.disabled=true;status.textContent='SIMULATED COMBAT IN PROGRESS';ring.classList.add('animate-shake');log.replaceChildren();const messages=['Arena initialized. No AI model APIs are called in Phase 1.','Combat choreography running…','Evaluating fictional avatar attributes for entertainment only.'];messages.forEach((s,i)=>setTimeout(()=>{const p=document.createElement('p');p.className=i===2?'text-pink-300':'text-cyan-300';p.textContent='> '+s;log.appendChild(p)},i*500));setTimeout(()=>{const winner=Math.random()<.5?a:b;ring.classList.remove('animate-shake');btn.disabled=false;status.textContent='SIMULATION COMPLETE · NOT A REAL AI RESULT';const p=document.createElement('p');p.className='text-yellow-300 font-bold';p.textContent='> SIMULATED WINNER: '+winner.name+' — randomly selected for this visual demo. No real model was tested.';log.appendChild(p);const q=document.createElement('p');q.className='text-gray-400';q.textContent='> Real AI battles will require secure backend integration and actual model inference.';log.appendChild(q);log.scrollTop=log.scrollHeight},1900)}
async function triggerAutoUpdate(){const icon=document.getElementById('sync-icon');icon.classList.add('animate-spin');try{const response=await fetch('https://huggingface.co/api/models?pipeline_tag=text-generation&sort=downloads&direction=-1&limit=12',{headers:{Accept:'application/json'}});if(!response.ok)throw new Error('Public model catalogue returned HTTP '+response.status);const data=await response.json();if(!Array.isArray(data))throw new Error('Unexpected public catalogue response');const existing=new Set(robotDatabase.map(m=>m.modelId));let added=0;data.forEach((item,i)=>{if(!item.id||existing.has(item.id)||robotDatabase.length>=15)return;const id='hf-'+item.id.toLowerCase().replace(/[^a-z0-9-]/g,'-');robotDatabase.push({id,name:item.id.split('/').pop(),company:'Hugging Face public catalogue · '+(item.author||item.id.split('/')[0]),version:item.sha?String(item.sha).slice(0,8):'See model card',tier:i<4?'TITAN':i<8?'WARRIOR':'SCOUT',powerScore:0,color:colors[i%colors.length],context:'See public model card',description:'Retrieved from Hugging Face public model catalogue. Downloads are not a quality score; capabilities and access conditions vary. Open the model card for details.',heightPx:125+(i%4)*18,modelId:item.id,downloads:item.downloads??null,likes:item.likes??null,modelUrl:'https://huggingface.co/'+item.id});existing.add(item.id);added++});renderEcosystem();populateFighterSelects();const note=document.getElementById('catalogue-status');if(note)note.textContent='Public catalogue refreshed '+new Date().toLocaleString()+' · '+added+' new entries added. Downloads/likes are popularity signals, not quality rankings.';else alert('Public model catalogue refreshed. '+added+' new entries added. Popularity metrics are not quality rankings.');}catch(err){alert('Could not refresh public model data: '+err.message+'. Existing catalogue remains available.')}finally{icon.classList.remove('animate-spin')}}
document.addEventListener('keydown',e=>{if(e.key==='Escape')['spec-modal','arena-modal'].forEach(id=>{if(!document.getElementById(id).classList.contains('hidden'))closeModal(id)})});document.querySelectorAll('[role="dialog"]').forEach(m=>m.addEventListener('click',e=>{if(e.target===m)closeModal(m.id)}));renderEcosystem();
