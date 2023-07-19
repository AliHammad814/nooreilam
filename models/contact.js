require('dotenv').config()
const {MongoClient} = require('mongodb')
const uri = process.env.MONGO_CONNECTION_STRING;
const com = new MongoClient(uri);


const header = async ()=>{
    const db = (await com.connect()).db('contact').collection('header')
    return db
 }


const contactp = async ()=>{
    const db = (await com.connect()).db('contact').collection('contactp')
    return db
 }
const info = async ()=>{
    const db = (await com.connect()).db('contact').collection('info')
    return db
 }


 module.exports = {
    header,
    contactp,
    info
 }