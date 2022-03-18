import { Sequelize } from "sequelize";
import { db } from '../talkingmarketdb.js';

export const User = db.define('user', {
    firstname: {
        type: Sequelize.STRING, 
        allowNull: false
    },
    lastname: {
        type: Sequelize.STRING, 
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING
    },
    birthday: {
        type: Sequelize.DATEONLY,
        allowNull: false 
    }, 
    password: {
         type: Sequelize.STRING 
    },
    token: {
         type: Sequelize.STRING
    }
},
{
    freezeTableName: true,
});