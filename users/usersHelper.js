const db = require('../data/dbConfig.js');


module.exports = {
    find,
    add, 
    findBy,
    findById
};

function find(){
    return db('users').select('id', 'username', 'password');
}

function findBy(filter){
    console.log(filter);
    return db('users').where(filter);
}

function add(user){
    return db ('users')
        .insert(user, 'id')
        .then(ids => {
            const [id] = ids;
            return findById(id);
        })
}

function findById(id){
    return db('users')
        .select('id', 'username')
        .where({ id })
        .first();
}




