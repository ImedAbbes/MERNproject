const Router = require('express').Router()
const postController = require('../controllers/postController')

Router.post('/add', postController.add)
Router.get('/get', postController.get)
Router.post('/delete', postController.remove)
Router.get('/:id',postController.getSinglePost)

module.exports= Router