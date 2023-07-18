const no = (req , res , next)=>{
    try{
      if(req.session.user_id){
      }else{
        res.redirect('/login')
      }
      next()
    }catch(error){console.log(error.message)}
  }

const yes = (req , res , next)=>{
    try{
      if(req.session.user_id){
        res.redirect('/admin')
      }
      next()
    }catch(error){console.log(error.message)}
  }

  const admin = (req , res , next)=>{
    try{
      if(req.session.admin_id){
      }else{
        res.redirect('/admin')
      }
      next()
    }catch(error){console.log(error.message)}
  }


module.exports = {
  no,
  yes,
  admin
}