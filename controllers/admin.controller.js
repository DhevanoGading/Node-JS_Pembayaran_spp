const bcrypt = require('bcrypt')
const db = require('../db')

function hashPassword(password){
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

module.exports = {
    signup: (req, res) => {
        const { username, password, namaAdmin } = req.body
        if(!username, !password || !namaAdmin){
            res.status(402).json({
                message: 'namaPetugas, username, and password cannot be empty'
            })
        }else{
            return db.query(`INSERT INTO petugas (username, password, nama_petugas, level) VALUES ('${username}','${hashPassword(password)}','${namaAdmin}','Administrator')`, (err,result) => {
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
    }
}