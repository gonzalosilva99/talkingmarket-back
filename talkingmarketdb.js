import { Sequelize } from "sequelize";
import dotenv from 'dotenv';


dotenv.config();
const isProduction = process.env.NODE_ENV === "production";
let connectionString = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;
if(isProduction){ 
    connectionString = process.env.DATABASE_URL;
}
export const db = new Sequelize(connectionString, {
    host: process.env.PG_HOST,
    dialect: 'postgres',

    pool: {
        max:5,
        min:0,
        acquire: 30000,
        idle: 10000,
        ssl: {
            rejectUnauthorized: false,
        },
    }
});