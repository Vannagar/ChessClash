var selected="z"
var uwhite=-2;
var tq=0
var tr=0
var tb=0
var tn=0
var tp=0
var qus=0
var ros=0
var bis=0
var kns=0
var pas=0
var gam=-1
var color= "#000000"
var go=true
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
    sock.emit("ask",{gams:gam})
})

sock.on("yik",vase=>{
    if((1-vase.col==uwhite||(1-vase.col==0&&uwhite==-1))&&vase.gam==gam)
    {
        tq=vase.qus
        tr=vase.ros
        tb=vase.bis
        tn=vase.kns
        tp=vase.pas
        qus=vase.tq
        ros=vase.tr
        bis=vase.tb
        kns=vase.tn
        pas=vase.tp
    }
})

function create(vals)
{
    qus=Math.round(qus)
    ros=Math.round(ros)
    bis=Math.round(bis)
    kns=Math.round(kns)
    pas=Math.round(pas)
    sock.emit("yo",{"gam":gam,"col":uwhite,"tq":tq,"tr":tr,"tb":tb,"tn":tn,"tp":tp,"qus":qus,"ros":ros,"bis":bis,"kns":kns,"pas":pas})
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
    if(way.gamsy==gam&&(go||uwhite>-1))
    {
        create(brd.fen())
    }
})

document.addEventListener( 'DOMContentLoaded', _ =>
{
    create(brd.fen())
})
function mreate(vals) {
    go =true
    document.getElementById("hi").textContent=""
    for (let j = 0; j < 7; j++) {
        vals = vals.replace('/', '');
    }
    const boxes = Array.from(document.querySelectorAll('.box'))
    for (let i = 0; i < boxes.length; i++) {
        var num = 0
        var image
        if (vals.charAt(i) === "P") {
            image = "url('img/wpawn.png')"
        } else if (vals.charAt(i) === "p") {
            image = "url('img/bpawn.png')"
        } else if (vals.charAt(i) === "R") {
            image = "url('img/wrook.png')"
        } else if (vals.charAt(i) === "r") {
            image = "url('img/brook.png')"
        } else if (vals.charAt(i) === "N") {
            image = "url('img/wknight.png')"
        } else if (vals.charAt(i) === "n") {
            image = "url('img/bknight.png')"
        } else if (vals.charAt(i) === "B") {
            image = "url('img/wbishop.png')"
        } else if (vals.charAt(i) === "b") {
            image = "url('img/bbishop.png')"
        } else if (vals.charAt(i) === "K") {
            image = "url('img/wking.png')"
        } else if (vals.charAt(i) === "k") {
            image = "url('img/bking.png')"
        } else if (vals.charAt(i) === "Q") {
            image = "url('img/wqueen.png')"
        } else if (vals.charAt(i) === "q") {
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
    if(uwhite<1)
    {
        document.getElementById("a").src="./img/wqueen.png"
        document.getElementById("b").src="./img/wrook.png"
        document.getElementById("c").src="./img/wbishop.png"
        document.getElementById("d").src="./img/wknight.png"
        document.getElementById("e").src="./img/wpawn.png"
    }
    else
    {
        document.getElementById("a").src="./img/bqueen.png"
        document.getElementById("b").src="./img/brook.png"
        document.getElementById("c").src="./img/bbishop.png"
        document.getElementById("d").src="./img/bknight.png"
        document.getElementById("e").src="./img/bpawn.png"
    }
    document.getElementById("a").style.opacity=0.5
    document.getElementById("b").style.opacity=0.5
    document.getElementById("c").style.opacity=0.5
    document.getElementById("d").style.opacity=0.5
    document.getElementById("e").style.opacity=0.5
    document.getElementById("a").style.backgroundColor="#747d81"
    document.getElementById("b").style.backgroundColor="#27292a"
    document.getElementById("c").style.backgroundColor="#747d81"
    document.getElementById("d").style.backgroundColor="#27292a"
    document.getElementById("e").style.backgroundColor="#747d81"
    if(qus>0)
    {
        document.getElementById("a").style.opacity=1
    }
    if(ros>0)
    {
        document.getElementById("b").style.opacity=1
    }
    if(bis>0)
    {
        document.getElementById("c").style.opacity=1
    }
    if(kns>0)
    {
        document.getElementById("d").style.opacity=1
    }
    if(pas>0)
    {
        document.getElementById("e").style.opacity=1
    }

    if((brd.in_checkmate()||brd.in_draw())&&uwhite===-1)
    {
        document.getElementById("hi").textContent="Game Over!"
        go=false
    }
    else if(brd.in_stalemate()||brd.in_threefold_repetition()||brd.insufficient_material())
    {
        document.getElementById("hi").textContent="Draw!"
        go=false
    }
    else if(brd.in_checkmate()&&((brd.turn()==="w"&&uwhite===0)||(brd.turn()==="b")&&!(uwhite===0)))
    {
        document.getElementById("hi").textContent="You Lose!"
        go=false
    }
    else if(brd.in_checkmate())
    {
        document.getElementById("hi").textContent="You Win!"
        go=false
    }
    else
    {
        document.getElementById("hi").textContent=""
    }
}

function clicked(id)
{
    if((uwhite===0^brd.turn()==="w")||uwhite===-1||!go)
    {
        return
    }
    if(selected==="z"&&brd.get(id)!=null&&brd.moves({square:id}).length>0)
    {
        selected=id
        color=document.getElementById(id).style.backgroundColor
        document.getElementById(id).style.backgroundColor="#003355"
    }
    else if(selected.length===1&&selected!=="z"&&brd.get(id)==null&&(selected!=="e"||(id.charAt(2)!=="1"&&id.charAt(2)!=="8")))
    {
        temp=brd
        col='b'
        if(uwhite===0)
        {
            col='w'
        }
        if(selected==="a"&&qus>0)
        {
            temp.put({ type: 'q', color: col }, id)
        }
        else if(selected==="b"&&ros>0)
        {
            temp.put({ type: 'r', color: col }, id)
        }
        else if(selected==="c"&&bis>0)
        {
            temp.put({ type: 'b', color: col }, id)
        }
        else if(selected==="d"&&kns>0)
        {
            temp.put({ type: 'n', color: col }, id)
        }
        else if(pas>0&&id.charAt(1)!=="1"&&id.charAt(1)!=="8")
        {
            temp.put({ type: 'p', color: col }, id)
        }
        else if(pas>0&&(id.charAt(1)==="1"||id.charAt(1)==="8"))
        {
            return
        }
        if(temp.in_check())
        {
            return
        }
        if(selected==="a")
        {
            qus--
        }
        else if(selected==="b")
        {
            ros--
        }
        else if(selected==="c")
        {
            bis--
        }
        else if(selected==="d")
        {
            kns--
        }
        else
        {
            pas--
        }
        var tokens = brd.fen().split(' ');
        if(uwhite===0)
        {
            tokens[1]="b"
        }
        else
        {
            tokens[1]="w"
        }
        tokens[3]="-"
        brd= new Chess(tokens.join(' '));
        create(brd.fen())
        document.getElementById(selected).style.backgroundColor=color
        selected="z"
    }
    else if(selected===id)
    {
        selected="z"
        str="ace"
        document.getElementById(id).style.backgroundColor=color
    }
    else if(selected!=="z")
    {
        for(let i=0;i<brd.moves({square:selected}).length;i++)
        {
            if(brd.moves({square:selected,verbose: true })[i].to===id)
            {
                if(brd.get(id)==null)
                {

                }
                else if(brd.get(id).type==="q")
                {
                    tq+=0.6
                }
                else if(brd.get(id).type==="r")
                {
                    tr+=0.6
                }
                else if(brd.get(id).type==="b")
                {
                    tb+=0.6
                }
                else if(brd.get(id).type==="n")
                {
                    tn+=0.6
                }
                else if(brd.get(id).type==="p")
                {
                    tp+=0.6
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

function clicker(id)
{
    if((uwhite===0^brd.turn()==='w')||uwhite===-1||brd.in_checkmate()||brd.in_check())
    {return}
    if(uwhite===-1)
    {return}
    if(selected===id)
    {
        selected="z"
        document.getElementById(id).style.backgroundColor=color
        return
    }
    else if(selected!=="z")
    {
        return
    }
    if(id==="a")
    {
        if(qus>=1)
        {
            color=document.getElementById("a").style.backgroundColor
            document.getElementById("a").style.backgroundColor="#003355"
            selected=id
        }
    }
    else if (id==="b")
    {
        if(ros>=1)
        {
            color=document.getElementById("b").style.backgroundColor
            document.getElementById("b").style.backgroundColor="#003355"
            selected=id
        }
    }
    else if (id==="c")
    {
        if(bis>=1)
        {
            color=document.getElementById("c").style.backgroundColor
            document.getElementById("c").style.backgroundColor="#003355"
            selected=id
        }
    }
    else if (id==="d")
    {
        if(kns>=1)
        {
            color=document.getElementById("d").style.backgroundColor
            document.getElementById("d").style.backgroundColor="#003355"
            selected=id
        }
    }
    else
    {
        if(pas>=1)
        {
            color=document.getElementById("e").style.backgroundColor
            document.getElementById("e").style.backgroundColor="#003355"
            selected=id
        }
    }
}

function bril()
{
    window.location="index.html"
}
