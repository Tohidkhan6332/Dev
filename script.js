const modal=document.getElementById('orderModal');
const productSelect=document.getElementById('product');
const GITHUB_USER='Tohidkhan6332';
const GITHUB_API=`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=6`;

function openOrder(product){modal.classList.add('show');modal.setAttribute('aria-hidden','false');if(product)productSelect.value=product;setTimeout(()=>document.getElementById('name').focus(),50)}
function closeOrder(){modal.classList.remove('show');modal.setAttribute('aria-hidden','true')}
modal.addEventListener('click',e=>{if(e.target===modal)closeOrder()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeOrder()});

document.getElementById('orderForm').addEventListener('submit',async e=>{e.preventDefault();const product=productSelect.value,name=document.getElementById('name').value.trim(),contact=document.getElementById('contactInput').value.trim(),req=document.getElementById('requirements').value.trim();const orderText=`Order request — ${product}\n\nName: ${name}\nContact: ${contact}\n\nRequirements:\n${req}\n\nPlease share final price, payment method and delivery details.`;try{await navigator.clipboard.writeText(orderText)}catch{}document.getElementById('sent').hidden=false;document.getElementById('sent').textContent='Order details copied. Contact Tohid through GitHub and send the copied request.';setTimeout(()=>window.open(`https://github.com/${GITHUB_USER}`,'_blank','noopener,noreferrer'),500)});

async function loadGitHubProjects(){const grid=document.querySelector('.project-grid');if(!grid)return;try{const res=await fetch(GITHUB_API,{headers:{Accept:'application/vnd.github+json'}});if(!res.ok)throw new Error('GitHub API unavailable');const repos=await res.json();const featured=repos.filter(r=>!r.fork).slice(0,4);if(!featured.length)return;grid.innerHTML=featured.map(r=>{const lang=r.language||'CODE';const desc=r.description||'Open-source project by Tohid Developer.';return `<article><span>${escapeHtml(lang.toUpperCase())}</span><h3>${escapeHtml(r.name)}</h3><p>${escapeHtml(desc)}</p><a href="${r.html_url}" target="_blank" rel="noreferrer">GitHub ↗</a></article>`}).join('')}catch(err){console.info('GitHub projects kept as fallback:',err.message)}}
function escapeHtml(value){return String(value).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
loadGitHubProjects();

// Payment details supplied by the owner.
const PAYMENT_UPI='7849917350.wallet@phonepe';
const PAYMENT_BINANCE='1123760641';
const PAYMENT_QR_DATA='upi://pay?pa=7849917350.wallet@phonepe&pn=Mr%20Tohid&mc=0000&mode=02&purpose=00';

function setupPayments(){
 const payment=document.querySelector('.payment');if(!payment)return;
 payment.innerHTML=`<div class="payment-main"><strong>Accepted payments</strong><span>UPI</span><span>Binance</span><div class="payment-details"><button type="button" class="copy-pay" data-copy="${PAYMENT_UPI}">UPI: <b>${PAYMENT_UPI}</b> <small>Copy</small></button><button type="button" class="copy-pay" data-copy="${PAYMENT_BINANCE}">Binance ID: <b>${PAYMENT_BINANCE}</b> <small>Copy</small></button></div></div><div class="payment-qr"><div id="upiQr"></div><small>Scan with any supported UPI app</small></div>`;
 const style=document.createElement('style');style.textContent=`.payment{align-items:center}.payment-main{flex:1}.payment-details{display:flex;flex-direction:column;gap:8px;margin-top:14px}.copy-pay{border:1px solid #ffffff12;background:#070a0f;color:#b7becb;border-radius:7px;padding:9px 11px;text-align:left;cursor:pointer;font-size:11px}.copy-pay b{color:#fff;font-weight:600}.copy-pay small{color:#8179ff;margin-left:7px}.copy-pay:hover{border-color:#746cff}.payment-qr{display:flex;flex-direction:column;align-items:center;gap:7px}.payment-qr #upiQr{width:190px;height:190px;background:#fff;padding:8px;border-radius:10px}.payment-qr small{font-size:10px;color:#6f7787}@media(max-width:800px){.payment-qr{margin-top:20px}.payment-qr #upiQr{width:170px;height:170px}}`;document.head.appendChild(style);
 document.querySelectorAll('.copy-pay').forEach(btn=>btn.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(btn.dataset.copy);const old=btn.innerHTML;btn.innerHTML='Copied ✓';setTimeout(()=>btn.innerHTML=old,1200)}catch{}}));
 loadQrLibrary();
}
function loadQrLibrary(){if(window.QRCode){renderQr();return}const s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';s.onload=renderQr;s.onerror=()=>{const box=document.getElementById('upiQr');if(box)box.innerHTML='<small>QR unavailable — use the UPI ID above.</small>'};document.head.appendChild(s)}
function renderQr(){const box=document.getElementById('upiQr');if(!box)return;box.innerHTML='';new QRCode(box,{text:PAYMENT_QR_DATA,width:174,height:174,colorDark:'#111',colorLight:'#fff',correctLevel:QRCode.CorrectLevel.M})}
setupPayments();
