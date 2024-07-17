const express = require('express')
const router = express.Router()
const { login, register, getUser } = require('../controllers/auth.controllers')
const { check } = require("express-validator")
const authMiddleware = require('../middleware/auth')

router.post('/register', [
    check('username', 'User name can not be empty').notEmpty(),
    check('password', 'Password must be at lease 4 symbols, max 10 symbols').isLength({min:4, max:10}),
], register)

router.post('/login', login)

router.get('/user',authMiddleware, getUser)

module.exports = router