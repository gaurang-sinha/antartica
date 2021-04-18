const Utility = require('../../modules/utility');

function getFinalQueryString(query_list) {
    let temp = [];
    let query = ' ';
    query_list.map((str) => {
        str = str.trim();
        if (str.length) {
            temp.push(str);
        }
    });
    console.log("temp", temp);
    if (temp.length) {
        query = temp.join(' and ');
        query = ` and ${query}`;
    } else {
        query = ' ';
    }
    return query;
}

function handleEmpId(obj, query_list) {
    let query = ` `;
    if(!!obj.emp_id) {
        query =  ` b.emp_id = ${obj.emp_id} `;
    }
    query_list.push(query);
}

function handleFirstName(obj, query_list) {
    let query = ` `;
    if(!!obj.first_name) {
        query =  ` b.first_name = '${obj.first_name}' `;
    }
    query_list.push(query);
}

function handleLastName(obj, query_list) {
    let query = ` `;
    if(!!obj.last_name) {
        query =  ` b.last_name = '${obj.last_name}' `;
    }
    query_list.push(query);
}

function getQuery(obj) {
    const query_list = [];
    handleEmpId(obj, query_list);
    handleFirstName(obj, query_list);
    handleLastName(obj, query_list);
    const query = getFinalQueryString(query_list);
    console.log('query', query);
    return query;
}

function getSortOrder(obj) {
    let sort_order_query = ' ';
    let order_list = [];
    if(!!obj.sort_order) {
        const sort_order = obj.sort_order;
        if(sort_order.length) {
            for(let i = 0; i< sort_order.length; i++) {
                const column = sort_order[i]['sort_by'];
                const order = sort_order[i]['order'];
                order_list.push(` b.${column} ${order} `);
            }
            sort_order_query = `order by  ${order_list.join(', ')}`;
            console.log(sort_order_query);
        }
    }
    return sort_order_query;
}

module.exports = {
    getQuery,
    getSortOrder
}