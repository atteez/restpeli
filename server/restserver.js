require('dotenv').config()
const mysql = require('mysql2/promise')
const express = require('express')
const app = express()
const multer = require('multer')
const upload = multer({dest: 'upload/'})
const cors = require('cors')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
});


const conf = {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}


app.get('/questions', async (req, res) => {

    try {
        const connection = await mysql.createConnection(conf);

        const [rows] = await connection.execute("SELECT question, answer FROM questions");

        res.json(rows);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})





app.post('/addquestion', async (req,resp)=>{
    const que = req.body.que
    const ans = req.body.ans
    

    const sql = 'INSERT INTO questions (question, answer) VALUES (?,?)'

    try {
        const con = await mysql.createConnection(conf)
        await con.execute(sql, [que,ans])
        res.status(200).send("Questions added!")
    } catch (error) {
        resp.status(500).send(error.message)
    }
})