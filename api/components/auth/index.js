const store= require('../../../store/dummy')
, ctrl=require('./controller');


module.exports=ctrl(store);

//ENTIDAD O CAPA DE SEGURIDAD PARA CUANDO SE PRODUCEN PROBLEMAS DE AUTHENTICATION 
//RUTAS PARA USUARIOS PLATZI NODEJS MOTANDO UN BACKEND