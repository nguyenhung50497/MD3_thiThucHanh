const connection = require('../model/connection');
connection.connecting();

class ScoreService {
    static getCategory() {
        let connect = connection.getConnection();
        return new Promise((resolve, reject) => {
           connect.query('SELECT * FROM category', (err, scores) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(scores);
                }
            }) 
        });
    }


}

module.exports = CategoryService;