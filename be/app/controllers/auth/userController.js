const db = require('../../../config/db.js')
const bcrypt = require('bcrypt')
const { response } = require('express')
const promise = db.promise()


module.exports = {
    login: async (req, res) => {
        try {

            const [result] = await promise.query(`SELECT * FROM bkl_mst_user WHERE nama='${req.body.account}' OR email='${req.body.account}'`)

            const isValid = await bcrypt.compare(req.body.password, result[0].password)

            if (!isValid) {
                return res.json({
                    status: 400,
                    message: 'Salah Password'
                })
            }

            res.json({
                status: 200,
                message: "Login Succes",
                values: {
                    nama: result[0].nama,
                    is_admin: result[0].is_admin,
                    email: result[0].email
                }
            })

        } catch (error) {
            return res.json({
                status: 400,
                message: 'User tidak terdaftar'
            })
        }
    },

    register: async (req, res) => {

        const { nama, email, hp, password, is_admin } = req.body;

        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(password, salt)

        const [exist] = await promise.query(`SELECT * FROM bkl_mst_user WHERE nama = '${nama}' OR email = '${email}'`)

        console.log(exist.length)
        if (exist.length === 0) {
            db.query(`INSERT INTO bkl_mst_user (nama,email,hp,password,is_admin) VALUES ('${nama}','${email}','${hp}','${hashPass}',${is_admin})`, (err, result) => {
                if (err) return res.json({
                    status: 400,
                    message: err
                })
                return res.json({
                    status: 200,
                    message: 'Registrasi Berhasil'
                })

            })
        } else {
            res.json({
                status: 400,
                message: 'Nama dan email sudah ada'
            })
        }
    },
}