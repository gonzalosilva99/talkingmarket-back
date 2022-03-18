import { Db2QueryInterface } from 'sequelize/lib/dialects/db2/query-interface';
import { Order } from '../models/order.js';
import { Product } from '../models/product.js';
import { UnitsProduct } from '../models/unitsproduct.js';
import { db } from '../talkingmarketdb.js';

export var orderDao = {
    getOrdersFromUser: getOrdersFromUser,
    createOrderForUser: createOrderForUser
}

async function getOrdersFromUser(user){
    return await Order.findAll({ where: {userId: user.id}, include: [{model: Product, through: {attributes: ['units']}}]});
}

async function createOrderForUser(user, order){
    return await db.transaction( async (transaction)=> {
        const neworder = new Order();
        neworder.userId = user.id;
        const neworderaux = await neworder.save();
        await Promise.all((order.map(async unitprod => {
            let product = await Product.findByPk(unitprod.product_id);
            if( !product)
                throw "The products must exist.";
            if (product.stock < unitprod.units)
                throw "There is not enough stock for  the order.";
            product.stock -= unitprod.units;
            await product.save();
            await neworderaux.addProduct(product, { through: { units: unitprod.units }});
        })));
        return await Order.findOne( {where: { id: neworderaux.id }, include: [{model: Product, through: {attributes: ['units']} }]});
    })
}