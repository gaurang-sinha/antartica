const bl = require('./user.bl');
const Utility = require('../../modules/utility');

let db;
let responseData;
async function registerUser(req, res) {
    try {
        db = req.app.get('db');
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const email = req.body.email;
        const password = req.body.password;
        const organization_name = req.body.organization_name;
        const user_obj = {
            first_name,
            last_name,
            email,
            password,
            organization_name
        };
        await bl.registerUser(db.postgres, user_obj);
        responseData = Utility.handleResponse(200, "SUCCESS");
        responseData['meta']['data'] = {
            "error": null,
            "status": 'successful',
        };
        res.status(responseData.meta.code).json(responseData);
    } catch (err) {
        console.log(err);
        responseData = Utility.handleResponse(400, "Failed");
        responseData['meta']['data'] = {
            "status": "unsuccessful",
            "error": err.message,
        };
        res.status(responseData.meta.code).json(responseData);
    }
}

async function login(req, res) {
    try {
        db = req.app.get('db');
        const email = req.body.email;
        const password = req.body.password;
        const token = await bl.login(db.postgres, email, password);
        responseData = Utility.handleResponse(200, "SUCCESS");
        responseData['meta']['data'] = {
            "error": null,
            "status": 'successful',
            "token": token
        };
        res.status(responseData.meta.code).json(responseData);
    } catch (err) {
        console.log(err);
        responseData = Utility.handleResponse(400, "Failed");
        responseData['meta']['data'] = {
            "status": "unsuccessful",
            "error": err.message,
            "token": null
        };
        res.status(responseData.meta.code).json(responseData);
    }
}

async function getUser(req, res) {
    try {
        db = req.app.get('db');
        const emp_id = req.body.emp_id;
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const sort_order = req.body.sort_order;
        const page = req.body.page;
        const limit = req.body.limit;
        const data_obj = {
            emp_id,
            first_name,
            last_name,
            sort_order,
            page,
            limit
        };
        console.log(data_obj);
        const user_data = await bl.getUserData(db.postgres, data_obj);
        responseData = Utility.handleResponse(200, "SUCCESS");
        responseData['meta']['data'] = {
            "error": null,
            "user_data": user_data,
        };
        res.status(responseData.meta.code).json(responseData);
    } catch (err) {
        console.log(err);
        responseData = Utility.handleResponse(400, "Failed");
        responseData['meta']['data'] = {
            "error": err.message,
            "user_data": null
        };
        res.status(responseData.meta.code).json(responseData);
    }
}

module.exports = {
    registerUser,
    login,
    getUser
}