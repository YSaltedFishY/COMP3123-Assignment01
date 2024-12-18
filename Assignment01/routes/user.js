const express = require('express');
const router = express.Router();
const path = require('path');
const bcrypt = require('bcrypt');
const { User } = require('../models/Employee');

router.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'../views/user.html'));
});


router.get('/signup', (req,res) => {
    res.sendFile(path.join(__dirname, '../views/register.html'));
});

//Ask about bcrypt
router.post('/signup', async (req,res) => {
    const {username, password, email} = req.body;
     
    try{
        let dupUser = await User.findOne({username});
        let dupEmail = await User.findOne({email});
        //If is true
        if(dupUser){
            return res.status(400).json({message: 'Username has been taken'});
        }

        if(dupEmail){
            return res.status(400).json({message: 'Email has been taken'});
        }

        const hashPW = await bcrypt.hash(password,10);

        const newUser = new User({
            email, username, 
            password: hashPW,
            created_at: new Date(),
            updated_at: new Date()
        });

        await newUser.save();
        res.json({message: "User created successfully.",
            "user_id": newUser._id,
            "Email":`${email}`,
            "Password":`${password}`
        });
    } catch(e){
        console.error(e);
        res.status(500).json({error: 'Register failed'})
    }
});

router.get('/login', (req,res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'));
});

router.post('/login', async (req,res) => {
    const {username, password} = req.body;

    try{
        let loginUser = await User.findOne({username});
        //If is false = no user in database
        if(!loginUser){
            return res.status(400).json({message: 'Username does not exist'});
        }

        const decryptPW = await bcrypt.compare(password, loginUser.password)
        if(!decryptPW){
            return res.status(400).json({message: 'Invalid password'});
        }

        res.json({message:`${username} has login successfully`});
    }catch(e){
        console.error('Error:',e);
        res.status(500).json({message:'Server error'});
    }
});

router.get('/logout/:username', (req,res) => {
    const username = req.params.username;
    res.send(`<b>${username} has been logged out successfully</b>`);
});

router.get("/getAll", async(req,res)=>{
    const user = await User.find({}, "username email password");
    try{
        res.send(user)
    }catch(err){
        console.log("Error: " + err)
        res.status(500).send(err)
    }
});

module.exports = router;