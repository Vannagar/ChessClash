const http= require("http")
const express=require("express")
const socketio=require("socket.io")

const app = express()
app.use(express.static("client"))
const server= http.createServer(app)

const io= socketio(server)

io.on('connection', (sock)=>{
    console.log("There's been a connection")
})

server.listen(8080, function () {
    console.log("Listening on port 8080");
})

