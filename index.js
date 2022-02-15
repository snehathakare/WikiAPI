//setup express js
const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const ejs = require("ejs");
const mongoose = require('mongoose');

app.listen(3000)
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

//setup mongodb
mongoose.connect('mongodb://localhost:27017/wikiDB', { useNewUrlParser: true });

const articleSchema = {
    title: String,
    content: String
}

const Article = new mongoose.model("Article", articleSchema)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.route('/articles')
    .get(
        (req, res) => {
            Article.find(function (err, foundArticles) {
                if (!err) {
                    res.send(foundArticles)
                }
                else {
                    res.send(err)
                }

            })
        }
    )
    .post((req, res) => {
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });
        newArticle.save(function (err) {
            if (!err) {
                res.send("Article added successfully")
            }
            else {
                res.send(err)
            }
        })
    })
    .delete((req, res) => {
        Article.deleteOne({ title: '' }, function (err) {
            if (!err) { res.send("Successfully deleted article") }
            else {
                res.send(err)
            }
        });
    })

app.route('/articles/:articleTitle')
    .get(
        (req, res) => {
            Article.findOne({ title: req.params.articleTitle }, function (err, foundArticle) {
                if (foundArticle) {
                    res.send(foundArticle)
                }
                else {
                    res.send("No article found")
                }

            })
        }
    )
    // .post((req, res) => {
    //     const newArticle = new Article({
    //         title: req.body.title,
    //         content: req.body.content
    //     });
    //     newArticle.save(function (err) {
    //         if (!err) {
    //             res.send("Article added successfully")
    //         }
    //         else {
    //             res.send(err)
    //         }
    //     })
    // })
    // .delete((req, res) => {
    //     Article.deleteOne({ title: '' }, function (err) {
    //         if (!err) { res.send("Successfully deleted article") }
    //         else {
    //             res.send(err)
    //         }
    //     });
    // })    