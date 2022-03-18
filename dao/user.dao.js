import { User } from '../models/user.js';

export var UserDao = {
    create: create,
    findById: findById,
    findByEmail: findByEmail
}

function findById(id){
    return User.findByPk(id);
}

async function findByEmail(email){
    return await User.findOne({ where: {email: email}});
}

function create(user){
    var newUser = new User(user);
    return newUser.save();
}

