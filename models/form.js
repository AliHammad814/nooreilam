require('dotenv').config()
const {MongoClient} = require('mongodb')
const uri = process.env.MONGO_CONNECTION_STRING;
const com = new MongoClient(uri);

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