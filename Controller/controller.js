const {User,Profile} = require("../models/index")

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

  static tabelUser(req,res){
    User.findAll()
    .then((result) => {
        // console.log(result);
        res.render('tabelUserHome',{tabelUsers:result})
    }).catch((err) => {
        res.send(err)
    });
  }

  static formAddUser(req,res){
    res.render('formAddUser')
  }

  static handlerAddUser(req,res){
    let {username,password,typeUser} =req.body
    User.create({
        username,password,typeUser
    })
    .then((result) => {
        res.redirect('/admins/tabelUser')
    }).catch((err) => {
        res.send(err)
    });
  }

  static formEditUser(req,res){
    let {id}=req.params
    User.findOne({
        where :{
            id:id
        }
    })
    .then((result) => {
        res.render('formEditUser',{editUsers:result})
    }).catch((err) => {
        res.send(err)
    });
  }

  static handlerEditAddUser(req,res){
    let {id}=req.params
    let {username,password,typeUser}=req.body
    
    User.update({
        username,password,typeUser
    },{
        where:{
            id:id
        }
    })
    .then((result) => {
        res.redirect('/admins//tabelUsers')
    }).catch((err) => {
        res.send(err);
    });
  }

  static deleteUser(req,res){
    let {id}=req.params
    User.destroy({
        where:{
            id:id
        }
    })
    .then((result) => {
        res.redirect('/admins/tabelUsers')
    }).catch((err) => {
        res.send(err)
    });
  }

  ///profiles
  static formProfile(req,res){
    res.render('formProfile')
  }
  static  handlerProfile(req,res){
    let {id}=req.params
    //id dapet dari mana harus login dikirimkan
    let {username,password,firstName,lastName,wallet,phoneNumber,email} =req.body
    Profile.update({
        username,password,firstName,lastName,wallet,phoneNumber,email
    },{
        where:{
            id:id
        }
    })
    .then((result) => {
        res.redirect('/users')
    }).catch((err) => {
        res.send(err);
    });
  }

}
module.exports =Controller
