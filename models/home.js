const {MongoClient} = require('mongodb')
const url = 'mongodb://127.0.0.1:27017'
const com = new MongoClient(url)

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