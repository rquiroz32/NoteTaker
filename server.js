//Dependencies
const fs = require("fs")
const express = require('express')
const http = require('http');
const path = require("path");


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



//Global Variables
//const server = http.createServer(handleRequest)
const PORT = process.env.PORT || 8080


app.get("/test", function (req, res) {
    //let path = req.url
    console.log("test")
    console.log(req.url)
    res.sendFile(path.join(__dirname, "/public/index.html"));


});

function handleRequest(req, res) {
    // console.log("test")
    // console.log(__dirname)
    

    // app.get("/test", function (req, res) {
    //     console.log("test")
    //     console.log(req)
    //     res.send("get received")
    //     res.sendFile(path.join(__dirname, "\\public\\index.html"))
    
    
    // });
    

}


app.listen(PORT, function () {

    console.log(`Now listening on Port ${PORT}`)
    //handleRequest();


})