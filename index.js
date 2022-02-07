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

app.get('/articles', (req, res) => {
    Article.find(function (err, foundArticles) {
        if (!err) {
            res.send(foundArticles)
        }
        else {
            res.send(err)
        }

    })
})