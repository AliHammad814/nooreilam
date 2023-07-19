require('dotenv').config()
const {MongoClient} = require('mongodb')
const uri = process.env.MONGO_CONNECTION_STRING;
const com = new MongoClient(uri);

const testi = async ()=>{
    const db = (await com.connect()).db('testi').collection('testi')
    return db
 }

module.exports = {
    testi
}