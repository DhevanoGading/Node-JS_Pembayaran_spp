'use strict'

const express = require('express')

const adminController = require('../controllers/admin.controller')
const petugasController = require('../controllers/petugas.controller')
const kelasController = require('../controllers/kelas.controller')
const router = new express.Router();

const {tokenAdmin} = require('../auth/tokenAdmin_validation');

//Register
router.post("/signup",tokenAdmin,adminController.signup)

//Data Petugas
router.get("/dataPetugas",tokenAdmin,petugasController.dataPetugas)
router.post("/addPetugas",tokenAdmin,petugasController.addPetugas)
router.put("/updatePetugas/:id",tokenAdmin,petugasController.updatePetugas)
router.delete("/deletePetugas/:id",tokenAdmin,petugasController.deletePetugas)

//Data Kelas
router.post("/addKelas",tokenAdmin,kelasController.addKelas)
router.get("/dataKelas",tokenAdmin,kelasController.dataKelas)
router.put("/updateKelas/:id",tokenAdmin,kelasController.updateKelas)
router.delete("/deleteKelas/:id",tokenAdmin,kelasController.deleteKelas)

module.exports = router