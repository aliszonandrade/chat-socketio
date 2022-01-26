var express = require("express");
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.set("view engine","ejs");

app.get("/", (req, res) => {
    res.render('index');
})

io.on("connection",(socket) => {
    socket.on("disconnect", () => {
        console.log("O usuário encerrou a sessão: " + socket.id);
    })

    socket.on("message", (data) => {
        io.emit("showMessage", data);
    })

});

http.listen(8080, () => {
    console.log("APP RODANDO!");
})