module.exports ={
    api:{
        port: process.env.API_PORT || 3030,
    },
    jwt:{
        secreto:process.env.JWT_SECRET || 'allsecretallsecreto'
    }
}