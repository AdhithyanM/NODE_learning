// Imports for File Storage
const fs = require('fs');
const path = require('path');

// In memory Storage
//const products = [];

// File Storage
const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);
const getProductsFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            return cb([]);
        }
        return cb(JSON.parse(fileContent));
    });
}
/**
 * We can define our model in whichever way we want.
 */

// 1. simply export a constructor function here so as a function which I name product
//    you call that to create new objects based on that, using an ES5
// module.exports = function Product() { }

// 2. If you are using next gen javascript, you can use class
module.exports = class Product {
    constructor(title) {
        // create properties in this class and this will be stored in objects created for this model.
        this.title = title;
    }

    save() {
        // Inmemory Storage
        // products.push(this);
        

        // for big files use createReadStream method.
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    // static fetchAll() {
    //     return products;
    // }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }
}