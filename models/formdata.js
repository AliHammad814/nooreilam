require('dotenv').config()
const {MongoClient} = require('mongodb')
const uri = process.env.MONGO_CONNECTION_STRING;
const com = new MongoClient(uri);

const freetrial = async ()=>{
    const db = (await com.connect()).db('formdata').collection('freetrial')
    return db
 }


 module.exports = {
    freetrial
 }