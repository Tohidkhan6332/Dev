import { createClient } from '@supabase/supabase-js';
export default async function handler(req,res){
 if(req.method!=='POST') return res.status(405).json({error:'Method not allowed'});
 const {product,name,contact,requirements,paymentReference}=req.body||{};
 if(!product||!name||!contact) return res.status(400).json({error:'Missing required fields'});
 const url=process.env.SUPABASE_URL,key=process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!url||!key) return res.status(500).json({error:'Server storage is not configured'});
 const supabase=createClient(url,key,{auth:{persistSession:false}});
 const {data:p,error:pe}=await supabase.from('products').select('id,name,price,active').eq('name',product).eq('active',true).maybeSingle();
 if(pe||!p) return res.status(400).json({error:'Product not found'});
 const orderId='TD-'+Date.now().toString().slice(-8);
 const {data:o,error}=await supabase.from('orders').insert({order_id:orderId,product_id:p.id,customer_name:name,contact,requirements,status:'pending_payment',payment_reference:paymentReference||null}).select('order_id,status,product_id').single();
 if(error) return res.status(500).json({error:'Could not create order'});
 return res.status(201).json({orderId:o.order_id,status:o.status,product:p.name,price:p.price});
}
