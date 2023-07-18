const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    // image:{
    //     type:File,
    //     required:true
    // },
    password:{
        type:String,
        required:true
    },
    is_admin:{
        type:Number,
        required:true
    },
    is_varified:{
     type:Number,
     default:0
    }
})


const {MongoClient} = require('mongodb')
const url = 'mongodb://127.0.0.1:27017'
const com = new MongoClient(url)


const navbar = async ()=>{
   const db = (await com.connect()).db('users').collection('navbar')
   return db
}






const data = mongoose.model('user' , userSchema)


module.exports = {
    data,
    navbar,
}