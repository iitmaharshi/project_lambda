const express = require('express');
const articleRouter = require('./routes/articles')
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const Article = require('./models/article');
const methodOverride = require('method-override');


const app = express();

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));


mongoose.connect('mongodb://localhost/blogger')
 .then((result)=>{
    app.listen(80,()=>{
        console.log('server running');
    });
    console.log('db connected');
})
 .catch((err)=>{
    console.log(err);
 })

app.get('/',async (req,res)=>{
    const articles = await Article.find().sort({
        date : 'descending'
    });
    res.render('articles/index',{articles: articles});
});



app.use('/articles',articleRouter);


