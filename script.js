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
 const id=escapeHTML(model.id);
 return `<div class="robot-3d" data-robot-id="${id}" data-scale="${scale}" role="img" aria-label="3D metallic robot: ${escapeHTML(model.name)}"><div class="robot-loading">INITIALIZING 3D SYSTEM</div></div>`;
}
function buildMech(model){
 const group=new THREE.Group();
 const accent=new THREE.Color(model.color||'#73e7ff');
 const metal=new THREE.MeshStandardMaterial({color:0x53616d,metalness:.92,roughness:.27});
 const bright=new THREE.MeshStandardMaterial({color:0xaebbc5,metalness:.88,roughness:.22});
 const dark=new THREE.MeshStandardMaterial({color:0x111923,metalness:.82,roughness:.34});
 const accentMat=new THREE.MeshStandardMaterial({color:accent,emissive:accent,emissiveIntensity:1.05,metalness:.48,roughness:.2});
 const rubber=new THREE.MeshStandardMaterial({color:0x090d12,metalness:.25,roughness:.8});
 const addBox=(parent,x,y,z,sx,sy,sz,mat,bevel=0)=>{const mesh=new THREE.Mesh(new THREE.BoxGeometry(sx,sy,sz),mat);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh};
 const addCyl=(parent,x,y,z,r1,r2,len,mat,rx=0,rz=0)=>{const mesh=new THREE.Mesh(new THREE.CylinderGeometry(r1,r2,len,12,1),mat);mesh.position.set(x,y,z);mesh.rotation.x=rx;mesh.rotation.z=rz;mesh.castShadow=true;parent.add(mesh);return mesh};
 const addJoint=(x,y,z,r=.13)=>{addCyl(group,x,y,z,r,r,.16,dark,Math.PI/2);addCyl(group,x,y,z+.09,r*.58,r*.58,.035,bright,Math.PI/2)};
 // legs: piston cores, overlapping armour, broad boots
 for(const side of [-1,1]){
  const x=side*.34;
  addCyl(group,x,-.52,0,.105,.12,.52,dark,0,side*.04);
  addBox(group,x,-.66,.035,.3,.42,.29,metal);
  addBox(group,x,-.65,.185,.23,.29,.075,bright);
  addBox(group,x,-.48,.12,.22,.08,.08,accentMat);
  addBox(group,x,-.91,.12,.38,.16,.48,rubber);
  addBox(group,x,-.88,.25,.29,.06,.18,bright);
  addJoint(x,-.39,.06,.14);
  addBox(group,x,-.32,.02,.26,.2,.27,dark);
 }
 // waist and armored torso
 addBox(group,0,-.17,0,.53,.2,.34,dark);
 addBox(group,0,.08,0,.88,.68,.43,metal);
 addBox(group,0,.13,.235,.67,.43,.1,bright);
 addBox(group,0,.12,.3,.43,.25,.045,dark);
 addBox(group,0,.13,.33,.28,.12,.03,accentMat);
 addBox(group,-.25,.28,.29,.13,.05,.025,accentMat);
 addBox(group,.25,.28,.29,.13,.05,.025,accentMat);
 for(const side of [-1,1]){
  addBox(group,side*.32,.23,.24,.18,.31,.12,bright);
  for(let i=0;i<3;i++) addBox(group,side*.32,.16-i*.075,.31,.1,.018,.02,dark);
  addJoint(side*.55,.28,0,.16);
  addBox(group,side*.62,.2,0,.23,.32,.3,metal);
  addBox(group,side*.62,.2,.16,.16,.2,.035,accentMat);
  addCyl(group,side*.64,-.03,0,.11,.1,.28,dark,0,side*.08);
  addJoint(side*.64,-.12,.03,.12);
  addBox(group,side*.64,-.29,.02,.21,.28,.22,bright);
  addBox(group,side*.64,-.3,.145,.13,.16,.04,dark);
  addBox(group,side*.64,-.3,.17,.065,.07,.025,accentMat);
 }
 // neck stack and angular helmet
 addCyl(group,0,.48,0,.12,.14,.2,dark);
 addBox(group,0,.72,0,.48,.42,.38,metal);
 addBox(group,0,.75,.205,.38,.17,.055,dark);
 addBox(group,0,.75,.24,.31,.065,.025,accentMat);
 addBox(group,0,.89,.02,.31,.07,.31,bright);
 addBox(group,-.24,.7,.03,.08,.22,.27,dark);
 addBox(group,.24,.7,.03,.08,.22,.27,dark);
 addBox(group,0,.59,.2,.19,.07,.09,bright);
 // exposed pistons, fasteners and panel scoring
 for(const side of [-1,1]){
  addCyl(group,side*.45,-.37,.13,.035,.035,.28,bright,0,side*.24);
  addCyl(group,side*.19,-.43,.18,.025,.025,.25,accentMat,0,side*.16);
  for(const y of [.38,.17,-.02]) addCyl(group,side*.39,y,.305,.018,.018,.025,dark,Math.PI/2);
 }
 // backpack reactor housing
 addBox(group,0,.2,-.28,.42,.55,.2,dark);
 addBox(group,0,.24,-.39,.23,.32,.035,accentMat);
 for(let i=0;i<4;i++) addBox(group,0,.37-i*.09,-.41,.28,.025,.025,bright);
 group.rotation.y=-.13;
 return group;
}
const robotRenderers=new Map();
function mountRobotScene(host){
 if(!host||host.dataset.mounted==='1'||!window.THREE)return;
 host.dataset.mounted='1';
 const model=robotDatabase.find(m=>m.id===host.dataset.robotId);
 if(!model)return;
 const scene=new THREE.Scene();scene.background=null;
 const camera=new THREE.PerspectiveCamera(34,1,.1,100);camera.position.set(2.25,1.25,4.6);camera.lookAt(0,-.05,0);
 const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});
 renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.7));
 renderer.outputEncoding=THREE.sRGBEncoding;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
 renderer.setClearColor(0x000000,0);host.replaceChildren(renderer.domElement);
 const ambient=new THREE.HemisphereLight(0xc7e7ff,0x10141d,1.45);scene.add(ambient);
 const key=new THREE.DirectionalLight(0xffffff,3.0);key.position.set(3,4,4);key.castShadow=true;scene.add(key);
 const rim=new THREE.PointLight(new THREE.Color(model.color||'#73e7ff'),3.1,8);rim.position.set(-2,1.6,-1.5);scene.add(rim);
 const floor=new THREE.Mesh(new THREE.CylinderGeometry(1.2,1.35,.12,48),new THREE.MeshStandardMaterial({color:0x0c1722,metalness:.8,roughness:.3}));
 floor.position.y=-1.04;floor.receiveShadow=true;scene.add(floor);
 const ring=new THREE.Mesh(new THREE.TorusGeometry(.85,.012,8,64),new THREE.MeshBasicMaterial({color:new THREE.Color(model.color||'#73e7ff'),transparent:true,opacity:.45}));ring.rotation.x=Math.PI/2;ring.position.y=-.97;scene.add(ring);
 const mech=buildMech(model);mech.scale.setScalar(.93);scene.add(mech);
 const resize=()=>{const w=Math.max(1,host.clientWidth),h=Math.max(1,host.clientHeight);renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()};
 resize();const observer=new ResizeObserver(resize);observer.observe(host);
 let frame=0;const animate=()=>{if(!host.isConnected){observer.disconnect();renderer.dispose();robotRenderers.delete(host);return}frame++;mech.rotation.y=-.13+Math.sin(frame*.006)*.14;renderer.render(scene,camera);if(frame%3===0)requestAnimationFrame(animate);else requestAnimationFrame(animate)};
 robotRenderers.set(host,{renderer,scene,camera,mech,observer});requestAnimationFrame(animate);
}
function renderRobotScenes(root=document){if(!window.THREE)return;root.querySelectorAll('.robot-3d').forEach(mountRobotScene)}

function escapeHTML(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function renderEcosystem(){const container=document.getElementById('tier-container');container.innerHTML='';const tiers=[{key:'TITAN',title:'TITAN CLASS · VISUAL ARCHETYPES',badgeColor:'border-pink-500/50 bg-pink-950/30 text-pink-400'},{key:'WARRIOR',title:'WARRIOR CLASS · VISUAL ARCHETYPES',badgeColor:'border-cyan-500/50 bg-cyan-950/30 text-cyan-400'},{key:'SCOUT',title:'SCOUT CLASS · VISUAL ARCHETYPES',badgeColor:'border-amber-500/50 bg-amber-950/30 text-amber-400'}];tiers.forEach(t=>{const models=robotDatabase.filter(m=>m.tier===t.key);if(!models.length)return;const section=document.createElement('section');section.className='space-y-4';section.innerHTML=`<div class="flex flex-wrap items-center gap-3 border-b border-gray-800 pb-3"><span class="text-xs md:text-sm font-bold tracking-widest px-3 py-1 rounded border ${t.badgeColor} title-font">${t.title}</span><span class="text-xs text-gray-500 font-mono">(${models.length} catalogue entries)</span></div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-end">${models.map(m=>`<button type="button" data-model-id="${escapeHTML(m.id)}" class="model-card text-left group border rounded-xl p-4 flex flex-col items-center cursor-pointer transition w-full" style="--model-glow:${m.color}25"><div class="w-full flex justify-center pedestal pb-3 pt-4">${generateRobotSVG(m)}</div><div class="mt-3 text-center w-full"><span class="text-[10px] text-cyan-400 font-mono font-bold uppercase tracking-wider">${escapeHTML(m.company)}</span><h4 class="title-font font-bold text-base text-white group-hover:text-cyan-300">${escapeHTML(m.name)}</h4><div class="text-xs text-gray-400 mt-2 bg-gray-950 px-3 py-2 rounded border border-gray-800/80">POWER SCORE: <span class="text-amber-300">NOT RANKED</span></div><p class="data-note mt-2">Public metadata · combat avatar is fictional</p></div></button>`).join('')}</div>`;container.appendChild(section)});container.querySelectorAll('[data-model-id]').forEach(b=>b.addEventListener('click',()=>openSpecModal(b.dataset.modelId)));renderRobotScenes(container);document.getElementById('stat-total').textContent=robotDatabase.length}
function openSpecModal(id){const m=robotDatabase.find(x=>x.id===id);if(!m)return;document.getElementById('spec-company').textContent=m.company;document.getElementById('spec-name').textContent=m.name;document.getElementById('spec-tier').textContent=m.tier+' CLASS · VISUAL ARCHETYPE';document.getElementById('spec-tier').className='inline-block px-2.5 py-0.5 text-xs font-bold rounded mt-1 bg-cyan-950 text-cyan-300 border border-cyan-500';document.getElementById('spec-power-num').textContent='Not ranked';document.getElementById('spec-power-bar').style.width='0%';document.getElementById('spec-version').textContent=m.version;document.getElementById('spec-context').textContent=m.context;document.getElementById('spec-desc').textContent=m.description;document.getElementById('spec-visual').innerHTML=generateRobotSVG(m,1.1);renderRobotScenes(document.getElementById('spec-visual'));openModal('spec-modal')}
function openModal(id){document.getElementById(id).classList.remove('hidden');document.body.classList.add('modal-open')}
function closeModal(id){document.getElementById(id).classList.add('hidden');if(!document.querySelector('[role="dialog"]:not(.hidden)'))document.body.classList.remove('modal-open')}
function openArenaModal(){populateFighterSelects();updateFighterDisplay('a');updateFighterDisplay('b');document.getElementById('combat-status').textContent='SIMULATION STANDBY';openModal('arena-modal')}
function populateFighterSelects(){const a=document.getElementById('fighter-a-select'),b=document.getElementById('fighter-b-select'),pa=a.value,pb=b.value;a.innerHTML='';b.innerHTML='';robotDatabase.forEach((m,i)=>{a.add(new Option(m.name+' · simulated avatar',m.id));b.add(new Option(m.name+' · simulated avatar',m.id));if(m.id===pa||(!pa&&i===0))a.options[a.options.length-1].selected=true;if(m.id===pb||(!pb&&i===1))b.options[b.options.length-1].selected=true});if(a.value===b.value&&b.options.length>1)b.selectedIndex=1}
function updateFighterDisplay(c){const sel=document.getElementById('fighter-'+c+'-select'),stage=document.getElementById('fighter-'+c+'-stage'),m=robotDatabase.find(x=>x.id===sel.value);if(!m){stage.textContent='Select a model';return}stage.innerHTML=generateRobotSVG(m,.85)+'<div class="text-center mt-2"><div class="title-font font-bold text-sm text-white">'+escapeHTML(m.name)+'</div><div class="text-[10px] text-gray-400 font-mono">3D SIMULATED AVATAR</div></div>';renderRobotScenes(stage)}
function executeBattle(){const a=robotDatabase.find(m=>m.id===document.getElementById('fighter-a-select').value),b=robotDatabase.find(m=>m.id===document.getElementById('fighter-b-select').value);if(!a||!b||a.id===b.id){alert('Choose two different AI avatars.');return}const btn=document.getElementById('fight-btn'),status=document.getElementById('combat-status'),log=document.getElementById('combat-log'),ring=document.getElementById('battle-ring');btn.disabled=true;status.textContent='SIMULATED COMBAT IN PROGRESS';ring.classList.add('animate-shake');log.replaceChildren();const messages=['Arena initialized. No AI model APIs are called in Phase 1.','Combat choreography running…','Evaluating fictional avatar attributes for entertainment only.'];messages.forEach((s,i)=>setTimeout(()=>{const p=document.createElement('p');p.className=i===2?'text-pink-300':'text-cyan-300';p.textContent='> '+s;log.appendChild(p)},i*500));setTimeout(()=>{const winner=Math.random()<.5?a:b;ring.classList.remove('animate-shake');btn.disabled=false;status.textContent='SIMULATION COMPLETE · NOT A REAL AI RESULT';const p=document.createElement('p');p.className='text-yellow-300 font-bold';p.textContent='> SIMULATED WINNER: '+winner.name+' — randomly selected for this visual demo. No real model was tested.';log.appendChild(p);const q=document.createElement('p');q.className='text-gray-400';q.textContent='> Real AI battles will require secure backend integration and actual model inference.';log.appendChild(q);log.scrollTop=log.scrollHeight},1900)}
async function triggerAutoUpdate(){const icon=document.getElementById('sync-icon');icon.classList.add('animate-spin');try{const response=await fetch('https://huggingface.co/api/models?pipeline_tag=text-generation&sort=downloads&direction=-1&limit=12',{headers:{Accept:'application/json'}});if(!response.ok)throw new Error('Public model catalogue returned HTTP '+response.status);const data=await response.json();if(!Array.isArray(data))throw new Error('Unexpected public catalogue response');const existing=new Set(robotDatabase.map(m=>m.modelId));let added=0;data.forEach((item,i)=>{if(!item.id||existing.has(item.id)||robotDatabase.length>=15)return;const id='hf-'+item.id.toLowerCase().replace(/[^a-z0-9-]/g,'-');robotDatabase.push({id,name:item.id.split('/').pop(),company:'Hugging Face public catalogue · '+(item.author||item.id.split('/')[0]),version:item.sha?String(item.sha).slice(0,8):'See model card',tier:i<4?'TITAN':i<8?'WARRIOR':'SCOUT',powerScore:0,color:colors[i%colors.length],context:'See public model card',description:'Retrieved from Hugging Face public model catalogue. Downloads are not a quality score; capabilities and access conditions vary. Open the model card for details.',heightPx:125+(i%4)*18,modelId:item.id,downloads:item.downloads??null,likes:item.likes??null,modelUrl:'https://huggingface.co/'+item.id});existing.add(item.id);added++});renderEcosystem();populateFighterSelects();const note=document.getElementById('catalogue-status');if(note)note.textContent='Public catalogue refreshed '+new Date().toLocaleString()+' · '+added+' new entries added. Downloads/likes are popularity signals, not quality rankings.';else alert('Public model catalogue refreshed. '+added+' new entries added. Popularity metrics are not quality rankings.');}catch(err){alert('Could not refresh public model data: '+err.message+'. Existing catalogue remains available.')}finally{icon.classList.remove('animate-spin')}}
document.addEventListener('keydown',e=>{if(e.key==='Escape')['spec-modal','arena-modal'].forEach(id=>{if(!document.getElementById(id).classList.contains('hidden'))closeModal(id)})});document.querySelectorAll('[role="dialog"]').forEach(m=>m.addEventListener('click',e=>{if(e.target===m)closeModal(m.id)}));renderEcosystem();
