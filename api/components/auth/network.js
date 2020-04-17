const express = require('express');

const response = require('../../../network/response');
//const Controller=require('./controller');
const Controller=require('./index');

const router=express.Router();





//separar rutas de funciones
//Routes
router.post('/login', login)

function login(req, res){
    //res.send('todo funciona');
    //const lista=Controller.list()
    Controller.login(req.body.username, req.body.password)
    .then((token)=>{
        response.success(req, res, token, 200);
    }).catch((err)=>{
        response.error(req, res, err.message, 500);
    });
}

module.exports=router;