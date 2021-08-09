const app = require("express")();
const httpServer = require("http").createServer(app);
const options = {

};

const io = require("socket.io")(httpServer, options);
app.get('/', function (req, res, next) {res.sendFile(__dirname+"/index.html")})
app.get('/style/global', function (req, res, next) {res.sendFile(__dirname+"/style.css")})
app.get('/style/menu', function (req, res, next) {res.sendFile(__dirname+"/menu.css")})
io.on("connection", socket => {
    socket.emit("start",{
        players: app.get("players")
    })
    socket.on("join",function (us) {
        var pls = app.get("players")
        if (!pls.includes(us)) {
            pls.push(us)
        }
        app.set("players",pls)
        socket.emit("update",{
            players: app.get("players")
        })
        console.log(app.get("players"))
    })
    socket.on("leave",function (us) {
        var pls = app.get("players")
        if (pls.includes(us)) {
            pls.splice(pls.indexOf(us),1)
        }
        app.set("players",pls)
        socket.emit("update",{
            players: app.get("players")
        })
        console.log(app.get("players"))
    })
});

httpServer.listen(4,function () {
    app.set("players",[])
});