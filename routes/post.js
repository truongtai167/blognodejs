const express = require('express')
const router = express.Router()

//Load model
const Post = require('../models/model.post')

//Thu nghiem
router.get('/add',(req,res) => {
    res.render('posts/add')
})
// Hien thi tat ca cac bai post moi
router.get('/',async(req,res) =>
{
    const posts = await Post.find().lean().sort({date: -1})
    res.render('posts/index',{posts})
})
//Tao post moi
router.post('/', async(req,res) =>{
    const { title, text } = req.body

    let errors = []

    if(!title) errors.push ({msg: 'Title required'}) 
    if(!text) errors.push ({msg: 'Text required'})
    if(errors.length > 0)res.render('posts/add',{title,text})
    else
    {
        const newPostData = {title, text}
        const newPost = new Post(newPostData)
        await newPost.save()
        res.redirect('/posts')
    }

})

// Edit bai viet
router.get('/edit/:id', async(req, res) =>
{
    const post = await Post.findOne({_id: req.params.id}).lean()
    res.render('posts/edit',{post})
})
//Luu thay doi bai viet vao CSDL
router.put('/:id',async(req,res)=>
{
    const {title,text} = req.body
    await Post.findByIdAndUpdate({_id: req.params.id}, {title,text})
    res.redirect('/posts')
})
module.exports = router

//Delete bai viet
router.delete('/:id', async(req,res)=>
{
    await Post.findOneAndRemove({_id: req.params.id})
    res.redirect('/posts')
})