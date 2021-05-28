const http= require("http")
const express=require("express")
const socket=require("socket.io")

const app = express()
app.use(express.static("client"))
const server= http.createServer(app)

const io= socket(server)

const connections=[]
const disco=[]

server.listen(process.env.PORT||8080, ()=>console.log("server on 8080"))


io.on('connection', (sock)=>{
    //console.log(connections)
    //console.log(disco)
    if(disco.length>0)
    {
        connections.push(disco.shift())
    }
    else if(connections.length==0)
    {
        connections.push(0)
    }
    else
    {
        connections.sort()
        connections.push(connections[connections.length-1]+1)
    }
    var playerIndex=connections[connections.length-1]
    io.emit("playernum",{"num":playerIndex%2,"gam":Math.floor(playerIndex/2)})

    sock.on('disconnect',()=>{
        connections.splice(connections.indexOf(playerIndex),1)
        disco.push(playerIndex)
        disco.sort()
        io.emit('yik',{"col":playerIndex%2,"gam":playerIndex/2,"tq":0,"tr":0,"tb":0,"tn":0,"tp":0,"qus":0,"ros":0,"bis":0,"kns":0,"pas":0})
    })

    sock.on('nrd', (vals) => {
        io.emit('moved', vals)
    })

    sock.on('yo',(bro)=>{
        io.emit('yik',bro)
    })
})


