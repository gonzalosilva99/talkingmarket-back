import { orderDao } from '../dao/order.dao.js';
import { UserDao } from '../dao/user.dao.js';

export var orderController = { 
    getOrdersOfLoggedUser: getOrdersOfLoggedUser,
    createOrderForUser: createOrderForUser
}

async function getOrdersOfLoggedUser(req,res){
    try{
        const user_email = req.user; 
        let user = await UserDao.findByEmail(user_email.email);
        orderDao.getOrdersFromUser(user).
            then((data) => {
                res.send(data);
            })
            .catch((error) => {
                res.send(error);
            });
    }catch(err){
        console.log(err);
    };
    //get orders of user 
    //return orders
}

async function createOrderForUser(req,res){
    try{
        const user_email = req.user; 
        let user = await UserDao.findByEmail(user_email.email);
        let order = req.body; 
        orderDao.createOrderForUser(user,order).
            then((order) => {
                res.send(order);
            })
            .catch((error) => {
                res.status(500).send(error);
            });
    }catch(err){
        console.log(err);
    };
}
