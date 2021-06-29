var selected="z"
var fn=false
var uwhite=-2;
var gam=-1
var color= "#000000"
var brd= new Chess()

const sock=io()

sock.emit("room",{gams:document.cookie})

sock.on("playernum",nom=>{
    num=nom.num
    if(uwhite==-2)
    {
        uwhite=parseInt(num)
        gam=nom.gam
    }
    console.log(gam)
    sock.emit("ask",{gams:gam})
})

function create(vals)
{
    sock.emit("nrd",{"gam":gam,"ay":vals})
}

sock.on("moved",vals=>{
    if(vals.gam==gam)
    {
        brd=new Chess(vals.ay)
        mreate(vals.ay)
    }
})

sock.on("help",way=>{
    if(way.gamsy==gam)
    {
        create(brd.fen())
    }
})

document.addEventListener( 'DOMContentLoaded', _ =>
{
    create(brd.fen())
})
function mreate(vals) {
    for (let j = 0; j < 7; j++) {
        vals = vals.replace('/', '');
    }
    const boxes = Array.from(document.querySelectorAll('.box'))
    for (let i = 0; i < boxes.length; i++) {
        var num = 0
        var image
        if (vals.charAt(i) == "P") {
            image = "url('img/wpawn.png')"
        } else if (vals.charAt(i) == "p") {
            image = "url('img/bpawn.png')"
        } else if (vals.charAt(i) == "R") {
            image = "url('img/wrook.png')"
        } else if (vals.charAt(i) == "r") {
            image = "url('img/brook.png')"
        } else if (vals.charAt(i) == "N") {
            image = "url('img/wknight.png')"
        } else if (vals.charAt(i) == "n") {
            image = "url('img/bknight.png')"
        } else if (vals.charAt(i) == "B") {
            image = "url('img/wbishop.png')"
        } else if (vals.charAt(i) == "b") {
            image = "url('img/bbishop.png')"
        } else if (vals.charAt(i) == "K") {
            image = "url('img/wking.png')"
        } else if (vals.charAt(i) == "k") {
            image = "url('img/bking.png')"
        } else if (vals.charAt(i) == "Q") {
            image = "url('img/wqueen.png')"
        } else if (vals.charAt(i) == "q") {
            image = "url('img/bqueen.png')"
        } else {
            num = parseInt(vals.charAt(i), 10) - 1
            image = ""
        }
        while (num >= 0) {
            boxes[i].style.backgroundImage = image
            boxes[i].style.backgroundSize = "9vh 9vh"
            boxes[i].style.backgroundPosition = "center"
            num--
            i++
            vals = "0" + vals
        }
        vals = vals.substring(1)
        i--
    }
    if (uwhite<1)
    {
        document.getElementById("boarded").style.flexWrap="wrap"
    }
    else
    {
        document.getElementById("boarded").style.flexWrap="wrap-reverse"
        for(let i=1;i<=8;i++)
        {
            document.getElementById("row"+i).style.flexWrap="wrap-reverse"
        }
    }
    if((brd.in_checkmate()||brd.in_draw())&&uwhite==-1)
    {
        document.getElementById("hi").textContent="Game Over!"
    }
    else if(brd.in_stalemate()||brd.in_threefold_repetition()||brd.insufficient_material())
    {
        document.getElementById("hi").textContent="Draw!"
    }
    else if(brd.in_checkmate()&&((brd.turn()=="w"&&uwhite==0)||(brd.turn()=="b")&&!(uwhite==0)))
    {
        document.getElementById("hi").textContent="You Lose!"
    }
    else if(brd.in_checkmate())
    {
        document.getElementById("hi").textContent="You Win!"
    }
    else
    {
        let arr=brd.moves({verbose:true})
        let trt=false
        let col=arr[0].color
        for(let i=0;i<arr.length;i++)
        {
            if(!(brd.get(arr[i].to).type=="n"||(brd.get(arr[i].from).type=="n"&&brd.get(arr[i].from).type!=null)))
            {
                trt=true
                break
            }
        }
        if(!trt)
        {
            if(uwhite==-1)
            {
                document.getElementById("hi").textContent="Game Over!"
            }
            else if(brd.in_check())
            {
                if((uwhite==0&&col=="w")||(uwhite==1&&col=="b"))
                {
                    document.getElementById("hi").textContent="You Lose!"
                }
                else
                {
                    document.getElementById("hi").textContent="You Win!"
                }
            }
            else
            {
                document.getElementById("hi").textContent="Draw!"
            }
        }
        else
        {
            document.getElementById("hi").textContent=""
        }
    }
}

function clicked(id)
{
    if((uwhite==0^brd.turn()=="w")||uwhite==-1)
    {
        return
    }
    if(selected=="z"&&brd.get(id)!=null&&brd.moves({square:id}).length>0)
    {
        selected=id
        color=document.getElementById(id).style.backgroundColor
        document.getElementById(id).style.backgroundColor="#003355"
        fn=brd.get(id).type=="n"
    }
    else if(selected==id)
    {
        selected="z"
        document.getElementById(id).style.backgroundColor=color
    }
    else if(selected!="z")
    {
        for(let i=0;i<brd.moves({square:selected}).length;i++)
        {
            if(brd.moves({square:selected,verbose: true })[i].to==id)
            {
                if(brd.get(id)!=null&&(fn||brd.get(id).type=="n"))
                {
                    return
                }
                brd.move(selected+""+id,{ sloppy: true })
                document.getElementById(selected).style.backgroundColor=color
                selected="z"
                create(brd.fen())
                break
            }
        }
    }
}

function bril()
{
    window.location="index.html"
}
