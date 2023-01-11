class Controller{

  static home(req,res){
    res.render('home')
  }
  static homeAdmin(req,res){
    res.render('homeAdmin')
  }

  static homeUser(req,res){
    res.render('homeUser')
  }

}
module.exports =Controller