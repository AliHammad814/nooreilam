


require('dotenv').config()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000

mongoose.set('strictQuery' , false)
const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

// mongoose.connect('mongodb+srv://AliHammad:aliali786@cluster0.t8p9lpu.mongodb.net')



const express = require('express')
const app = express()
app.use(express.static('/public'))






const user_routes = require('./routes/user')
const admin_routes = require('./routes/admin')

app.use('/' , user_routes)
app.use('/admin' , admin_routes)



// app.listen(5000 , ()=>{
//     console.log('server is running')
// })

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("listening for requests");
    })
})
