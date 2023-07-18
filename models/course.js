const {MongoClient} = require('mongodb')
const url = 'mongodb://127.0.0.1:27017'
const com = new MongoClient(url)

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