require('dotenv').config()
async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const userSql = process.env.USER_SQL
    const passwordSql = process.env.PASSWORD_SQL
    const ipSql = process.env.IP_SQL
    const portSql = process.env.PORT_SQL
 
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection(`mysql://${userSql}:${passwordSql}@${ipSql}:${portSql}/chatsystem`);
    console.log("Conectou no MySQL!");
    global.connection = connection;
    return connection;
}

connect()

//----USERS-----
async function selectUser(user){
    const conn = await connect(); 
    try{
        const [rows] = await conn.query(`SELECT * FROM users WHERE user="${user}";`);
        const res = rows[0]
        return {status: true, res}
    }
    catch(err){
        return {status: false, res: err}
    }
}

async function insertUser(user){
    const conn = await connect();
    const sql = 'INSERT INTO users(user,password) VALUES (?,?);';
    const values = [user.user, user.password];
    try{
        return {status: true, res: await conn.query(sql, values)}
    }
    catch(err){
        return {status: false, res: err}
    }

}

module.exports = {selectUser, insertUser}