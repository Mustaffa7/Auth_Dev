const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
export{}
const {check, validationResult} = require("express-validator");

//GET API
router.get("/", (req:any,res:any) => res.send("User route"));

//POST api/users
router.post("/", 
[
    check('name', "Name is required").not().isEmpty(),
    check('email', "Valid email address is required").isEmail(),
    check('password', "Password must have at least 4 characters").isLength({
        min: 4,
}),
],
    async (req:any, res:any) => {

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array() });
        }


    const {name, email, password, contact, dob} = req.body;
    try{
        let user = await User.findOne({ email });
        if(user){
            return res.status(400).json({errors: [{msg: "user already exists" }] });
        }
        user = new User({
            name,
            email,
            password,
            contact,
            dob,
        });
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(password, salt);  
        await user.save();
        const payload = {
            user: {
                id: user.id,
            },
        };
        jwt.sign(payload, 
            config.get("jwtSecret"), 
            {expiresIn: 720000}, 
            (err:any, token:any) => {
                if(err) throw err;
                res.json({ token });
            }
        );
    }catch (error:any){
        console.log(error.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;