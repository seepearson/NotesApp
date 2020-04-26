

var express = require("express");
var path = require("path");
var dbJSON = require("./db/db.json");

// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port. We"ll use this later in our listener
var PORT = 8080;


app.use(express.static("public"));
var bodyParser = require('body-parser');
app.use(bodyParser.json());       
// to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     
  // to support URL-encoded bodies
    extended: true
}));


var path = require("path");

  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public", "notes.html"));
  });

  app.get("/api/notes", function(req, res) {
    res.json(dbJSON)
  });

  app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });

  app.delete("/api/notes/:id", function(req, res) {
    console.log("This is the ID", req.params.id)
    let keepNotes = [];
      dbJSON.forEach(function(singleNote){
        console.log(singleNote);
      if(singleNote.id != req.params.id){
        keepNotes.push(singleNote);
      }
      })
    dbJSON = keepNotes;
    res.json;
  });

  app.post("/api/notes", function(req, res) {
    //console.log(req.body);
    var newNote = req.body;
    newNote.id = dbJSON.length + 1;
    dbJSON.push(newNote);
    res.json(dbJSON);
  });



app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
