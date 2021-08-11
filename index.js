const app = require("express")();
const httpServer = require("http").createServer(app)
const options = {};
const io = require("socket.io")(httpServer, options);
app.get('/', function (req, res, next) {res.sendFile(__dirname+"/pages/index.html")})
app.get('/stories', function (req, res, next) {res.sendFile(__dirname+"/pages/stories.html")})
app.get('/console', function (req, res, next) {res.sendFile(__dirname+"/pages/console.html")})
app.get('/style/global', function (req, res, next) {res.sendFile(__dirname+"/style/global.css")})
app.get('/style/menu', function (req, res, next) {res.sendFile(__dirname+"/style/menu.css")})
app.get('/style/table', function (req, res, next) {res.sendFile(__dirname+"/style/table.css")})
app.get('/style/stories', function (req, res, next) {res.sendFile(__dirname+"/style/stories.css")})
app.get('/style/ingame', function (req, res, next) {res.sendFile(__dirname+"/style/ingame.css")})
app.get('/style/console', function (req, res, next) {res.sendFile(__dirname+"/style/console.css")})
app.get('/style/utils', function (req, res, next) {res.sendFile(__dirname+"/style/utils.css")})
app.get('/js/utilsdev', function (req, res, next) {res.sendFile(__dirname + "/js/utilsdev.js")})


/*
app.get('/download', function (req, res, next) {
    res.download("E:\\craftopia\\craftopia.zip")
})
*/
io.on("connection", socket => {
    socket.emit("start",{
        players: app.get("players"),
        pwd: app.get("password")
    })
    socket.on("join",function (us) {
        var pls = app.get("players")
        if (!pls.includes(us)) {
            pls.push(us)
        }
        app.set("players",pls)
        io.emit("update",{
            players: app.get("players"),
            pwd: app.get("password")
        })
        console.log(app.get("players"))
    })
    socket.on("kick",function (us) {
        var pls = app.get("players")
        if (pls.includes(us)) {
            pls.splice(pls.indexOf(us),1)
        }
        app.set("players",pls)
        io.emit("update",{
            players: app.get("players"),
            pwd: app.get("password")
        })
        console.log(app.get("players"))
    })
    //START GAME
    socket.on("newStory", function () {
        socket.emit("newStory")
    })

    //ADMIN PAGE
    ////LOGIN
    socket.on("newCode", function () {
        app.set("password", Math.floor(Math.random() * 999))
        console.log("Admin password:",app.get("password"))
        io.emit("update",{
            players: app.get("players"),
            pwd: app.get("password")
        })
    })
});

var h = [
    "0.0.0.0",
    "localhost",
    "gp4e.ddns.net"
]
httpServer.listen(4,function () {
    app.set("players",[])
    app.set("password", Math.floor(Math.random() * 999))

    //
    console.log("Admin password:",app.get("password"))
    console.log(httpServer.address())
});