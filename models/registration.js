require('dotenv').config()
const {MongoClient} = require('mongodb')
const uri = process.env.MONGO_CONNECTION_STRING;
const com = new MongoClient(uri);

const header = async ()=>{
    const db = (await com.connect()).db('registration').collection('header')
    return db
 }
const header2 = async ()=>{
    const db = (await com.connect()).db('registration').collection('header2')
    return db
 }


 module.exports = {
    header,
    header2
 }