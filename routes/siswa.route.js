'use strict'

const express = require('express')

const pembayaranController = require('../controllers/pembayaran.controller')
const router = new express.Router();

router.get("/dataPembayaran/:nisn",pembayaranController.nisnPembayaran)

module.exports = router