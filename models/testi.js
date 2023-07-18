const {MongoClient} = require('mongodb')
const url = 'mongodb://127.0.0.1:27017'
const com = new MongoClient(url)

const testi = async ()=>{
    const db = (await com.connect()).db('testi').collection('testi')
    return db
 }

module.exports = {
    testi
}