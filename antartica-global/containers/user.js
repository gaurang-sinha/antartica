const Utility = require('../modules/utility');

module.exports = class User {
    static async registerUserDetails(database, obj) {
        const sql = `INSERT INTO users(email, password, emp_id) VALUES ('${obj.email}', '${obj.password}', ${obj.emp_id})`;
        return database.query(sql);
    }
    static async getLoginStatus(database, email, password) {
        const sql = `Select a.*, b.* from users a join employee b on a.emp_id = b.emp_id where a.email = '${email}' and a.password = '${password}'`;
        return database.query(sql);
    }
    static async updateUserActiveStatus(database, user_id) {
        const sql = `UPDATE users SET is_active = true WHERE user_id = ${user_id}`;
        return database.query(sql);
    }
    static async getUserData(database, query, sort_order, page, limit) {
        const sql = `Select a.*, b.* from users a join employee b on a.emp_id = b.emp_id where a.is_delete = false and b.is_delete = false  ${query} ${sort_order} limit ${limit} OFFSET ${Utility.getOffset(page, limit)}`;
        console.log(sql)
        return database.query(sql);
    }
}