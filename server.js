const http= require("http")
const express=require("express")
const socket=require("socket.io")

const app = express()
app.use(express.static("client"))
const server= http.createServer(app)

const io= socket(server)

const connections=[null,null]

server.listen(process.env.PORT||8080, ()=>console.log("server on 8080"))


io.on('connection', (sock)=>{
    let playerIndex=-1
    for(const i in connections)
    {
        if(connections[i]==null)
        {
            playerIndex=i
            connections[i]=i
            break
        }
    }
    io.emit("playernum",playerIndex)

    sock.on('disconnect',()=>{
        if(playerIndex>-1)
        {
            connections[playerIndex]=null
            io.emit('yik',{"col":playerIndex,"tq":0,"tr":0,"tb":0,"tn":0,"tp":0,"qus":0,"ros":0,"bis":0,"kns":0,"pas":0})
        }
    })

    sock.on('nrd', (vals) => {
        io.emit('moved', vals.ay)
    })

    sock.on('yo',(bro)=>{
        io.emit('yik',bro)
    })
})


