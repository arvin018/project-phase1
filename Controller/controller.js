
const { User, Profile, Category, Product, Company, Transaction, Sequelize } = require("../models/index")
const bcrypt = require('bcryptjs');
const { formatRupiah, buy } = require("../helpers/helper");
const { Op } = require("sequelize");

class Controller {

  static home(req, res) {
    const { category, search } = req.query
    const { error } = req.query

    let option = {
      where: {},
      include: {
        model: Product,
        attributes: ['id', 'name', 'imageUrl'],
        where: {},
      }
    }
    // [Sequelize.fn('DISTINCT', Sequelize.col('country')) ,'country']
    if (search) {
      option.include.where.name = {
        [Op.iLike]: `%${search}%`
      }
    }
    
    if (category) {
      option.where.name = {
        [Op.iLike]: `%${category}%`
      }
    }

    Category.findAll(option)
      .then((data) => {
        // res.send(data)
        res.render('home', { data, error })
      })
      .catch((err) => {
        res.send(err)
      })
  }

  static buyProduct(req, res) {
    let { fail } = req.query
    // console.log(fail);
    const { id } = req.params
    // console.log(id);
    let UserId = req.session.userId
    let data;
    Product.findAll({
      where: {
        "name": id
      }
    })
      .then((final) => {
        data = final
        return  Profile.findAll({
          where:{
            UserId:UserId
          }
        })
      })
      .then((result)=>{
        res.render('buyProduct', { data, formatRupiah, profile:result, fail })
      })
      .catch((err) => {
        res.send(err)
      })
  }

  static buyProcess(req, res) {
    let  { idGame, productId } = req.body
    let  UserId = req.session.userId
    // res.send ('masuk sinii')
    // console.log(UserId);

    let data = []
    Product.findByPk(UserId)
    .then((result) => {
        // res.send(result)
        // console.log(+wallet);
        // console.log(result.price);
        // console.log(Number(wallet)-result.price);
        data.push(result)
          let time = new Date().getTime()
          console.log(time)
          return Transaction.create({
            UserId:UserId,
            ProductId:productId,
            invoice:"OD"+idGame+"-"+productId+"-"+time
          })

        .then((result4)=>{
          res.redirect('/users/invoice')
        })
    }).catch((err) => {
      res.send(err)
    });
  }

  static homeAdmin(req, res) {
    let username = req.session.username
    let role = req.session.role
    res.render('homeAdmin', { username, role })
  }

  static tabelInvoiceAdmin(req,res){
    Transaction.findAll()
      .then((result) => {
        res.render('tabelInvoiceAdmin', { tabelInvoiceAdmin:result })
      }).catch((err) => {
        res.send(err)
      });
   }

   static TabelInvoice (req,res){
    let UserId = req.session.userId
    Transaction.findAll({
      where:{
        UserId
      }
    }
    )
      .then((result) => {
        // res.send(result)
        res.render('tabelInvoiceUser', { tabelInvoice:result })
      }).catch((err) => {
        res.send(err)
      });
   }

  static homeUser(req, res) {
    const { category, search } = req.query
    const { error } =req.query

    let option = {
      where: {},
      include: {
        model: Product,
        attributes: ['id', 'name', 'imageUrl'],
        where: {},
      }
    }
    // [Sequelize.fn('DISTINCT', Sequelize.col('country')) ,'country']
    if (search) {
      option.include.where.name = {
        [Op.iLike]: `%${search}%`
      }
    }
    
    if (category) {
      option.where.name = {
        [Op.iLike]: `%${category}%`
      }
    }

    Category.findAll(option)
      .then((data) => {
        // res.send(data)
        res.render('homeUser', { data, error })
      })
      .catch((err) => {
        res.send(err)
      })
  }

  static tabelUser(req, res) {
    User.findAll()
      .then((result) => {
        // console.log(result);
        res.render('tabelUserHome', { tabelUsers: result })
      }).catch((err) => {
        res.send(err)
      });
  }

  static formAddUser(req, res) {
    res.render('formAddUser')
  }

  static handlerAddUser(req, res) {
    let { username, password, role } = req.body
    User.create({
      username, password, role
    })
      .then((result) => {

        return Profile.create({
          firstName:'',
          lastName:'',
          phoneNumber:'',
          email:'',
          UserId:result.id
        })
        .then((data)=>{
          res.redirect('/admins/tabelUsers')
        })
      }).catch((err) => {
        res.send(err)
      });
  }

  static formEditUser(req, res) {
    let { id } = req.params
    User.findOne({
      where: {
        id: id
      }
    })
      .then((result) => {
        res.render('formEditUser', { editUsers: result })
      }).catch((err) => {
        res.send(err)
      });
  }

  static handlerEditAddUser(req, res) {
    let { id } = req.params
    let { username, password, role } = req.body

    User.update({
      username, password, role
    }, {
      where: {
        id: id
      }
    })
      .then((result) => {
        res.redirect('/admins//tabelUsers')
      }).catch((err) => {
        res.send(err);
      });
  }

  static deleteUser(req, res) {
    let { id } = req.params
    User.destroy({
      where: {
        id: id
      }
    })
      .then((result) => {
        res.redirect('/admins/tabelUsers')
      }).catch((err) => {
        res.send(err)
      });
  }

  static tabelCategory(req, res) {
    Category.findAll()
      .then((result) => {
        res.render('tabelCategory', { tabelCategory: result })
      }).catch((err) => {
        res.send(err);
      });
  }
  static formAddCategory(req,res){
    res.render('formAddCategory')
  }

  static handlAddCategory(req,res){
    let { name } =req.body
    Category.create({
      name:name
    })
    .then((result) => {
      res.redirect('/admins/tabelCategory')
    }).catch((err) => {
      res.send(err)
    });
  }

  static FormEditCategory(req, res) {
   
    let { id } = req.params
    Category.findOne({
      where: {
        id:id
      }
    })
      .then((result) => {
        res.render('formEditCategory', { category: result })
      }).catch((err) => {
        res.send(err)
      });
  }

  static handletEditCategory (req,res){
    let { name } = req.body
    let { id } = req.params
    Category.update({
      name:name
    },{
      where:{
        id:id
      }
    })
    .then((result) => {
      res.redirect('/admins/tabelCategory')
    }).catch((err) => {
      res.send(err)
    });
  }

  //Product Admins
  static tabelProduct (req,res){
    Product.findAll()
    .then((result) => {
      res.render('tabelProduct', { tabelProduct:result })
    }).catch((err) => {
      res.send(err)
    });
  }

  // Company Admins
  static tabelCompany(req,res){
    Company.findAll()
    .then((result) => {
      res.render('tabelCompany', { tabelCompany:result })
    }).catch((err) => {
      res.send(err)
    });
  }

  static formAddCompany(req,res){
    res.render('formAddCompany')
  }

  static handlerAddCompany(req,res){
    let { name, address, phoneNumber } = req.body
    Company.create({
      name,address,phoneNumber
    })
    .then((result) => {
      res.redirect('/admins/tabelCompanys')
    }).catch((err) => {
      res.send(err)
    });
  }

  static formEditCompany(req,res){
    let { id } = req.params
    Company.findOne({
      where:{
        id:id
      }
    })
    .then((result) => {
      res.render('formEditCompany', { editCompany:result })
    }).catch((err) => {
      res.send(err)
    });
  }

  static handlerEditCompany(req,res){
    let { id } = req.params
    let { name, address, phoneNumber } = req.body
    Company.update({
      name,address,phoneNumber
    },{
      where:{
        id:id
      }
    })
    .then((result) => {
      res.redirect('/admins/tabelCompanys')
    }).catch((err) => {
      res.send(err)
    });
  }

  // Product
  static formAddProduct(req,res){
    let { error } = req.query
    console.log(error);
    res.render('formAddProduct', { error })
  }

  static handlerAddProduct(req,res){
    console.log("masuk sini");
    let { name, denom, price, description, CategoryId, CompanyId, imageUrl } = req.body
    // console.log(name,denom,price,description,CategoryId,CompanyId,imageUrl);
    Product.create({
      name,denom,price,description,CategoryId,CompanyId,imageUrl
    })
    .then((result) => {
      res.redirect('/admins/tabelProducts')
    }).catch((err) => {
      if (err.name === 'SequelizeValidationError') {
        res.redirect(`/admins/addPrdoucts?error=${err.errors.map(el=>{
          return el.message
        })}`)
      } else {
        res.send(err)
      }
    });
  }

  static formEditProduct(req,res){
    let { id } = req.params
    Product.findOne({
      where:{
        id:id
      }
    })
    .then((result) => {
      res.render('formEditProduct', { editProduct:result })
    }).catch((err) => {
      res.send(err)
    });
  }

  static handlerEditProduct(req,res){
    let { id } = req.params
    let { name, denom, price, description, CategoryId, CompanyId, imageUrl } = req.body
    Product.update({
      name,denom,price,description,CategoryId,CompanyId,imageUrl
    },{
      where:{
        id:id
      }
    })
    .then((result) => {
      res.redirect('/admins/tabelProducts')
    }).catch((err) => {
      res.send(err)
    });
  }

  static deleteProduct (req,res){
    let { id } = req.params
    Product.destroy({
      where:{
        id:id
      }
    })
    .then((result) => {
      res.redirect('/admins/tabelProducts')
    }).catch((err) => {
      res.send(err)
    });
  }

  ///profiles Users
  static formProfile(req, res) {
    let  UserId = req.session.userId
    // console.log(userId);

    Profile.findAll({
      where:{
        UserId:UserId
      }
    })
    .then((result) => {
      // res.send(result)
      res.render('formProfile', { profile:result })
    }).catch((err) => {
      res.send(err)
    });
  }
  
  static handlerProfile(req, res) {
    let  userId = req.session.userId
    console.log(userId);
    //id dapet dari mana harus login dikirimkan
    let { username, password, firstName, lastName, wallet, phoneNumber, email } = req.body

    Profile.update({
      username, password, firstName, lastName, wallet, phoneNumber, email
    }, {
      where: {
        id: userId
      }
    })
      .then((result) => {
        res.redirect('/users')
      }).catch((err) => {
        res.send(err);
      });
  }

  /// User register
  static formRegister(req,res){
    res.render('formRegisterUser')
  }

  static handlerAddRegister(req,res){
    let { username, password} = req.body
    User.create({
      username,password,role:'user'
    }, {returning: true} )
    .then((result) => {
      // res.send(result)
      console.log(result.id);
      return Profile.create({
        firstName:'',
        lastName:'',
        phoneNumber:'',
        wallet:0,
        email:'',
        UserId:result.id
      })
      .then((data)=>{
        res.redirect('/')
      })
    }).catch((err) => {
      res.send(err)
    });
  }
  
  /// User login 
   static handlerLogin(req,res){
    let { username, password } = req.body

    User.findOne({where:{username}})
    .then(user=>{
      if(user){
        const isValidPassword = bcrypt.compareSync(password,user.password) //true or false
        if(isValidPassword){
          // console.log(user.id,">>>>>>>");
          // console.log(user.role,">>>>>>>");
          req.session.userId= user.id //set session dicontroller
          req.session.role= user.role
          req.session.username= user.username

          console.log(username);

          if (user.role === 'admin') {
            return res.redirect('/admins')
          } else if (user.role === 'user') {
            return res.redirect('/users')
          }
        } else {
          const error ='invalid  username/password';
          return res.redirect(`/?error=${error}`) 
        }
      } else {
        const error = 'invalid username/password';
        return res.redirect(`/?error=${error}`) 
      }
    })
    .catch(err=>{
      console.log(err)
      res.send(err)
    })

   }

   static showReport(req, res) {
    let tanggal = [
      '2023-01-06',
      '2023-01-07',
      '2023-01-08',
      '2023-01-09',
      '2023-01-10',
      '2023-01-11',
      '2023-01-12',
    ]

    for (let i = 0; i < tanggal.length; i++) {

    }

    // Transaction.findAll({
    //   attributes: [
    //     [Sequelize.fn('COUNT', Sequelize.col('Transaction.createdAt')), 'count']
    //   ]

    // })
    //   .then((data) => {
    //     res.send(data)
    //     // res.render('report', { data })
    //   })
    //   .catch((err) => {
    //     res.send(err)
    //   })
    let tgl12 = new Date("2023-01-12")
    let all = [];
    
    Transaction.findAll({
      attributes: [
        [Sequelize.fn('COUNT', Sequelize.col('Transaction.createdAt')), 'count']
      ],where:{
        createdAt: '2023-01-12 20:20:35.342 +0700'
      }
    })
      .then((data1) => {
        all.push(data1)
        return Transaction.findAll({
          attributes: [
            [Sequelize.fn('COUNT', Sequelize.col('Transaction.createdAt')), 'count']
          ],where:{
            createdAt: '2023-01-11 20:20:35.342 +0700'
          }
        })
      })
      .then((data2)=>{
        all.push(data2)
        return Transaction.findAll({
          attributes: [
            [Sequelize.fn('COUNT', Sequelize.col('Transaction.createdAt')), 'count']
          ],where:{
            createdAt: '2023-01-10 20:20:35.342 +0700'
          }
        })
      })
      .then((data3)=>{
        all.push(data3)
        return Transaction.findAll({
          attributes: [
            [Sequelize.fn('COUNT', Sequelize.col('Transaction.createdAt')), 'count']
          ],where:{
            createdAt: '2023-01-09 20:20:35.342 +0700'
          }
        })
        // all.push(data2)
        // res.render('report', { all })
      })
      .then((data4)=>{
        all.push(data4)
        return Transaction.findAll({
          attributes: [
            [Sequelize.fn('COUNT', Sequelize.col('Transaction.createdAt')), 'count']
          ],where:{
            createdAt: '2023-01-08 20:20:35.342 +0700'
          }
        })
      })
      .then((data5)=>{
        all.push(data5)
        return Transaction.findAll({
          attributes: [
            [Sequelize.fn('COUNT', Sequelize.col('Transaction.createdAt')), 'count']
          ],where:{
            createdAt: '2023-01-07 20:20:35.342 +0700'
          }
        })
      })
      .then((data6)=>{
        all.push(data6)
        return Transaction.findAll({
          attributes: [
            [Sequelize.fn('COUNT', Sequelize.col('Transaction.createdAt')), 'count']
          ],where:{
            createdAt: '2023-01-06 20:20:35.342 +0700'
          }
        })
      })
      .then((data7) => {
        all.push(data7)
        res.render('report', { all })
      })
      .catch((err) => {
        res.send(err)
      })
    
   }

}
module.exports = Controller
