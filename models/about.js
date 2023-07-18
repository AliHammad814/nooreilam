const {MongoClient} = require('mongodb')
const url = 'mongodb://127.0.0.1:27017'
const com = new MongoClient(url)

const about = async ()=>{
    const db = (await com.connect()).db('about').collection('header')
    return db
 }
const easyquran = async ()=>{
    const db = (await com.connect()).db('about').collection('quran')
    return db
 }
const learingquran = async ()=>{
    const db = (await com.connect()).db('about').collection('learingquran')
    return db
 }
const reg = async ()=>{
    const db = (await com.connect()).db('about').collection('reg')
    return db
 }


module.exports = {
  about,
  easyquran,
  learingquran,
  reg
}