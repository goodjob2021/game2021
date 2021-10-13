//them
// cai dat he thoong node.js
// cai nmp (nodejs)
// cai visual live code
// cai goi ho tro node: express cjs body-parser socket.io mongoose
// lenh npm init -y // tao moi truong lam viec
// lenh npm install express ejs body-parser socket.io mongoose web3 web3.js-browser
const PORT = process.env.PORT || 5000;
const path = require('path'); // thay path cho duong dan

//khai bao su dung express de hien thi web
var express = require("express");
var app = express();
//app.use("/",express.static("public"));
app.use(express.static(path.join(__dirname, 'public')));
//app.use("/scripts",express.static("./node_modules/web3.js-browser/build/"));
app.use("/scripts/",express.static(path.join(__dirname,'node_modules/web3.js-browser/build/')));
app.set("view engine","ejs");
//app.set("views","./views/");
app.set('views', path.join(__dirname, 'views'));

// thay the body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));




    // socket.io
var server=require("http").Server(app);
var io=require("socket.io")(server);
    // start server port 3000
//server.listen(3000);
server.listen(PORT, () => console.log(`Listening on ${ PORT }`));
//console.log("server start port 3000");


//var bodyparser=require("body-Parser");
//app.use(bodyparser.urlencoded({extended:false}));




// ket noi mongooseDB su dung CSDL qua mongoose
const mongoose = require('mongoose');
const { callbackify } = require("util");
mongoose.connect('mongodb+srv://minigame:19001570@minigame.bvrn1.mongodb.net/minigame?retryWrites=true&w=majority',
    function(err){
        if (err){ 
            console.log("loi "+ err);
        }else{
            console.log("ok");
        }
    }

);
// chay ung dung
require("./controllers/game.js")(app);

