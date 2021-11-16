const express = require("express");
const router = express.Router();
var fs = require('fs');

router.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});

router.post("/postUser", (req,res) => {
  const values = req.body

  fs.readFile('./data/users.json', 'utf8', function readFileCallback(err, data){
    if (err){
        console.log(err);
    } else {
    array = JSON.parse(data);
    for(var i=0; i < array.length; i++){
      if(values.user === array[i].user){
        res.send("Usuário já registrado")
        console.log('Usuario já existe')
        return
      } 
    }    
    array.push({id: (array.length + 1) , user: values.user, password: values.password});
    console.log(array) 
    json = JSON.stringify(array); 
    fs.writeFile('./data/users.json', json, 'utf8', (err) => {
      if (err){
        console.log(err);
      } else {
        res.send(true)
      }
    })
  }});
})

router.post("/login", (req,res) => {
  const loginValues = req.body
  console.log("/login => req.body : ", loginValues)

  fs.readFile('./data/users.json', 'utf8', function readFileCallback(err, data){
    if (err){
      console.log(err);
    } else {
      array = JSON.parse(data);
      for(var i=0; i < array.length; i++){
        if(loginValues.user === array[i].user && loginValues.password === array[i].password){
          var token = array[i].id //GERAR AUTENTICAÇÃO
          res.send({token: token})
          return
        } 
      }
      res.send({error: 'Senha ou Nome incorretos'})
    }
  })    
})

router.get("/user", (req,res) => {
  const token = req.query.token
  fs.readFile('./data/users.json', 'utf8', function readFileCallback(err, data){
    if (err){
      console.log(err);
    } else {
      array = JSON.parse(data);
      for(var i=0; i < array.length; i++){
        if(token == array[i].id){
          res.send(array[i])
          return
        }
      }
      res.send('Nenhum usuário encontrado')
    }
  })
})
module.exports = router;