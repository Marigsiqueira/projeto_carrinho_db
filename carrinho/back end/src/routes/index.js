const express = require('express');

const login = require("../controllers/login")

const router = express.Router();

router
    
    //login
    .post('/cadastrar', login.Cadastrar)
    .post('/logar', login.Login)

module.exports = router
