const {sql, dbConnection} = require('../database/db');


const SAVE_NEW_USER = 'IF NOT EXISTS(SELECT * FROM stoxUser WHERE email = @email) BEGIN INSERT INTO stoxUser (username,email) VALUES (@username,@email) END SELECT * FROM stoxUser ORDER BY username ASC for json path;';

const UPDATE_USER = 'BEGIN UPDATE stoxUser SET firstName = @fname, lastName = @lName, phone = @phone WHERE email = @email END SELECT * FROM stoxUser WHERE email = @email for json path;';

const GET_USERS = 'SELECT * FROM stoxUser ORDER BY username ASC for json path;';

const GET_SINGLE_USER = 'SELECT * FROM stoxUser WHERE email = @email for json path;';



let getUsers = async () => {

    let users;

    try{
        const pool = await dbConnection
        const result = await pool.request()
        .query(GET_USERS);

        
        users = result.recordset[0];
        

    }catch (err){
        console.log('DB Error = Delete product: ' + err.message);
    } 

    return users;

}



let getSingleUser = async (email) => {

    let user;

    try{
        const pool = await dbConnection
        const result = await pool.request()
        .input('email', sql.NVarChar, email)
        .query(GET_SINGLE_USER);

        
        user = result.recordset[0];
        

    }catch (err){
        console.log('DB Error = Delete product: ' + err.message);
    } 

       return user;
    

}


let updateUser = async (user) => {

    let updatedUser;
    // console.log(`this is the new user`, user);

    try{
        const pool = await dbConnection
        const result = await pool.request()
        .input('fName', sql.NVarChar, user.firstName)
        .input('lName', sql.NVarChar, user.lastName)
        .input('phone', sql.NVarChar, user.phone)
        .input('email', sql.NVarChar, user.email)
        .query(UPDATE_USER)

        updatedUser = result.recordset[0];

    }catch(err){
        console.log('DB Error = save new user: ' + err.message);
    }

    // console.log(`this is the saved user`, updatedUser);
    return updatedUser;
}



let saveNewUser = async (user) => {

    let newUser;
    // console.log(`this is the new user`, user);

    try{
        const pool = await dbConnection
        const result = await pool.request()
        .input('username', sql.NVarChar, user.username)
        .input('email', sql.NVarChar, user.email)
        .query(SAVE_NEW_USER)

        newUser = result.recordset[0];

    }catch(err){
        console.log('DB Error = save new user: ' + err.message);
    }

    // console.log(`this is the saved user`, newUser);
    return newUser;
}




module.exports = {
    saveNewUser, getUsers, getSingleUser, updateUser
}