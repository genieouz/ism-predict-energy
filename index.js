const express = require("express"),
  app = express();
require("dotenv").config();

// Create link to Angular build directory
var distDir = __dirname + "/dist/energy-predict-front/";
app.use(express.static(distDir));
/**************** END CONFIG ACL *****************/

initApp();
//LOAD ROUTES
function initApp() {
  app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "token, Content-Type, X-Requested-With"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    if (req.method == "OPTIONS") return res.sendStatus(200);
    next();
  });
  app.use(function (req, res) {
    res.status(404).send("OUPS PAGE INTROUVABLE");
  });

  var server = app.listen(process.env.PORT, function () {
    console.log("L'application tourne sur le port ", server.address().port);
  });
}
