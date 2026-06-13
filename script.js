// =============================================
//  script.js — ToolKit Pro  (complete, fixed)
// =============================================

// ══════════════════════════════════════════
//  1. THEME
// ══════════════════════════════════════════
const html       = document.documentElement;
const themeBtn   = document.getElementById('theme-toggle');
const themeIcon  = document.getElementById('theme-icon');
const savedTheme = localStorage.getItem('tkp-theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
themeIcon.textContent = savedTheme === 'dark' ? '🌙' : '☀️';
themeBtn.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('tkp-theme', next);
  themeIcon.textContent = next === 'dark' ? '🌙' : '☀️';
});

// ══════════════════════════════════════════
//  2. NAVBAR SCROLL SHADOW
// ══════════════════════════════════════════
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ══════════════════════════════════════════
//  3. MOBILE DRAWER
// ══════════════════════════════════════════
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('mobile-drawer').classList.toggle('open');
  document.getElementById('drawer-overlay').classList.toggle('open');
});
function closeDrawer() {
  document.getElementById('mobile-drawer').classList.remove('open');
  document.getElementById('drawer-overlay').classList.remove('open');
}

// ══════════════════════════════════════════
//  4. PAGE / TOOL NAVIGATION
// ══════════════════════════════════════════
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function showTool(toolId) {
  showPage('tools');
  switchTool(toolId);
}
function switchTool(toolId) {
  document.querySelectorAll('.snav-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.tool === toolId));
  document.querySelectorAll('.mttab').forEach(b =>
    b.classList.toggle('active', b.dataset.tool === toolId));
  document.querySelectorAll('.tool-panel').forEach(p => p.classList.remove('active'));
  const panel = document.getElementById('tool-' + toolId);
  if (panel) panel.classList.add('active');
}
// Card keyboard accessibility
document.querySelectorAll('.tool-card').forEach(card => {
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.click(); }
  });
});

// ══════════════════════════════════════════
//  5. SHARED HELPERS
// ══════════════════════════════════════════
function fmt(n) {
  if (n === null || n === undefined || isNaN(n)) return '';
  const r = parseFloat(n.toPrecision(7));
  return r.toLocaleString('en-US', { maximumFractionDigits: 6 });
}
function showChip(id, text) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = text;
  el.classList.toggle('show', !!text);
}

// ══════════════════════════════════════════
//  6. UNIT CONVERTER
// ══════════════════════════════════════════
function setUnitCat(cat) {
  document.querySelectorAll('#tool-unit .ctab').forEach(b =>
    b.classList.toggle('active', b.dataset.cat === cat));
  document.querySelectorAll('.unit-cat').forEach(el => el.classList.remove('active'));
  document.getElementById('cat-' + cat).classList.add('active');
}

// LENGTH  (base: metres)
const lenToMetre = { mm:0.001,cm:0.01,m:1,km:1000,in:0.0254,ft:0.3048,yd:0.9144,mi:1609.344 };
function convertLength() {
  const v=parseFloat(document.getElementById('len-val').value);
  const f=document.getElementById('len-from').value;
  const t=document.getElementById('len-to').value;
  if (isNaN(v)){document.getElementById('len-result').value='';showChip('len-chip','');return;}
  const r=v*lenToMetre[f]/lenToMetre[t];
  document.getElementById('len-result').value=fmt(r);
  showChip('len-chip',`${v} ${f} = ${fmt(r)} ${t}`);
}
function swapLength(){
  const a=document.getElementById('len-from'),b=document.getElementById('len-to');
  [a.value,b.value]=[b.value,a.value];convertLength();
}

// WEIGHT  (base: kg)
const wtToKg={mg:1e-6,g:0.001,kg:1,t:1000,oz:0.0283495,lb:0.453592,st:6.35029};
function convertWeight(){
  const v=parseFloat(document.getElementById('wt-val').value);
  const f=document.getElementById('wt-from').value;
  const t=document.getElementById('wt-to').value;
  if(isNaN(v)){document.getElementById('wt-result').value='';showChip('wt-chip','');return;}
  const r=v*wtToKg[f]/wtToKg[t];
  document.getElementById('wt-result').value=fmt(r);
  showChip('wt-chip',`${v} ${f} = ${fmt(r)} ${t}`);
}
function swapWeight(){
  const a=document.getElementById('wt-from'),b=document.getElementById('wt-to');
  [a.value,b.value]=[b.value,a.value];convertWeight();
}

// TEMPERATURE
function convertTemp(){
  const v=parseFloat(document.getElementById('tmp-val').value);
  const f=document.getElementById('tmp-from').value;
  const t=document.getElementById('tmp-to').value;
  if(isNaN(v)){document.getElementById('tmp-result').value='';showChip('tmp-chip','');return;}
  let c;
  if(f==='C')c=v;else if(f==='F')c=(v-32)*5/9;else c=v-273.15;
  let r;
  if(t==='C')r=c;else if(t==='F')r=c*9/5+32;else r=c+273.15;
  const lbl={C:'°C',F:'°F',K:'K'};
  document.getElementById('tmp-result').value=fmt(r);
  showChip('tmp-chip',`${v}${lbl[f]} = ${fmt(r)}${lbl[t]}`);
}
function swapTemp(){
  const a=document.getElementById('tmp-from'),b=document.getElementById('tmp-to');
  [a.value,b.value]=[b.value,a.value];convertTemp();
}

// SPEED  (base: m/s)
const spdToMs={ms:1,kph:1/3.6,mph:0.44704,knot:0.514444,fts:0.3048,mach:343};
function convertSpeed(){
  const v=parseFloat(document.getElementById('spd-val').value);
  const f=document.getElementById('spd-from').value;
  const t=document.getElementById('spd-to').value;
  if(isNaN(v)){document.getElementById('spd-result').value='';showChip('spd-chip','');return;}
  const r=v*spdToMs[f]/spdToMs[t];
  document.getElementById('spd-result').value=fmt(r);
  showChip('spd-chip',`${v} ${f} = ${fmt(r)} ${t}`);
}

// AREA  (base: m²)
const areaToM2={mm2:1e-6,cm2:1e-4,m2:1,km2:1e6,in2:0.00064516,ft2:0.092903,acre:4046.86,ha:10000};
function convertArea(){
  const v=parseFloat(document.getElementById('area-val').value);
  const f=document.getElementById('area-from').value;
  const t=document.getElementById('area-to').value;
  if(isNaN(v)){document.getElementById('area-result').value='';showChip('area-chip','');return;}
  const r=v*areaToM2[f]/areaToM2[t];
  document.getElementById('area-result').value=fmt(r);
  showChip('area-chip',`${v} ${f} = ${fmt(r)} ${t}`);
}

// DATA  (base: bits)
const dataToBit={bit:1,B:8,KB:8192,MB:8388608,GB:8589934592,TB:8796093022208,PB:9007199254740992};
function convertData(){
  const v=parseFloat(document.getElementById('data-val').value);
  const f=document.getElementById('data-from').value;
  const t=document.getElementById('data-to').value;
  if(isNaN(v)){document.getElementById('data-result').value='';showChip('data-chip','');return;}
  const r=v*dataToBit[f]/dataToBit[t];
  document.getElementById('data-result').value=fmt(r);
  showChip('data-chip',`${v} ${f} = ${fmt(r)} ${t}`);
}

// Generic swap helper
function swapUnits(fromId,toId,convertFn){
  const a=document.getElementById(fromId),b=document.getElementById(toId);
  [a.value,b.value]=[b.value,a.value];convertFn();
}

// ══════════════════════════════════════════
//  7. CURRENCY CONVERTER
// ══════════════════════════════════════════
const rates={USD:1,PKR:278.5,EUR:0.92,GBP:0.79,AED:3.67,SAR:3.75,INR:83.4,CAD:1.36,AUD:1.53};
const currencyNames={
  USD:'🇺🇸 US Dollar',PKR:'🇵🇰 Pakistani Rupee',EUR:'🇪🇺 Euro',
  GBP:'🇬🇧 British Pound',AED:'🇦🇪 UAE Dirham',SAR:'🇸🇦 Saudi Riyal',
  INR:'🇮🇳 Indian Rupee',CAD:'🇨🇦 Canadian Dollar',AUD:'🇦🇺 Australian Dollar'
};
function convertCurrency(){
  const v=parseFloat(document.getElementById('cur-val').value);
  const f=document.getElementById('cur-from').value;
  const t=document.getElementById('cur-to').value;
  if(isNaN(v)){document.getElementById('cur-result').value='';showChip('cur-chip','');return;}
  const r=(v/rates[f])*rates[t];
  document.getElementById('cur-result').value=r.toFixed(2);
  showChip('cur-chip',`1 ${f} ≈ ${(rates[t]/rates[f]).toFixed(4)} ${t}`);
}
function swapCurrency(){
  const a=document.getElementById('cur-from'),b=document.getElementById('cur-to');
  [a.value,b.value]=[b.value,a.value];convertCurrency();
}
function buildRateGrid(){
  const grid=document.getElementById('rate-table');
  if(!grid)return;
  grid.innerHTML='';
  Object.entries(rates).forEach(([code,rate])=>{
    const d=document.createElement('div');
    d.className='rate-pill';
    d.innerHTML=`<span class="rp-cur">${currencyNames[code]}</span><span class="rp-val">1 USD = ${rate} ${code}</span>`;
    grid.appendChild(d);
  });
}
buildRateGrid();
convertCurrency();

// ══════════════════════════════════════════
//  8. SCIENTIFIC CALCULATOR
// ══════════════════════════════════════════
// State
let sciExpr     = '';
let sciMemory   = 0;
let sciMode     = 'deg';   // 'deg' | 'rad'
let sciInv      = false;
let sciJustCalc = false;   // true after = pressed, resets on next digit

function _sciDisplaySet(val){
  const el=document.getElementById('sci-display');
  el.textContent=String(val);
  el.className='sci-display'+(val==='Error'?' error':'');
}
function _sciExprShow(){ document.getElementById('sci-expr').textContent=sciExpr; }
function _getDisplayVal(){ return parseFloat(document.getElementById('sci-display').textContent); }

function setSciMode(m){
  sciMode=m;
  document.getElementById('sci-deg-btn').classList.toggle('active',m==='deg');
  document.getElementById('sci-rad-btn').classList.toggle('active',m==='rad');
}
function toggleSciInv(){
  sciInv=!sciInv;
  document.getElementById('sci-inv-btn').classList.toggle('inv-active',sciInv);
  document.getElementById('btn-sin').textContent=sciInv?'sin⁻¹':'sin';
  document.getElementById('btn-cos').textContent=sciInv?'cos⁻¹':'cos';
  document.getElementById('btn-tan').textContent=sciInv?'tan⁻¹':'tan';
}

// Append digit or operator to the expression
function sciAppend(ch){
  // After = is pressed, start fresh if user types a digit
  if(sciJustCalc && /[0-9.]/.test(ch)){ sciExpr=''; sciJustCalc=false; }
  sciJustCalc=false;
  sciExpr+=ch;
  _sciExprShow();
  // Live-preview while the expression is valid
  try{
    const v=_sciEval(sciExpr);
    if(isFinite(v)&&!isNaN(v)) _sciDisplaySet(_sciFmt(v));
  }catch(e){}
}

function sciClear(){ sciExpr=''; sciJustCalc=false; _sciDisplaySet('0'); _sciExprShow(); }

function sciDel(){
  if(!sciExpr)return;
  // If the end of expr is a multi-char constant like Math.PI, remove the whole token
  if(sciExpr.endsWith(String(Math.PI))) sciExpr=sciExpr.slice(0,-String(Math.PI).length);
  else if(sciExpr.endsWith(String(Math.E))) sciExpr=sciExpr.slice(0,-String(Math.E).length);
  else sciExpr=sciExpr.slice(0,-1);
  _sciExprShow();
  if(!sciExpr){_sciDisplaySet('0');return;}
  try{const v=_sciEval(sciExpr);if(isFinite(v)&&!isNaN(v))_sciDisplaySet(_sciFmt(v));}catch(e){}
}

function sciCalc(){
  document.getElementById('sci-expr').textContent=sciExpr+' =';
  try{
    const result=_sciEval(sciExpr);
    if(!isFinite(result)||isNaN(result)){_sciDisplaySet('Error');sciExpr='';return;}
    _sciDisplaySet(_sciFmt(result));
    sciExpr=String(result);
    sciJustCalc=true;
  }catch(e){ _sciDisplaySet('Error'); sciExpr=''; }
}

// Safe evaluator: allow digits, basic operators, parens, dot, e/E for exponents
// ** is two * chars (both allowed); % is the modulo operator, also allowed
function _sciEval(expr){
  // Replace display symbols
  let e=expr.replace(/×/g,'*').replace(/÷/g,'/').replace(/−/g,'-').replace(/\^/g,'**');
  // Validate: only safe characters (digits, operators, parens, ., e, E)
  // Allowed: 0-9, +, -, *, /, ., (, ), e, E, % (modulo)
  if(/[^0-9+\-*/.()eE%]/.test(e)) throw new Error('unsafe');
  // eslint-disable-next-line no-new-func
  return Function('"use strict";return('+e+')')();
}

function _sciFmt(n){
  if(Math.abs(n)>=1e12||(Math.abs(n)<1e-9&&n!==0)) return n.toExponential(6);
  return parseFloat(n.toPrecision(10)).toString();
}
function _toRad(x){ return sciMode==='deg'?x*Math.PI/180:x; }
function _fromRad(x){ return sciMode==='deg'?x*180/Math.PI:x; }

// Apply a unary function to the current displayed value
function _applyUnary(fn,label){
  const v=_getDisplayVal();
  if(isNaN(v)){_sciDisplaySet('Error');return;}
  const r=fn(v);
  if(!isFinite(r)||isNaN(r)){_sciDisplaySet('Error');return;}
  document.getElementById('sci-expr').textContent=`${label}(${_sciFmt(v)}) =`;
  sciExpr=String(r);
  _sciDisplaySet(_sciFmt(r));
  sciJustCalc=true;
}

function sciTrig(fn){
  if(sciInv){
    const inv={sin:x=>_fromRad(Math.asin(x)),cos:x=>_fromRad(Math.acos(x)),tan:x=>_fromRad(Math.atan(x))};
    _applyUnary(inv[fn],fn+'⁻¹');
  }else{
    const fwd={sin:x=>Math.sin(_toRad(x)),cos:x=>Math.cos(_toRad(x)),tan:x=>Math.tan(_toRad(x))};
    _applyUnary(fwd[fn],fn);
  }
}
function sciLog()   { _applyUnary(Math.log10,'log'); }
function sciLn()    { _applyUnary(Math.log,'ln'); }
function sciSqrt()  { _applyUnary(Math.sqrt,'√'); }
function sciSq()    { _applyUnary(x=>x*x,'sq'); }
function sciCube()  { _applyUnary(x=>x*x*x,'cube'); }
function sciRecip() { _applyUnary(x=>1/x,'1/x'); }
function sciAbs()   { _applyUnary(Math.abs,'|x|'); }

// xʸ — appends ** operator so user can type the exponent
function sciPow(){
  const v=_getDisplayVal();
  if(isNaN(v))return;
  sciExpr=String(v)+'**';
  document.getElementById('sci-expr').textContent=_sciFmt(v)+' ^';
  sciJustCalc=false;
}

// Append π or e as numeric string
function sciPi(){
  if(sciJustCalc) sciExpr=String(Math.PI);
  else sciExpr+=String(Math.PI);
  sciJustCalc=false;
  _sciExprShow();
  _sciDisplaySet(_sciFmt(Math.PI));
}
function sciEuler(){
  if(sciJustCalc) sciExpr=String(Math.E);
  else sciExpr+=String(Math.E);
  sciJustCalc=false;
  _sciExprShow();
  _sciDisplaySet(_sciFmt(Math.E));
}

// ± negate current displayed value
function sciNeg(){
  const v=_getDisplayVal();
  if(isNaN(v))return;
  const neg=-v;
  sciExpr=String(neg);
  _sciDisplaySet(_sciFmt(neg));
  _sciExprShow();
}

// % — convert displayed value to its percentage (divide by 100)
function sciPercent(){
  const v=_getDisplayVal();
  if(isNaN(v))return;
  const r=v/100;
  sciExpr=String(r);
  _sciDisplaySet(_sciFmt(r));
  _sciExprShow();
  sciJustCalc=true;
}

// Memory functions
function sciMC()    { sciMemory=0; }
function sciMR()    { sciExpr=String(sciMemory); _sciDisplaySet(_sciFmt(sciMemory)); _sciExprShow(); sciJustCalc=true; }
function sciMS()    { sciMemory=_getDisplayVal(); }
function sciMPlus() { sciMemory+=_getDisplayVal(); }
function sciMMinus(){ sciMemory-=_getDisplayVal(); }

// ══════════════════════════════════════════
//  9. QR CODE GENERATOR
// ══════════════════════════════════════════
let currentQRType='url';
let qrTimer=null;

function setQRType(type){
  currentQRType=type;
  document.querySelectorAll('#tool-qr .ctab').forEach(b=>
    b.classList.toggle('active',b.dataset.qtype===type));
  document.querySelectorAll('.qr-type').forEach(p=>p.classList.remove('active'));
  document.getElementById('qr-'+type).classList.add('active');
  resetQR();
}

function resetQR(){
  const img=document.getElementById('qr-img');
  img.style.display='none'; img.src='';
  const ph=document.getElementById('qr-placeholder');
  ph.style.display='flex';
  ph.innerHTML='<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" opacity="0.3"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="4" height="4"/><rect x="20" y="14" width="1" height="7"/><rect x="14" y="20" width="7" height="1"/></svg><p>Your QR code appears here</p>';
  document.getElementById('qr-actions').style.display='none';
  document.getElementById('qr-output-wrap').classList.remove('has-qr');
}

function getQRData(){
  switch(currentQRType){
    case 'url':  return document.getElementById('qr-url-input').value.trim();
    case 'text': return document.getElementById('qr-text-input').value.trim();
    case 'email':{
      const addr=document.getElementById('qr-email-addr').value.trim();
      if(!addr)return'';
      const subj=document.getElementById('qr-email-subj').value.trim();
      const body=document.getElementById('qr-email-body').value.trim();
      let uri='mailto:'+addr;
      const ps=[];
      if(subj)ps.push('subject='+encodeURIComponent(subj));
      if(body)ps.push('body='+encodeURIComponent(body));
      if(ps.length)uri+='?'+ps.join('&');
      return uri;
    }
    case 'wifi':{
      const ssid=document.getElementById('qr-wifi-ssid').value.trim();
      if(!ssid)return'';
      const sec=document.getElementById('qr-wifi-sec').value||'nopass';
      const pass=document.getElementById('qr-wifi-pass').value;
      return`WIFI:T:${sec};S:${ssid};P:${pass};;`;
    }
    default:return'';
  }
}

function generateQR(){
  clearTimeout(qrTimer);
  qrTimer=setTimeout(_doGenerateQR,650);
}

function _doGenerateQR(){
  const data=getQRData();
  if(!data){resetQR();return;}
  const size=document.getElementById('qr-size').value;
  const ecc=document.getElementById('qr-ecc').value;
  const url=`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(data)}&size=${size}x${size}&ecc=${ecc}&format=png&margin=10`;
  const img=document.getElementById('qr-img');
  const ph=document.getElementById('qr-placeholder');
  ph.style.display='flex';
  ph.innerHTML='<p style="color:var(--text3);font-size:.85rem">Generating QR code…</p>';
  img.onload=()=>{
    ph.style.display='none';
    img.style.display='block';
    document.getElementById('qr-output-wrap').classList.add('has-qr');
    document.getElementById('qr-download').href=url;
    document.getElementById('qr-actions').style.display='flex';
  };
  img.onerror=()=>{
    ph.innerHTML='<p style="color:#ef4444;font-size:.85rem">Failed to generate — check your internet connection</p>';
    ph.style.display='flex';
    img.style.display='none';
    document.getElementById('qr-actions').style.display='none';
  };
  img.src=url;
}

function copyQRData(){
  const data=getQRData();
  if(!data)return;
  navigator.clipboard.writeText(data).then(()=>{
    const btn=document.getElementById('qr-copy-btn');
    const orig=btn.innerHTML;
    btn.innerHTML='✓ Copied!';
    btn.style.cssText='background:#10b981;color:#fff;border-color:#10b981';
    setTimeout(()=>{ btn.innerHTML=orig; btn.style.cssText=''; },1800);
  });
}

// ══════════════════════════════════════════
//  10. LOAN EMI CALCULATOR
// ══════════════════════════════════════════
const EMI_CIRC=2*Math.PI*46; // circumference for r=46

function calcEMI(){
  const P=parseFloat(document.getElementById('emi-amount').value);
  const annual=parseFloat(document.getElementById('emi-rate').value);
  const termVal=parseFloat(document.getElementById('emi-term').value);
  const termUnit=document.getElementById('emi-term-unit').value;

  // Reset if inputs invalid
  if(!P||!annual||!termVal||P<=0||annual<=0||termVal<=0){
    ['emi-monthly','emi-total','emi-interest'].forEach(id=>
      document.getElementById(id).textContent='—');
    document.getElementById('emi-chart-wrap').style.display='none';
    document.getElementById('emi-toggle-btn').style.display='none';
    const sched=document.getElementById('emi-schedule');
    if(sched.dataset.open==='true') toggleEMISchedule();
    return;
  }

  const n=termUnit==='years'?termVal*12:termVal; // months
  const r=annual/100/12;                          // monthly interest rate

  // EMI = P·r·(1+r)^n / ((1+r)^n − 1)
  const emi=r===0?P/n:P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);
  const totalPay=emi*n;
  const totalInt=totalPay-P;

  const money=v=>'$'+Math.abs(v).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
  document.getElementById('emi-monthly').textContent=money(emi);
  document.getElementById('emi-total').textContent=money(totalPay);
  document.getElementById('emi-interest').textContent=money(totalInt);

  // Donut chart — r=46 so circumference ≈ 289.03
  const pPct=P/totalPay, iPct=totalInt/totalPay;
  const pDash=pPct*EMI_CIRC, iDash=iPct*EMI_CIRC;
  const arcP=document.getElementById('emi-arc-p');
  const arcI=document.getElementById('emi-arc-i');
  arcP.setAttribute('stroke-dasharray',`${pDash} ${EMI_CIRC-pDash}`);
  arcP.setAttribute('stroke-dashoffset','0');
  arcI.setAttribute('stroke-dasharray',`${iDash} ${EMI_CIRC-iDash}`);
  arcI.setAttribute('stroke-dashoffset',String(-pDash));
  document.getElementById('emi-donut-pct').textContent=Math.round(pPct*100)+'%';

  document.getElementById('emi-chart-wrap').style.display='flex';
  document.getElementById('emi-toggle-btn').style.display='block';
  buildEMISchedule(P,r,emi,n);
}

function buildEMISchedule(P,r,emi,n){
  const tbody=document.getElementById('emi-tbody');
  tbody.innerHTML='';
  let balance=P;
  const money=v=>'$'+Math.max(0,v).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
  for(let i=1;i<=n;i++){
    const intPay=balance*r;
    const prinPay=Math.min(emi-intPay,balance);
    balance=Math.max(0,balance-prinPay);
    const tr=document.createElement('tr');
    tr.innerHTML=`<td>${i}</td><td>${money(emi)}</td><td>${money(prinPay)}</td><td>${money(intPay)}</td><td>${money(balance)}</td>`;
    tbody.appendChild(tr);
  }
}

function toggleEMISchedule(){
  const wrap=document.getElementById('emi-schedule');
  const btn=document.getElementById('emi-toggle-btn');
  const open=wrap.dataset.open==='true';
  wrap.style.display=open?'none':'block';
  wrap.dataset.open=String(!open);
  btn.textContent=open?'Show Amortization Schedule ▾':'Hide Amortization Schedule ▴';
}

// ══════════════════════════════════════════
//  11. BMI CALCULATOR
// ══════════════════════════════════════════
let bmiMode='metric';

function setBmiUnit(mode){
  bmiMode=mode;
  document.querySelectorAll('#tool-bmi .ctab').forEach(b=>
    b.classList.toggle('active',b.dataset.bmi===mode));
  document.getElementById('height-label').textContent=mode==='metric'?'Height (cm)':'Height (inches)';
  document.getElementById('weight-label').textContent=mode==='metric'?'Weight (kg)':'Weight (lbs)';
  document.getElementById('bmi-height').value='';
  document.getElementById('bmi-weight').value='';
  _resetBMI();
}
function _resetBMI(){
  document.getElementById('bmi-score').textContent='—';
  document.getElementById('bmi-category').textContent='Enter height & weight above';
  document.getElementById('bmi-result-box').className='bmi-result-box';
  const n=document.getElementById('scale-needle');
  n.style.opacity='0'; n.style.left='0%';
  document.getElementById('bmi-tip').textContent='';
}
function calculateBMI(){
  const h=parseFloat(document.getElementById('bmi-height').value);
  const w=parseFloat(document.getElementById('bmi-weight').value);
  if(isNaN(h)||isNaN(w)||h<=0||w<=0){_resetBMI();return;}
  const bmi=bmiMode==='metric'?w/Math.pow(h/100,2):(w/Math.pow(h,2))*703;
  document.getElementById('bmi-score').textContent=bmi.toFixed(1);
  let cls,cat,tip,needle;
  if(bmi<18.5){
    cls='s-under';cat='Underweight';needle=(bmi/18.5)*25;
    tip='💡 Consider increasing calorie intake with nutrient-rich whole foods.';
  }else if(bmi<25){
    cls='s-normal';cat='✅ Normal weight';needle=25+((bmi-18.5)/6.5)*25;
    tip='🎉 Great! Maintain with a balanced diet and regular physical activity.';
  }else if(bmi<30){
    cls='s-over';cat='Overweight';needle=50+((bmi-25)/5)*25;
    tip='💡 Regular activity and balanced diet can help reach a healthy range.';
  }else{
    cls='s-obese';cat='Obese';needle=Math.min(75+((bmi-30)/10)*25,97);
    tip='⚠️ Consider consulting a healthcare professional for a personalised plan.';
  }
  document.getElementById('bmi-category').textContent=cat;
  document.getElementById('bmi-result-box').className='bmi-result-box '+cls;
  document.getElementById('bmi-tip').textContent=tip;
  const n=document.getElementById('scale-needle');
  n.style.left=needle+'%'; n.style.opacity='1';
}

// ══════════════════════════════════════════
//  12. AGE CALCULATOR
// ══════════════════════════════════════════
document.getElementById('dob-input').max=new Date().toISOString().split('T')[0];

function calculateAge(){
  const val=document.getElementById('dob-input').value;
  if(!val)return;
  const dob=new Date(val);
  const today=new Date();
  if(dob>today){
    ['age-years','age-months','age-days'].forEach(id=>document.getElementById(id).textContent='?');
    return;
  }
  let yr=today.getFullYear()-dob.getFullYear();
  let mo=today.getMonth()-dob.getMonth();
  let da=today.getDate()-dob.getDate();
  if(da<0){mo--;da+=new Date(today.getFullYear(),today.getMonth(),0).getDate();}
  if(mo<0){yr--;mo+=12;}
  document.getElementById('age-years').textContent=yr;
  document.getElementById('age-months').textContent=mo;
  document.getElementById('age-days').textContent=da;
  document.getElementById('age-result-box').classList.add('live');
  const MS_DAY=86400000;
  const totalDays=Math.floor((today-dob)/MS_DAY);
  const next=new Date(today.getFullYear(),dob.getMonth(),dob.getDate());
  if(next<=today)next.setFullYear(today.getFullYear()+1);
  const daysLeft=Math.ceil((next-today)/MS_DAY);
  const weekdays=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  document.getElementById('age-total-days').innerHTML=
    `📅 You have lived approximately <strong>${totalDays.toLocaleString()}</strong> days`;
  document.getElementById('age-next-bday').innerHTML=daysLeft===0
    ?`🎉 <strong>Happy Birthday today!</strong>`
    :`🎂 Next birthday in <strong>${daysLeft}</strong> day${daysLeft!==1?'s':''}`;
  document.getElementById('age-day-born').innerHTML=
    `📆 You were born on a <strong>${weekdays[dob.getDay()]}</strong>`;
}

// ══════════════════════════════════════════
//  13. PERCENTAGE CALCULATOR
// ══════════════════════════════════════════
function setPercentMode(mode){
  document.querySelectorAll('.pct-mode').forEach(el=>el.classList.remove('active'));
  document.getElementById('pct-'+mode).classList.add('active');
  document.querySelectorAll('#tool-percent .ctab').forEach(b=>
    b.classList.toggle('active',b.dataset.pmode===mode));
}
function calcPercent(){
  const p=parseFloat(document.getElementById('pct-p').value);
  const n=parseFloat(document.getElementById('pct-n').value);
  const el=document.getElementById('pct-basic-result');
  if(isNaN(p)||isNaN(n)){el.textContent='';el.classList.remove('has-result');return;}
  const r=(p/100)*n;
  el.textContent=`${p}% of ${n} = ${parseFloat(r.toFixed(8)).toLocaleString()}`;
  el.classList.add('has-result');
}
function calcPercentChange(){
  const f=parseFloat(document.getElementById('pct-from').value);
  const t=parseFloat(document.getElementById('pct-to').value);
  const el=document.getElementById('pct-change-result');
  if(isNaN(f)||isNaN(t)||f===0){el.textContent='';el.classList.remove('has-result');return;}
  const ch=((t-f)/Math.abs(f))*100;
  const sign=ch>=0?'▲':'▼';
  el.textContent=`${sign} ${Math.abs(ch).toFixed(2)}% ${ch>=0?'increase':'decrease'}`;
  el.classList.add('has-result');
}
function calcWhatPercent(){
  const x=parseFloat(document.getElementById('pct-x').value);
  const y=parseFloat(document.getElementById('pct-y').value);
  const el=document.getElementById('pct-what-result');
  if(isNaN(x)||isNaN(y)||y===0){el.textContent='';el.classList.remove('has-result');return;}
  el.textContent=`${x} is ${((x/y)*100).toFixed(4)}% of ${y}`;
  el.classList.add('has-result');
}

// ══════════════════════════════════════════
//  14. DISCOUNT CALCULATOR
// ══════════════════════════════════════════
function calcDiscount(){
  const price=parseFloat(document.getElementById('disc-price').value);
  const pct=parseFloat(document.getElementById('disc-pct').value);
  if(isNaN(price)||isNaN(pct)||pct<0||pct>100){
    ['disc-sale','disc-save','disc-orig'].forEach(id=>document.getElementById(id).textContent='—');
    return;
  }
  const saved=price*(pct/100);
  document.getElementById('disc-sale').textContent='$'+(price-saved).toFixed(2);
  document.getElementById('disc-save').textContent='$'+saved.toFixed(2);
  document.getElementById('disc-orig').textContent='$'+price.toFixed(2);
}

// ══════════════════════════════════════════
//  15. GPA CALCULATOR
// ══════════════════════════════════════════
let gpaRowCount=1;

function addGpaRow(){
  gpaRowCount++;
  const div=document.createElement('div');
  div.className='gpa-row';
  div.id='gpa-row-'+gpaRowCount;
  div.innerHTML=`
    <div class="field-group"><label>Subject</label><input type="text" class="gpa-name" placeholder="Subject"/></div>
    <div class="field-group"><label>Grade</label>
      <select class="gpa-grade" onchange="calcGPA()">
        <option value="4.0">A+ / A (4.0)</option><option value="3.7">A- (3.7)</option>
        <option value="3.3">B+ (3.3)</option><option value="3.0">B (3.0)</option>
        <option value="2.7">B- (2.7)</option><option value="2.3">C+ (2.3)</option>
        <option value="2.0">C (2.0)</option><option value="1.7">C- (1.7)</option>
        <option value="1.3">D+ (1.3)</option><option value="1.0">D (1.0)</option>
        <option value="0.0">F (0.0)</option>
      </select>
    </div>
    <div class="field-group"><label>Credits</label><input type="number" class="gpa-credits" placeholder="3" value="3" min="1" max="6" oninput="calcGPA()"/></div>
    <button class="gpa-remove-btn" onclick="removeGpaRow(this)" title="Remove">✕</button>`;
  document.getElementById('gpa-subjects').appendChild(div);
  document.querySelectorAll('.gpa-remove-btn').forEach(b=>b.style.display='flex');
  calcGPA();
}

function removeGpaRow(btn){
  const rows=document.querySelectorAll('.gpa-row');
  if(rows.length<=1)return;
  btn.closest('.gpa-row').remove();
  if(document.querySelectorAll('.gpa-row').length===1){
    document.querySelector('.gpa-remove-btn').style.display='none';
  }
  calcGPA();
}

function calcGPA(){
  const grades=document.querySelectorAll('.gpa-grade');
  const credits=document.querySelectorAll('.gpa-credits');
  let pts=0,crs=0;
  grades.forEach((g,i)=>{
    const cr=parseFloat(credits[i]?.value)||0;
    const gr=parseFloat(g.value)||0;
    pts+=gr*cr; crs+=cr;
  });
  const box=document.getElementById('gpa-result-box');
  const score=document.getElementById('gpa-score');
  const label=document.getElementById('gpa-label');
  if(crs===0){score.textContent='—';label.textContent='Add subjects to calculate GPA';box.className='gpa-result-box';return;}
  const gpa=pts/crs;
  score.textContent=gpa.toFixed(2);
  let cls,txt;
  if(gpa>=3.5){cls='good';txt="🏆 Excellent — Dean's List territory";}
  else if(gpa>=3.0){cls='good';txt='✅ Good standing';}
  else if(gpa>=2.0){cls='ok';txt='⚠️ Satisfactory — room to improve';}
  else{cls='low';txt='❗ Below average — consider academic support';}
  box.className='gpa-result-box '+cls;
  label.textContent=txt;
}

// ══════════════════════════════════════════
//  16. PASSWORD GENERATOR
// ══════════════════════════════════════════
function generatePassword(){
  const len=parseInt(document.getElementById('pw-length').value);
  const upper=document.getElementById('pw-upper').checked;
  const lower=document.getElementById('pw-lower').checked;
  const nums=document.getElementById('pw-numbers').checked;
  const syms=document.getElementById('pw-symbols').checked;
  let chars='';
  if(upper)chars+='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if(lower)chars+='abcdefghijklmnopqrstuvwxyz';
  if(nums) chars+='0123456789';
  if(syms) chars+='!@#$%^&*()_+-=[]{}|;:,.<>?';
  if(!chars){document.getElementById('pw-output').value='Select at least one character type';return;}
  const arr=new Uint32Array(len);
  crypto.getRandomValues(arr);
  let pw='';
  for(let i=0;i<len;i++) pw+=chars[arr[i]%chars.length];
  document.getElementById('pw-output').value=pw;
  _updatePWStrength(pw,{upper,lower,nums,syms});
}

function _updatePWStrength(pw,opts){
  const fill=document.getElementById('pw-strength-fill');
  const label=document.getElementById('pw-strength-label');
  const types=[opts.upper,opts.lower,opts.nums,opts.syms].filter(Boolean).length;
  let score=0;
  if(pw.length>=8)score++;
  if(pw.length>=12)score++;
  if(pw.length>=16)score++;
  if(types>=2)score++;
  if(types>=4)score++;
  const levels=[
    {pct:'15%',bg:'#ef4444',txt:'Very Weak'},
    {pct:'30%',bg:'#f97316',txt:'Weak'},
    {pct:'55%',bg:'#f59e0b',txt:'Fair'},
    {pct:'78%',bg:'#84cc16',txt:'Strong'},
    {pct:'100%',bg:'#10b981',txt:'🔒 Very Strong'},
  ];
  const lvl=levels[Math.min(score,4)];
  fill.style.width=lvl.pct;fill.style.background=lvl.bg;
  label.textContent=lvl.txt;label.style.color=lvl.bg;
}

function copyPassword(){
  const val=document.getElementById('pw-output').value;
  if(!val||val==='Select at least one character type')return;
  navigator.clipboard.writeText(val).then(()=>{
    const btn=document.getElementById('pw-copy-btn');
    btn.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
    btn.style.cssText='background:#10b981;border-color:#10b981;color:#fff';
    setTimeout(()=>{
      btn.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>';
      btn.style.cssText='';
    },1800);
  });
}

// ══════════════════════════════════════════
//  17. WORD COUNTER
// ══════════════════════════════════════════
function countWords(){
  const text=document.getElementById('wc-input').value;
  const words=text.trim()===''?0:text.trim().split(/\s+/).length;
  const sentences=text.trim()===''?0:(text.match(/[.!?]+/g)||[]).length;
  const paras=text.trim()===''?0:(text.split(/\n\s*\n/).filter(p=>p.trim()).length||(text.trim()?1:0));
  const readMin=Math.ceil(words/200);
  document.getElementById('wc-words').textContent=words.toLocaleString();
  document.getElementById('wc-chars').textContent=text.length.toLocaleString();
  document.getElementById('wc-chars-ns').textContent=text.replace(/\s/g,'').length.toLocaleString();
  document.getElementById('wc-sentences').textContent=sentences.toLocaleString();
  document.getElementById('wc-paragraphs').textContent=paras.toLocaleString();
  document.getElementById('wc-readtime').textContent=readMin<1?'< 1 min':readMin+' min';
}

// ══════════════════════════════════════════
//  18. TEXT CASE CONVERTER
// ══════════════════════════════════════════
let currentCase='upper';

function setCase(mode){
  currentCase=mode;
  document.querySelectorAll('.tc-btn').forEach(b=>
    b.classList.toggle('active',b.dataset.case===mode));
  convertCase();
}
function convertCase(){
  const input=document.getElementById('tc-input').value;
  let output='';
  switch(currentCase){
    case 'upper':    output=input.toUpperCase();break;
    case 'lower':    output=input.toLowerCase();break;
    case 'title':    output=input.toLowerCase().replace(/(?:^|\s)\S/g,c=>c.toUpperCase());break;
    case 'sentence': output=input.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g,c=>c.toUpperCase());break;
    case 'camel':
      output=input.toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g,(_,c)=>c.toUpperCase())
        .replace(/^[A-Z]/,c=>c.toLowerCase());break;
    case 'snake':
      output=input.toLowerCase().trim().replace(/\s+/g,'_').replace(/[^a-z0-9_]/g,'');break;
  }
  document.getElementById('tc-output').value=output;
}
function copyTextCase(){
  const val=document.getElementById('tc-output').value;
  if(!val)return;
  navigator.clipboard.writeText(val).then(()=>{
    const btn=document.querySelector('.tc-copy-btn');
    const orig=btn.innerHTML;
    btn.innerHTML='✓ Copied!';
    btn.style.cssText='background:#10b981;color:#fff;border-color:#10b981';
    setTimeout(()=>{btn.innerHTML=orig;btn.style.cssText='';},1600);
  });
}

// ══════════════════════════════════════════
//  19. RANDOM NUMBER GENERATOR
// ══════════════════════════════════════════
function generateRandom(){
  const min=parseInt(document.getElementById('rng-min').value);
  const max=parseInt(document.getElementById('rng-max').value);
  const count=Math.min(parseInt(document.getElementById('rng-count').value)||1,100);
  const unique=document.getElementById('rng-unique').value==='yes';
  const out=document.getElementById('rng-output');
  if(isNaN(min)||isNaN(max)||min>max){
    out.innerHTML='<span style="color:var(--text3)">Enter a valid min/max range</span>';
    out.classList.remove('has-result');return;
  }
  const range=max-min+1;
  if(unique&&count>range){
    out.innerHTML='<span style="color:#ef4444">Range too small for that many unique numbers</span>';
    out.classList.remove('has-result');return;
  }
  const nums=[];
  if(unique){
    const pool=Array.from({length:range},(_,i)=>min+i);
    for(let i=0;i<count;i++){
      const j=i+Math.floor(Math.random()*(pool.length-i));
      [pool[i],pool[j]]=[pool[j],pool[i]];nums.push(pool[i]);
    }
  }else{
    for(let i=0;i<count;i++) nums.push(Math.floor(Math.random()*range)+min);
  }
  out.innerHTML=nums.map((n,i)=>
    `<span class="rng-num" style="animation-delay:${i*0.04}s">${n}</span>`).join('');
  out.classList.add('has-result');
}

// ══════════════════════════════════════════
//  20. STOPWATCH
// ══════════════════════════════════════════
let swInterval=null,swMs=0,swRunning=false,swLapTimes=[];

function swToggle(){
  const btn=document.getElementById('sw-start-btn');
  const lap=document.getElementById('sw-lap-btn');
  if(!swRunning){
    swRunning=true;
    btn.textContent='⏸ Pause';btn.classList.add('running');
    lap.disabled=false;
    swInterval=setInterval(()=>{
      swMs+=10;
      document.getElementById('sw-display').textContent=_fmtSw(swMs);
    },10);
    document.getElementById('sw-display').classList.add('running');
  }else{
    swRunning=false;clearInterval(swInterval);
    btn.textContent='▶ Resume';btn.classList.remove('running');
    document.getElementById('sw-display').classList.remove('running');
  }
}
function swLap(){
  if(!swRunning)return;
  const prev=swLapTimes.length?swLapTimes[swLapTimes.length-1].total:0;
  swLapTimes.push({total:swMs,split:swMs-prev});
  const row=document.createElement('div');
  row.className='lap-row';
  row.innerHTML=`<span class="lap-num">Lap ${swLapTimes.length}</span><span class="lap-split">+${_fmtSw(swLapTimes[swLapTimes.length-1].split)}</span><span class="lap-total">${_fmtSw(swMs)}</span>`;
  document.getElementById('sw-laps').prepend(row);
}
function swReset(){
  clearInterval(swInterval);swMs=0;swRunning=false;swLapTimes=[];
  const btn=document.getElementById('sw-start-btn');
  btn.textContent='▶ Start';btn.classList.remove('running');
  const disp=document.getElementById('sw-display');
  disp.textContent='00:00.00';disp.classList.remove('running');
  document.getElementById('sw-lap-btn').disabled=true;
  document.getElementById('sw-laps').innerHTML='';
}
function _fmtSw(ms){
  const cs=Math.floor(ms/10)%100,s=Math.floor(ms/1000)%60,m=Math.floor(ms/60000);
  return`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}.${String(cs).padStart(2,'0')}`;
}

// ══════════════════════════════════════════
//  21. COUNTDOWN TIMER
// ══════════════════════════════════════════
let cdInterval=null,cdMs=0,cdRunning=false;

function cdToggle(){
  const btn=document.getElementById('cd-start-btn');
  if(!cdRunning){
    if(cdMs<=0){
      const h=parseInt(document.getElementById('cd-h').value)||0;
      const m=parseInt(document.getElementById('cd-m').value)||0;
      const s=parseInt(document.getElementById('cd-s').value)||0;
      cdMs=(h*3600+m*60+s)*1000;
    }
    if(cdMs<=0)return;
    document.getElementById('cd-done').textContent='';
    document.getElementById('cd-display').classList.remove('done');
    cdRunning=true;
    btn.textContent='⏸ Pause';btn.classList.add('running');
    document.getElementById('cd-display').classList.add('running');
    cdInterval=setInterval(()=>{
      cdMs-=100;
      if(cdMs<=0){cdMs=0;_cdDone();return;}
      document.getElementById('cd-display').textContent=_fmtCd(cdMs);
    },100);
  }else{
    cdRunning=false;clearInterval(cdInterval);
    btn.textContent='▶ Resume';btn.classList.remove('running');
    document.getElementById('cd-display').classList.remove('running');
  }
}
function _cdDone(){
  clearInterval(cdInterval);cdRunning=false;cdMs=0;
  const btn=document.getElementById('cd-start-btn');
  btn.textContent='▶ Start';btn.classList.remove('running');
  const disp=document.getElementById('cd-display');
  disp.textContent='00:00';disp.classList.remove('running');disp.classList.add('done');
  document.getElementById('cd-done').textContent="🔔 Time's up!";
  setTimeout(()=>disp.classList.remove('done'),4000);
  try{
    const ctx=new(window.AudioContext||window.webkitAudioContext)();
    [0,0.25,0.5].forEach(t=>{
      const osc=ctx.createOscillator(),gain=ctx.createGain();
      osc.connect(gain);gain.connect(ctx.destination);
      osc.frequency.value=880;
      gain.gain.setValueAtTime(0.3,ctx.currentTime+t);
      gain.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+t+0.18);
      osc.start(ctx.currentTime+t);osc.stop(ctx.currentTime+t+0.22);
    });
  }catch(e){}
}
function cdReset(){
  clearInterval(cdInterval);cdRunning=false;cdMs=0;
  const btn=document.getElementById('cd-start-btn');
  btn.textContent='▶ Start';btn.classList.remove('running');
  document.getElementById('cd-done').textContent='';
  const disp=document.getElementById('cd-display');
  disp.classList.remove('running','done');
  const h=parseInt(document.getElementById('cd-h').value)||0;
  const m=parseInt(document.getElementById('cd-m').value)||0;
  const s=parseInt(document.getElementById('cd-s').value)||0;
  disp.textContent=_fmtCd((h*3600+m*60+s)*1000);
}
function _fmtCd(ms){
  const tot=Math.floor(ms/1000);
  const h=Math.floor(tot/3600),m=Math.floor((tot%3600)/60),s=tot%60;
  if(h>0)return`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  return`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}
function setTimeWidget(mode){
  document.querySelectorAll('#tool-stopwatch .ctab').forEach(b=>
    b.classList.toggle('active',b.dataset.tw===mode));
  document.querySelectorAll('.tw-panel').forEach(p=>p.classList.remove('active'));
  document.getElementById('tw-'+mode).classList.add('active');
}

// ══════════════════════════════════════════
//  ON DOM READY
// ══════════════════════════════════════════
document.addEventListener('DOMContentLoaded',()=>{
  generatePassword();
  const cdDisp=document.getElementById('cd-display');
  if(cdDisp)cdDisp.textContent='05:00';
  const sched=document.getElementById('emi-schedule');
  if(sched)sched.dataset.open='false';
});
