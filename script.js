const modal=document.getElementById('orderModal');
const productSelect=document.getElementById('product');
function openOrder(product){
  modal.classList.add('show'); modal.setAttribute('aria-hidden','false');
  if(product) productSelect.value=product;
  setTimeout(()=>document.getElementById('name').focus(),50);
}
function closeOrder(){modal.classList.remove('show');modal.setAttribute('aria-hidden','true')}
modal.addEventListener('click',e=>{if(e.target===modal)closeOrder()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeOrder()});
document.getElementById('orderForm').addEventListener('submit',e=>{
  e.preventDefault();
  const product=productSelect.value,name=document.getElementById('name').value.trim(),contact=document.getElementById('contactInput').value.trim(),req=document.getElementById('requirements').value.trim();
  const subject=encodeURIComponent(`Order request — ${product}`);
  const body=encodeURIComponent(`Hi Tohid,\n\nProduct / Service: ${product}\nName: ${name}\nContact: ${contact}\n\nRequirements:\n${req}\n\nPlease share final price, payment method and delivery details.`);
  document.getElementById('sent').hidden=false;
  window.location.href=`mailto:?subject=${subject}&body=${body}`;
});
