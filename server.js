const http= require("http")
const express=require("express")
const socket=require("socket.io")

const app = express()
app.use(express.static("client"))
const server= http.createServer(app)

const io= socket(server)

const p=[]
currid=0

server.listen(process.env.PORT||8080, ()=>console.log("server on 8080"))


io.on('connection', (sock)=>{

    var h=""
    sock.on('disconnect',()=>{
        p.splice(p.indexOf(h),1)
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
        if(p.indexOf(co.gams)>-1&&p.indexOf(co.gams)!=p.lastIndexOf(co.gams))
        {
            p.push(co.gams)
            io.emit("playernum",{"num":-1,"gam":co.gams})
        }
        else if(p.indexOf(co.gams)>-1)
        {
            p.push(co.gams)
            io.emit("playernum",{"num":1,"gam":co.gams})
        }
        else
        {
            p.push(co.gams)
            io.emit("playernum",{"num":0,"gam":co.gams})
        }
        h=co.gams
    })
})


