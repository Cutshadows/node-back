var express = require('express')
    , cors = require('cors')
    , bodyParser= require('body-parser')
    , mssql=require('mssql')
    , config = require('../config/config');
   const user=require('./components/user/network');
   const auth=require('./components/auth/network')
   , swagger=require('swagger-ui-express');
   const errors=require('../network/errors');

var app = express();
app.use(bodyParser.json());

const swaggerDocs = require('../swagger.json');


app.use('/api/user', user);
app.use('/api/auth', auth);

/* app.use('/api/fetch', (req, res)=>{
   fetch('http://metadata.buscalibre.com/api/novedades/proveedores?')
   .then((response) => {
     return response.json();
   })
   .then((myJson) => {
     console.log(myJson);
   });
})
 */


app.use('/api-docs', swagger.serve, swagger.setup(swaggerDocs));


//ROUTES

/* app.get('/', function (req, res) {
   res.send('Hello World');
})
 */


app.use(errors);

app.listen(
   config.api.port, ()=>{
      console.log("Example app listening at ",config.api.port);
})

   
   /* 8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
} */