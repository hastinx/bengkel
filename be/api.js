const express = require('express');
const db = require('./config/db')
const dotenv = require('dotenv');
const cors = require('cors');
const bengkel_router = require('./app/bengkel/bengkel_router')
const cookieParser = require('cookie-parser')

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser())

for (route of bengkel_router.route) {
    app.use('/api', route)
}

db.connect(err => {
    if (!err) console.log('DB aman')
    else console.log(err)
}
)

app.listen(process.env.PORT, () => console.log(`=========== API SERVER RUN ON PORT ${process.env.PORT} ===========`))