const bcrypt = require('bcrypt')
const { json } = require('express/lib/response')
const jwt = require('jsonwebtoken')
const db = require('../db')

const secret = '()*&^%$#@!*&^()'

function hashPassword(password){
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

module.exports = {
    signup: (req, res) => {
        const { username, password, namaPetugas } = req.body
        if(!username, !password || !namaPetugas){
            res.status(402).json({
                message: 'namaPetugas, username, dan password cannot be empty'
            })
        }else{
            return db.query(`INSERT INTO petugas (username, password, nama_petugas, level) VALUES ('${username}','${hashPassword(password)}','${namaPetugas}','Petugas')`, (err,result) => {
                if(err){
                    return res.status(500).json({err})
                }else{
                    return res.json({
                        message: "registration success",
                        data: result
                    })
                }
            })
        }
    },
    login: (req,res) => {
        const {username, password} = req.body
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
                        const token = jwt.sign({data:user}, secret)
                        return res.json({
                            message: 'login success. Please use the token below to access other private endpoints',
                            token
                        })
                    }
                }
            })
        }
    }
}