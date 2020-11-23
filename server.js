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
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});



// Handles get requests to api notes and
app.get("/api/notes", function (req, res) {

    //reads the db.json file and send it back as JSON
    fs.readFile('./db/db.json', 'utf8', (error, data) => {

        if (error) throw (error)

        res.json(JSON.parse(data))
    });

});


//Handles post requests to add new notes to the db.json file 
app.post('/api/notes', function (req, res) {

    //reads the file
    fs.readFile('./db/db.json', 'utf8', (error, data) => {
        const note = req.body
        const _jsonArray = JSON.parse(data)
        note["id"] = _jsonArray.length + 1
        console.log(note)


        if (error) throw (error)
        
        //add the new note to an array that holds the old JSON obj
        _jsonArray.push(note)

        //rewrite the file with the new note added to the old notes
        fs.writeFile('./db/db.json', JSON.stringify(_jsonArray), (err) => {
            if (err) throw (err)
            console.log("successfully wrote to db.json file")
        });


    });

});



// handles delete requests 
app.delete('/api/notes/:id', function (req, res) {
    let noteId = req.params.id
    let jsonArray

    // Loop through the json and remove the note that matches the passed id.
    fs.readFile('./db/db.json', 'utf8', (error, data) => {

        if (error) throw (error)

        jsonArray = JSON.parse(data)

        let filteredJson = []

        for (i = 0; i < jsonArray.length; i++) {

            if (jsonArray[i].id != noteId) {
                filteredJson.push(jsonArray[i])

            }

        }// closes for loop for filtering json


        fs.writeFile('./db/db.json', JSON.stringify(filteredJson), (err) => {
            if (err) throw (err)
            console.log("successfully wrote filtered JSON to db.json file")
        });
    });
});




// Unhandled requests get sent to the home page, putting this last because otherwise none of the other handlers will work (because of the wild card)
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});


app.listen(PORT, function () {
    console.log(`Now listening on Port ${PORT}`)
})