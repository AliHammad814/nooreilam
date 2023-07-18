const mongoose = require('mongoose')
// mongoose.connect('mongodb://127.0.0.1:27017')
mongoose.connect('mongodb+srv://AliHammad:aliali786@cluster0.t8p9lpu.mongodb.net')

const express = require('express')
const app = express()
app.use(express.static('/public'))






const user_routes = require('./routes/user')
const admin_routes = require('./routes/admin')

app.use('/' , user_routes)
app.use('/admin' , admin_routes)



app.listen(3000 , ()=>{
    console.log('server is running')
})
