export default async function handler(req,res){
  if(req.method!=='GET') return res.status(405).json({error:'Method not allowed'});
  // Secure delivery endpoint placeholder.
  // Product files must live in private storage and be served only after
  // server-side payment verification. No public file URL is exposed here.
  return res.status(501).json({error:'Digital delivery is not enabled until payment verification and private storage are configured.'});
}
