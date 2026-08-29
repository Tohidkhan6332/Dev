function order(product){
  const subject = encodeURIComponent(`Order request — ${product}`);
  const body = encodeURIComponent(`Hi Tohid, I want to order: ${product}\n\nPlease share price, payment details and delivery information.`);
  window.location.href = `mailto:?subject=${subject}&body=${body}`;
}
