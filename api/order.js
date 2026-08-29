export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).json({error:'Method not allowed'});
  const {product,name,contact,requirements}=req.body||{};
  if(!product||!name||!contact) return res.status(400).json({error:'Missing required fields'});
  const orderId='TD-'+Date.now().toString().slice(-8);
  // V4 foundation: orders are intentionally not marked paid here.
  // Connect a real payment provider/webhook before enabling automatic delivery.
  return res.status(201).json({orderId,status:'pending_payment',product});
}
