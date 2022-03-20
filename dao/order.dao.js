import { Db2QueryInterface } from 'sequelize/lib/dialects/db2/query-interface';
import { Order } from '../models/order.js';
import { Product } from '../models/product.js';
import { UnitsProduct } from '../models/unitsproduct.js';
import { db } from '../talkingmarketdb.js';

export var orderDao = {
    getOrdersFromUser: getOrdersFromUser,
    createOrderForUser: createOrderForUser,
    getDailyProfit: getDailyProfit
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

async function getDailyProfit(date){ 
    let orders = await Order.findAll({where: db.where(db.fn('date', db.col('order.createdAt')), '=', date), include: [{model: Product, through: {attributes: ['units']}}]});
    let daily_profit = [];
    let totalProfit = 0;
    if (orders){ 
        await Promise.all(orders.map( async order => {
            await Promise.all(order.products.map(async unitprod => {
                const product = await Product.findByPk(unitprod.id);
                const profit = unitprod.UnitsProducts.units * ( product.price - product.cost); 
                let index = daily_profit.findIndex(dp => dp.product.id === product.id); 
                if(index != -1){
                    daily_profit[index].profit= daily_profit[index].profit + profit;
                }
                else{ 
                    daily_profit.push({product: product, profit: profit});
                }
                totalProfit += profit;
            }));
        }));
    }
    daily_profit.push({total: totalProfit});
    return daily_profit;
}