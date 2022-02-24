'use strict'

const express = require('express')
const petugasController = require('../controllers/petugas.controller')
const adminController = require('../controllers/admin.controller')
const router = new express.Router();
const {tokenPetugas} = require('../auth/tokenPetugas_validation')

router.post("/signup",tokenPetugas,petugasController.signup)
router.post("/login",petugasController.login)

module.exports = router