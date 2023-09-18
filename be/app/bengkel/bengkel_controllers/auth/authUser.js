const db = require('../../../../config/db.js')
const bcrypt = require('bcrypt')
const promise = db.promise()
const jwt = require('jsonwebtoken')

module.exports = {
    login: async (req, res) => {
        try {

            const [result] = await promise.query(`SELECT * FROM bkl_users WHERE nama='${req.body.account}' OR email='${req.body.account}'`)
            console.log(result)
            const isValid = await bcrypt.compare(req.body.password, result[0].password)

            if (!isValid) {
                return res.status(400).json({
                    message: 'Salah Password'
                })
            }

            const userId = result[0].id
            const name = result[0].name
            const email = result[0].email

            const accessToken = jwt.sign({ userId, name, email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20s' })
            const refreshToken = jwt.sign({ userId, name, email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' })

            await promise.query(`UPDATE bkl_users SET refresh_token='${refreshToken}' WHERE id=${userId}`)

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
                // secure:true
            })
            res.status(200).json({
                message: "Login Succes",
                accessToken
            })

        } catch (error) {
            return res.status(404).json({
                message: 'User tidak terdaftar'
            })
        }
    },

    register: async (req, res) => {

        const { nama, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) return res.status(400).json({ message: 'Password dan confirm password tidak cocok' })

        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(password, salt)
        try {
            const [exist] = await promise.query(`SELECT * FROM bkl_users WHERE nama = '${nama}' OR email = '${email}'`)

            console.log(exist.length)
            if (exist.length === 0) {
                db.query(`INSERT INTO bkl_users (nama,email,password) VALUES ('${nama}','${email}','${hashPass}')`, (err, result) => {
                    if (err) return res.status(400).json({
                        message: err
                    })
                    return res.status(200).json({
                        message: 'Registrasi Berhasil'
                    })

                })
            } else {
                res.status(400).json({
                    message: 'Nama/email sudah terdaftar'
                })
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: 'failed'
            })
        }

    },

    refreshToken: async (req, res) => {
        try {
            const refresh_token = req.cookies.refreshToken
            console.log(refresh_token)
            if (!refresh_token) return res.sendStatus(401)

            const [exist] = await promise.query(`SELECT * FROM bkl_users where refresh_token='${refresh_token}'`)
            if (!exist[0]) return res.sendStatus(403)
            jwt.verify(exist[0].refresh_token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
                if (err) return res.sendStatus(401)
                const userId = exist[0].id
                const name = exist[0].nama
                const email = exist[0].email

                const accessToken = jwt.sign({ userId, email, name }, process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: '20s'
                })

                res.json({ accessToken })
            })
        } catch (error) {
            console.log(error)
        }
    },

    logout: async (req, res) => {
        try {
            const refresh_token = req.cookies.refreshToken
            if (!refresh_token) return res.sendStatus(204)

            const [exist] = await promise.query(`SELECT * FROM bkl_users where refresh_token='${refresh_token}'`)
            if (!exist[0]) return res.sendStatus(204)
            const userId = exist[0].id

            await promise.query(`UPDATE bkl_users SET refresh_token=null WHERE id=${userId}`)
            res.clearCookie('refreshToken')
            res.sendStatus(200)
        } catch (error) {
            console.log(error)
        }
    }
}