const express = require("express");
const router = express.Router();
var fs = require('fs');

router.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});

router.post("/users", (req,res) => {
  const user = req.body

  fs.readFile('./data/users.json', 'utf8', function readFileCallback(err, data){
    if (err){
        console.log(err);
    } else {
    array = JSON.parse(data);
    for(var i=0; i < array.length; i++){
      if(user.name === array[i].name){
        res.send("Usuário já registrado")
        console.log('Usuario já existe')
        return
      } 
    }    
    array.push({id: (array.length + 1) , name: user.name, password: user.password});
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

router.get("/users", (req,res) => {
  const user = req.body

  fs.readFile('./data/users.json', 'utf8', function readFileCallback(err, data){
    if (err){
      console.log(err);
    } else {
      array = JSON.parse(data);
      for(var i=0; i < array.length; i++){
        if(user.name === array[i].name && user.password === array[i].password){
          res.send(array[i])
          return
        } 
      }
      res.send('Nome ou senha incorretos')
    }
  })    
})

module.exports = router;