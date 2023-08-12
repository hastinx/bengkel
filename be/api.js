const express = require('express');
const db = require('./config/db')
const dotenv = require('dotenv');
const cors = require('cors');
const main_router = require('./app/router')
const bengkel_router = require('./app/bengkel/bengkel_router')

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

for (route of main_router.route) {
    app.use('/api', route)
}

for (route of bengkel_router.route) {
    app.use('/api', route)
}

db.connect(err => {
    if (!err) console.log('DB aman')
    else console.log(err)
}
)

app.listen(process.env.PORT, () => console.log(`=========== API SERVER RUN ON PORT ${process.env.PORT} ===========`))