const {MongoClient} = require('mongodb')
const url = 'mongodb://127.0.0.1:27017'
const com = new MongoClient(url)

const freetrial = async ()=>{
    const db = (await com.connect()).db('formdata').collection('freetrial')
    return db
 }


 module.exports = {
    freetrial
 }