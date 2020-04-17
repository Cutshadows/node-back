const express = require('express');

const secure= require('./secure');
const response = require('../../../network/response');
//const Controller=require('./controller');
const Controller=require('./index');

const router=express.Router();

//separar rutas de funciones
//Routes
router.get('/', list)
router.get('/:id', get)
router.post('/', upsert)
router.put('/', secure('update'), upsert)


//Internal Functions
function list(req, res){
    //res.send('todo funciona');
    //const lista=Controller.list()
    Controller.list()
    .then((lista)=>{
        response.success(req, res, lista, 200);
    }).catch((err)=>{
        response.error(req, res, err.message, 500);
    });
}
function get(req, res){
    //res.send('todo funciona');
    Controller.get(req.params.id).then((user)=>{
        response.success(req, res, user, 200);
    }).catch((err)=>{
        response.error(req, res, err.message, 500);
    });
}
function upsert(req, res){
    console.log(req.body)
    //res.send('todo funciona');
    //const lista=Controller.list()
    Controller.upsert(req.body)
    .then((user)=>{
        response.success(req, res, user, 200);
    }).catch((err)=>{
        response.error(req, res, err.message, 500);
    });
}

module.exports=router;