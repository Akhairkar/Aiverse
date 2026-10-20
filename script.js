const robotDatabase = [
      {id:'gemini-4-pro',name:'Gemini 4 Pro',company:'Google DeepMind',version:'Demo entry',tier:'TITAN',powerScore:99,color:'#ec4899',context:'Illustrative',description:'Fictionalized demo profile. Version, context and score require independent verification before being treated as factual.',heightPx:220},
      {id:'claude-mythos',name:'Claude Mythos',company:'Anthropic',version:'Demo entry',tier:'TITAN',powerScore:98,color:'#06b6d4',context:'Illustrative',description:'Illustrative profile for the interface demo; not a verified model specification.',heightPx:215},
      {id:'chatgpt-astra',name:'ChatGPT Astra',company:'OpenAI',version:'Demo entry',tier:'TITAN',powerScore:97,color:'#a855f7',context:'Illustrative',description:'Fictional demo label; this is not an official OpenAI model name or benchmark.',heightPx:210},
      {id:'claude-3-5-sonnet',name:'Claude 3.5 Sonnet',company:'Anthropic',version:'Claude 3.5 Sonnet',tier:'WARRIOR',powerScore:92,color:'#3b82f6',context:'Varies by product/API',description:'Historical model entry used for interface demonstration. The score is illustrative, not a measured benchmark.',heightPx:175},
      {id:'gpt-4o',name:'GPT-4o',company:'OpenAI',version:'GPT-4o',tier:'WARRIOR',powerScore:90,color:'#10b981',context:'Varies by product/API',description:'Model entry for demonstration. The score is not an official ranking or benchmark.',heightPx:170},
      {id:'deepseek-v3',name:'DeepSeek V3',company:'DeepSeek AI',version:'DeepSeek-V3 family',tier:'WARRIOR',powerScore:89,color:'#14b8a6',context:'Check provider docs',description:'Model entry for demonstration; specifications can vary by release and provider.',heightPx:165},
      {id:'llama-3-70b',name:'Llama 3.1 70B',company:'Meta AI',version:'Llama 3.1 70B',tier:'SCOUT',powerScore:82,color:'#eab308',context:'128K (provider-dependent)',description:'Open-weight model family entry. Score is illustrative and not a benchmark result.',heightPx:135},
      {id:'gemma-2-27b',name:'Gemma 2 27B',company:'Google',version:'Gemma 2 27B',tier:'SCOUT',powerScore:78,color:'#f97316',context:'Check provider docs',description:'Model family entry for interface demonstration; score is illustrative.',heightPx:125},
      {id:'phi-3-medium',name:'Phi-3 Medium',company:'Microsoft',version:'Phi-3 Medium',tier:'SCOUT',powerScore:74,color:'#84cc16',context:'Check provider docs',description:'Model family entry for interface demonstration; score is illustrative.',heightPx:115}
    ];

    function generateRobotSVG(model, customScale = 1) {
      const h = model.heightPx * customScale;
      const w = h * 0.75;
      const glowClass = model.tier === 'TITAN' ? 'robot-titan' : (model.tier === 'WARRIOR' ? 'robot-warrior' : 'robot-scout');
      const safeId = model.id.replace(/[^a-zA-Z0-9_-]/g, '');
      return `
        <svg width="${w}" height="${h}" viewBox="0 0 100 140" role="img" aria-label="${model.name} robot illustration" class="animate-float ${glowClass}">
          <defs><linearGradient id="metal-${safeId}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#4b5563"/><stop offset="50%" stop-color="#1f2937"/><stop offset="100%" stop-color="#0f172a"/></linearGradient></defs>
          <rect x="22" y="8" width="5" height="18" rx="2" fill="${model.color}"/><rect x="73" y="8" width="5" height="18" rx="2" fill="${model.color}"/>
          <circle cx="24.5" cy="7" r="3" fill="${model.color}" class="core-pulse"/><circle cx="75.5" cy="7" r="3" fill="${model.color}" class="core-pulse"/>
          <path d="M18,22 L82,22 L90,52 L10,52 Z" fill="url(#metal-${safeId})" stroke="${model.color}" stroke-width="1.8"/>
          <rect x="25" y="30" width="50" height="12" rx="3" fill="#030712" stroke="${model.color}" stroke-width="1.2"/><circle cx="50" cy="36" r="3.5" fill="${model.color}" class="core-pulse"/>
          <path d="M12,56 L88,56 L95,100 L5,100 Z" fill="url(#metal-${safeId})" stroke="${model.color}" stroke-width="1.8"/><circle cx="50" cy="78" r="13" fill="#030712" stroke="${model.color}" stroke-width="2"/><polygon points="50,68 59,82 41,82" fill="${model.color}" class="core-pulse"/>
          <rect x="0" y="56" width="10" height="28" rx="3" fill="url(#metal-${safeId})" stroke="${model.color}"/><rect x="90" y="56" width="10" height="28" rx="3" fill="url(#metal-${safeId})" stroke="${model.color}"/>
          <rect x="26" y="104" width="18" height="30" rx="2" fill="url(#metal-${safeId})" stroke="${model.color}"/><rect x="56" y="104" width="18" height="30" rx="2" fill="url(#metal-${safeId})" stroke="${model.color}"/>
          <ellipse cx="35" cy="136" rx="7" ry="3" fill="${model.color}" class="core-pulse"/><ellipse cx="65" cy="136" rx="7" ry="3" fill="${model.color}" class="core-pulse"/>
        </svg>`;
    }

    function renderEcosystem() {
      const container = document.getElementById('tier-container');
      container.innerHTML = '';
      const tiers = [
        {key:'TITAN',title:'👑 TITAN CLASS (S-TIER DEMO)',badgeColor:'border-pink-500/50 bg-pink-950/30 text-pink-400'},
        {key:'WARRIOR',title:'⚔️ WARRIOR CLASS (A-TIER DEMO)',badgeColor:'border-cyan-500/50 bg-cyan-950/30 text-cyan-400'},
        {key:'SCOUT',title:'⚡ SCOUT CLASS (B-TIER DEMO)',badgeColor:'border-amber-500/50 bg-amber-950/30 text-amber-400'}
      ];
      tiers.forEach(tierObj => {
        const models = robotDatabase.filter(m => m.tier === tierObj.key);
        if (!models.length) return;
        const section = document.createElement('section');
        section.className = 'space-y-4';
        section.innerHTML = `
          <div class="flex flex-wrap items-center gap-3 border-b border-gray-800 pb-2"><span class="text-xs md:text-sm font-bold tracking-widest px-3 py-1 rounded border ${tierObj.badgeColor} title-font">${tierObj.title}</span><span class="text-xs text-gray-500 font-mono">(${models.length} Models in demo)</span></div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-end">
            ${models.map(m => `
              <button type="button" data-model-id="${m.id}" class="model-card text-left group bg-gray-900/40 border border-gray-800 hover:border-cyan-500/60 focus:border-cyan-400 rounded-xl p-4 flex flex-col items-center cursor-pointer transition transform hover:-translate-y-1.5 shadow-lg w-full">
                <div class="w-full flex justify-center pedestal pb-3 pt-4">${generateRobotSVG(m)}</div>
                <div class="mt-3 text-center w-full"><span class="text-[10px] text-cyan-400 font-mono font-bold uppercase tracking-wider">${m.company}</span><h4 class="title-font font-bold text-base text-white group-hover:text-cyan-300 transition">${m.name}</h4>
                <div class="flex justify-between items-center text-xs text-gray-400 mt-2 bg-gray-950 px-3 py-1.5 rounded border border-gray-800/80"><span>Demo Score:</span><span class="font-bold text-cyan-400">${m.powerScore}/100</span></div></div>
              </button>`).join('')}
          </div>`;
        container.appendChild(section);
      });
      container.querySelectorAll('[data-model-id]').forEach(button => button.addEventListener('click', () => openSpecModal(button.dataset.modelId)));
      document.getElementById('stat-total').textContent = robotDatabase.length;
    }

    function openSpecModal(modelId) {
      const m = robotDatabase.find(x => x.id === modelId);
      if (!m) return;
      document.getElementById('spec-company').textContent = m.company;
      document.getElementById('spec-name').textContent = m.name;
      document.getElementById('spec-tier').textContent = m.tier + ' CLASS';
      document.getElementById('spec-tier').className = 'inline-block px-2.5 py-0.5 text-xs font-bold rounded mt-1 ' + (m.tier === 'TITAN' ? 'bg-pink-950 text-pink-400 border border-pink-500' : m.tier === 'SCOUT' ? 'bg-amber-950 text-amber-300 border border-amber-500' : 'bg-cyan-950 text-cyan-400 border border-cyan-500');
      document.getElementById('spec-power-num').textContent = m.powerScore + '/100 (demo)';
      document.getElementById('spec-power-bar').style.width = Math.max(0, Math.min(100, m.powerScore)) + '%';
      document.getElementById('spec-version').textContent = m.version;
      document.getElementById('spec-context').textContent = m.context;
      document.getElementById('spec-desc').textContent = m.description;
      document.getElementById('spec-visual').innerHTML = generateRobotSVG(m, 1.1);
      openModal('spec-modal');
    }

    function openModal(id) {
      document.getElementById(id).classList.remove('hidden');
      document.body.classList.add('modal-open');
    }
    function closeModal(id) {
      document.getElementById(id).classList.add('hidden');
      if (document.querySelectorAll('[role="dialog"]:not(.hidden)').length === 0) document.body.classList.remove('modal-open');
    }
    function openArenaModal() {
      populateFighterSelects();
      updateFighterDisplay('a');
      updateFighterDisplay('b');
      document.getElementById('combat-status').textContent = 'STANDBY';
      openModal('arena-modal');
    }
    function populateFighterSelects() {
      const selectA = document.getElementById('fighter-a-select');
      const selectB = document.getElementById('fighter-b-select');
      const previousA = selectA.value;
      const previousB = selectB.value;
      selectA.innerHTML = '';
      selectB.innerHTML = '';
      robotDatabase.forEach((m, idx) => {
        const optionA = new Option('[' + m.tier + '] ' + m.name + ' (Demo score: ' + m.powerScore + ')', m.id);
        const optionB = new Option('[' + m.tier + '] ' + m.name + ' (Demo score: ' + m.powerScore + ')', m.id);
        selectA.add(optionA);
        selectB.add(optionB);
        if (m.id === previousA || (!previousA && idx === 0)) optionA.selected = true;
        if (m.id === previousB || (!previousB && idx === 3)) optionB.selected = true;
      });
      if (selectA.value === selectB.value && selectB.options.length > 1) selectB.selectedIndex = 1;
    }
    function updateFighterDisplay(corner) {
      const select = document.getElementById('fighter-' + corner + '-select');
      const stage = document.getElementById('fighter-' + corner + '-stage');
      const m = robotDatabase.find(x => x.id === select.value);
      if (!m) { stage.textContent = 'Select a model'; return; }
      stage.innerHTML = `${generateRobotSVG(m, 0.9)}<div class="text-center mt-2"><div class="title-font font-bold text-sm text-white">${m.name}</div><div class="text-[10px] text-gray-400 font-mono">DEMO SCORE: ${m.powerScore}</div></div>`;
    }
    function executeBattle() {
      const idA = document.getElementById('fighter-a-select').value;
      const idB = document.getElementById('fighter-b-select').value;
      if (!idA || !idB || idA === idB) { alert('Select two different robots for combat!'); return; }
      const fighterA = robotDatabase.find(x => x.id === idA);
      const fighterB = robotDatabase.find(x => x.id === idB);
      if (!fighterA || !fighterB) return;
      const btn = document.getElementById('fight-btn');
      const status = document.getElementById('combat-status');
      const log = document.getElementById('combat-log');
      const ring = document.getElementById('battle-ring');
      btn.disabled = true;
      btn.classList.add('opacity-50');
      status.textContent = 'SIMULATING MATCH...';
      ring.classList.add('animate-shake');
      log.replaceChildren();
      const firstLine = document.createElement('p');
      firstLine.className = 'text-cyan-400';
      firstLine.textContent = '> Starting demo matchup: ' + fighterA.name + ' vs ' + fighterB.name + '...';
      log.appendChild(firstLine);
      setTimeout(() => {
        const diff = fighterA.powerScore - fighterB.powerScore;
        const winner = diff >= 0 ? fighterA : fighterB;
        const loser = diff >= 0 ? fighterB : fighterA;
        const absDiff = Math.abs(diff);
        const durationSec = absDiff > 15 ? (1.5 + Math.random()).toFixed(2) : (4 + Math.random() * 3).toFixed(2);
        ring.classList.remove('animate-shake');
        btn.disabled = false;
        btn.classList.remove('opacity-50');
        status.textContent = 'DEMO MATCH CONCLUDED';
        const lines = [
          ['text-yellow-400','> Comparing illustrative demo scores...'],
          ['text-pink-400','> ' + winner.name + ' wins this scripted score comparison over ' + loser.name + '.'],
          ['text-green-400 font-bold','> SIMULATION COMPLETE in ' + durationSec + ' seconds.'],
          ['text-white font-bold bg-gray-900 p-1 rounded border border-gray-800 mt-1','> DEMO WINNER: ' + winner.name + ' (' + winner.tier + ') — score gap: ' + absDiff + ' points.']
        ];
        lines.forEach(([className, message]) => { const p = document.createElement('p'); p.className = className; p.textContent = message; log.appendChild(p); });
        log.scrollTop = log.scrollHeight;
      }, 1200);
    }
    function triggerAutoUpdate() {
      const icon = document.getElementById('sync-icon');
      icon.classList.add('animate-spin');
      setTimeout(() => {
        icon.classList.remove('animate-spin');
        if (!robotDatabase.find(m => m.id === 'mythos-v5-demo')) {
          robotDatabase.unshift({id:'mythos-v5-demo',name:'Mythos V5 (Fictional Demo)',company:'Demo entry — not verified',version:'Fictional demo',tier:'TITAN',powerScore:100,color:'#f43f5e',context:'Not verified',description:'Fictional placeholder inserted to demonstrate the UI update interaction. This is not a claim that such a model exists or was discovered automatically.',heightPx:230});
          renderEcosystem();
          populateFighterSelects();
          alert('Demo entry added. No live model scan was performed.');
        } else {
          alert('Demo is up to date. No live model scan was performed.');
        }
      }, 800);
    }
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        ['spec-modal','arena-modal'].forEach(id => { if (!document.getElementById(id).classList.contains('hidden')) closeModal(id); });
      }
    });
    document.querySelectorAll('[role="dialog"]').forEach(modal => modal.addEventListener('click', event => { if (event.target === modal) closeModal(modal.id); }));
    renderEcosystem();
