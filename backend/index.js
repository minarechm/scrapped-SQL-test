 const express = require("express")
const mysql = require("mysql")
const PORT = 4000;
const app = express();
const cors = require("cors")

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'XXXX',
    password : 'XXXX',
    database : 'react'
  });
  
connection.connect((e) => {
    if (e) {
        throw(e)
    }
});

app.use(express.json()) //parse into req body
app.use(cors())

// CREATE DATABASE
/*
app.get("/createdb", (req,res) => {
    const sql = "CREATE DATABASE react"
    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result)
        res.send("DB created")
    })
});
*/

app.get("/createpoststable", (req,res) => {
    const sql = "CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), text VARCHAR(255), image VARCHAR(255), price INT, PRIMARY KEY (id))"
    connection.query(sql, (err, result) => {
        if (err) throw err;
        //console.log(result)
        res.send("Posts created")
    })
})

app.get("/getpost/:id", (req,res) => { // not needed
    const sql = `SELECT * FROM posts WHERE id = ${req.params.id}`
    connection.query(sql, (err, result) => {
        if (err) throw err;
        //console.log(result)
        res.send("Posts fetched")
    })
})

app.post("/posts", (req,res) => {
    const {title, text, image, price} = req.body
    const sql = `INSERT INTO posts (title, text, image, price) VALUES ("${title}", "${text}", "${image}", ${price})`
    connection.query(sql, (err, result) => {
        if (err) throw err;
        let newBody = req.body
        body: Object.assign(newBody, {
            id: result.insertId
        })
        res.send(req.body)
    })
})

app.get("/posts", (req,res) => {
    const sql = "SELECT * FROM posts";
    connection.query(sql, (err, result) => {
        if (err) throw err;
        //console.log(result)
        res.send(result)
    })
})

app.post("/posts/:id", (req, res) => {
    const sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
    const sql2 = "SELECT * FROM posts";
    connection.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result)
    })
    /*connection.query(sql2, (err, result) => {
        if (err) throw err
        res.send(result)
    })*/
    
})
app.listen(PORT, () => {
    console.log(`RUNNING ON PORT ${PORT}`)
})
