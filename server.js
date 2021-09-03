const http= require("http")
const express=require("express")
const socket=require("socket.io")

const app = express()
app.use(express.static("client"))
const server= http.createServer(app)

const io= socket(server)

const p=[]
const u=[]
const q=[]
currid=0

server.listen(process.env.PORT||8080, ()=>console.log("server on 8080"))


io.on('connection', (sock)=>{
    var h

    sock.on('disconnect',()=>{
        if(h!=='zk') {
            u.splice(q.indexOf(h), 1)
            p.splice(q.indexOf(h), 1)
            q.splice(q.indexOf(h), 1)
        }
    })


    sock.on('nrd', (vals) => {
        io.emit('moved', vals)
    })

    sock.on('yo',(bro)=>{
        io.emit('yik',bro)
    })
    sock.on("ask",(rip)=>{
        io.emit('help',{gamsy:rip.gams})
    })
    sock.on("room",(co)=>{
        if(p.indexOf(co.gams)!=p.lastIndexOf(co.gams))
        {
            h="zk"
            io.emit("playernum",{"num":-1,"gam":co.gams})
        }
        else if(p.indexOf(co.gams)>-1)
        {
            h=co.gams+"%"+(1-u[p.indexOf(co.gams)])
            q.push(h)
            p.push(co.gams)
            u.push(1-u[p.indexOf(co.gams)])
            io.emit("playernum",{"num":1-u[p.indexOf(co.gams)],"gam":co.gams})
        }
        else
        {
            h=co.gams+"%0"
            q.push(h)
            p.push(co.gams)
            u.push(0)
            io.emit("playernum",{"num":0,"gam":co.gams})
        }
        //console.log(q)
    })
})


