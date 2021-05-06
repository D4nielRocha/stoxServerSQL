const {sql, dbConnection} = require('../database/db');

const GET_STOX = "SELECT * FROM stox for json path;";

const GET_SAVED_STOXS = `SELECT * FROM stox WHERE author = @author ORDER BY _id ASC for json path;`;

const GET_STOX_BY_ID = `SELECT * FROM stox WHERE author = @author AND _date = @date ORDER BY _date for json path ;`;

const INSERT_NEW_STOX = 'INSERT INTO stox (asset1_name,asset1_invested,asset1_amount,asset1_price,asset1_shares,asset1_closing,asset2_name,asset2_invested,asset2_amount,asset2_price,asset2_shares,asset2_closing,comment,_date,author) VALUES (@name1,@invested1,@amount1,@price1,@shares1,@closing1,@name2,@invested2,@amount2,@price2,@shares2,@closing2,@comment,@date,@author); SELECT * FROM stox WHERE _id = SCOPE_IDENTITY()';


let getAllStox = async () => {

    let stox;

    try{
        const pool = await dbConnection;
        const result = await pool.request()
        .query(GET_STOX)

        stox = result.recordset[0];


    }catch(err){
        console.log('DB Error = getAllStox Repository : ' + err.message);
    }

    return stox;

}




let getStox = async (authorId) => {

    let author;

    try{
        const pool = await dbConnection;
        const result = await pool.request()
        .input('author', authorId)
        .query(GET_SAVED_STOXS);

        author = result.recordset[0];
    }catch(err){
        console.log('DB Error = get Stox : ' + err.message);
    }

    return author;

}


let getStoxByDate = async (authorId, date) => {

    let author;

    try{
        const pool = await dbConnection;
        const result = await pool.request()
        .input('author', authorId)
        .input('date', sql.Date, date)
        .query(GET_STOX_BY_ID);

        author = result.recordset[0];

    }catch(err){
        console.log('DB Error = get Stox : ' + err.message);
    }

    return author;

}


let createNewFaceoff = async (stox) => {
//     console.log(`This is the stox at the repository`);
    // console.log(stox);
    
    let newStox;

    try{
        const pool = await dbConnection
        const result = await pool.request()
        .input('name1', sql.NVarChar, stox.asset1_name)
        .input('invested1', sql.Bit, stox.asset1_invested)
        .input('amount1', sql.Decimal(18,2), stox.asset1_amount)
        .input('price1', sql.Decimal(18,2), stox.asset1_price)
        .input('shares1', sql.Decimal(18,2), stox.asset1_shares)
        .input('closing1', sql.Decimal(18,2), stox.asset1_closing)
        .input('name2', sql.NVarChar, stox.asset2_name)
        .input('invested2', sql.Bit, stox.asset2_invested)
        .input('amount2', sql.Decimal(18,2), stox.asset2_amount)
        .input('price2', sql.Decimal(18,2), stox.asset2_price)
        .input('shares2', sql.Decimal(18,2), stox.asset2_shares)
        .input('closing2', sql.Decimal(18,2), stox.asset2_closing)
        .input('comment', sql.NVarChar, stox.comment)
        .input('date', sql.Date, stox._date)
        .input('author', sql.VarChar, stox.author)
        .query(INSERT_NEW_STOX)

        newStox = result.rowsAffected[0];
        // console.log(result.rowsAffected[0]);

    } catch (err){
        console.log('DB Error = Create new product: ' + err.message);

    } 

    return newStox;

};

module.exports = {
    getStox,getStoxByDate,createNewFaceoff,getAllStox
};

