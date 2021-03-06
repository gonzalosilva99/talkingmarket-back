import express from 'express';
import bodyParser from 'body-parser';
import usersRoutes from './routes/users.js';
import { db } from './talkingmarketdb.js';
import productRoutes from './routes/product.js';
import orderRoutes from './routes/order.js';
import dotenv from 'dotenv';
import {  Product } from './models/product.js';
import { User } from './models/user.js';
import { Order } from './models/order.js';
import { UnitsProduct } from './models/unitsproduct.js';

//Db connection and config
const app = express();

db.authenticate().then(()=> {
    console.log('Database connected...');
}).catch(err => {
    console.log('Error: ' + err);
})

app.use(bodyParser.json());

//Associations 
User.hasMany(Order);
Order.belongsToMany(Product, { through: UnitsProduct });

//Routes and config
dotenv.config();
app.use(function (req,res,next){
    const allowedOrigins = ['https://talking-market-front.herokuapp.com', 'http://localhost:4200'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Expose-Headers', 'Authorization');
    next();
})
app.use('/users',usersRoutes);
app.use('/products',productRoutes);
app.use('/orders',orderRoutes);

//await db.sync({ force: true });
console.log("All models were synchronized successfully.");

app.get('/', (req,res) => {res.send('Hello from homepage. ');});
app.listen(process.env.PORT || 5000);