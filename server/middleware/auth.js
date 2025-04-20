const jwt=require('jsonwebtoken');
exports.auth=(req,resp,next)=>{
    try{
        const token=req.header("Authorization")?.replace("Bearer ","");
        if(!token){
            return resp.status(400).json({
                success:false,
                message:"Token Missing"
            })    
        }
        try{
            const payload=jwt.verify(token,"Hello");
            req.user=payload;
        }
        catch(err){
            return resp.status(400).json({
                success:false,
                message:"Token Invalid"
            }) 
        }
        next();
    }
    catch(err){
        return resp.status(500).json({
            success:false,
            message:"Error in auth.js"+err.message
        })
    }
}