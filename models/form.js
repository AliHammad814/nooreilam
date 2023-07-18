const { MongoClient } = require('mongodb')
const url = 'mongodb://127.0.0.1:27017'
const com = new MongoClient(url)

const formtrial = async () => {
   const db = (await com.connect()).db('form').collection('freetrial')
   return db
}
const formfinale = async () => {
   const db = (await com.connect()).db('form').collection('finale')
   return db
}
const formcontact = async () => {
   const db = (await com.connect()).db('form').collection('contact')
   return db
}
const adminform = async () => {
   const db = (await com.connect()).db('form').collection('admin')
   return db
}


module.exports = {
   formtrial,
   formcontact,
   formfinale,
   adminform,
}