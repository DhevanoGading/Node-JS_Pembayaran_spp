'use strict'

const express = require('express')

const petugasController = require('../controllers/petugas.controller')
const router = new express.Router();
const {tokenPetugas} = require('../auth/tokenPetugas_validation')

module.exports = router