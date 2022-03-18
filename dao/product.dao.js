import { Product } from '../models/product.js';

export var productDao = {
    findAll: findAll,
    create: create,
    findById: findById,
    deleteById: deleteById,
    updateProduct: updateProduct
}

function findAll() {
    return Product.findAll();
}

function findById(id) {
    return Product.findByPk(id);
}

function deleteById(id) {
    return Product.destroy({ where: { id: id } });
}

function create(product) {
    var newProduct = new Product(product);
    return newProduct.save();
}

function updateProduct(prod, id) {
    var updateProduct = {
        name: prod.title,
        description: prod.description,
        image: prod.image,
        price: prod.price,
        cost: prod.cost,
        stock: prod.stock
    };
    return Product.update(updateProduct, { where: { id: id } });
}