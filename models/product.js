import { Sequelize } from "sequelize";
import { db } from '../talkingmarketdb.js';

export const Product = db.define('product', {
    id: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING, 
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT
    },
    image: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    stock: {
        type: Sequelize.INTEGER,
        allowNull: false 
    },
    cost: {
        type: Sequelize.DOUBLE, 
        allowNull: false
    } 
},
{
    freezeTableName: true,
});