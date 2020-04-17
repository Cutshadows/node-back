const db={
    'user':[
        {id:1, name: 'Carlos', username:'johndoe'},
        {id:2, name: 'Andres', username:'johndoe'},
        {id:3, name: 'Maria', username:'johndoe'},
        {id:4, name: 'Cristobal', username:'johndoe', password:'12345'},
    ]
};

async function list(table){
    return db[table] || [];
}

async function get(table, id){
    let col= await list(table)
    return  col.filter(item=>item.id===id)[0] || null;
}
async function upsert(tabla, data){
    if(!db[tabla]){
        db[tabla]=[];
    }
    db[tabla].push(data);
    console.log(db)
}
function remove(tabla, id){
    return true;
    //return db[];
}

async function query(tabla, q){
    let col= await list(tabla)
    let keys=Object.keys(q);
    let key=keys[0];
    
    return  col.filter(item=>item[keys[0]]===q[key])[0] || null;
}

module.exports={
    list,
    get,
    upsert,
    remove,
    query,
}