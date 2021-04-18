const Utility = require('../modules/utility');

module.exports = class Employee {
    static async registerEmployeeDetails(database, obj) {
        const sql = `INSERT INTO employee(first_name, last_name, organization_name, email) VALUES ('${obj.first_name}', '${obj.last_name}', '${obj.organization_name}', '${obj.email}') ON CONFLICT (email) DO NOTHING RETURNING emp_id`;
        return database.query(sql);
    }
}