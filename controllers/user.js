const model = require('../models/usermodel')
const homemodel = require('../models/home')
const aboutmodel = require('../models/about')
const coursemodel = require('../models/course')
const teachermodel = require('../models/teacher')
const blogmodel = require('../models/blog')
const contactmodel = require('../models/contact')
const registrationmodel = require('../models/registration')
const formmodel = require('../models/form')
const form = require('../models/form')
const footermodel = require('../models/footer')
const testi = require('../models/testi')
const view = require('../models/view')
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')
const body = require('body-parser')
const session = require('express-session')
const { formdata } = require('./admin')

const passwordBcrypt = async (password) => {
  try {
    const done = await bcrypt.hash(password, 10)
    return done
  } catch (error) { console.log(error.message) }
}

const emailfun = async (name, email) => {
  try {
    const transport = nodemailer.createTransport({
      // service:'smtp.gmail.com',
      host: 'smtp.gmail.com',
      // port:587,
      // secure:false,
      auth: {
        user: '',
        pass: ''
      }
    })
    const mailoption = {
      // from:'alihammad05297914@gmail.com',
      to: email,
      subject: "for verification mail",
      html: '<p>Hello ' + name + ', Your Form Successfully Submited</p>'
    }
    transport.sendMail(mailoption, function (error, info) {
      if (error) {
        console.log(error.message)
      } else {
        console.log("send mail" + info.response)
      }
    })
  } catch (error) { console.log(error.message) }
}


// &&&&&&&&&&&&&&&&&&&&&&&&&&&&& dashbord

const adminform = async () => {
  const db = await form.adminform()
  return db
}

const dashbord = async (req, res) => {
  try {
    res.render('user/login')
  } catch (error) {
    console.log(error.message)
  }
}
const singup = async (req, res) => {
  try {
    res.render('user/singup')
  } catch (error) {
    console.log(error.message)
  }
}
const singupdata = async (req, res) => {
  try {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const passbc = await passwordBcrypt(password)
    const number = req.body.number
    const db = await adminform()
    const admindata = await (await adminform()).findOne({ email: email })
    if(admindata){
      res.render('user/login', { message: 'Change Your Email' })
    }else{
      await db.insertOne({
        name: name,
        email: email,
        password: passbc,
        number: number,
        key: '0'
      })
      res.render('user/login', { message: 'Form Submited' })
    }
  
  } catch (error) {
    console.log(error.message)
  }
}
const logindata = async (req, res) => {
  try {
    const email = req.body.email
    const password = req.body.password
    const admindata = await (await adminform()).findOne({ email: email })
    if (admindata) {
      const cmpr = await bcrypt.compare(password, admindata.password)
      if (cmpr) {
        if (admindata.key == "1") {
          if(admindata.email == 'admin@gmail.com'){
            req.session.admin_id = admindata._id
          }
            req.session.user_id = admindata._id
            res.redirect('admin')
        } else {
          res.render('user/login', { message: 'Admin Not Verified' })
        }
      } else { res.render('user/login', { message: 'Email or Password Invalid' }) }
    } else {
      res.render('user/login', { message: 'Email or Password Invalid' })
    }
  } catch (error) {
    console.log(error.message)
  }
}

const forget = async (req, res) => {
  try {
    res.render('user/forget')
  } catch (error) {
    console.log(error.message)
  }
}
const forgetupdate = async (req, res) => {
  try {
    const email = req.body.email
    const password = req.body.password
    const userdata = await (await adminform()).findOne({ email: email })

    if (userdata){
      if (userdata.key == '1') {
        if(userdata.name=="admin"){
          res.render('user/forget', { message: 'Not Forget' })
        }else{
          const pascrpt = await passwordBcrypt(password)
        await (await adminform()).updateMany({ email: email }, {
          $set: {
            password: pascrpt,
            key : '0'
          }
        })
        res.render('user/login', { message: 'Request Submited' })
        }
      } else {
        res.render('user/forget', { message: 'You Are Not Admin' })
      }
    } else {
      res.render('user/forget', { message: 'Please Singup Your Account' })
    }
  } catch (error) {
    console.log(error.message)
  }
}


const navbarD = async () => {
  const db = await model.navbar()
  const rsl = await db.find().toArray()
  return rsl
}







// &&&&&&&&&&&&&&&&&&&&&& home &&&&&&&&&&&&&&&&&

const homeD = async () => {
  const db = await homemodel.home()
  const rsl = await db.find().toArray()
  return rsl
}
const homeAbout = async () => {
  const db = await homemodel.homeAbout()
  const rsl = await db.find().toArray()
  return rsl
}
const homecourse = async () => {
  const db = await homemodel.homeCourse()
  const rsl = await db.find().toArray()
  return rsl
}
const homechoose = async () => {
  const db = await homemodel.homechoose()
  const rsl = await db.find().toArray()
  return rsl
}
const homeblog = async () => {
  const db = await homemodel.homeblog()
  const rsl = await db.find().toArray()
  return rsl
}
const testiD = async () => {
  const db = await testi.testi()
  return db
}
const homereg = async () => {
  const db = await homemodel.homereg()
  const rsl = await db.find().toArray()
  return rsl
}
const homeform = async () => {
  const db = await formmodel.formtrial()
  return db
}
const formcontact = async () => {
  const db = await formmodel.formcontact()
  return db
}
const homev = async () => {
  const db = await view.home()
  return db
}
const viewaddhome = async () => {
  const finddata = await (await homev()).find().toArray()
  let i = finddata[0].view;
  i++
  const db = await homev()
  await db.updateOne({ key: "home" }, {
    $set: {
      view: i
    }
  })
}
const footericonline1 = async () => {
  const db = await footermodel.line1icon()
  const rsl = await db.find().toArray()
  return rsl
}
const footerline2 = async () => {
  const db = await footermodel.line2()
  const rsl = await db.find().toArray()
  return rsl
}
const footerline3 = async () => {
  const db = await footermodel.line3()
  const rsl = await db.find().toArray()
  return rsl
}
const footerline4 = async () => {
  const db = await footermodel.line4()
  const rsl = await db.find().toArray()
  return rsl
}

const home = async (req, res) => {
  try {
    const data = await navbarD()
    const header = await homeD()
    const about = await homeAbout()
    const course = await homecourse()
    const choose = await homechoose()
    const blog = await homeblog()
    const testi = await (await testiD()).find().toArray()
    const reg = await homereg()
    const line1icon = await footericonline1()
    const line2 = await footerline2()
    const line3 = await footerline3()
    const line4 = await footerline4()
    res.render('user/home', {
      pages: data,
      header: header,
      about: about,
      testi: testi,
      homecourse: course,
      homechoose: choose,
      homeblog: blog,
      homereg: reg,
      line1icon: line1icon,
      line2: line2,
      line3: line3,
      line4: line4,
    })
    viewaddhome()

  } catch (error) {

    console.log(error.message)
  }
}

const homeformdata = async (req, res) => {
  try {
    const fullname = await req.body.fullname
    const email = await req.body.email
    const number = req.body.number
    const course = req.body.course
    const emailfind = await (await homeform()).findOne({ email: email })
    const form = await homeform()
    if (emailfind) {
      res.render('user/error', { message: 'Your Email Already Exsit' })
    } else {
      emailfun(fullname, email)
      await form.insertOne({
        email: email,
        number: number,
        fullname: fullname,
        course: course,
        key: "withoutreq"
      })
      res.redirect('home')

    }
  } catch (error) {
    console.log(error.message)
  }
}


// &&&&&&&&&&&&&&&&&&&&&&&& about &&&&&&&&&&&&&&&&&&&&&&

const aboutD = async () => {
  const db = await aboutmodel.about()
  const rsl = await db.find().toArray()
  return rsl
}

const aboutquran = async () => {
  const db = await aboutmodel.easyquran()
  return db
}

const aboutlearingquran = async () => {
  const db = await aboutmodel.learingquran()
  return db
}

const aboutreg = async () => {
  const db = await aboutmodel.reg()
  return db
}
const aboutv = async () => {
  const db = await view.about()
  return db
}
const viewaddabout = async () => {
  const finddata = await (await aboutv()).find().toArray()
  let i = finddata[0].view;
  i++
  const db = await aboutv()
  await db.updateOne({ key: "about" }, {
    $set: {
      view: i
    }
  })
}



const about = async (req, res) => {
  try {
    const data = await navbarD()
    const header = await aboutD()
    const testi = await (await testiD()).find().toArray()
    const line1icon = await footericonline1()
    const line2 = await footerline2()
    const line3 = await footerline3()
    const line4 = await footerline4()
    const learningquran = await (await aboutlearingquran()).find().toArray()
    const aboutregdata = await (await aboutreg()).find().toArray()
    const aboutqurandata = await (await aboutquran()).find().toArray()
    res.render('user/about', {
      pages: data,
      header: header,
      testi: testi,
      line1icon: line1icon,
      line2: line2,
      line3: line3,
      line4: line4,
      aboutquran: aboutqurandata,
      learningquran: learningquran,
      aboutregdata: aboutregdata
    })
    viewaddabout()

  } catch (error) {

    console.log(error.message)
  }
}

const aboutformdata = async (req, res) => {
  try {
    const fullname = await req.body.fullname
    const email = await req.body.email
    const number = req.body.number
    const course = req.body.course
    const emailfind = await (await homeform()).findOne({ email: email })
    const form = await homeform()
    if (emailfind) {
      res.render('user/error', { message: 'Your Email Already Exsit' })
    } else {
      emailfun(fullname, email)
      await form.insertOne({
        email: email,
        number: number,
        fullname: fullname,
        course: course,
        key: "withoutreq"
      })
      res.redirect('about')
    }

  } catch (error) {
    console.log(error.message)
  }
}


// $$$$$$$$$$$$$$$$$$$$$$$$$$$ course $$$$$$$$$$$$$$$$$$$$$$$$$$$$

const courseheader = async () => {
  const db = await coursemodel.header()
  return db
}
const courseholyquranh = async () => {
  const db = await coursemodel.holyquranh()
  return db
}
const courseholyquranpa = async () => {
  const db = await coursemodel.holyquranp()
  return db
}

const coursereg = async () => {
  const db = await coursemodel.coursereg()
  return db
}
const coursefee = async () => {
  const db = await coursemodel.coursefee()
  return db
}
const coursev = async () => {
  const db = await view.course()
  return db
}
const viewaddcourse = async () => {
  const finddata = await (await coursev()).find().toArray()
  let i = finddata[0].view;
  i++
  const db = await coursev()
  await db.updateOne({ key: "course" }, {
    $set: {
      view: i
    }
  })
}

const course = async (req, res) => {
  try {
    const data = await navbarD()
    const line1icon = await footericonline1()
    const line2 = await footerline2()
    const line3 = await footerline3()
    const line4 = await footerline4()
    const holyqurandatapa = await (await courseholyquranpa()).find().toArray()
    const reg = await (await coursereg()).find().toArray()
    const fee = await (await coursefee()).find().toArray()
    const header = await (await courseheader()).find().toArray()
    const courseholyquranheading = await (await courseholyquranh()).find().toArray()
    res.render('user/course', {
      pages: data,
      header: header,
      holyquranh: courseholyquranheading,
      holyquranp: holyqurandatapa,
      reg: reg,
      fee: fee,
      line1icon: line1icon,
      line2: line2,
      line3: line3,
      line4: line4,
    })
    viewaddcourse()

  } catch (error) {

    console.log(error.message)
  }
}

const courseformdata = async (req, res) => {
  try {
    const fullname = await req.body.fullname
    const email = await req.body.email
    const number = req.body.number
    const course = req.body.course
    const emailfind = await (await homeform()).findOne({ email: email })
    const form = await homeform()
    if (emailfind) {
      res.render('user/error', { message: 'Your Email Already Exsit' })
    } else {
      emailfun(fullname, email)
      await form.insertOne({
        email: email,
        number: number,
        fullname: fullname,
        course: course,
        key: "withoutreq"
      })
      res.redirect('course')
    }

  } catch (error) {
    console.log(error.message)
  }
}










// &&&&&&&&&&&&&&&&&&&&&&&& teacher %%%%%%%%%%%%%%%

const teacherD = async () => {
  const db = await teachermodel.header()
  const rsl = await db.find().toArray()
  return rsl
}
const teacherp = async () => {
  const db = await teachermodel.teacherp()
  return db
}
const ft = async () => {
  const db = await teachermodel.ft()
  return db
}
const team = async () => {
  const db = await teachermodel.team()
  return db
}
const tchcontact = async () => {
  const db = await teachermodel.contact()
  return db
}

const teacherv = async () => {
  const db = await view.teacher()
  return db
}
const viewaddteacher = async () => {
  const finddata = await (await teacherv()).find().toArray()
  let i = finddata[0].view;
  i++
  const db = await teacherv()
  await db.updateOne({ key: "teacher" }, {
    $set: {
      view: i
    }
  })
}



const teacher = async (req, res) => {
  try {
    const teacherpD = await (await teacherp()).find().toArray()
    const ftD = await (await ft()).find().toArray()
    const teamD = await (await team()).find().toArray()
    const tchcontactD = await (await tchcontact()).find().toArray()
    const data = await navbarD()
    const header = await teacherD()
    const line1icon = await footericonline1()
    const line2 = await footerline2()
    const line3 = await footerline3()
    const line4 = await footerline4()
    res.render('user/teacher', {
      pages: data,
      header: header,
      teacherp: teacherpD,
      ft: ftD,
      team: teamD,
      tchcontact: tchcontactD,
      line1icon: line1icon,
      line2: line2,
      line3: line3,
      line4: line4,
    })
    viewaddteacher()

  } catch (error) {

    console.log(error.message)
  }
}



// &&&&&&&&&&&&&&&& blog &&&&&&&&&&&&&&&&&&
const blogD = async () => {
  const db = await blogmodel.header()
  const rsl = await db.find().toArray()
  return rsl
}

const section2 = async () => {
  const db = await blogmodel.section2()
  return db
}
const blogblog = async () => {
  const db = await blogmodel.blog()
  return db
}
const blogreg = async () => {
  const db = await blogmodel.reg()
  return db
}

const blogv = async () => {
  const db = await view.blog()
  return db
}
const viewaddblog = async () => {
  const finddata = await (await blogv()).find().toArray()
  let i = finddata[0].view;
  i++
  const db = await blogv()
  await db.updateOne({ key: "blog" }, {
    $set: {
      view: i
    }
  })
}



const blog = async (req, res) => {
  try {
    const section2d = await (await section2()).find().toArray()
    const blogblogd = await (await blogblog()).find().toArray()
    const blogregd = await (await blogreg()).find().toArray()
    const data = await navbarD()
    const header = await blogD()
    const line1icon = await footericonline1()
    const line2 = await footerline2()
    const line3 = await footerline3()
    const line4 = await footerline4()
    res.render('user/blog', {
      section2: section2d,
      blog: blogblogd,
      reg: blogregd,
      pages: data,
      header: header,
      line1icon: line1icon,
      line2: line2,
      line3: line3,
      line4: line4,

    })
    viewaddblog()
  } catch (error) {

    console.log(error.message)
  }
}



// &&&&&&&&&&&&&&&& contact &&&&&&&&&&&&&&&&&&
const contactD = async () => {
  const db = await contactmodel.header()
  const rsl = await db.find().toArray()
  return rsl
}
const info = async () => {
  const db = await contactmodel.info()
  return db
}
const contactp = async () => {
  const db = await contactmodel.contactp()
  return db
}

const contactv = async () => {
  const db = await view.contact()
  return db
}
const viewaddcontact = async () => {
  const finddata = await (await contactv()).find().toArray()
  let i = finddata[0].view;
  i++
  const db = await contactv()
  await db.updateOne({ key: "contact" }, {
    $set: {
      view: i
    }
  })
}

const contact = async (req, res) => {
  try {
    const infodata = await (await info()).find().toArray()
    const contactpdata = await (await contactp()).find().toArray()
    const data = await navbarD()
    const header = await contactD()
    const line1icon = await footericonline1()
    const line2 = await footerline2()
    const line3 = await footerline3()
    const line4 = await footerline4()
    res.render('user/contact', {
      info: infodata,
      contactp: contactpdata,
      pages: data,
      header: header,
      line1icon: line1icon,
      line2: line2,
      line3: line3,
      line4: line4,
    })
    viewaddcontact()
  } catch (error) {

    console.log(error.message)
  }
}

const contactformdata = async (req, res) => {
  try {
    const fullname = await req.body.fullname
    const email = await req.body.email
    const number = req.body.number
    const message = req.body.message
    const emailfind = await (await formcontact()).findOne({ email: email })
    const formc = await formcontact()
    if (emailfind) {
      res.render('user/error', { message: 'Your Email Already Exsit' })
    } else {
      emailfun(fullname, email)
      await formc.insertOne({
        email: email,
        number: number,
        fullname: fullname,
        message: message,
        key: "withoutreq"
      })
      res.redirect('contact')
    }
  } catch (error) {
    console.log(error.message)
  }
}

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

const regheader = async () => {
  const db = await registrationmodel.header()
  return db
}
const regheader2 = async () => {
  const db = await registrationmodel.header2()
  return db
}

const regv = async () => {
  const db = await view.reg()
  return db
}
const viewaddreg = async () => {
  const finddata = await (await regv()).find().toArray()
  let i = finddata[0].view;
  i++
  const db = await regv()
  await db.updateOne({ key: "reg" }, {
    $set: {
      view: i
    }
  })
}



const registration = async (req, res) => {
  try {
    const data = await navbarD()
    const header1 = await (await regheader()).find().toArray()
    const header2 = await (await regheader2()).find().toArray()
    const line1icon = await footericonline1()
    const line2 = await footerline2()
    const line3 = await footerline3()
    const line4 = await footerline4()
    res.render('user/registration', {
      pages: data,
      header1: header1,
      header2: header2,
      line1icon: line1icon,
      line2: line2,
      line3: line3,
      line4: line4,
    })
    viewaddreg()

  } catch (error) {

    console.log(error.message)
  }
}

const regformdata = async (req, res) => {
  try {
    const fullname = await req.body.fullname
    const email = await req.body.email
    const number = req.body.number
    const course = req.body.course
    const requirement = req.body.requirement
    const emailfind = await (await homeform()).findOne({ email: email })
    const form = await homeform()
    if (emailfind) {
      res.render('user/error', { message: 'Your Email Already Exsit' })
    } else {
      emailfun(fullname, email)
      await form.insertOne({
        email: email,
        number: number,
        fullname: fullname,
        course: course,
        requirement: requirement,
        key: "requirements"
      })
      res.redirect('registration')
    }
  } catch (error) {
    console.log(error.message)
  }
}









module.exports = {
  logindata,
  dashbord,
  singup,
  forget,
  forgetupdate,
  singupdata,
  home,
  homeformdata,
  about,
  aboutformdata,
  viewaddabout,
  course,
  courseformdata,
  teacher,
  blog,
  contact,
  contactformdata,
  registration,
  regformdata
}


