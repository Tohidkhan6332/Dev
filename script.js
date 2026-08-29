const modal=document.getElementById('orderModal');
const productSelect=document.getElementById('product');
const GITHUB_USER='Tohidkhan6332';
const GITHUB_API=`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=6`;

function openOrder(product){
  modal.classList.add('show'); modal.setAttribute('aria-hidden','false');
  if(product) productSelect.value=product;
  setTimeout(()=>document.getElementById('name').focus(),50);
}
function closeOrder(){modal.classList.remove('show');modal.setAttribute('aria-hidden','true')}
modal.addEventListener('click',e=>{if(e.target===modal)closeOrder()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeOrder()});

document.getElementById('orderForm').addEventListener('submit',async e=>{
  e.preventDefault();
  const product=productSelect.value,name=document.getElementById('name').value.trim(),contact=document.getElementById('contactInput').value.trim(),req=document.getElementById('requirements').value.trim();
  const orderText=`Order request — ${product}\n\nName: ${name}\nContact: ${contact}\n\nRequirements:\n${req}\n\nPlease share final price, payment method and delivery details.`;
  try{await navigator.clipboard.writeText(orderText)}catch{}
  document.getElementById('sent').hidden=false;
  document.getElementById('sent').textContent='Order details copied. Contact Tohid through GitHub and send the copied request.';
  setTimeout(()=>window.open(`https://github.com/${GITHUB_USER}`,'_blank','noopener,noreferrer'),500);
});

async function loadGitHubProjects(){
  const grid=document.querySelector('.project-grid');
  if(!grid)return;
  try{
    const res=await fetch(GITHUB_API,{headers:{Accept:'application/vnd.github+json'}});
    if(!res.ok)throw new Error('GitHub API unavailable');
    const repos=await res.json();
    const featured=repos.filter(r=>!r.fork).slice(0,4);
    if(!featured.length)return;
    const cards=featured.map(r=>{
      const lang=r.language||'CODE';
      const desc=r.description||'Open-source project by Tohid Developer.';
      return `<article><span>${escapeHtml(lang.toUpperCase())}</span><h3>${escapeHtml(r.name)}</h3><p>${escapeHtml(desc)}</p><a href="${r.html_url}" target="_blank" rel="noreferrer">GitHub ↗</a></article>`;
    }).join('');
    grid.innerHTML=cards;
  }catch(err){console.info('GitHub projects kept as fallback:',err.message)}
}
function escapeHtml(value){return String(value).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
loadGitHubProjects();
