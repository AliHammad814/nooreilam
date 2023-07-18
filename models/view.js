const {MongoClient} = require('mongodb')
const url = 'mongodb://127.0.0.1:27017'
const com = new MongoClient(url)

const home = async ()=>{
    const db = (await com.connect()).db('viewhistory').collection('home')
    return db
 }
const about = async ()=>{
    const db = (await com.connect()).db('viewhistory').collection('about')
    return db
 }
const course = async ()=>{
    const db = (await com.connect()).db('viewhistory').collection('course')
    return db
 }
const teacher = async ()=>{
    const db = (await com.connect()).db('viewhistory').collection('teacher')
    return db
 }
const contact = async ()=>{
    const db = (await com.connect()).db('viewhistory').collection('contact')
    return db
 }
const blog = async ()=>{
    const db = (await com.connect()).db('viewhistory').collection('blog')
    return db
 }
const reg = async ()=>{
    const db = (await com.connect()).db('viewhistory').collection('reg')
    return db
 }


 module.exports = {
    about,
    home,
    blog,
    contact,
    course,
    reg,
    teacher
 }