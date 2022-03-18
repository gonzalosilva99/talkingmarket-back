import { productDao } from '../dao/product.dao.js';

export var productController = { 
    addProduct: addProduct, 
    findProducts: findProducts,
    findProductById: findProductById,
    updateProduct: updateProduct,
    deleteById: deleteById
}

function addProduct(req,res){
    let prod = req.body; 
    productDao.create(prod).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function findProductById(req,res){
    productDao.findById(res.params.id).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}


function deleteById(req,res){
    productDao.deleteById(res.params.id).
        then((data) => {
            res.status(200).json({
                message: "Product deleted succsesfully",
                product: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}


function updateProduct(req,res){
    productDao.updateProduct(req.body, res.params.id).
        then((data) => {
            res.status(200).json({
                message: "Product updated succsesfully",
                product: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}


function findProducts(req,res){
    productDao.findAll().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}