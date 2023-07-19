require('dotenv').config()
const {MongoClient} = require('mongodb')
const uri = process.env.MONGO_CONNECTION_STRING;
const com = new MongoClient(uri);

const home = async ()=>{
    const db = (await com.connect()).db('home').collection('header')
    return db
 }
 const homeAbout = async ()=>{
    const db = (await com.connect()).db('home').collection('about')
    return db
 }
 const homeCourse = async ()=>{
    const db = (await com.connect()).db('home').collection('course')
    return db
 }
 const homechoose = async ()=>{
    const db = (await com.connect()).db('home').collection('chooseus')
    return db
 }
 const homeblog = async ()=>{
    const db = (await com.connect()).db('home').collection('blog')
    return db
 }
 const homereg = async ()=>{
    const db = (await com.connect()).db('home').collection('reg')
    return db
 }



module.exports = {
    home,
    homeCourse,
    homeAbout,
    homechoose,
    homeblog,
    homereg,
}