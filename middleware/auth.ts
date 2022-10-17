const jwt = require("jsonwebtoken")
const config = require("config")
export{}

module.exports = function(req:any, res:any, next:any){
    const token = req.header("x-auth-token");
if(!token){
    return res.status(401).json({msg: "Not authorized!"})
}
//validate token
try{
    const decoded = jwt.verify(token, config.get('jwtSecret'))
    req.user = decoded.user;
    next();
} catch(error){
    res.status(401).json({msg: "Invalid token"})
}
};