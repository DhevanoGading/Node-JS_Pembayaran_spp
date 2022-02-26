'use strict'

const bcrypt = require('bcrypt')
const db = require('../db')

function hashPassword(password){
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

module.exports = {
    addSiswa: (req, res) => {
        let { nisn, nis, nama, id_kelas, alamat, no_telp, username, password } = req.body
        let level = 'Siswa';
        if(!nisn, !nis, !nama, !id_kelas, !alamat, !no_telp, !username, !password || !level){
            res.status(402).json({
                message: 'data siswa cannot be empty'
            })
        }else{
            return db.query(`INSERT INTO siswa SET ?`, {nisn, nis, nama, id_kelas, alamat, no_telp, username, password:hashPassword(password), level}, (err,result) => {
                if(err){
                    return res.status(500).json({err})
                }else{
                    return res.json({
                        message: "add student success",
                        data: result
                    })
                }
            })
        }
    },
    dataSiswa: (req, res) => {
        db.query(`SELECT * FROM siswa`, (err,result) => {
            if(err){
                throw err
            }else{
                res.json({
                    message: "get students success",
                    result
                })
            }
        })
    },
    idSiswa: (req, res) => {
        let nisn = req.params.nisn
        db.query(`SELECT * FROM siswa WHERE nisn = '${nisn}'`, (err,result) => {
            if(err){
                throw err
            }else{
                res.json({
                    message: "get student success",
                    result
                })
            }
        })
    },
    updateSiswa: (req, res) => {
        const nisn = req.params.nisn
        const { nis, nama, id_kelas, alamat, no_telp, username, password } = req.body
        const level = 'Siswa'
        
        if(!nisn, !nis, !nama, !id_kelas, !alamat, !no_telp, !username, !password || !level){
            res.status(402).json({
                message: 'Data cannot be empty'
            })
        }else{
            return db.query(`UPDATE siswa SET ? WHERE nisn = '${nisn}'`, {nis, nama, id_kelas, alamat, no_telp, username, password:hashPassword(password), level}, (err,result) => {
                if(err){
                    return res.status(500).json({err})
                }else{
                    return res.json({
                        message: "update student success",
                        data: result
                    })
                }
            })
        }
    },
    deleteSiswa: (req, res) => {
        let nisn = req.params.nisn

        let dataDeleted;

        if(nisn){
            db.query(`SELECT * FROM siswa WHERE nisn = ?`, nisn, (err,result) => {
                if(err){
                    throw err
                }else{
                    dataDeleted = result
                }
            })
        }
        if(nisn){
            db.query(`DELETE FROM siswa WHERE nisn = ?`, nisn, (err,result) => {
                if(err){
                    throw err
                }else{
                    res.json({
                        message: `Successfully delete student nisn = ${nisn}`,
                        deleted: dataDeleted
                    })
                }
            })
        }
    }
}