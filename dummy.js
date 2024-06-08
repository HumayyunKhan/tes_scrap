const express = require("express");
const { scrapper } = require("./scrapper");
const app = express(express.json())

app.get("", (req, res) => {
    res.json('HELLO WORLD')

})

app.listen(1111,async ()=>{
    
   await scrapper({
       username: 'dyn601',
       password: '6161',
       site: 'https://sportsaction77.com/'
     })
})