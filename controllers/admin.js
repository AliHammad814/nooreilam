const model = require('../models/usermodel')
const homemodel = require('../models/home')
const aboutmodel = require('../models/about')
const coursemodel = require('../models/course')
const teachermodel = require('../models/teacher')
const blogmodel = require('../models/blog')
const contactmodel = require('../models/contact')
const registrationmodel = require('../models/registration')
const footermodel = require('../models/footer')
const testi = require('../models/testi')
const view = require('../models/view')
const form = require('../models/form')
const mongo = require('mongodb')
const body = require('body-parser')
const bcrpt = require('bcrypt')


const { about, teacher, blog, contact } = require('./user')
const { query } = require('express')
const e = require('express')
const session = require('express-session')




const fs = require('fs')
const path = require('path').join(__dirname, '../public/image/')
const delet = (item) => {
    try {
        fs.unlinkSync(path + item)
    } catch (error) {
        console.log(error.message)
    }
}







// &&&&&&&&&&&&&&&&&&&& admin &&&&&&&&&&&&&&&&&&&&
const homev = async () => {
    const db = await view.home()
    return db
}
const aboutv = async () => {
    const db = await view.about()
    return db
}
const coursev = async () => {
    const db = await view.course()
    return db
}
const teacherv = async () => {
    const db = await view.teacher()
    return db
}
const blogv = async () => {
    const db = await view.blog()
    return db
}
const contactv = async () => {
    const db = await view.about()
    return db
}
const regv = async () => {
    const db = await view.reg()
    return db
}

const admin = async (req, res) => {
    try {
        const home = await (await homev()).find().toArray()
        const about = await (await aboutv()).find().toArray()
        const course = await (await coursev()).find().toArray()
        const teacher = await (await teacherv()).find().toArray()
        const blog = await (await blogv()).find().toArray()
        const contact = await (await contactv()).find().toArray()
        const reg = await (await regv()).find().toArray()
        const data = await navbarD()
        res.render('admin/dashbord', {
            pages: data,
            home: home,
            about: about,
            course: course,
            teacher: teacher,
            blog: blog,
            contact: contact,
            reg: reg,
        })

    } catch (error) {
        console.log(error.message)

    }
}




// &&&&&&&&&&&&&&&&&&&&&& nav &&&&&&&&&&&&&&&&&&&&&

const navbarD = async () => {
    const db = await model.navbar()
    const rsl = await db.find().toArray()
    return rsl
}


const navdash = async (req, res) => {
    try {
        const data = await navbarD()
        res.render('admin/navdash', { pages: data })

    } catch (error) {
        console.log(error.message)
    }

}
const remove = async (req, res) => {
    try {
        const id = req.query.id
        const db = await (await model.navbar()).deleteOne({ _id: new mongo.ObjectId(id) })
        res.redirect('navdash')

    } catch (error) {
        console.log(error.message)
    }
}
const addpage = async (req, res) => {
    try {
        const pagename = req.body.page
        const routename = req.body.route
        const db = await (await model.navbar()).insertOne({ page: pagename, route: routename })
        res.redirect('navdash')

    } catch (error) {
        console.log(error.message)
    }
}




// %%%%%%%%%%%%%%  home  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const homeheader = async () => {
    const db = await homemodel.home()
    return db
}
const homeabout = async () => {
    const db = await homemodel.homeAbout()
    return db
}
const homecourse = async () => {
    const db = await homemodel.homeCourse()
    return db
}
const homechoose = async () => {
    const db = await homemodel.homechoose()
    return db
}
const homeblog = async () => {
    const db = await homemodel.homeblog()
    return db
}
const testiD = async () => {
    const db = await testi.testi()
    return db
}
const homereg = async () => {
    const db = await homemodel.homereg()
    return db
}
// const homeform = async () => {
//     const db = await homemodel.homeform()
//     return db
// }

const dashhome = async (req, res) => {
    try {
        const course = await (await homecourse()).find().toArray()
        const choose = await (await homechoose()).find().toArray()
        const blog = await (await homeblog()).find().toArray()
        const reg = await (await homereg()).find().toArray()
        // const form = await (await homeform()).find().toArray()
        const testi = await (await testiD()).find().toArray()
        res.render('admin/dashhome', {
            homecoursed: course,
            chooseus: choose,
            homeblog: blog,
            homereg: reg,
            // homeform: form,
            testi: testi
        })
    } catch (error) {
        console.log(error.message)
    }
}

// &&&&&&&&&&&&&&&&&&&&& header 


const headerhomedata = async (req, res) => {
    try {
        const mainheading = req.body.mainheading
        const subheading = req.body.subheading
        const leftbtn = req.body.btn1
        const rightbtn = req.body.btn2
        const db = await homeheader()
        const image = await (await homeheader()).find().toArray()

        if (req.file) {
            delet(image[0].subimage)
            await db.updateOne({ page: "home" }, {
                $set: {
                    subimage: req.file.filename,
                    mainheading: mainheading,
                    leftbtn: leftbtn,
                    rightbtn: rightbtn,
                    subheading: subheading,
                }
            })
            res.redirect('/admin/dashhome')
        } else {
            await db.updateOne({ page: "home" }, {
                $set: {
                    mainheading: mainheading,
                    leftbtn: leftbtn,
                    rightbtn: rightbtn,
                    subheading: subheading
                }
            })
            res.redirect('/admin/dashhome')
        }
    } catch (error) {
        console.log(error.message)
    }
}

// %%%%%%%%%%%% about us

const aboutdata = async (req, res) => {
    try {
        const mainheading = req.body.mainheading
        const pleft = req.body.pleft
        const pright = req.body.pright
        const link = req.body.link
        const db = await homeabout()
        await db.updateMany({ section: "aboutus" }, {
            $set: {
                mainheading: mainheading,
                pleft: pleft,
                pright: pright,
                link: link
            }
        })
        res.redirect('/admin/dashhome#about')

    } catch (error) {
        console.log(error.message)
    }
}

// &&&&&&&&&&&& course 



const homecoursedata = async (req, res) => {
    try {
        const heading = req.body.heading
        const paragraph = req.body.paragraph
        const link = req.body.link
        const route = req.body.route
        const db = await homecourse()
        if (req.file) {
            await db.insertOne({
                image: req.file.filename,
                heading: heading,
                paragraph: paragraph,
                link: link,
                route: route,
            })
            res.redirect('/admin/dashhome#course')
        }
    } catch (error) {
        console.log(error.message)
    }
}
const homeedit = async (req, res) => {
    try {
        const id = req.query.id
        const course = await (await homecourse()).find({ _id: new mongo.ObjectId(id) }).toArray()
        const chooseus = await (await homechoose()).find({ _id: new mongo.ObjectId(id) }).toArray()
        const homeblogedit = await (await homeblog()).find({ _id: new mongo.ObjectId(id) }).toArray()
        const testiedit = await (await testiD()).find({ _id: new mongo.ObjectId(id) }).toArray()
        res.render('admin/edit/homeedit', {
            hcourse: course,
            chooseus: chooseus,
            blog: homeblogedit,
            testi: testiedit,
        })
    } catch (error) {
        console.log(error.message)
    }
}

const homecourseeditdata = async (req, res) => {
    try {
        const id = req.query.id
        const heading = req.body.heading
        const paragraph = req.body.paragraph
        const link = req.body.link
        const route = req.body.route
        const db = await homecourse()
        const image = await (await homecourse()).find({ _id: new mongo.ObjectId(id) }).toArray()
        if (req.file) {
            delet(image[0].image)
            await db.updateOne({ _id: new mongo.ObjectId(id) }, {
                $set: {
                    image: req.file.filename,
                    heading: heading,
                    paragraph: paragraph,
                    link: link,
                    route: route,
                }
            })
            res.redirect('/admin/dashhome#course')
        } else {
            await db.updateOne({ _id: new mongo.ObjectId(id) }, {
                $set: {
                    heading: heading,
                    paragraph: paragraph,
                    link: link,
                    route: route,
                }
            })
            res.redirect('/admin/dashhome#course')
        }
    } catch (error) {
        console.log(error.message)
    }
}

const courseremove = async (req, res) => {
    try {
        const id = req.query.id
        const image = await (await homecourse()).find({ _id: new mongo.ObjectId(id) }).toArray()
        delet(image[0].image)
        const db = await (await homecourse()).deleteOne({ _id: new mongo.ObjectId(id) })
        res.redirect('dashhome#course')
    } catch (error) {
        console.log(error.message)
    }
}

// &&&&&&&&&&&&&&&&&&&& choose us

const homechoosedata = async (req, res) => {
    try {
        const heading = req.body.heading
        const db = await homechoose()
        if (req.file) {
            await db.insertOne({
                image: req.file.filename,
                heading: heading,
            })
            res.redirect('/admin/dashhome#choose')
        }
    } catch (error) {
        console.log(error.message)
    }
}

const homechooseusedit = async (req, res) => {
    try {
        const id = req.query.id
        const heading = req.body.heading
        const db = await homechoose()
        const image = await (await homechoose()).find({ _id: new mongo.ObjectId(id) }).toArray()
        if (req.file) {
            delet(image[0].image)
            await db.updateOne({ _id: new mongo.ObjectId(id) }, {
                $set: {
                    image: req.file.filename,
                    heading: heading,
                }
            })
            res.redirect('/admin/dashhome#choose')
        } else {
            await db.updateOne({ _id: new mongo.ObjectId(id) }, {
                $set: {
                    heading: heading,
                }
            })
            res.redirect('/admin/dashhome#choose')
        }
    } catch (error) {
        console.log(error.message)
    }
}


const chooseremove = async (req, res) => {
    try {
        const id = req.query.id
        const image = await (await homechoose()).find({ _id: new mongo.ObjectId(id) }).toArray()
        delet(image[0].image)
        const db = await (await homechoose()).deleteOne({ _id: new mongo.ObjectId(id) })
        res.redirect('dashhome#choose')
    } catch (error) {
        console.log(error.message)
    }
}

// &&&&&&&&&&&&&&& blog

const homeblogdata = async (req, res) => {
    try {
        const heading = req.body.heading
        const paragraph = req.body.paragraph
        const db = await homeblog()
        if (req.file) {
            await db.insertOne({
                image: req.file.filename,
                heading: heading,
                paragraph: paragraph,
            })
            res.redirect('/admin/dashhome#blog')
        }
    } catch (error) {
        console.log(error.message)
    }
}

const homeblogedit = async (req, res) => {
    try {
        const id = req.query.id
        const heading = req.body.heading
        const paragraph = req.body.paragraph
        const db = await homeblog()
        const image = await (await homeblog()).find({ _id: new mongo.ObjectId(id) }).toArray()
        if (req.file) {
            delet(image[0].image)
            await db.updateOne({ _id: new mongo.ObjectId(id) }, {
                $set: {
                    image: req.file.filename,
                    heading: heading,
                    paragraph: paragraph,
                }
            })
            res.redirect('/admin/dashhome#blog')
        } else {
            await db.updateOne({ _id: new mongo.ObjectId(id) }, {
                $set: {
                    heading: heading,
                    paragraph: paragraph,
                }
            })
            res.redirect('/admin/dashhome#blog')
        }
    } catch (error) {
        console.log(error.message)
    }
}

const blogremove = async (req, res) => {
    try {
        const id = req.query.id
        const image = await (await homeblog()).find({ _id: new mongo.ObjectId(id) }).toArray()
        delet(image[0].image)
        const db = await (await homeblog()).deleteOne({ _id: new mongo.ObjectId(id) })
        res.redirect('/admin/dashhome#blog')
    } catch (error) {
        console.log(error.message)
    }
}

//// /// testi 

const testidata = async (req, res) => {
    try {
        const name = req.body.mainheading
        const position = req.body.subheading
        const review = req.body.paragraph
        const db = await testiD()
        if (req.file) {
            await db.insertOne({
                image: req.file.filename,
                name: name,
                position: position,
                review: review,
            })
            res.redirect('/admin/dashhome#testi')
        } else {
            await db.insertOne({
                name: name,
                position: position,
                review: review,
            })
            res.redirect('/admin')
        }
    } catch (error) {
        console.log(error.message)
    }
}

const testiedit = async (req, res) => {
    try {
        const id = req.query.id
        const name = req.body.mainheading
        const position = req.body.subheading
        const review = req.body.paragraph
        const db = await testiD()
        const image = await (await testiD()).find({ _id: new mongo.ObjectId(id) }).toArray()
        if (req.file) {
            delet(image[0].image)
            await db.updateOne({ _id: new mongo.ObjectId(id) }, {
                $set: {
                    image: req.file.filename,
                    name: name,
                    position: position,
                    review: review,
                }
            })
            res.redirect('/admin')
        } else {
            await db.updateOne({ _id: new mongo.ObjectId(id) }, {
                $set: {
                    name: name,
                    position: position,
                    review: review,
                }
            })
            res.redirect('/admin')
        }
    } catch (error) {
        console.log(error.message)
    }
}

const testiremove = async (req, res) => {
    try {
        const id = req.query.id
        const image = await (await testiD()).find({ _id: new mongo.ObjectId(id) }).toArray()
        delet(image[0].image)
        const db = await (await testiD()).deleteOne({ _id: new mongo.ObjectId(id) })
        res.redirect('/admin')
    } catch (error) {
        console.log(error.message)
    }
}

// %%%%%%%%%%%%%%%%%%%%%%%%%% reg 

const homeregdata = async (req, res) => {
    try {
        const heading = req.body.heading
        const db = await homereg()
        const image = await (await homereg()).find().toArray()
        if (req.file) {
            delet(image[0].image)
            await db.updateMany({ section: "reg" }, {
                $set: {
                    image: req.file.filename,
                    heading: heading,
                }
            })
            res.redirect('dashhome#reg')
        } else {
            await db.updateMany({ section: "reg" }, {
                $set: {
                    heading: heading,
                }
            })
            res.redirect('dashhome#reg')
        }
    } catch (error) {
        console.log(error.message)
    }
}




// %%%%%%%%%%%%%%%%%%%%%%%%% about  %%%%%%%%%%%%%% 

const aboutD = async () => {
    const db = await aboutmodel.about()
    return db
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



const dashabout = async (req, res) => {
    try {
        const learningquran = await (await aboutlearingquran()).find().toArray()
        const aboutregdata = await (await aboutreg()).find().toArray()
        const testi = await (await testiD()).find().toArray()
        res.render('admin/dashabout', {
            learningquran: learningquran,
            aboutreg: aboutregdata,
            testi: testi
        })
    } catch (error) {
        console.log(error.message)
    }
}

const aboutedit = async (req, res) => {
    try {
        const id = req.query.id
        const qurane = await (await aboutlearingquran()).find({ _id: new mongo.ObjectId(id) }).toArray()
        res.render('admin/edit/aboutedit', {
            qurane: qurane,
        })
    } catch (error) {
        console.log(error.message)
    }
}

// &&&&&&&&&&&&&&&&&&&&& header 



const headeraboutdata = async (req, res) => {
    try {
        const mainheading = req.body.mainheading
        const db = await aboutD()
        const image = await (await aboutD()).find().toArray()
        if (req.file) {
            delet(image[0].subimage)
            await db.updateMany({ page: "about" }, {
                $set: {
                    subimage: req.file.filename,
                    mainheading: mainheading,
                }
            })
            res.redirect('/admin/dashabout')
        } else {
            await db.updateMany({ page: "about" }, {
                $set: {
                    mainheading: mainheading,
                }
            })
            res.redirect('/admin/dashabout')
        }
    } catch (error) {
        console.log(error.message)
    }
}

// &&&&&&&&&&&&&&&& easyquran

const abouteasyquran = async (req, res) => {
    try {

        const heading = req.body.heading
        const paragraph = req.body.paragraph
        const easyquran = await aboutquran()
        await easyquran.updateOne({ key: "easyquran" }, {
            $set: {
                heading: heading,
                paragraph: paragraph
            }
        })
        res.redirect("dashabout#easy")

    } catch (error) {
        console.log(error.message)

    }
}

// &&&&&&&&&&&&&&&&&&&& learing quran 

const learingquran = async (req, res) => {

    try {
        const heading = req.body.heading
        const paragraph = req.body.paragraph
        const db = await aboutlearingquran()
        if (req.file) {
            await db.insertOne({
                image: req.file.filename,
                heading: heading,
                paragraph: paragraph
            })
            res.redirect('dashabout#quran')
        } else {
            await db.insertOne({
                heading: heading,
                paragraph: paragraph
            })
            res.redirect('dashabout#quran')
        }
    } catch (error) {
        console.log(error.message)
    }

}
const aboutquranedit = async (req, res) => {
    try {
        const id = req.query.id
        const heading = req.body.heading
        const paragraph = req.body.paragraph
        const db = await aboutlearingquran()
        const image = await (await aboutlearingquran()).find({ _id: new mongo.ObjectId(id) }).toArray()
        if (req.file) {
            delet(image[0].image)
            await db.updateOne({ _id: new mongo.ObjectId(id) }, {
                $set: {
                    image: req.file.filename,
                    heading: heading,
                    paragraph: paragraph
                }
            })
            res.redirect('/admin/dashabout#quran')
        } else {
            await db.updateOne({ _id: new mongo.ObjectId(id) }, {
                $set: {
                    heading: heading,
                    paragraph: paragraph
                }
            })
            res.redirect('/admin/dashabout#quran')
        }
    } catch (error) {
        console.log(error.message)
    }
}

const learningquranremove = async (req, res) => {
    try {
        const id = req.query.id
        const image = await (await aboutlearingquran()).find({ _id: new mongo.ObjectId(id) }).toArray()
        delet(image[0].image)
        const db = await (await aboutlearingquran()).deleteOne({ _id: new mongo.ObjectId(id) })
        res.redirect('/admin/dashabout#quran')
    } catch (error) {
        console.log(error.message)
    }
}


// %%%%%%%%%%%%%%%%%%%%%%%%%% reg 

const aboutregdata = async (req, res) => {
    try {
        const heading = req.body.heading
        const db = await aboutreg()
        const image = await (await aboutreg()).find().toArray()
        if (req.file) {
            delet(image[0].image)
            await db.updateOne({ section: "reg" }, {
                $set: {
                    image: req.file.filename,
                    heading: heading,
                }
            })
            res.redirect('dashabout#reg')
        } else {
            await db.updateMany({ section: "reg" }, {
                $set: {
                    heading: heading,
                }
            })
            res.redirect('dashabout#reg')
        }
    } catch (error) {
        console.log(error.message)
    }
}



// &&&&&&&&&&&&&&&&&&&& course &&&&&&&&&&&&&&&&&&&&&&&

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

const dashcourse = async (req, res) => {
    try {
        const holyqurandatapa = await (await courseholyquranpa()).find().toArray()
        const reg = await (await coursereg()).find().toArray()
        const fee = await (await coursefee()).find().toArray()
        res.render('admin/dashcourse', {
            holyquran: holyqurandatapa,
            coursereg: reg,
            fee: fee
        })
    } catch (error) {
        console.log(error.message)
    }
}

const courseedit = async (req, res) => {
    try {
        const id = req.query.id
        const header2 = await (await courseholyquranpa()).find({ _id: new mongo.ObjectId(id) }).toArray()
        const feecourse = await (await coursefee()).find({ _id: new mongo.ObjectId(id) }).toArray()
        res.render('admin/edit/courseedit', {
            header2: header2,
            feecourse: feecourse
        })
    } catch (error) {
        console.log(error.message)
    }
}
const courseheaderD = async (req, res) => {
    try {
        const heading = req.body.heading
        const db = await courseheader()
        await db.updateOne({ key: "header" }, {
            $set: {
                heading: heading
            }
        })
        res.redirect("dashcourse")
    } catch (error) {
        console.log(error.message)
    }
}
const courseholyquranD = async (req, res) => {
    try {
        const heading = req.body.heading
        const db = await courseholyquranh()
        await db.updateOne({ key: "heading" }, {
            $set: {
                heading: heading
            }
        })
        res.redirect("dashcourse#he")
    } catch (error) {
        console.log(error.message)
    }
}
const courseholyquranp = async (req, res) => {
    try {
        const paragraph = req.body.paragraph
        const db = await courseholyquranpa()
        await db.insertOne({
            paragraph: paragraph
        })
        res.redirect("dashcourse#pe")
    } catch (error) {
        console.log(error.message)
    }
}

const holyquranedit = async (req, res) => {
    try {
        const id = req.query.id
        const paragraph = req.body.paragraph
        const db = await courseholyquranpa()
        await db.updateOne({ _id: new mongo.ObjectId(id) }, {
            $set: {
                paragraph: paragraph
            }
        })
        res.redirect('/admin/dashcourse#pe')

    } catch (error) {
        console.log(error.message)
    }
}

const holyquranremove = async (req, res) => {
    try {
        const id = req.query.id
        const db = await (await coursemodel.holyquranp()).deleteOne({ _id: new mongo.ObjectId(id) })
        res.redirect('dashcourse#pe')

    } catch (error) {
        console.log(error.message)
    }
}


// %%%%%%%%%%%%%%%%%%%%%%%%%% reg 

const courseregdata = async (req, res) => {
    try {
        const heading = req.body.heading
        const db = await coursereg()
        const image = await (await coursereg()).find().toArray()
        if (req.file) {
            delet(image[0].image)
            await db.updateMany({ section: "reg" }, {
                $set: {
                    image: req.file.filename,
                    heading: heading,
                }
            })
            res.redirect('dashcourse#regi')
        } else {
            await db.updateMany({ section: "reg" }, {
                $set: {
                    heading: heading,
                }
            })
            res.redirect('dashcourse#regi')
        }
    } catch (error) {
        console.log(error.message)
    }
}

const feestructure = async (req, res) => {
    try {
        const heading = req.body.heading
        const p1 = req.body.p1
        const p2 = req.body.p2
        const amount = req.body.amount
        const db = await coursefee()
        await db.insertOne({
            heading: heading,
            p1: p1,
            p2: p2,
            amount: amount
        })
        res.redirect("dashcourse#fee")
    } catch (error) {
        console.log(error.message)
    }
}

const feestructureedit = async (req, res) => {
    try {
        const id = req.query.id
        const heading = req.body.heading
        const p1 = req.body.p1
        const p2 = req.body.p2
        const amount = req.body.amount
        const db = await coursefee()
        await db.updateOne({ _id: new mongo.ObjectId(id) }, {
            $set: {
                heading: heading,
                p1: p1,
                p2: p2,
                amount: amount
            }
        })
        res.redirect('/admin/dashcourse#fee')

    } catch (error) {
        console.log(error.message)
    }
}


const feeremove = async (req, res) => {
    try {
        const id = req.query.id
        const db = await (await coursemodel.coursefee()).deleteOne({ _id: new mongo.ObjectId(id) })
        res.redirect('dashcourse#fee')

    } catch (error) {
        console.log(error.message)
    }
}








// %%%%%%%%%%%%%%%%%%%%%%%%% teacher  %%%%%%%%%%%%%% 

const teacherD = async () => {
    const db = await teachermodel.header()
    return db
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


const dashteacher = async (req, res) => {
    try {
        const teamd = await (await team()).find().toArray()
        res.render('admin/dashteacher', {
            team: teamd
        })
    } catch (error) {
        console.log(error.message)
    }
}

const teacheredit = async (req, res) => {
    try {
        const id = req.query.id
        const teamd = await (await team()).find({ _id: new mongo.ObjectId(id) }).toArray()
        res.render('admin/edit/teacheredit', {
            team: teamd,
        })
    } catch (error) {
        console.log(error.message)
    }
}

// &&&&&&&&&&&&&&&&&&&&& header 


const headerteacherdata = async (req, res) => {
    try {
        const mainheading = req.body.mainheading
        const db = await teacherD()
        await db.updateOne({ page: "teacher" }, { $set: { mainheading: mainheading } })
        res.redirect('/admin/dashteacher')
    } catch (error) {
        console.log(error.message)
    }
}
const teacherpdata = async (req, res) => {
    try {
        const heading = req.body.heading
        const paragraph = req.body.paragraph
        const db = await teacherp()
        await db.updateOne({ key: "teacherp" }, {
            $set: {
                heading: heading,
                paragraph: paragraph
            }
        })
        res.redirect('/admin/dashteacher#tutor')
    } catch (error) {
        console.log(error.message)
    }
}


const ftdata = async (req, res) => {
    try {
        const heading = req.body.heading
        const p1 = req.body.p1
        const p2 = req.body.p2
        const db = await ft()
        const image = await (await ft()).find().toArray()
        if (req.file) {
            delet(image[0].image)
            await db.updateOne({ key: "ft" }, {
                $set: {
                    image: req.file.filename,
                    heading: heading,
                    p1: p1,
                    p2: p2
                }
            })
            res.redirect('dashteacher#ft')
        } else {
            await db.updateOne({ key: 'ft' }, {
                $set: {
                    heading: heading,
                    p1: p1,
                    p2: p2
                }
            })
            res.redirect('dashteacher#ft')
        }
    } catch (error) {
        console.log(error.message)
    }

}
const teammem = async (req, res) => {
    try {
        const name = req.body.name
        const language = req.body.language
        const db = await team()
        if (req.file) {
            await db.insertOne({
                image: req.file.filename,
                name: name,
                language: language
            })
            res.redirect('dashteacher#team')
        }
    } catch (error) {
        console.log(error.message)
    }

}
const teamedit = async (req, res) => {
    try {
        const id = req.query.id
        const name = req.body.name
        const language = req.body.language
        const db = await team()
        const image = await (await team()).find({ _id: new mongo.ObjectId(id) }).toArray()
        if (req.file) {
            delet(image[0].image)
            await db.updateOne({ _id: new mongo.ObjectId(id) }, {
                $set: {
                    image: req.file.filename,
                    name: name,
                    language: language
                }
            })
            res.redirect('/admin/dashteacher#team')
        } else {
            await db.updateOne({ _id: new mongo.ObjectId(id) }, {
                $set: {
                    name: name,
                    language: language
                }
            })
            res.redirect('/admin/dashteacher#team')
        }
    } catch (error) {
        console.log(error.message)
    }
}



const teamremove = async (req, res) => {
    try {
        const id = req.query.id
        const image = await (await team()).find({ _id: new mongo.ObjectId(id) }).toArray()
        delet(image[0].image)
        const db = await (await teachermodel.team()).deleteOne({ _id: new mongo.ObjectId(id) })
        res.redirect('dashteacher#team')

    } catch (error) {
        console.log(error.message)
    }
}

const teachercontact = async (req, res) => {
    try {
        const heading = req.body.heading
        const btn = req.body.btn
        const route = req.body.btnroute
        const db = await tchcontact()
        await db.updateOne({ key: "contact" }, {
            $set: {
                heading: heading,
                btn: btn,
                route: route
            }
        })
        res.redirect('dashteacher#contact')
    } catch (error) {
        console.log(error.message)
    }

}






// %%%%%%%%%%%%%%%%%%%%%%%%% blog  %%%%%%%%%%%%%% 

const blogD = async () => {
    const db = await blogmodel.header()
    return db
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



const dashblog = async (req, res) => {
    try {
        const blogblogdata = await (await blogblog()).find().toArray()
        res.render('admin/dashblog', {
            blog: blogblogdata
        })
    } catch (error) {
        console.log(error.message)
    }
}

const blogedit = async (req, res) => {
    try {
        const id = req.query.id
        const blogblogd = await (await blogblog()).find({ _id: new mongo.ObjectId(id) }).toArray()
        res.render('admin/edit/blogedit', {
            blog: blogblogd,
        })
    } catch (error) {
        console.log(error.message)
    }
}

// &&&&&&&&&&&&&&&&&&&&& header 


const headerblogdata = async (req, res) => {
    try {
        const mainheading = req.body.mainheading
        const db = await blogD()
        await db.updateOne({ page: "blog" }, { $set: { mainheading: mainheading } })
        res.redirect('/admin')
    } catch (error) {
        console.log(error.message)
    }
}

const blogpdata = async (req, res) => {
    try {
        const heading = req.body.heading
        const paragraph = req.body.paragraph
        const db = await section2()
        await db.updateOne({ key: "section2" }, {
            $set: {
                heading: heading,
                paragraph: paragraph
            }
        })
        res.redirect('/admin/dashblog#no2')
    } catch (error) {
        console.log(error.message)
    }
}

// &&&&&&&&&&&&&&& blog

const blogblogdata = async (req, res) => {
    try {
        const heading = req.body.heading
        const paragraph = req.body.paragraph
        const db = await blogblog()
        if (req.file) {
            await db.insertOne({
                image: req.file.filename,
                heading: heading,
                paragraph: paragraph,
            })
            res.redirect('/admin/dashblog#blog')
        }
    } catch (error) {
        console.log(error.message)
    }
}

const blogblogedit = async (req, res) => {
    try {
        const id = req.query.id
        const heading = req.body.heading
        const paragraph = req.body.paragraph
        const db = await blogblog()
        const image = await (await blogblog()).find({ _id: new mongo.ObjectId(id) }).toArray()
        if (req.file) {
            delet(image[0].image)
            await db.updateOne({ _id: new mongo.ObjectId(id) }, {
                $set: {
                    image: req.file.filename,
                    heading: heading,
                    paragraph: paragraph,
                }
            })
            res.redirect('/admin/dashblog#blog')
        } else {
            await db.updateOne({ _id: new mongo.ObjectId(id) }, {
                $set: {
                    heading: heading,
                    paragraph: paragraph,
                }
            })
            res.redirect('/admin/dashblog#blog')
        }
    } catch (error) {
        console.log(error.message)
    }
}



const blogblogremove = async (req, res) => {
    try {
        const id = req.query.id
        const image = await (await blogblog()).find({ _id: new mongo.ObjectId(id) }).toArray()
        delet(image[0].image)
        const db = await (await blogblog()).deleteOne({ _id: new mongo.ObjectId(id) })
        res.redirect('/admin/dashblog#blog')
    } catch (error) {
        console.log(error.message)
    }
}

const blogregdata = async (req, res) => {
    try {
        const heading = req.body.heading
        const btn = req.body.btn
        const route = req.body.btnroute
        const db = await blogreg()
        await db.updateOne({ key: "reg" }, {
            $set: {
                heading: heading,
                btn: btn,
                route: route
            }
        })
        res.redirect('dashblog#contact')
    } catch (error) {
        console.log(error.message)
    }

}










// %%%%%%%%%%%%%%%%%%%%%%%%% contact  %%%%%%%%%%%%%% 

const contactD = async () => {
    const db = await contactmodel.header()
    return db
}
const contactp = async () => {
    const db = await contactmodel.contactp()
    return db
}
const info = async () => {
    const db = await contactmodel.info()
    return db
}



const dashcontact = async (req, res) => {
    try {
        const infodata = await (await info()).find().toArray()
        res.render('admin/dashcontact', {
            info: infodata
        })
    } catch (error) {
        console.log(error.message)
    }
}

const contactedit = async (req, res) => {
    try {
        const id = req.query.id
        const infod = await (await info()).find({ _id: new mongo.ObjectId(id) }).toArray()
        res.render('admin/edit/contactedit', {
            info: infod,
        })
    } catch (error) {
        console.log(error.message)
    }
}

// &&&&&&&&&&&&&&&&&&&&& header 


const headercontactdata = async (req, res) => {
    try {
        const mainheading = req.body.mainheading
        const db = await contactD()
        await db.updateOne({ page: "contact" }, { $set: { mainheading: mainheading } })
        res.redirect('/admin')
    } catch (error) {
        console.log(error.message)
    }
}



const contactpdata = async (req, res) => {
    try {
        const heading = req.body.heading
        const paragraph = req.body.paragraph
        const db = await contactp()
        await db.updateOne({ key: "contactp" }, {
            $set: {
                heading: heading,
                paragraph: paragraph
            }
        })
        res.redirect('/admin/dashcontact#tutor')
    } catch (error) {
        console.log(error.message)
    }
}

const contactinfo = async (req, res) => {
    try {
        const icon = req.body.icon
        const heading = req.body.heading
        const paragraph = req.body.p
        const db = await info()
        if (req.file) {
            await db.insertOne({
                image: req.file.filename,
                icon: icon,
                heading: heading,
                paragraph: paragraph,
            })
            res.redirect('dashcontact#info')
        } else {
            await db.insertOne({
                icon: icon,
                heading: heading,
                paragraph: paragraph,
            })
            res.redirect('dashcontact#info')
        }
    } catch (error) {
        console.log(error.message)
    }
}

const infoedit = async (req, res) => {
    try {
        const id = req.query.id
        const icon = req.body.icon
        const heading = req.body.heading
        const paragraph = req.body.p
        const db = await info()
        await db.updateOne({ _id: new mongo.ObjectId(id) }, {
            $set: {
                icon: icon,
                heading: heading,
                paragraph: paragraph,
            }
        })
        res.redirect('/admin/dashcontact#info')

    } catch (error) {
        console.log(error.message)
    }
}


const contactinforemove = async (req, res) => {
    try {
        const id = req.query.id
        const db = await (await info()).deleteOne({ _id: new mongo.ObjectId(id) })
        res.redirect('/admin/dashcontact#info')
    } catch (error) {
        console.log(error.message)
    }
}


// %%%%%%%%%%%%%%%%%%%% registration %%%%%%%%%%%%%%%%%%%%
const regheader = async () => {
    const db = await registrationmodel.header()
    return db
}
const regheader2 = async () => {
    const db = await registrationmodel.header2()
    return db
}


const registration = async (req, res) => {
    try {
        res.render('admin/dashregistration')
    } catch (error) {
        console.log(error.message)
    }
}

const regheaderdata = async (req, res) => {
    try {
        const heading = req.body.heading
        const db = await regheader()
        await db.updateOne({ key: "header" }, {
            $set: {
                heading: heading,
            }
        })
        res.redirect("dashregistration")
    } catch (error) {
        console.log(error.message)
    }
}
const regheader2data = async (req, res) => {
    try {
        const paragraph = req.body.p
        const db = await regheader2()
        await db.updateOne({ key: "header2" }, {
            $set: {
                paragraph: paragraph,
            }
        })
        res.redirect("dashregistration")
    } catch (error) {
        console.log(error.message)
    }
}





// %%%%%%%%%%%%%%%%%%%%%%%%%% footer %%%%%%%%%%%%%%%%%%%%%
const footerline1icon = async () => {
    const db = await footermodel.line1icon()
    const rsl = await db.find().toArray()
    return rsl
}
const footerline3 = async () => {
    const db = await footermodel.line3()
    return db
}
const footerline1 = async () => {
    const db = await footermodel.line1()
    return db
}
const footerline2 = async () => {
    const db = await footermodel.line2()
    return db
}
const footerline4 = async () => {
    const db = await footermodel.line4()
    return db
}

const footerdash = async (req, res) => {
    try {
        const line1icon = await footerline1icon()
        const line2 = await (await footerline2()).find().toArray()
        const line3 = await (await footerline3()).find().toArray()
        const line4 = await (await footerline4()).find().toArray()
        res.render('admin/dashfooter', {
            line1icon: line1icon,
            line2: line2,
            line3: line3,
            line4: line4

        })
    } catch (error) {
        console.log(error.message)
    }
}

const footeredit = async (req, res) => {
    try {
        const id = req.query.id
        const footerline1icond = await (await footermodel.line1icon()).find({ _id: new mongo.ObjectId(id) }).toArray()
        const footerline2d = await (await footerline2()).find({ _id: new mongo.ObjectId(id) }).toArray()
        const footerline3d = await (await footerline3()).find({ _id: new mongo.ObjectId(id) }).toArray()
        const footerline4d = await (await footerline4()).find({ _id: new mongo.ObjectId(id) }).toArray()
        res.render('admin/edit/footeredit', {
            line1icond: footerline1icond,
            line2d: footerline2d,
            line3d: footerline3d,
            line4d: footerline4d,
        })
    } catch (error) {
        console.log(error.message)
    }
}


const newicon = async (req, res) => {
    try {
        const icon = req.body.icon
        const route = req.body.route
        const db = await (await footermodel.line1icon()).insertOne({
            icon: icon,
            route: route
        })
        res.redirect('dashfooter#line1icon')
    } catch (error) {
        console.log(error.message)
    }
}

const line1edit = async (req, res) => {
    try {
        const id = req.query.id
        const icon = req.body.icon
        const route = req.body.route
        const db = await footermodel.line1icon()
        await db.updateOne({ _id: new mongo.ObjectId(id) }, {
            $set: {
                icon: icon,
                route: route
            }
        })
        res.redirect('/admin/dashfooter#line1icon')

    } catch (error) {
        console.log(error.message)
    }
}

const line1iconremove = async (req, res) => {
    try {
        const id = req.query.id
        const db = await (await footermodel.line1icon()).deleteOne({ _id: new mongo.ObjectId(id) })
        res.redirect('dashfooter#line1icon')

    } catch (error) {
        console.log(error.message)
    }
}

const line1data = async (req, res) => {
    try {
        const logo = req.body.logo
        const route = req.body.route
        const heading = req.body.heading
        const db = await footerline1()
        await db.updateOne({ key: "line1" }, {
            $set: {
                logo: logo,
                route: route,
                heading: heading,
            }
        })
        res.redirect("dashfooter")
    } catch (error) {
        console.log(error.message)
    }
}
const line2data = async (req, res) => {
    try {
        const item = req.body.itemname
        const route = req.body.route
        const db = await footerline2()
        await db.insertOne({
            item: item,
            route: route
        })
        res.redirect("dashfooter#line2")
    } catch (error) {
        console.log(error.message)
    }
}

const line2edit = async (req, res) => {
    try {
        const id = req.query.id
        const item = req.body.itemname
        const route = req.body.route
        const db = await footerline2()
        await db.updateOne({ _id: new mongo.ObjectId(id) }, {
            $set: {
                item: item,
                route: route
            }
        })
        res.redirect('/admin/dashfooter#line2')

    } catch (error) {
        console.log(error.message)
    }
}
const line2remove = async (req, res) => {
    try {
        const id = req.query.id
        const db = await (await footermodel.line2()).deleteOne({ _id: new mongo.ObjectId(id) })
        res.redirect('dashfooter#line2')

    } catch (error) {
        console.log(error.message)
    }
}

const line3data = async (req, res) => {
    try {
        const icon = req.body.icon
        const heading = req.body.heading
        const href = req.body.href
        const db = await footerline3()
        await db.insertOne({
            heading: heading,
            icon: icon,
            href: href
        })
        res.redirect("dashfooter#line3")
    } catch (error) {
        console.log(error.message)
    }
}

const line3edit = async (req, res) => {
    try {
        const id = req.query.id
        const icon = req.body.icon
        const heading = req.body.heading
        const href = req.body.href
        const db = await footerline3()
        await db.updateOne({ _id: new mongo.ObjectId(id) }, {
            $set: {
                heading: heading,
                icon: icon,
                href: href
            }
        })
        res.redirect('/admin/dashfooter#line3')

    } catch (error) {
        console.log(error.message)
    }
}

const line3remove = async (req, res) => {
    try {
        const id = req.query.id
        const db = await (await footermodel.line3()).deleteOne({ _id: new mongo.ObjectId(id) })
        res.redirect('dashfooter#line3')

    } catch (error) {
        console.log(error.message)
    }
}

const line4data = async (req, res) => {
    try {
        const item = req.body.itemname
        const route = req.body.route
        const db = await footerline4()
        await db.insertOne({
            item: item,
            route: route
        })
        res.redirect("dashfooter#line4")
    } catch (error) {
        console.log(error.message)
    }
}

const line4edit = async (req, res) => {
    try {
        const id = req.query.id
        const item = req.body.itemname
        const route = req.body.route
        const db = await footerline4()
        await db.updateOne({ _id: new mongo.ObjectId(id) }, {
            $set: {
                item: item,
                route: route
            }
        })
        res.redirect('/admin/dashfooter#line4')

    } catch (error) {
        console.log(error.message)
    }
}



const line4remove = async (req, res) => {
    try {
        const id = req.query.id
        const db = await (await footermodel.line4()).deleteOne({ _id: new mongo.ObjectId(id) })
        res.redirect('dashfooter#line4')

    } catch (error) {
        console.log(error.message)
    }
}


// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&& form 

const userform = async () => {
    const db = await form.formtrial()
    return db
}
const adminformd = async () => {
    const db = await form.adminform()
    return db
}
const padmind = async () => {
    const db = await form.padmin()
    return db
}
const finale = async () => {
    const db = await form.formfinale()
    return db
}
const Cform = async () => {
    const db = await form.formcontact()
    return db
}


const allform = async (req, res) => {
    try {
        const formdata1 = await (await userform()).find({ key: "withoutreq" }).toArray()
        const formdata2 = await (await userform()).find({ key: "requirements" }).toArray()
        res.render('admin/dashform', {
            user: formdata1,
            userreq: formdata2
        })
    } catch (error) {
        console.log(error.message)
    }
}
const contactform = async (req, res) => {
    try {
        const cform = await (await Cform()).find().toArray()
        res.render('admin/dashcontactform', {
            user: cform
        })
    } catch (error) {
        console.log(error.message)
    }
}

const finaleform = async (req, res) => {
    try {
        const finaledata1 = await (await finale()).find({ key: "withoutreq" }).toArray()
        const finaledata2 = await (await finale()).find({ key: "requirements" }).toArray()
        res.render('admin/dashfinale', {
            finale: finaledata1,
            userreq: finaledata2
        })
    } catch (error) {
        console.log(error.message)
    }
}

const userupdate = async (req, res) => {
    try {
        const db = await finale()
        const data = req.body
        for (let key in data) {
            const formdata = await (await userform()).findOne({ _id: new mongo.ObjectId(key) })
            await db.insertOne(formdata)
            await (await userform()).deleteOne({ _id: new mongo.ObjectId(key) })
        }
        res.redirect('freetrialform')
    } catch (error) {
        console.log(error.message)
    }
}

const userremove = async (req, res) => {
    try {
        const id = req.query.id
        const db = await (await userform()).deleteOne({ _id: new mongo.ObjectId(id) })
        res.redirect('freetrialform')
    } catch (error) {
        console.log(error.message)
    }
}
const finaleremove = async (req, res) => {
    try {
        const id = req.query.id
        const db = await (await finale()).deleteOne({ _id: new mongo.ObjectId(id) })
        res.redirect('finaleform')
    } catch (error) {
        console.log(error.message)
    }
}
const contactformremove = async (req, res) => {
    try {
        const id = req.query.id
        const db = await (await Cform()).deleteOne({ _id: new mongo.ObjectId(id) })
        res.redirect('contactform')
    } catch (error) {
        console.log(error.message)
    }
}


const adminform = async (req, res) => {
    try {
        const data2 = await (await adminformd()).find({ key: '0' }).toArray()
        const data = await (await adminformd()).find({ key: '1' }).toArray()
        res.render('admin/adminform', {
            user: data2,
            userreq: data
        })
    } catch (error) {
        console.log(error.message)
    }
}

const admindone = async (req, res) => {
    try {
        const id = req.query.id
        const db = await adminformd()
        await (await adminformd()).updateOne({ _id: new mongo.ObjectId(id) }, { $set: { key: '1' } })
        res.redirect('adminform')
    } catch (error) {
        console.log(error.message)
    }
}

const adminremove = async (req, res) => {
    try {
        const id = req.query.id
        const db = await (await adminformd()).deleteOne({ _id: new mongo.ObjectId(id) })
        res.redirect('adminform')
    } catch (error) {
        console.log(error.message)
    }
}




const logout = async (req, res) => {
    try {
        req.session.destroy()
        res.redirect("/login")
    } catch (error) {
        console.log(error.message)
    }
}





module.exports = {
    admin,
    navdash,
    remove,
    addpage,
    // %%%%%%%%%%%%%% home
    dashhome,
    headerhomedata,
    aboutdata,
    homecoursedata,
    homecourseeditdata,
    homeedit,
    courseremove,
    homechoosedata,
    homechooseusedit,
    chooseremove,
    homeblogdata,
    homeblogedit,
    blogremove,
    testidata,
    testiedit,
    testiremove,
    homeregdata,
    // %%%%%%%%%%%%%%% about
    dashabout,
    aboutedit,
    headeraboutdata,
    abouteasyquran,
    learingquran,
    aboutquranedit,
    learningquranremove,
    aboutregdata,

    // &&&&&&&&&&&& course

    dashcourse,
    courseedit,
    holyquranedit,
    courseheaderD,
    courseholyquranD,
    courseholyquranp,
    holyquranremove,
    courseregdata,
    feestructure,
    feestructureedit,
    feeremove,




    // %%%%%%%%%%%%%%%% teacher
    dashteacher,
    teacheredit,
    headerteacherdata,
    teacherpdata,
    ftdata,
    teammem,
    teamedit,
    teamremove,
    teachercontact,




    // %%%%%%%%%%%%%%%%% blog
    dashblog,
    blogedit,
    headerblogdata,
    blogpdata,
    blogblogdata,
    blogblogedit,
    blogblogremove,
    blogregdata,



    // %%%%%%%%%%%%%% contact
    dashcontact,
    contactedit,
    headercontactdata,
    contactpdata,
    contactinfo,
    infoedit,
    contactinforemove,

    // ############### registration

    registration,
    regheaderdata,
    regheader2data,

    // %%%%%%%%%%%%%%% footer 
    footerdash,
    footeredit,
    newicon,
    line1edit,
    line1iconremove,
    line1data,
    line2data,
    line2edit,
    line2remove,
    line3data,
    line3edit,
    line3remove,
    line4data,
    line4edit,
    line4remove,

    // ^^^^^^^^^^^^^^^ form
    adminform,
    adminremove,
    admindone,
    allform,
    finaleform,
    userupdate,
    userremove,
    finaleremove,
    contactform,
    contactformremove,
    logout
}
