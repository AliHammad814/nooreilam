require('dotenv').config()
const {MongoClient} = require('mongodb')
const uri = process.env.MONGO_CONNECTION_STRING;
const com = new MongoClient(uri);

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