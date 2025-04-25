import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
    const {token} = req.cookies;
    if(!token){
        return res.json({success:false,message:"You are not authenticated"});
    }

    try {
        const tokenDecode = jwt.verify(token,process.env.JWT_SECRET);
        if(tokenDecode.id){
            req.user = { id: tokenDecode.id };
        }else{
            return res.json({success:false,message:"You are not authenticated"});
        }
        next();
        
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message});
    }
}

export default authUser;
