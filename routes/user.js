const express = require('express')
const user_routes = express()

const admin = require('../middleware/adminauth')


const sesion = require('express-session')
const config = require('../config/config')
user_routes.use(sesion({secret:config.config}))

user_routes.use(express.static('public'))

const body = require('body-parser')
user_routes.use(body.json())
user_routes.use(body.urlencoded({extended:true}))



user_routes.set('view engine' , 'ejs')
user_routes.set('views' , './views')


const userController = require('../controllers/user')

user_routes.get('/login' ,admin.yes , userController.dashbord)
user_routes.get('/singup' , userController.singup)
user_routes.get('/forget' , userController.forget)
user_routes.post('/forgetupdate' , userController.forgetupdate)
user_routes.post('/singupdata' , userController.singupdata)
user_routes.post('/logindata' , userController.logindata)


user_routes.get('/home' , userController.home)
user_routes.get('/' , userController.home)
user_routes.post('/homeformdata' , userController.homeformdata)
user_routes.get('/about' , userController.about)
user_routes.post('/aboutformdata' , userController.aboutformdata)
user_routes.get('/course' , userController.course)
user_routes.post('/courseformdata' , userController.courseformdata)
user_routes.get('/teacher' , userController.teacher)
user_routes.get('/blog' , userController.blog)
user_routes.get('/contact' , userController.contact)
user_routes.post('/contactformdata' , userController.contactformdata)
user_routes.get('/registration' , userController.registration)
user_routes.post('/regformdata' , userController.regformdata)


module.exports = user_routes