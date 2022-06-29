const express = require('express');
const Article = require('./../models/article')
const router = express.Router();

router.get('/new',(req,res)=>{
    res.render('articles/new',{article : new Article()});
})

router.get('/:id',async(req,res)=>{
    const article = await Article.findById(req.params.id);
    res.render('articles/show', {article : article});
    console.log('yes');
})

router.post('/',async(req,res)=>{
    let article = new Article({
        title : req.body.title,
        date : req.body.date,
        description : req.body.description,
        content : req.body.content
    })
    try{
       article =  await article.save();
       res.redirect(`/articles/${article.id}`)
       console.log('redirecting...');
    }
    catch(e){
        res.render('articles/new',{article : article});
        console.log(e);
    }
})

router.delete('/:id', async (req,res)=>{
    await Article.findByIdAndDelete(req.params.id);
    res.redirect('/')
})


router.get('/edit/:id',async (req,res)=>{
    const article = await Article.findById(req.params.id);
    res.render('articles/edit',{article : article});
    console.log('new route');
})

router.put('/:id',async (req,res)=>{
    let article = await Article.findById(req.params.id);

    article.title = req.body.title;
    article.date = req.body.date;
    article.description = req.body.description
    article.content = req.body.content;

    try{
       article =  await article.save();
       res.redirect(`/articles/${article.id}`)
       console.log('redirecting...');
    }
    catch(e){
        res.render('articles/edit',{article : article});
        console.log(e);
    }
})



module.exports = router;