'use strict'

const db = require('../db');
let moment = require('moment');

module.exports = {
    addPembayaran: (req, res) => {
        var id_petugas = req.body.id_petugas
        var nisn = req.body.nisn
        let now = moment().format();

        db.query(`SELECT * FROM kelas JOIN siswa ON siswa.id_kelas = kelas.id_kelas WHERE nisn = '${nisn}'`, (err, result) => {
            if (err) {
                throw err
            } else {
                var angkatan = result[0].angkatan
                db.query(`SELECT * FROM spp WHERE angkatan='${angkatan}'`, (err, hasil) => {
                    if (err) {
                        throw err
                    } else {
                        var idspp = hasil[0].id_spp
                        db.query(`SELECT * FROM pembayaran WHERE nisn = '${nisn}' ORDER BY tahun_spp DESC, bulan_spp DESC`, (err, results) => {
                            if (err) {
                                throw err
                            } else {
                                var bulan_spp = req.body.bulan
                                var tahun_spp = req.body.tahun
                                if (bulan_spp && tahun_spp) {
                                    var sql = `INSERT INTO pembayaran (id_petugas, nisn, id_spp, tgl_bayar, bulan_spp, tahun_spp ) VALUES ('${id_petugas}','${nisn}','${idspp}','${now}','${bulan_spp}','${tahun_spp}')`
                                    db.query(sql, (err, hsl) => {
                                        if (err) throw err
                                        res.json({
                                            message: "Berhasil menambahkan data pembayaran spp",
                                            bulanspp: bulan_spp
                                        })
                                    })
                                } else {
                                    var bulanSpp = results[0].bulan_spp;
                                    var tahunSpp = results[0].tahun_spp;
                                    var bulanspp = 1;
                                    if (bulanSpp < 12) {
                                        bulanspp = bulanSpp + 1;
                                    }
                                    if (bulanSpp >= 12) {
                                        tahunSpp = tahunSpp + 1;
                                    }
                                    var qry = `INSERT INTO pembayaran (id_petugas, nisn, id_spp, tgl_bayar, bulan_spp, tahun_spp) VALUES ('${id_petugas}','${nisn}','${idspp}','${now}','${bulanspp}','${tahunSpp}')`
                                    db.query(qry, (err, hsl) => {
                                        if (err) throw err
                                        res.json({
                                            message: "Berhasil menambahkan data pembayaran spp",
                                            bulan_spp: bulanspp

                                        })
                                    })
                                }
                            }
                        })
                    }
                })
            }
        })
    },
    deletePembayaran: (req, res) => {
        const id = req.params.id
        db.query(`DELETE FROM pembayaran WHERE id_pembayaran = '${id}'`, (err, results) => {
            if (null, err) throw (err)
            res.json({
                message: "Berhasil Hapus Data",
                data: results
            })
        })
    },
    dataPembayaran: (req, res) => {
        db.query(`SELECT * FROM pembayaran`, (err, results) => {
            if (err) throw (err)
            res.json({
                message: "Berhasil Menampilkan Semua Data",
                data: results
            })
        })
    },
    idPembayaran: (req, res) => {
        const id = req.params.id
        db.query(`SELECT * FROM pembayaran WHERE id_pembayaran = '${id}'`, (err, results) => {
            if (null, err) throw (err)
            res.json({
                message: "Berhasil Menampilkan Data",
                data: results
            })
        })
    },
    nisnPembayaran: (req, res) => {
        const nisn = req.params.nisn
        db.query(`SELECT * FROM pembayaran WHERE nisn = '${nisn}'`, (err, results) => {
            if (null, err) throw (err)
            res.json({
                message: "Berhasil Menampilkan Data",
                data: results
            })
        })
    }
}