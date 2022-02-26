'use strict'

const express = require('express')

const pembayaranController = require('../controllers/pembayaran.controller')
const router = new express.Router();
const {tokenPetugas} = require('../auth/tokenPetugas_validation')

router.post("/addPembayaran",tokenPetugas,pembayaranController.addPembayaran)

module.exports = router