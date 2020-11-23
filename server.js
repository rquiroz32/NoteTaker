//Dependencies
const fs = require("fs")
const express = require('express')
const path = require("path");

const app = express();

//Express Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"))


//Global Variables
const PORT = process.env.PORT || 8080




// URL handler to serve the notes.html page
app.get("/notes", function (req, res) {      
    res.sendFile(path.join(__dirname, "public/notes.html"));
});



// Handles get requests to api notes and
app.get("/api/notes", function (req, res) {
    

    //will need to read and present the json data
    fs.readFile('db\\db.json', 'utf8', (error, data) => {

        if (error) throw (error)

        res.json(JSON.parse(data))
    });

});

app.post('/api/notes', function (req, res) {

 
    fs.readFile('db\\db.json', 'utf8', (error, data) => {
        const note = req.body
        const _jsonArray = JSON.parse(data)
        note["id"] = _jsonArray.length+1
        console.log(note)
    

        if (error) throw (error)

        jsonArray = JSON.parse(data)

        jsonArray.push(note)

        fs.writeFile('db\\db.json', JSON.stringify(jsonArray),(err)=>{
            if (err) throw(err)
            console.log("successfully wrote to db.json file")
    
    
        })



    });

   


})



app.delete('/api/notes/:id', function (req, res) {
    let noteId = req.params.id
    let jsonArray

    fs.readFile('db\\db.json', 'utf8', (error, data) => {

        if (error) throw (error)

        jsonArray = JSON.parse(data)

        console.log(jsonArray)



    });



});




// Unhandled requests get sent to the home page, putting this last because otherwise none of the other handlers will work (because of the wild card)
app.get("*", function (req, res) {
    
    console.log("test")
    console.log(req.url)
    res.sendFile(path.join(__dirname, "public/index.html"));


});


app.listen(PORT, function () {

    console.log(`Now listening on Port ${PORT}`)



})