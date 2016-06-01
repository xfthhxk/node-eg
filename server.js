var https = require('https');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded());

app.get("/", function(req, res) {
  res.redirect("login.html");
});


app.post("/register", function(req, res) {
  console.log("registration data received: %s", JSON.stringify(req.body));
  res.send({success : true, fbReg: req.body.fbReg});
});


app.get("/fb-user-info", function(req, res) {
  var path = "/v2.0/" + req.query.userId + "?access_token=" + req.query.accessToken;

  var options = { host: "graph.facebook.com",
                  path: path};

  console.log("path is %s", path);

  https.get(options, function(fb_res) {
    fb_res.on("data", function(data) {
      console.log("data received from fb: %s", data);
      res.send(JSON.parse(data));
    });
  });
});



var server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
});


