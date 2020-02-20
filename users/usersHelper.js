const db = require('../data/dbConfig.js');

const find = () => {
    return db('users').select('id', 'username');
}

const findBy = (filter) => {
    console.log(filter);
    return db('users')
        .select('id', 'username', 'password')
        .where(filter);
}

const add = (user) => {
    return db ('users')
        .insert(user, 'id')
        .then(ids => {
            const [id] = ids;
            return findById(id);
        })
}

const findById = (id) => {
    return db('users')
        .select('id', 'username')
        .where({ id })
        .first();
}


module.exports = {
    find,
    add, 
    findBy,
    findById
}

