const connection = require('../model/connection');
connection.connecting();

class StudentService {
    static findAll() {
        let connect = connection.getConnection();
        return new Promise((resolve, reject) => {
           connect.query('SELECT * FROM students JOIN scoretable ON students.id = scoretable.idStudent', (err, students) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(students);
                }
            }) 
        })
    }

    static save(student) {
        let connect = connection.getConnection();
        return new Promise((resolve, reject) => {
            connect.query(`INSERT INTO studentmanager.students(name, age, address, image) VALUES ('${student.name}', ${student.age}, '${student.address}', '${student.image}')`, (err, data) => {
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
            connect.query(`DELETE FROM studentmanager.students WHERE id = ${id}`, (err) => {
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
            connect.query(`SELECT * FROM students JOIN scoretable ON students.id = scoretable.idStudent WHERE product.id = ${id}`, (err, students) => {
                 if (err) {
                     reject(err);
                 }
                 else {
                     resolve(students);
                 }
             }) 
        })
    }

    static update(student, id) {
        let connect = connection.getConnection();
        return new Promise((resolve, reject) => {
            connect.query(`UPDATE studentmanager.students SET name = '${student.name}', price = ${student.price}, description = '${student.description}', idCategory = '${student.idCategory}' WHERE id = ${id}`, (err, students) => {
                 if (err) {
                     reject(err);
                 }
                 else {
                     resolve(students);
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

module.exports = StudentService;