const express = require('express')
const admin_routes = express()


admin_routes.use(express.static('public'))


const body = require('body-parser')
admin_routes.use(body.json())
admin_routes.use(body.urlencoded({ extended: true }))




admin_routes.set('view engine', 'ejs')
admin_routes.set('views', './views')




const admin = require('../middleware/adminauth')
const adminController = require('../controllers/admin')



const multer = require('multer')
const path = require('path')
const { home } = require('nodemon/lib/utils')
const userImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/image"))
  },
  filename: function (req, file, cb) {
    const name = Date.now() + '-' + file.originalname
    cb(null, name)
  }
})
const uplode = multer({ storage: userImage })




admin_routes.get('/', admin.no, adminController.admin)



// &&&&&&&&&&&&&&&& nav
admin_routes.get('/navdash', admin.no, adminController.navdash)
admin_routes.get('/remove', adminController.remove)
admin_routes.post('/addpage', adminController.addpage)




// %%%%%%%%%%%% home
admin_routes.get('/dashhome', admin.no, adminController.dashhome)
admin_routes.get('/courseremove', adminController.courseremove)
admin_routes.get('/homecourseedit', adminController.homeedit)
admin_routes.get('/homechooseusedit', adminController.homeedit)
admin_routes.get('/homeblogedit', adminController.homeedit)
admin_routes.get('/testiedit', adminController.homeedit)
admin_routes.post('/homecourseeditdata',
  uplode.single('image'), adminController.homecourseeditdata)
admin_routes.post('/homechooseusedit',
  uplode.single('image'), adminController.homechooseusedit)
admin_routes.post('/homeblogedit',
  uplode.single('image'), adminController.homeblogedit)
admin_routes.post('/testiedit',
  uplode.single('image'), adminController.testiedit)
admin_routes.get('/chooseremove', adminController.chooseremove)
admin_routes.get('/blogremove', adminController.blogremove)
// admin_routes.get('/formremove' , adminController.formremove)
admin_routes.get('/testiremove', adminController.testiremove)
admin_routes.post('/headerhomedata', uplode.single('image'), adminController.headerhomedata)
admin_routes.post('/aboutdata', adminController.aboutdata)
// admin_routes.post('/formdata' , adminController.formdata)
admin_routes.post('/coursedata', uplode.single('image'), adminController.homecoursedata)
admin_routes.post('/choosedata', uplode.single('image'), adminController.homechoosedata)
admin_routes.post('/blogdata', uplode.single('image'), adminController.homeblogdata)
admin_routes.post('/regdata', uplode.single('image'), adminController.homeregdata)
admin_routes.post('/testidata', uplode.single('image'), adminController.testidata)




// %%%%%%%%%%%%%%%% about 
admin_routes.get('/dashabout', admin.no, adminController.dashabout)
admin_routes.get('/learningquranremove', adminController.learningquranremove)
admin_routes.get('/quranedit', adminController.aboutedit)
admin_routes.post('/aboutquranedit', uplode.single('image'), adminController.aboutquranedit)
admin_routes.post('/easyquran', adminController.abouteasyquran)
admin_routes.post('/headeraboutdata', uplode.single('image'), adminController.headeraboutdata)
admin_routes.post('/learingquran', uplode.single('image'), adminController.learingquran)
admin_routes.post('/aboutregdata', uplode.single('image'), adminController.aboutregdata)





// %%%%%%%%%%%%%%%%%% course
admin_routes.get('/dashcourse', admin.no, adminController.dashcourse)
admin_routes.get('/feeremove', adminController.feeremove)
admin_routes.get('/holyquran', adminController.courseedit)
admin_routes.get('/coursefee', adminController.courseedit)
admin_routes.post('/feestructureedit', adminController.feestructureedit)
admin_routes.post('/holyquranedit', adminController.holyquranedit)
admin_routes.get('/holyquranremove', adminController.holyquranremove)
admin_routes.post('/courseheader', adminController.courseheaderD)
admin_routes.post('/holyquranh', adminController.courseholyquranD)
admin_routes.post('/holyquranp', adminController.courseholyquranp)
admin_routes.post('/feestructure', adminController.feestructure)
admin_routes.post('/courseregdata', uplode.single('image'), adminController.courseregdata)





// %%%%%%%%%%%% teacher 
admin_routes.get('/dashteacher', admin.no, adminController.dashteacher)
admin_routes.get('/teacheredit', adminController.teacheredit)
admin_routes.get('/teamremove', adminController.teamremove)
admin_routes.post('/teacherp', adminController.teacherpdata)
admin_routes.post('/teachercontact', adminController.teachercontact)
admin_routes.post('/headerteacherdata', adminController.
  headerteacherdata)
admin_routes.post('/teamedit', uplode.single('image'), adminController.teamedit)
admin_routes.post('/teammem', uplode.single('image'), adminController.teammem)
admin_routes.post('/ftdata', uplode.single('image'), adminController.ftdata)




// %%%%%%%%%%%%%%%%% blog
admin_routes.get('/dashblog', admin.no, adminController.dashblog)
admin_routes.get('/blogedit', adminController.blogedit)
admin_routes.get('/blogblogremove', adminController.blogblogremove)
admin_routes.post('/headerblogdata', adminController.headerblogdata)
admin_routes.post('/blogregdata', adminController.blogregdata)
admin_routes.post('/blogedit', uplode.single('image'), adminController.blogblogedit)
admin_routes.post('/section2', adminController.blogpdata)
admin_routes.post('/blogblogdata', uplode.single('image'), adminController.blogblogdata)






// %%%%%%%%%%%%% contact
admin_routes.get('/dashcontact', admin.no, adminController.dashcontact)
admin_routes.get('/contactedit', adminController.contactedit)
admin_routes.get('/inforemove', adminController.contactinforemove)
admin_routes.post('/info', adminController.contactinfo)
admin_routes.post('/infoedit', adminController.infoedit)
admin_routes.post('/headercontactdata', adminController.headercontactdata)
admin_routes.post('/contactp', adminController.contactpdata)





// %%%%%%%%%%%%% Registration
admin_routes.get('/dashregistration', admin.no, adminController.registration)
admin_routes.post('/regheaderdata', adminController.regheaderdata)
admin_routes.post('/regheader2data', adminController.regheader2data)





// %%%%%%%%%%%%%%%%%%%% footer 
admin_routes.get('/dashfooter', admin.no, adminController.footerdash)
admin_routes.get('/footeredit', adminController.footeredit)
admin_routes.get('/line1iconremove', adminController.line1iconremove)
admin_routes.get('/line2remove', adminController.line2remove)
admin_routes.get('/line3remove', adminController.line3remove)
admin_routes.get('/line4remove', adminController.line4remove)
admin_routes.post('/newicon', adminController.newicon)
admin_routes.post('/line1edit', adminController.line1edit)
admin_routes.post('/line1', adminController.line1data)
admin_routes.post('/line2', adminController.line2data)
admin_routes.post('/line2edit', adminController.line2edit)
admin_routes.post('/line3', adminController.line3data)
admin_routes.post('/line3edit', adminController.line3edit)
admin_routes.post('/line4', adminController.line4data)
admin_routes.post('/line4edit', adminController.line4edit)




// &&&&&&&&&&&&&&&&&&&&&& form
admin_routes.get('/freetrialform', admin.no, adminController.allform)
admin_routes.get('/userformremove', admin.no, adminController.userremove)
admin_routes.get('/finaleuserremove', admin.no, adminController.finaleremove)
admin_routes.get('/finaleform', admin.no, adminController.finaleform)
admin_routes.get('/contactform', admin.no, adminController.contactform)
admin_routes.get('/contactformremove', admin.no, adminController.contactformremove)
admin_routes.post('/userupdate', adminController.userupdate)
// admin_routes.post('/adminupdate' , adminController.adminupdate)
admin_routes.get('/adminform', admin.no, admin.admin, adminController.adminform)
admin_routes.get('/adminremove', adminController.adminremove)
admin_routes.get('/admindone', adminController.admindone)
// admin_routes.get('/adminlogin' , admin.admin,  adminController.adminlogin)
admin_routes.get('/logout', adminController.logout)






module.exports = admin_routes