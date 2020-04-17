const jwt=require('jsonwebtoken');
const config=require('../config/config');
const error=require('../utils/error');


const secret = config.jwt.secreto;

function sign(data){
   return jwt.sign(data, secret);
}

function verify(token){
    return jwt.verify(token, secret);
}
const check={
    own: function(req, owner){
        const decoded=decodeHeader(req);
        console.log(decoded);

        // COMPROBAR SI ES O NO PROPIETARIO
        if(decoded.id !== owner){
            throw error('No se puede hacer esto', 400)
            //throw new Error('No se puede hacer esto')
        }
    },  

}

function getToken(auth){
    //Bearrer tokenasdasdasdasdasd
    if(!auth){
        throw new Error('No viene token');
    }
    if(auth.indexOf('Bearer ')===-1){
        throw new Error('Formato invalido');
    }
    let token = auth.replace('Bearer ', '');
    return token;
}

function decodeHeader(req){
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token)

    req.user=decoded;
    return decoded;
}
module.exports={
    sign,
    check,
};