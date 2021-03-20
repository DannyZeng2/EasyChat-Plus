const dbConfig = require('../utils/db_config')
const uuid = require('uuid');

login = (req,res) => {
    let username = req.query.username
    let password = req.query.password
    let params = [username,password]
    let sql = 'select username,password from user where username=? and password=?'
    console.log(sql)
    dbConfig.getDBConnection(sql,params,(error, results, fields) => {
        console.log(results)
        if(error) {
            res.send({data:results,success:false,message:'登录失败！'})
        }else if(results.length === 0){
            res.send({data:results,success:false,message:'用户名或密码错误！'})
        }else {
            res.send({data:results,success:true,message:'登录成功!'})
        }
    })
}

register = (req,res) => {
    console.log(req)
    let username = req.query.username
    let password = req.query.password
    let phone = req.query.phone
    let register_time = new Date()
    let params = [uuid.v1().toString(),username,password,phone,register_time]
    console.log(params)
    let sql = 'insert into user(id,username,password,phone,register_time) VALUES(?,?,?,?,?)'
    dbConfig.getDBConnection(sql,params,(error, results, fields) => {
        if(error) {
            res.send({success:false,message:'注册失败！'})
        }else {
            res.send({success:true,message:'注册成功!'})
        }
    })
}

module.exports = {
    login,
    register
}
