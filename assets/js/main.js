/* 093333.com — Number Intel | site script (no dependencies) */
(function(){
  'use strict';
  var $=function(s,c){return (c||document).querySelector(s)};
  var $$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
  function store(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){return null}}
  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}

  /* ---------- Private inbox routing (address never appears in page source as text) ---------- */
  var _k=[106,104,100,41,107,110,102,106,96,71,54,102,116,108,117,104,112,101,98,112];
  function inbox(){return String.fromCharCode.apply(null,_k.map(function(c){return c^7})).split('').reverse().join('')}
  function endpoint(){return 'https://formsubmit.co/ajax/'+inbox()}
  $$('[data-mail]').forEach(function(a){
    a.addEventListener('click',function(e){e.preventDefault();
      window.location.href='mailto:'+inbox()+'?subject='+encodeURIComponent(a.getAttribute('data-mail')||'Inquiry from 093333.com');});
  });

  /* ---------- Theme ---------- */
  var root=document.documentElement,saved=store('n9-theme');
  if(saved)root.setAttribute('data-theme',saved);
  var tb=$('#themeBtn');if(tb)tb.addEventListener('click',function(){var c=root.getAttribute('data-theme')==='light'?'dark':'light';root.setAttribute('data-theme',c);store('n9-theme',c)});

  /* ---------- Nav ---------- */
  var here=location.pathname.replace(/index\.html$/,'');
  $$('#menu a').forEach(function(a){var h=a.getAttribute('href').replace(/index\.html$/,'');if(h===here||(h.length>1&&h.slice(-1)==='/'&&here.indexOf(h)===0)){a.classList.add('active');a.setAttribute('aria-current','page')}});
  var bg=$('#burger'),menu=$('#menu');
  if(bg&&menu)bg.addEventListener('click',function(){var o=menu.classList.toggle('open');bg.setAttribute('aria-expanded',o)});

  /* ---------- Reveal / cookie / year ---------- */
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}})},{threshold:.1});$$('.reveal').forEach(function(el){io.observe(el)})}else{$$('.reveal').forEach(function(el){el.classList.add('in')})}
  var ck=$('#cookie');if(ck&&!store('n9-cookie'))ck.classList.add('show');
  $$('[data-cookie]').forEach(function(b){b.addEventListener('click',function(){store('n9-cookie',b.getAttribute('data-cookie'));ck.classList.remove('show')})});
  $$('.year').forEach(function(el){el.textContent=new Date().getFullYear()});

  /* ---------- Tabs ---------- */
  $$('.tabs').forEach(function(t){
    var btns=$$('button',t);
    btns.forEach(function(b){b.addEventListener('click',function(){
      btns.forEach(function(x){x.classList.toggle('on',x===b);x.setAttribute('aria-selected',x===b)});
      var grp=t.getAttribute('data-group');
      $$('.pane[data-group="'+grp+'"]').forEach(function(p){p.classList.toggle('on',p.id===b.getAttribute('data-pane'))});
      if(t.hasAttribute('data-hash'))history.replaceState(null,'','#'+b.getAttribute('data-pane'));
    })});
    if(t.hasAttribute('data-hash')&&location.hash){var hb=$('button[data-pane="'+location.hash.slice(1)+'"]',t);if(hb)hb.click()}
  });

  /* =========================================================
     NUMBER ENGINE
     ========================================================= */
  var D=window.N9||{};
  function digits(s){return String(s||'').replace(/[^\d+]/g,'')}
  function analyze(raw){
    var s=digits(raw),plus=s.charAt(0)==='+';s=s.replace(/\+/g,'');
    if(s.indexOf('00')===0){s=s.slice(2);plus=true}
    var cands=[];
    function ph(local){var p=local.slice(0,4),k=D.PH.map[p];return {cc:'PH',local:local,prefix:p,net:k?D.PH.nets[k].n:null,netKey:k,complete:local.length===11,note:D.PH.notes[p]||''}}
    function vn(local){var p=local.slice(0,3),k=D.VN.map[p];return {cc:'VN',local:local,prefix:p,net:k?D.VN.nets[k].n:null,netKey:k,complete:local.length===10,note:D.VN.notes[p]||''}}
    function tw(local){return {cc:'TW',local:local,prefix:local.slice(0,4),net:'Taiwan mobile (carrier not identifiable by prefix)',netKey:'tw',complete:local.length===10,note:''}}
    if(plus||/^(63|84|886)/.test(s)&&s.length>=11){
      if(s.indexOf('63')===0)cands.push(ph('0'+s.slice(2)));
      else if(s.indexOf('84')===0)cands.push(vn('0'+s.slice(2)));
      else if(s.indexOf('886')===0)cands.push(tw('0'+s.slice(3)));
    }else if(s.charAt(0)==='9'&&(s.length===10)){cands.push(ph('0'+s));}
    else if(s.charAt(0)==='0'){
      if(s.length>=4&&D.PH.map[s.slice(0,4)]&&s.length<=11)cands.push(ph(s));
      if(s.length>=3&&D.VN.map[s.slice(0,3)]&&s.length<=10)cands.push(vn(s));
      if(s.indexOf('09')===0&&s.length<=10)cands.push(tw(s));
    }
    cands.sort(function(a,b){return (b.complete?1:0)-(a.complete?1:0)});
    return {raw:raw,clean:s,cands:cands};
  }
  function fmt(c){
    var l=c.local,n=l.slice(1);
    if(c.cc==='PH')return {local:l.replace(/^(\d{4})(\d{0,3})(\d{0,4}).*/,function(m,a,b,d){return [a,b,d].filter(Boolean).join(' ')}),e164:'+63'+n,intl:'+63 '+n.replace(/^(\d{3})(\d{0,3})(\d{0,4}).*/,function(m,a,b,d){return [a,b,d].filter(Boolean).join(' ')})};
    if(c.cc==='VN')return {local:l.replace(/^(\d{4})(\d{0,3})(\d{0,3}).*/,function(m,a,b,d){return [a,b,d].filter(Boolean).join(' ')}),e164:'+84'+n,intl:'+84 '+n.replace(/^(\d{2})(\d{0,3})(\d{0,4}).*/,function(m,a,b,d){return [a,b,d].filter(Boolean).join(' ')})};
    return {local:l.replace(/^(\d{4})(\d{0,3})(\d{0,3}).*/,function(m,a,b,d){return [a,b,d].filter(Boolean).join('-')}),e164:'+886'+n,intl:'+886 '+n.replace(/^(\d{3})(\d{0,3})(\d{0,3}).*/,function(m,a,b,d){return [a,b,d].filter(Boolean).join(' ')})};
  }
  window.N9analyze=analyze;window.N9fmt=fmt;

  function renderResult(el,raw){
    var a=analyze(raw);
    if(!a.clean){el.innerHTML='<p class="muted">Type or paste a number that starts with 09, 08, 03, 07, 05, +63, +84 or +886.</p>';return}
    if(!a.cands.length){el.innerHTML='<p><span class="tag warn">NO MATCH</span></p><p class="muted">“'+esc(a.clean)+'” does not match a Philippine, Vietnamese or Taiwanese mobile prefix we track. Check the digits, or include the country code.</p>';return}
    var html='';
    a.cands.forEach(function(c,i){
      var f=fmt(c),C=D[c.cc],full=c.complete;
      html+=(i?'<hr style="border:0;border-top:1px solid var(--line);margin:16px 0">':'')+
      '<div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;align-items:center"><span class="tag info">'+C.flag+' '+C.name.toUpperCase()+'</span>'+(full?'<span class="tag ok">VALID LENGTH</span>':'<span class="tag warn">PARTIAL · '+c.local.length+'/'+C.len+' DIGITS</span>')+'</div>'+
      '<div class="big" style="margin-top:10px">'+esc(f.local)+'</div>'+
      '<dl class="kv"><dt>Network</dt><dd>'+(c.net||'Unknown range')+'</dd>'+
      '<dt>Prefix</dt><dd class="mono">'+esc(c.prefix)+'</dd>'+
      '<dt>E.164</dt><dd class="mono">'+(full?esc(f.e164):'—')+'</dd>'+
      '<dt>Intl</dt><dd class="mono">'+(full?esc(f.intl):'—')+'</dd>'+
      '<dt>Report to</dt><dd>'+C.report+'</dd></dl>'+
      (c.note?'<p class="muted" style="margin:10px 0 0">ℹ '+esc(c.note)+'</p>':'');
    });
    if(a.cands.length>1)html+='<p class="muted" style="margin-top:12px">⚠ This pattern fits more than one country. Ask yourself where the caller claims to be — a mismatch is itself a red flag.</p>';
    html+='<p class="muted" style="margin-top:10px">Prefixes show the <b>original</b> network. Number portability lets people switch carriers and keep their number.</p>';
    var first=a.cands[0],e=first.complete?fmt(first).e164:'';
    html+='<div class="acts"><a class="btn btn-primary btn-sm" href="/report.html?n='+encodeURIComponent(a.clean)+'">Report this number</a><a class="btn btn-ghost btn-sm" href="/scam-check.html">Check a text from it</a>'+(e?'<button class="btn btn-ghost btn-sm" type="button" data-copy="'+e+'">Copy '+e+'</button>':'')+'</div>';
    el.innerHTML=html;
    $$('[data-copy]',el).forEach(function(b){b.addEventListener('click',function(){try{navigator.clipboard.writeText(b.getAttribute('data-copy'))}catch(x){}b.textContent='Copied ✓'})});
    if(first.complete)saveRecent(a.clean);
  }
  function saveRecent(n){var r=[];try{r=JSON.parse(store('n9-recent')||'[]')}catch(e){}r=r.filter(function(x){return x!==n});r.unshift(n);store('n9-recent',JSON.stringify(r.slice(0,6)));drawRecent()}
  function drawRecent(){var box=$('#recent');if(!box)return;var r=[];try{r=JSON.parse(store('n9-recent')||'[]')}catch(e){}
    box.innerHTML=r.length?'<span class="muted" style="margin-right:6px">Recent (saved on this device only):</span>'+r.map(function(n){return '<button type="button" class="chip" data-n="'+esc(n)+'">'+esc(n)+'</button>'}).join(''):'';
    $$('[data-n]',box).forEach(function(b){b.addEventListener('click',function(){var i=$('#numIn');i.value=b.getAttribute('data-n');i.dispatchEvent(new Event('input'))})});}
  var ni=$('#numIn'),nr=$('#numOut');
  if(ni&&nr){
    var q=new URLSearchParams(location.search).get('n');if(q)ni.value=q;
    var t;ni.addEventListener('input',function(){clearTimeout(t);t=setTimeout(function(){renderResult(nr,ni.value)},160)});
    var nf=$('#numForm');if(nf)nf.addEventListener('submit',function(e){e.preventDefault();renderResult(nr,ni.value)});
    $$('[data-try]').forEach(function(c){c.addEventListener('click',function(){ni.value=c.getAttribute('data-try');renderResult(nr,ni.value);ni.focus()})});
    renderResult(nr,ni.value||'093333');if(!ni.value)ni.value='093333';
    drawRecent();
  }

  /* ---------- Prefix tables ---------- */
  function buildTable(cc,tbody){
    var C=D[cc],rows=Object.keys(C.map).sort().map(function(p){var k=C.map[p];return '<tr><td class="mono">'+p+'</td><td><span style="display:inline-block;width:10px;height:10px;border-radius:3px;background:'+C.nets[k].c+';margin-right:8px"></span>'+C.nets[k].n+'</td><td class="mono">+'+C.cc+' '+p.slice(1)+'</td><td>'+(C.notes[p]||'')+'</td></tr>'});
    tbody.innerHTML=rows.join('');
  }
  $$('[data-prefix-table]').forEach(function(tb){buildTable(tb.getAttribute('data-prefix-table'),tb)});
  $$('[data-filter]').forEach(function(inp){inp.addEventListener('input',function(){var q=inp.value.toLowerCase().replace(/\s/g,'');$$('#'+inp.getAttribute('data-filter')+' tr').forEach(function(r){r.style.display=r.textContent.toLowerCase().replace(/\s/g,'').indexOf(q)>-1?'':'none'})})});
  $$('[data-net-count]').forEach(function(el){var cc=el.getAttribute('data-net-count');el.textContent=Object.keys(D[cc].map).length});

  /* ---------- Bulk sorter ---------- */
  var bgo=$('#bulkGo');
  if(bgo){bgo.addEventListener('click',function(){
    var lines=$('#bulkIn').value.split(/[\n,;]+/).map(function(x){return x.trim()}).filter(Boolean);
    var groups={},rows=[['input','country','network','e164','status']];
    lines.forEach(function(l){var a=analyze(l),c=a.cands[0];var key=c?(D[c.cc].flag+' '+(c.net||'Unknown')):'✕ Unrecognised';groups[key]=(groups[key]||0)+1;
      rows.push([l,c?D[c.cc].name:'',c?(c.net||''):'',c&&c.complete?fmt(c).e164:'',c?(c.complete?'valid length':'incomplete'):'no match']);});
    $('#bulkOut').innerHTML=Object.keys(groups).sort(function(a,b){return groups[b]-groups[a]}).map(function(k){return '<div><b>'+groups[k]+'</b>'+esc(k)+'</div>'}).join('')||'<p class="muted">Paste numbers first.</p>';
    var csv=rows.map(function(r){return r.map(function(v){return '"'+String(v).replace(/"/g,'""')+'"'}).join(',')}).join('\n');
    var dl=$('#bulkDl');dl.href='data:text/csv;charset=utf-8,'+encodeURIComponent(csv);dl.style.display=lines.length?'inline-flex':'none';
    $('#bulkCount').textContent=lines.length+' numbers processed in your browser — nothing was uploaded.';
  })}

  /* ---------- Formatter ---------- */
  var fin=$('#fmtIn');
  if(fin){function doFmt(){var a=analyze(fin.value),o=$('#fmtOut');var c=a.cands[0];
    if(!c){o.innerHTML='<p class="muted">Enter a full PH, VN or TW mobile number.</p>';return}
    if(!c.complete){o.innerHTML='<p class="muted">Keep typing — '+D[c.cc].name+' mobile numbers have '+D[c.cc].len+' digits in local format.</p>';return}
    var f=fmt(c),n=c.local.slice(1);
    var r=[['Local display',f.local],['E.164 (databases, SMS APIs)',f.e164],['International display',f.intl],['Dial from the US/Canada','011 '+D[c.cc].cc+' '+n],['Dial from most countries','00 '+D[c.cc].cc+' '+n],['tel: link','tel:'+f.e164],['WhatsApp link','https://wa.me/'+f.e164.slice(1)]];
    o.innerHTML='<div class="tbl-wrap"><table>'+r.map(function(x){return '<tr><th style="position:static">'+x[0]+'</th><td class="mono">'+esc(x[1])+' <button class="chip" type="button" data-copy="'+esc(x[1])+'">copy</button></td></tr>'}).join('')+'</table></div>';
    $$('[data-copy]',o).forEach(function(b){b.addEventListener('click',function(){try{navigator.clipboard.writeText(b.getAttribute('data-copy'))}catch(x){}b.textContent='copied'})});
  }fin.addEventListener('input',doFmt);doFmt()}

  /* ---------- Pattern (vanity) scorer ---------- */
  var pin=$('#patIn');
  if(pin){function score(){
    var s=pin.value.replace(/\D/g,'');var o=$('#patOut');if(s.length<3){o.innerHTML='<p class="muted">Enter at least 3 digits.</p>';return}
    var pts=0,why=[];
    var run=1,maxRun=1,runDigit=s[0];for(var i=1;i<s.length;i++){if(s[i]===s[i-1]){run++;if(run>maxRun){maxRun=run;runDigit=s[i]}}else run=1}
    if(maxRun>=3){var v=Math.min(40,(maxRun-2)*12);pts+=v;why.push(['Repeated run','“'+Array(maxRun+1).join(runDigit)+'” — '+maxRun+' identical digits in a row',v])}
    var tail=s.slice(-4);if(/^(\d)\1{3}$/.test(tail)){pts+=15;why.push(['Quad ending','Ends in '+tail+' — the most sought-after ending',15])}
    else if(/^(\d)(\d)\1\2$/.test(tail)&&tail[0]!==tail[1]){pts+=10;why.push(['ABAB ending',tail+' alternates cleanly',10])}
    else if(/^(\d)\1(\d)\2$/.test(tail)){pts+=10;why.push(['AABB ending',tail+' pairs up',10])}
    var asc=0,desc=0,ca=1,cd=1;for(i=1;i<s.length;i++){if(+s[i]===+s[i-1]+1){ca++;asc=Math.max(asc,ca)}else ca=1;if(+s[i]===+s[i-1]-1){cd++;desc=Math.max(desc,cd)}else cd=1}
    var seq=Math.max(asc,desc);if(seq>=4){v=Math.min(25,(seq-3)*8+5);pts+=v;why.push(['Straight sequence',seq+' consecutive digits ('+(asc>=desc?'ascending':'descending')+')',v])}
    if(s.length>=4&&s===s.split('').reverse().join('')){pts+=12;why.push(['Palindrome','Reads the same both ways',12])}
    var half=s.length%2===0?s.slice(0,s.length/2):null;if(half&&half===s.slice(s.length/2)){pts+=12;why.push(['Mirror halves',half+' · '+half,12])}
    var uniq={};s.split('').forEach(function(d){uniq[d]=1});var u=Object.keys(uniq).length;if(u<=3){v=(4-u)*6;pts+=v;why.push(['Low digit variety','Only '+u+' distinct digits — easy to remember',v])}
    var lucky=(s.match(/[689]/g)||[]).length,four=(s.match(/4/g)||[]).length;
    if(lucky/s.length>=.5){pts+=6;why.push(['East-Asian “lucky” digits',lucky+' of '+s.length+' digits are 6, 8 or 9',6])}
    if(four>=2){pts-=6;why.push(['Digit 4 penalty','Multiple 4s can lower resale value in some Asian markets',-6])}
    pts=Math.max(0,Math.min(100,pts+(s.length<=6?8:0)));if(s.length<=6)why.push(['Short length',s.length+' digits — short numbers carry a premium',8]);
    var tier=pts>=70?'Elite':pts>=45?'Premium':pts>=22?'Memorable':'Standard';
    o.innerHTML='<div style="display:flex;align-items:end;gap:14px"><div class="score">'+pts+'</div><div><span class="tag '+(pts>=45?'ok':pts>=22?'info':'warn')+'">'+tier.toUpperCase()+'</span><p class="muted" style="margin:6px 0 0">Memorability score out of 100</p></div></div><div class="meter"><i style="width:'+pts+'%"></i></div>'+
      (why.length?'<ul class="flags">'+why.map(function(w){return '<li><b>'+w[0]+'</b> · '+esc(w[1])+' <span class="mono" style="float:right">'+(w[2]>0?'+':'')+w[2]+'</span></li>'}).join('')+'</ul>':'<p class="muted">No strong pattern — a typical, random-looking number.</p>');
  }pin.addEventListener('input',score);score()}

  /* ---------- Scam text analyzer ---------- */
  var RULES=[
    [/(https?:\/\/|www\.|\b[a-z0-9-]+\.(com|net|org|info|xyz|top|site|online|shop|click|link|vip|cc|ph|vn|io|me)\b)/i,30,'Contains a link','Banks, e-wallets and telcos now tell customers they never send links by SMS. A link is the single strongest warning sign.'],
    [/\b(bit\.ly|tinyurl|t\.co|cutt\.ly|is\.gd|rb\.gy|s\.id|shorturl)\b/i,10,'Shortened link','Short links hide where they really go.'],
    [/\b(otp|one[- ]time|pin|verification code|m[aã] otp|passcode|cvv)\b/i,25,'Asks for a code or PIN','No legitimate company will ask you to share an OTP or PIN.'],
    [/\b(urgent|immediately|within 24|today only|suspend|suspended|expire|expiring|blocked|locked|deactivat|final notice|ngayon|agad|kh[oó]a t[aà]i kho[aả]n|h[eế]t h[aạ]n)\b/i,12,'Pressure or deadline','Urgency is designed to stop you from checking.'],
    [/\b(congratulations|you (have )?won|winner|prize|reward|claim|lucky|raffle|premyo|nanalo|tr[uú]ng th[uư][oở]ng|qu[aà] t[aặ]ng)\b/i,15,'Prize or reward bait','You cannot win a contest you never entered.'],
    [/\b(part[- ]?time|daily salary|earn|per day|commission|like videos|task|work from home|hiring|job offer|vi[eệ]c l[aà]m|l[aà]m th[eê]m)\b/i,15,'Too-good job offer','Task and “like-to-earn” jobs are a leading scam category.'],
    [/\b(gcash|maya|paymaya|bank|bdo|bpi|metrobank|landbank|account|wallet|verify|update your|kyc|chuy[eể]n kho[aả]n|ng[aâ]n h[aà]ng|t[aà]i kho[aả]n)\b/i,10,'Mentions money accounts','Scammers impersonate banks and e-wallets to steal log-ins.'],
    [/\b(fee|deposit|processing|pay now|payment|send money|top[- ]?up|load|n[aạ]p ti[eề]n|ph[ií])\b/i,10,'Asks you to pay','A “fee” to release a prize, parcel or job is a classic advance-fee scam.'],
    [/\b(parcel|package|delivery|courier|shipment|address|redeliver|lbc|j&t|ninja van|lazada|shopee|giao h[aà]ng|b[uư]u ki[eệ]n)\b/i,10,'Delivery story','Fake delivery notices lure you to a payment page.'],
    [/\b(invest|crypto|bitcoin|usdt|guaranteed|returns|profit|double your|trading|forex|đ[aầ]u t[uư])\b/i,15,'Investment pitch','Guaranteed returns are not a thing.'],
    [/\b(hi dear|wrong number|sorry.*(wrong|mistake)|is this|are you free|nice to meet)\b/i,8,'“Wrong number” opener','Friendly openers from strangers often start romance or investment scams.'],
    [/\b(police|court|warrant|arrest|nbi|customs|tax|bir|c[oô]ng an|t[oò]a [aá]n)\b/i,12,'Authority threat','Officials do not demand payment by text.']
  ];
  var sa=$('#smsIn');
  if(sa){function run(){
    var t=sa.value,o=$('#smsOut');if(t.trim().length<8){o.innerHTML='<p class="muted">Paste the full message you received. Analysis runs in your browser — nothing is sent anywhere.</p>';return}
    var pts=0,hits=[];RULES.forEach(function(r){if(r[0].test(t)){pts+=r[1];hits.push(r)}});
    var caps=(t.match(/[A-Z]/g)||[]).length/(t.replace(/[^a-zA-Z]/g,'').length||1);if(caps>.45&&t.length>30){pts+=6;hits.push([0,6,'Shouting in capitals','Heavy use of capitals is common in mass scam blasts.'])}
    pts=Math.min(100,pts);var lvl=pts>=55?['HIGH RISK','bad','Treat as a scam. Do not click, reply or call back. Report it, then delete.']:pts>=25?['SUSPICIOUS','warn','Several warning signs. Verify through the official app or a number you already trust — never the one in the message.']:['LOW SIGNAL','ok','Few common scam markers found. Stay careful: new scripts appear every week.'];
    o.innerHTML='<div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap"><span class="tag '+lvl[1]+'">'+lvl[0]+'</span><span class="mono">Risk score '+pts+'/100</span></div><div class="meter"><i style="width:'+pts+'%"></i></div><p>'+lvl[2]+'</p>'+
      (hits.length?'<ul class="flags">'+hits.map(function(h){return '<li><b>'+h[2]+'</b> — '+h[3]+'</li>'}).join('')+'</ul>':'')+
      '<div class="acts" style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px"><a class="btn btn-primary btn-sm" href="/report.html">Report the sender</a><a class="btn btn-ghost btn-sm" href="/guides/what-to-do-if-scammed.html">What to do if you clicked</a></div>';
  }sa.addEventListener('input',run);run();
  $$('[data-sample]').forEach(function(b){b.addEventListener('click',function(){sa.value=b.getAttribute('data-sample');run()})});}

  /* ---------- Quiz (contest) ---------- */
  var quiz=$('#quiz');
  if(quiz){var qs=$$('.quiz-q',quiz),i=0,score=0;
    function show(n){qs.forEach(function(q,k){q.classList.toggle('on',k===n)});$('#quizProg').textContent=(n+1)+' / '+qs.length}
    qs.forEach(function(q){var ans=q.getAttribute('data-a');$$('.quiz-opt',q).forEach(function(b){b.addEventListener('click',function(){
      if(q.dataset.done)return;q.dataset.done=1;var ok=b.getAttribute('data-k')===ans;if(ok)score++;
      b.classList.add(ok?'right':'wrong');if(!ok)$('.quiz-opt[data-k="'+ans+'"]',q).classList.add('right');
      var ex=$('.explain',q);if(ex)ex.style.display='block';
      setTimeout(function(){i++;if(i<qs.length)show(i);else{quiz.querySelector('.quiz-body').style.display='none';var r=$('#quizResult');r.style.display='block';$('#quizScore').textContent=score+' / '+qs.length;var f=$('#entryScore');if(f)f.value=score+'/'+qs.length}},1400);
    })})});show(0);}

  /* ---------- Pledge amount buttons ---------- */
  $$('[data-amt]').forEach(function(b){b.addEventListener('click',function(){var f=$('#pledgeAmt');if(f){f.value=b.getAttribute('data-amt');f.focus()}var t=$('#pledgeTier');if(t&&b.getAttribute('data-tier'))t.value=b.getAttribute('data-tier');var s=$('#pledge');if(s)s.scrollIntoView({behavior:'smooth'})})});

  /* ---------- Prefill report number ---------- */
  var rn=$('#rpNum');if(rn){var qn=new URLSearchParams(location.search).get('n');if(qn)rn.value=qn;
    rn.addEventListener('input',function(){var a=analyze(rn.value),c=a.cands[0],h=$('#rpHint');if(h)h.textContent=c?(D[c.cc].flag+' '+D[c.cc].name+' · '+(c.net||'unknown network')+(c.complete?'':' · incomplete')):(rn.value?'Not a PH/VN/TW mobile pattern — that is fine, report it anyway.':'')});rn.dispatchEvent(new Event('input'))}

  /* ---------- Forms ---------- */
  function resetSteps(f){var st=$$('.step',f);if(!st.length)return;st.forEach(function(s,i){s.classList.toggle('active',i===0)});$$('.steps-ind span',f).forEach(function(s,i){s.classList.toggle('on',i===0)});f._step=0}
  $$('form.js-form').forEach(function(f){
    f.addEventListener('submit',function(e){
      e.preventDefault();var msg=$('.form-msg',f);
      if(f._honey&&f._honey.value)return;
      if(!f.checkValidity()){f.reportValidity();return}
      var btn=$('button[type=submit]',f),old=btn?btn.textContent:'';if(btn){btn.disabled=true;btn.textContent='Sending…'}
      var data={};new FormData(f).forEach(function(v,k){if(k!=='_honey')data[k]=data[k]?data[k]+', '+v:v});
      data._subject=(f.getAttribute('data-subject')||'093333.com form')+' — '+(data.name||data.company||data.email||data.number||'');
      data._template='table';data._captcha='false';data.page=location.href;
      fetch(endpoint(),{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)})
        .then(function(r){return r.json().catch(function(){return {}})})
        .then(function(){if(msg){msg.className='form-msg ok';msg.textContent=f.getAttribute('data-ok')||'Received — thank you. We reply within 2 business days.'}f.reset();resetSteps(f);if(window.gtag)try{gtag('event','generate_lead',{form:f.getAttribute('data-subject')})}catch(x){}})
        .catch(function(){if(msg){msg.className='form-msg err';msg.textContent='Network error — please try again in a minute.'}})
        .then(function(){if(btn){btn.disabled=false;btn.textContent=old}});
    });
  });
  $$('form.multistep').forEach(function(f){
    var steps=$$('.step',f),ind=$$('.steps-ind span',f);f._step=0;
    function go(n){var i=f._step;if(n>i){var bad=$$('input,select,textarea',steps[i]).filter(function(x){return !x.checkValidity()});if(bad.length){bad[0].reportValidity();return}
      if(steps[i].hasAttribute('data-need-one')&&!$$('input:checked',steps[i]).length){alert('Pick at least one option.');return}}
      f._step=Math.max(0,Math.min(steps.length-1,n));steps.forEach(function(s,k){s.classList.toggle('active',k===f._step)});ind.forEach(function(s,k){s.classList.toggle('on',k<=f._step)});
      var top=f.getBoundingClientRect().top;if(top<0)window.scrollBy({top:top-90,behavior:'smooth'})}
    $$('[data-next]',f).forEach(function(b){b.addEventListener('click',function(){go(f._step+1)})});
    $$('[data-prev]',f).forEach(function(b){b.addEventListener('click',function(){go(f._step-1)})});
  });

  /* ---------- YouTube facades (only when a real ID is set) ---------- */
  $$('.video[data-yt]').forEach(function(v){var id=v.getAttribute('data-yt');if(!/^[\w-]{11}$/.test(id))return;
    v.innerHTML='<img loading="lazy" alt="" src="https://i.ytimg.com/vi/'+id+'/hqdefault.jpg"><div class="play"><span>▶</span></div>';
    v.addEventListener('click',function(){v.innerHTML='<iframe src="https://www.youtube-nocookie.com/embed/'+id+'?autoplay=1&rel=0" title="YouTube video" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowfullscreen></iframe>'},{once:true});});

  /* ---------- Guide filter ---------- */
  var gs=$('#guideSearch');if(gs)gs.addEventListener('input',function(){var q=gs.value.toLowerCase();$$('[data-guide]').forEach(function(c){c.style.display=c.textContent.toLowerCase().indexOf(q)>-1?'':'none'})});

  /* ---------- Monthly contest countdown (last day of month, 23:59 UTC+8) ---------- */
  var cd=$('#contestCd');
  if(cd){(function tick(){var n=new Date(),end=new Date(Date.UTC(n.getUTCFullYear(),n.getUTCMonth()+1,1,15,59,0));if(end-n<0)end=new Date(Date.UTC(n.getUTCFullYear(),n.getUTCMonth()+2,1,15,59,0));
    var ms=end-n,d=Math.floor(ms/864e5),h=Math.floor(ms%864e5/36e5),m=Math.floor(ms%36e5/6e4),s=Math.floor(ms%6e4/1e3);
    cd.textContent=d+'d '+('0'+h).slice(-2)+'h '+('0'+m).slice(-2)+'m '+('0'+s).slice(-2)+'s';setTimeout(tick,1000)})()}
})();
