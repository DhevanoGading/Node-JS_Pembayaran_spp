'use strict'

const db = require('../db')

module.exports = {
    addSpp: (req, res) => {
        let { angkatan, tahun, nominal } = req.body

        if(!angkatan, !tahun || !nominal){
            res.status(402).json({
                message: 'angkatan, tahun and nominal cannot be empty'
            })
        }else{
            return db.query(`INSERT INTO spp SET ?`, {angkatan, tahun, nominal}, (err,result) => {
                if(err){
                    return res.status(500).json({err})
                }else{
                    return res.json({
                        message: "add spp success",
                        data: result
                    })
                }
            })
        }
    },
    dataSpp: (req, res) => {
        db.query(`SELECT * FROM spp`, (err,result) => {
            if(err){
                throw err
            }else{
                res.json({
                    message: "get spp success",
                    result
                })
            }
        })
    },
    idSpp: (req, res) => {
        let id = req.params.id
        db.query(`SELECT * FROM spp WHERE id_spp = '${id}'`, (err,result) => {
            if(err){
                throw err
            }else{
                res.json({
                    message: "get spp success",
                    result
                })
            }
        })
    },
    updateSpp: (req, res) => {
        const id = req.params.id
        const { angkatan, tahun, nominal } = req.body
        
        if(!angkatan, !tahun || !nominal){
            res.status(402).json({
                message: 'angkatan, tahun and nominal cannot be empty'
            })
        }else{
            return db.query(`UPDATE spp SET ? WHERE id_spp = '${id}'`, {angkatan, tahun, nominal}, (err,result) => {
                if(err){
                    return res.status(500).json({err})
                }else{
                    return res.json({
                        message: "update spp success",
                        data: result
                    })
                }
            })
        }
    },
    deleteSpp: (req, res) => {
        let id = req.params.id

        let dataDeleted;

        if(id){
            db.query(`SELECT * FROM spp WHERE id_spp = ?`, id, (err,result) => {
                if(err){
                    throw err
                }else{
                    dataDeleted = result
                }
            })
        }
        if(id){
            db.query(`DELETE FROM spp WHERE id_spp = ?`, id, (err,result) => {
                if(err){
                    throw err
                }else{
                    res.json({
                        message: `Successfully delete spp id = ${id}`,
                        deleted: dataDeleted
                    })
                }
            })
        }
    }
}