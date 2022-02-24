const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../db')

module.exports = {
    login: (req,res) => {
        const {username, password } = req.body
        if(!username || !password){
            res.status(402).json({
                message: 'username and password cannot be empty.'
            })
        }else{
            return db.query(`SELECT * FROM petugas WHERE username = ?`, username, (err,result) => {
                if(err){
                    return res.status(401).json({ err })
                }else{
                    const user = result[0]
                    if(typeof user === 'undefined'){
                        return res.status(401).json({
                            message: 'user not found'
                        })
                    }else if(!bcrypt.compareSync(password, user.password)){
                        return res.status(401).json({
                            message: 'username or password is not correct'
                        })
                    }else{
                        if(result[0].level === "Administrator"){
                            const secretAdmin = '@!@#$%^&*&^%$#@'
                            const token = jwt.sign({data:user}, secretAdmin)
                            return res.json({
                                message: 'Admin login success. Please use the token below to access other private endpoints',
                                token
                            })
                        }else if(result[0].level === "Petugas"){
                            const secretPetugas = '()*&^%$#@!*&^()'
                            const token = jwt.sign({data:user}, secretPetugas)
                            return res.json({
                                message: 'Petugas login success. Please use the token below to access other private endpoints',
                                token
                            })
                        }
                    }
                }
            })
        }
    }
}