const express = require("express");
const router = express.Router();
const db = require('../db/db')
var fs = require('fs');

router.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});

router.post("/postUser", (req,res) => {
  (async () => {
    const injec = await db.insertUser(req.body)
    if(injec.status)
      res.send('User inserted')   
    else
      res.send(injec.res)
  })()
})

router.post("/login", (req,res) => {
  (async () => {
    const values = req.body;
    const injec = await db.selectUser(values.user)
    console.log(injec)   
    if(injec.status)
      if(values.password === injec.res.password) 
        res.send({status: true, token: injec.res.id.toString()})
      else
        res.send({status: false})    
    else
      res.send(injec.res)
  })()
})

module.exports = router;