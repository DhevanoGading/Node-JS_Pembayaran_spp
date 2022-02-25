const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../db')

function hashPassword(password){
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

module.exports = {
    addPetugas: (req, res) => {
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
    dataPetugas: (req, res) => {
        db.query(`SELECT * FROM petugas`, (err,result) => {
            if(err){
                throw err
            }else{
                res.json({
                    message: "get success",
                    result
                })
            }
        })
    },
    idPetugas: (req, res) => {
        const id = req.params.id

        db.query(`SELECT * FROM petugas WHERE id_petugas = '${id}'`, (err,result) => {
            if(err){
                throw err
            }else{
                res.json({
                    message: "get success",
                    result
                })
            }
        })
    },
    updatePetugas: (req, res) => {
        const id = req.params.id
        const { username, password, namaPetugas } = req.body
        
        if(!id, !username, !password || !namaPetugas){
            res.status(402).json({
                message: 'id, namaPetugas, username, and password cannot be empty'
            })
        }else{
            return db.query(`UPDATE petugas SET username = '${username}', password = '${hashPassword(password)}', nama_petugas = '${namaPetugas}', level = 'Petugas' WHERE id_petugas = '${id}'`, (err,result) => {
                if(err){
                    return res.status(500).json({err})
                }else{
                    return res.json({
                        message: "update petugas success",
                        data: result
                    })
                }
            })
        }
    },
    deletePetugas: (req, res) => {
        let id = req.params.id;

        let dataDeleted;

        if(id){
            db.query(`SELECT * FROM petugas WHERE id_petugas = ?`, id, (err,result) => {
                if(err){
                    throw err
                }else{
                    dataDeleted = result
                }
            })
        }
        if(id){
            db.query(`DELETE FROM petugas WHERE id_petugas = ?`, id, (err,result) => {
                if(err){
                    throw err
                }else{
                    res.json({
                        message: `Successfully delete petugas ID = ${id}`,
                        deleted: dataDeleted
                    })
                }
            })
        }
    }
}