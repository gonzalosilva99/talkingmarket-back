import { Sequelize } from "sequelize";
import { db } from '../talkingmarketdb.js';

export const UnitsProduct = db.define('UnitsProducts', {
    units: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
},
{
    freezeTableName: true,
});