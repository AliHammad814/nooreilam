const {MongoClient} = require('mongodb')
const url = 'mongodb://127.0.0.1:27017'
const com = new MongoClient(url)

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