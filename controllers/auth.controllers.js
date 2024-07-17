const User = require('../models/User')
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
const {secret} = require('../config')

const generateToken = (id)=>{
const payload =  {
    id: id
}
return jwt.sign(payload, secret,{expiresIn:'72h'})
}

const login = async (req, res, next) => {
  try {
const {username, password} = req.body
const user = await User.findOne({username})
   if(!user){
    return res.status(400).json({message: 'User not found'})
   } 
   const validPassword = await bcrypt.compare(password, user.password)
   if(!validPassword){
    return res.status(400).json({message: 'Incorrect password'})
   } 
   const token = generateToken(user._id)
   return res.json({token})
  } catch (error) {
    res.status(400).json({message: 'Login error'})
  }
};

const register = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({message: errors.errors[0].msg})
    }
    const {username, password} = req.body
    const isExist = await User.findOne({username})
   if(isExist){
    return res.status(400).json({message: 'User already exist'})
   }
   const hash = await bcrypt.hash(password, 7);
   const user = new User({username: username, password: hash})
   await user.save()
   return res.json({message:'User has been registered'})
  } catch (error) {
    res.status(400).json({message: 'Registration error'})
  }
};

const getUser = async (req, res, next) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
      res.status(400).json({message: 'User error'})
    }
  };

exports.login = login;
exports.register = register;
exports.getUser = getUser;