const Employee = require('../../containers/emp');
const User = require('../../containers/user');
const Utility = require('../../modules/utility');
const filterHandling = require('./user.filterhandling');
const config = require('../../config/config');


async function registerUser(database, obj) {
    try {
        let emp_id = await Employee.registerEmployeeDetails(database, obj);
        emp_id = emp_id.rows[0]['emp_id'];
        obj['emp_id'] = emp_id;
        await User.registerUserDetails(database, obj);
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
}

async function login(database, email, password) {
    try {
        let access_token = null;
        let is_login = await User.getLoginStatus(database, email, password);
        if(is_login.rows.length) {
            const user_details = is_login.rows[0];
            access_token = Utility.generateAccessToken(user_details, config.auth_access_token, config.token_expiration_in_days);
            await User.updateUserActiveStatus(database, user_details.user_id);
        } else {
            throw new Error ("incorrect email or password");
        }
        return access_token;
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
}
function getFinalUserData(user_data) {
    const final_user_data = user_data.map((obj)=>{
        delete obj.password;
        return obj;
    });
    return final_user_data;
}

async function getUserData(database, obj) {
    try {
        let user_details = null;
        const query = filterHandling.getQuery(obj);
        const sort_order = filterHandling.getSortOrder(obj);
        const user_data = await User.getUserData(database, query, sort_order, obj.page, obj.limit);
        if(user_data.rows.length) {
            user_details = getFinalUserData(user_data.rows);
            return user_details;
        }
        return user_details;
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
}

module.exports = {
    registerUser,
    login,
    getUserData
}