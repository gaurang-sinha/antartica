# antartica

Install node
Install postgres

There are two tables used.
Employee - 	emp_id, first_name, last_name, organization_name, email, is_delete, created_at, updated_at
User - user_id, email, password, emp_id, is_active, is_delete, created_at, updated_at

Folder structure :-

config - this folder has has the config file and database connection file.
containers - this folder has all the files where database query are written for each of the file for the APIs.
middleware - this folder has the middleware files, here we have request authorization file that validates the request.
modules - this folder has all the files that are needed across the project. Here we have a utility file.
server - this folder has all the modules. Here we have a user module that has all the necessary files, here we have route file, controller file, filterHandling file.

This project has three APIs, all are post requests
1. registerUser - it takes all the data and registers the user. It makes one row in each of the table with email as the unique constraint. One account with one email.
2. login - It takes email and password as input and validates from the db if the two matches, if it does, it generates an access token and updates is_active column to true.
3. getUser - It takes all the inputs as filter for what kind of users want to be displayed. Multiple filters, multiple sort order as per requirment have been integrated.

How to run the project:-
1. clone this repo
2. create a db in postgres with the creds in the .env file (mailed)
3. run npm install
4. if step 3 gives an error manually create a node_modules folder and the run npm install.
5. start the server with nodemon index.js   
