import { Sequelize } from "sequelize";
import { db } from '../talkingmarketdb.js';

export const Order = db.define('order', {
    description: {
        type: Sequelize.TEXT
    }
},
{
    freezeTableName: true,
});