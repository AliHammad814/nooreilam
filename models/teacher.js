require('dotenv').config()
const {MongoClient} = require('mongodb')
const uri = process.env.MONGO_CONNECTION_STRING;
const com = new MongoClient(uri);

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