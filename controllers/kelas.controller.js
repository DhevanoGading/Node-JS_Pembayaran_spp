'use strict'

const db = require('../db')

module.exports = {
    addKelas: (req, res) => {
        let { kelas, jurusan, angkatan } = req.body
        if(!kelas, !jurusan || !angkatan){
            res.status(402).json({
                message: 'kelas, jurusan and angkatan cannot be empty'
            })
        }else{
            return db.query(`INSERT INTO kelas (nama_kelas, jurusan, angkatan) VALUES ('${kelas}','${jurusan}','${angkatan}')`, (err,result) => {
                if(err){
                    return res.status(500).json({err})
                }else{
                    return res.json({
                        message: "add classroom success",
                        data: result
                    })
                }
            })
        }
    },
    dataKelas: (req, res) => {
        db.query(`SELECT * FROM kelas`, (err,result) => {
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
    idKelas: (req, res) => {
        let id = req.params.id
        db.query(`SELECT * FROM kelas WHERE id_kelas = '${id}'`, (err,result) => {
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
    updateKelas: (req, res) => {
        const id = req.params.id
        const { kelas, jurusan, angkatan } = req.body
        
        if(!id, !kelas, !jurusan || !angkatan){
            res.status(402).json({
                message: 'id, kelas, and jurusan cannot be empty'
            })
        }else{
            return db.query(`UPDATE kelas SET nama_kelas = '${kelas}', jurusan = '${jurusan}', angkatan = '${angkatan}' WHERE id_kelas = '${id}'`, (err,result) => {
                if(err){
                    return res.status(500).json({err})
                }else{
                    return res.json({
                        message: "update class success",
                        data: result
                    })
                }
            })
        }
    },
    deleteKelas: (req, res) => {
        let id = req.params.id;

        let dataDeleted;

        if(id){
            db.query(`SELECT * FROM kelas WHERE id_kelas = ?`, id, (err,result) => {
                if(err){
                    throw err
                }else{
                    dataDeleted = result
                }
            })
        }
        if(id){
            db.query(`DELETE FROM kelas WHERE id_kelas = ?`, id, (err,result) => {
                if(err){
                    throw err
                }else{
                    res.json({
                        message: `Successfully delete kelas ID = ${id}`,
                        deleted: dataDeleted
                    })
                }
            })
        }
    }
}