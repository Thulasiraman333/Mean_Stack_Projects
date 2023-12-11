const express = require('express');
const router = express.Router();
const User = require('../model/user');

//Get All Data
router.get('/user/getAll', (req,res)=>{
  User.find().exec((err,users)=>{
    if(err){
      res.json({message:err.message})
    }else{
      res.send({ "status": true, "data": users })
    }
  })
});

//Insert an User into database route
router.post('/user/create',(req,res)=>{ 
  const user = new User({
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone,
  });
  user.save((err)=>{
    if(err){
      res.send({ "status": false, "message": "Error creating user" });
    }else{
      res.send({ "status": true, "message": "User created successfully" });
    }
  })
})

//After edited the values need to be send to db update using post
router.patch('/user/update/:id',(req,res)=>{
  let id= req.params.id;
  User.findByIdAndUpdate(id,{
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone,
  },(err,result)=>{
    if(err){
      res.send({ "status": false, "message": "User Updated Failed" });
    }else{
      res.send({ "status": true, "message": "User Updated"} );
    }
  });
});

//delete a user
router.delete('/user/delete/:id',(req,res)=>{
  let id= req.params.id;
  User.findByIdAndRemove(id, (err,result)=>{
    if(err){
      res.send({ "status": false, "message": "User Deleted Failed" });
    }else{
      res.send({ "status": true, "message": "User Deleted"} );
    }
  })
});

module.exports = router;