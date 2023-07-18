const {MongoClient} = require('mongodb')
const url = 'mongodb://127.0.0.1:27017'
const com = new MongoClient(url)

const line1icon = async ()=>{
    const db = (await com.connect()).db('footer').collection('line1icon')
    return db
 }
const line1 = async ()=>{
    const db = (await com.connect()).db('footer').collection('line1')
    return db
 }
const line2 = async ()=>{
    const db = (await com.connect()).db('footer').collection('line2')
    return db
 }
const line3 = async ()=>{
    const db = (await com.connect()).db('footer').collection('line3')
    return db
 }
const line4 = async ()=>{
    const db = (await com.connect()).db('footer').collection('line4')
    return db
 }




 module.exports = {
    line1icon,
    line1,
    line2,
    line3,
    line4
 }