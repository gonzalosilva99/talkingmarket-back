import { Sequelize } from "sequelize";

export const db = new Sequelize('tkngmrktdb', 'gonga','password', {
    host: 'localhost',
    dialect: 'postgres',

    pool: {
        max:5,
        min:0,
        acquire: 30000,
        idle: 10000
    }
});