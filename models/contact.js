const {MongoClient} = require('mongodb')
const url = 'mongodb://127.0.0.1:27017'
const com = new MongoClient(url)


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