const express = require("express");
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors')
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud-react-node",
});

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/get', (req, res) => {
   const sqlSelect = "SELECT * FROM movie_reviews";
    db.query(sqlSelect, (req, result) => {
        res.send(result)
    }) 
})

app.post("/api/insert", (req, res) => {
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;
    const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?)";
    db.query(sqlInsert, [movieName, movieReview], (req, result) => {
        console.log(result)
    });
});

app.delete("/api/delete/:id", (req, res) => {
    const id = req.params.id;
    const sqlDelete = "DELETE FROM movie_reviews WHERE id = ?";
    db.query(sqlDelete, id, (err, result) => {
        if (err) throw err;
    });
});

app.put("/api/update/", (req, res) => {
    const id = req.body.id;
    const review = req.body.movieReview
    const sqlUpdate = "UPDATE movie_reviews SET movieReview = ? WHERE id = ?";
    db.query(sqlUpdate, [review, id], (err, result) => {
        if (err) throw err;
    });
});

app.listen(3001, () => {
    console.log("server running on port 3001");
});