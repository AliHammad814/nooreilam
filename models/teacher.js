const {MongoClient} = require('mongodb')
const url = 'mongodb://127.0.0.1:27017'
const com = new MongoClient(url)

const header = async ()=>{
    const db = (await com.connect()).db('teacher').collection('header')
    return db
 }
const teacherp = async ()=>{
    const db = (await com.connect()).db('teacher').collection('teacherp')
    return db
 }
const ft = async ()=>{
    const db = (await com.connect()).db('teacher').collection('ftsection')
    return db
 }
const team = async ()=>{
    const db = (await com.connect()).db('teacher').collection('teammem')
    return db
 }
const contact = async ()=>{
    const db = (await com.connect()).db('teacher').collection('contact')
    return db
 }


 module.exports = {
    header,
    teacherp,
    ft,
    team,
    contact
 }