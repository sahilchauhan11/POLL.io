import jwt from 'jsonwebtoken';

export function isAuthenticated(req,res,next){
    try{
        const token=req.cookies.token;
      
        if(!token){
            
            return res.status(401).json({message:"No token found"});
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({message:"Invalid token"});
        }
        req.id=decoded.userId;
        next();
    }

    catch(err){
    return res.status(500).json({message:"Internal server error"});
}                   
}
