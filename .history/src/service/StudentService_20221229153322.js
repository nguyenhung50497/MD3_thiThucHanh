const connection = require('../model/connection');
connection.connecting();

class ProductService {
    static findAll() {
        let connect = connection.getConnection();
        return new Promise((resolve, reject) => {
           connect.query('SELECT * FROM product JOIN category ON product.idCategory = category.id', (err, products) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(products);
                }
            }) 
        })
    }

    static save(student) {
        let connect = connection.getConnection();
        return new Promise((resolve, reject) => {
            connect.query(`INSERT INTO my_database1.product(name, price, description, image, idCategory) VALUES ('${student.name}', ${student.age}, '${student.description}', '${student.image}', '${+student.score}')`, (err, data) => {
                 if (err) {
                     reject(err);
                 }
                 else {
                     resolve(data);
                 }
             }) 
         })
    }

    static remove(id) {
        let connect = connection.getConnection();
        return new Promise((resolve, reject) => {
            connect.query(`DELETE FROM my_database1.product WHERE id = ${id}`, (err) => {
                 if (err) {
                     reject(err);
                 }
                 else {
                     resolve('Xoá thành công');
                 }
             }) 
         })
    }

    static findById(id) {
        let connect = connection.getConnection();
        return new Promise((resolve, reject) => {
            connect.query(`SELECT * FROM product JOIN category ON product.idCategory = category.id WHERE product.id = ${id}`, (err, products) => {
                 if (err) {
                     reject(err);
                 }
                 else {
                     resolve(products);
                 }
             }) 
        })
    }

    static update(product, id) {
        let connect = connection.getConnection();
        return new Promise((resolve, reject) => {
            connect.query(`UPDATE my_database1.product SET name = '${product.name}', price = ${product.price}, description = '${product.description}', idCategory = '${product.idCategory}' WHERE id = ${id}`, (err, products) => {
                 if (err) {
                     reject(err);
                 }
                 else {
                     resolve(products);
                 }
             }) 
        })
    }

    static findByNameContaining(name) {
        let connect = connection.getConnection();
        return new Promise((resolve, reject) => {
            connect.query(`SELECT * FROM my_database1.product WHERE name LIKE '%${name}%'`, (err, products) => {
                 if (err) {
                     reject(err);
                 }
                 else {
                     resolve(products);
                 }
             }) 
        })
    }

    static editImage(image, id) {
        let connect = connection.getConnection();
        return new Promise((resolve, reject) => {
            connect.query(`UPDATE my_database1.product SET image = '${image}' WHERE id = ${id}`,(err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }

}

module.exports = ProductService;