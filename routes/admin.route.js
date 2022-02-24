'use strict'

const express = require('express')

const adminController = require('../controllers/admin.controller')
const petugasController = require('../controllers/petugas.controller')
const kelasController = require('../controllers/kelas.controller')
const router = new express.Router();

const {tokenAdmin} = require('../auth/tokenAdmin_validation');
const { route } = require('express/lib/application');

//Login Register
router.post("/signup",tokenAdmin,adminController.signup)
router.post("/login",adminController.login)

//Data Petugas
router.get("/dataPetugas",tokenAdmin,adminController.dataPetugas)
router.post("/addPetugas",tokenAdmin,petugasController.signup)
router.put("/updatePetugas/:id",tokenAdmin,adminController.updatePetugas)
router.delete("/deletePetugas/:id",tokenAdmin,adminController.deletePetugas)

//Data Kelas
router.post("/addKelas",tokenAdmin,kelasController.addKelas)
router.get("/dataKelas",tokenAdmin,kelasController.dataKelas)
router.put("/updateKelas/:id",tokenAdmin,kelasController.updateKelas)
router.delete("/deleteKelas/:id",tokenAdmin,kelasController.deleteKelas)

module.exports = router