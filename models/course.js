require('dotenv').config()
const {MongoClient} = require('mongodb')
const uri = process.env.MONGO_CONNECTION_STRING;
const com = new MongoClient(uri);
const header = async ()=>{
    const db = (await com.connect()).db('course').collection('header')
    return db
 }
const holyquranh = async ()=>{
    const db = (await com.connect()).db('course').collection('holyquranh')
    return db
 }
const holyquranp = async ()=>{
    const db = (await com.connect()).db('course').collection('holyquranp')
    return db
 }
const coursereg = async ()=>{
    const db = (await com.connect()).db('course').collection('reg')
    return db
 }
const coursefee = async ()=>{
    const db = (await com.connect()).db('course').collection('fee')
    return db
 }


 module.exports = {
    header,
    holyquranh,
    holyquranp,
    coursereg,
    coursefee
 }