const {MongoClient} = require('mongodb')
const url = 'mongodb://127.0.0.1:27017'
const com = new MongoClient(url)


const header = async ()=>{
    const db = (await com.connect()).db('blog').collection('header')
    return db
 }
const section2 = async ()=>{
    const db = (await com.connect()).db('blog').collection('section2')
    return db
 }
const blog = async ()=>{
    const db = (await com.connect()).db('blog').collection('blog')
    return db
 }
const reg = async ()=>{
    const db = (await com.connect()).db('blog').collection('reg')
    return db
 }




module.exports = {
    header,
    section2,
    blog,
    reg
}