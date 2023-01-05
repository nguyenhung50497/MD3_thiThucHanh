const connection = require('../model/connection');
connection.connecting();

class ScoreService {
    static getScore() {
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

module.exports = ScoreService;