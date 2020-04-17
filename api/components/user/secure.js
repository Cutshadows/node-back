const auth=require('../../../auth');

module.exports = function checkAuth(action){

    function middleware(req, res, next){
        switch(action){
            case 'update':
                const owner=req.body.id;
                auth.check.own(req, owner);
                next();
                break;
            default:
                next()
        }
    }
    return middleware;
}

//middleware para manejar quien esta modificando o el autor si tiene permisos 