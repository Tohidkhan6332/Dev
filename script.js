const modal=document.getElementById('orderModal');
const productSelect=document.getElementById('product');
const GITHUB_USER='Tohidkhan6332';
const PAYMENT_UPI='7849917350.wallet@phonepe';
const PAYMENT_BINANCE='1123760641';
const PAYMENT_QR_DATA='upi://pay?pa=7849917350.wallet@phonepe&pn=Mr%20Tohid&mc=0000&mode=02&purpose=00';

function openOrder(product){
  if(!modal)return;
  modal.classList.add('show');
  modal.setAttribute('aria-hidden','false');
  if(product&&productSelect)productSelect.value=product;
  const name=document.getElementById('name');
  if(name)setTimeout(()=>name.focus(),50);
}
function closeOrder(){
  if(!modal)return;
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden','true');
}
if(modal){
  modal.addEventListener('click',e=>{if(e.target===modal)closeOrder()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeOrder()});
}

const orderForm=document.getElementById('orderForm');
if(orderForm){
  orderForm.addEventListener('submit',async e=>{
    e.preventDefault();
    const product=productSelect?.value||'Custom request';
    const name=document.getElementById('name')?.value.trim()||'';
    const contact=document.getElementById('contactInput')?.value.trim()||'';
    const req=document.getElementById('requirements')?.value.trim()||'';
    const orderText=`Order request — ${product}\n\nName: ${name}\nContact: ${contact}\n\nRequirements:\n${req}\n\nPlease share final price, payment method and delivery details.`;
    try{await navigator.clipboard.writeText(orderText)}catch{}
    const sent=document.getElementById('sent');
    if(sent){sent.hidden=false;sent.textContent='Order details copied. Send the copied request to Tohid through GitHub or your preferred contact.';}
    setTimeout(()=>window.open(`https://github.com/${GITHUB_USER}`,'_blank','noopener,noreferrer'),500);
  });
}

async function loadGitHubProjects(){
  const grid=document.querySelector('.project-grid');
  if(!grid)return;
  try{
    const res=await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=6`,{headers:{Accept:'application/vnd.github+json'}});
    if(!res.ok)throw new Error('GitHub API unavailable');
    const repos=await res.json();
    const featured=repos.filter(r=>!r.fork).slice(0,4);
    if(!featured.length)return;
    grid.innerHTML=featured.map(r=>`<article><span>${escapeHtml((r.language||'CODE').toUpperCase())}</span><h3>${escapeHtml(r.name)}</h3><p>${escapeHtml(r.description||'Open-source project by Tohid Developer.')}</p><a href="${r.html_url}" target="_blank" rel="noreferrer">GitHub ↗</a></article>`).join('');
  }catch(err){console.info('GitHub projects fallback:',err.message)}
}
function escapeHtml(value){return String(value).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
loadGitHubProjects();

function setupPayments(){
  const payment=document.querySelector('.payment');
  if(!payment)return;
  const encoded=encodeURIComponent(PAYMENT_QR_DATA);
  payment.innerHTML=`<div class="payment-main"><strong>Accepted payments</strong><span>UPI</span><span>Binance</span><div class="payment-details"><button type="button" class="copy-pay" data-copy="${PAYMENT_UPI}">UPI: <b>${PAYMENT_UPI}</b> <small>Copy</small></button><button type="button" class="copy-pay" data-copy="${PAYMENT_BINANCE}">Binance ID: <b>${PAYMENT_BINANCE}</b> <small>Copy</small></button></div></div><div class="payment-qr"><img src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encoded}" alt="UPI payment QR" loading="lazy" referrerpolicy="no-referrer"><small>Scan with any supported UPI app</small></div>`;
  document.querySelectorAll('.copy-pay').forEach(btn=>btn.addEventListener('click',async()=>{
    const value=btn.dataset.copy;
    try{await navigator.clipboard.writeText(value);const old=btn.innerHTML;btn.innerHTML='Copied ✓';setTimeout(()=>btn.innerHTML=old,1200)}catch{btn.innerHTML='Copy failed';}
  }));
}
setupPayments();
