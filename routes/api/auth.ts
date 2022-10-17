const express = require("express");
const router = express.Router();
const auth =require("../../middleware/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
var User = require('../../models/User');
const {check, validationResult} = require("express-validator");

router.get("/", auth, async (req:any, res:any) => {
    try{
        const user =  await User.findById(req.user.id).select("-password");
        res.json(user);
    }catch(error:any){
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

router.post("/", [
    check("email", "Valid email address is required").isEmail(),
    check("password", "Password required").exists(),
],
async (req:any, res: any) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {email, password} = req.body;
    try{
        let user = await User.findOne({email:req.body.email});
        if(!user){
            return res
            .status(400)
            .json({errors: [{msg: "Invalid credentials"}] });
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res
            .status(400)
            .json({errors: [{msg: "Invalid credentials"}]});
        }
        const payload = {
            user: {
                id: user.id,
            },
        };
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            {expiresIn: 720000},
            (err:any, token:any) => {
                if(err) throw err;
                res.json({token})
            }
        )
    }catch(error:any){
        console.log(error.message);
        res.status(500).send("Server Error");
    }
    }
);
export{}
module.exports = router;