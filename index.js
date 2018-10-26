var express = require("express");
var app = express();
const PORT = process.env.PORT || 3000;

var router = express.Router();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(express.static('app'));

var path = __dirname + '/'

//manejador de rutas

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

app.get("/",function(req,res){
	res.sendFile(path + 'app/index.html');
});

app.use("/",router);

app.use("*",function(req,res){
  res.sendFile(path + "app/404.html");
});

app.listen(PORT, function () {
  console.log('Servidor iniciado en el puerto ' + String(PORT));
})

//funciones
