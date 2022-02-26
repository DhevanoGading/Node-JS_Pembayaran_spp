'use strict'

//inisialisasi
const express = require("express")

//implementasi
const app = express()
app.use(express.json())

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))

//menghubungkan ke database
const db = require('./db')
db.connect(error =>{
    if(error) throw error
    console.log("mysql connected")
})

//endpoint
app.get("/", (req,res) => {
    res.send({
        message:"Berhasil menjalankan GET",
        data: {
            description :
            "berhasil menampilkan data"
        }
    })
})

app.use("/auth",require('./routes/login.route'))
app.use("/admin",require('./routes/admin.route'))
app.use("/petugas",require('./routes/petugas.route'))
app.use("/siswa",require('./routes/siswa.route'))

const port = 8888;
app.listen(port, () => console.log (`App berhasil berjalan di ${port}`))