var selected="z"
var uwhite=-2;
var gam=-1
var enp="z"
var go=true
var color= "#000000"
var brd= new Chess("rnkbr3/ppppp3/8/PPPPP3/RNKBR3/8/8/8 w - - 0 1")

const sock=io()
sock.emit("room",{gams:document.cookie})

sock.on("playernum",nom=>{
    num=nom.num
    if(uwhite===-2)
    {
        uwhite=parseInt(num)
        gam=nom.gam
    }
    sock.emit("ask",{gams:gam})
})

function create(vals)
{
    sock.emit("nrd",{"gam":gam,"ay":vals,"enp":enp})
}

sock.on("moved",vals=>{
    if(vals.gam===gam)
    {
        brd=new Chess(vals.ay)
        mreate(vals.ay)
    }
    enp=vals.enp
})

sock.on("help",way=>{
    if(way.gamsy===gam&&(go||uwhite>-1))
    {
        create(brd.fen())
    }
})
document.addEventListener( 'DOMContentLoaded', _ =>
{
    create(brd.fen())
})
function mreate(vals) {
    document.getElementById("hi").textContent=""
    go=true
    for (let j = 0; j < 7; j++) {
        vals = vals.replace('/', '');
    }
    const boxes = Array.from(document.querySelectorAll('.boxe'))
    let inc=0
    for (let i = 0; i < 64; i++) {
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
            if(i%8<5&&i<37)
            {
                boxes[inc].style.backgroundImage = image
                boxes[inc].style.backgroundSize = "15vh 15vh"
                boxes[inc].style.backgroundPosition = "center"
                inc++
            }
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
        for(let i=4;i<=8;i++)
        {
            document.getElementById("row"+i).style.flexWrap="wrap-reverse"
        }
    }
    let v=false
    for(let i=0;i<brd.moves().length;i++)
    {
        if((brd.moves({verbose:true})[i].to.charAt(1)=='4'||brd.moves({verbose:true})[i].to.charAt(1)=='5'||brd.moves({verbose:true})[i].to.charAt(1)=='6'||brd.moves({verbose:true})[i].to.charAt(1)=='7'||brd.moves({verbose:true})[i].to.charAt(1)=='8')
            &&(brd.moves({verbose:true})[i].to.charAt(0)=='a'||brd.moves({verbose:true})[i].to.charAt(0)=='b'||brd.moves({verbose:true})[i].to.charAt(0)=='c'||brd.moves({verbose:true})[i].to.charAt(0)=='d'||brd.moves({verbose:true})[i].to.charAt(0)=='e'))
        {
            v=true
            break
        }
    }
    if((brd.in_checkmate()||brd.in_draw())&&uwhite===-1||(brd.in_check()&&!v&&uwhite===-1))
    {
        document.getElementById("hi").textContent="Game Over!"
        go=false
    }
    else if(brd.in_stalemate()||brd.in_threefold_repetition()||brd.insufficient_material()||(!v&&!brd.in_check()))
    {
        document.getElementById("hi").textContent="Draw!"
        go=false
    }
    else if(((brd.in_check()&&!v)||brd.in_checkmate())&&((brd.turn()==="w"&&uwhite===0)||(brd.turn()==="b")&&!(uwhite===0))||(brd.in_check()&&!v&&uwhite===0&&brd.turn()==="w"))
    {
        document.getElementById("hi").textContent="You Lose!"
        go=false
    }
    else if(brd.in_check()&&!v||brd.in_checkmate())
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
    if(selected==="z"&&brd.get(id)!=null&&(brd.moves({square:id}).length>0||enp!="z"))
    {
        console.log(Math.abs(id.charAt(0)-enp.charAt(0)))
        if(enp!="z"&&id.charAt(1)==enp.charAt(1)&&Math.abs(id.charAt(0).charCodeAt(0)-enp.charAt(0).charCodeAt(0))==1)
        {
            selected=id
            color=document.getElementById(id).style.backgroundColor
            document.getElementById(id).style.backgroundColor="#003355"
            return
        }
        else if(brd.moves({square:id}).length==0){return}
        let v=false
        for(let i=0;i<brd.moves({square:id}).length;i++)
        {
                if ((brd.moves({square: id,verbose: true})[i].to.charAt(1) === '4' || brd.moves({square: id,verbose: true})[i].to.charAt(1) === '5' || brd.moves({square: id,verbose: true})[i].to.charAt(1) === '6' || brd.moves({square: id,verbose: true})[i].to.charAt(1) === '7' || brd.moves({square: id,verbose: true})[i].to.charAt(1) === '8')
                    && (brd.moves({square: id,verbose: true})[i].to.charAt(0) === 'a' || brd.moves({square: id,verbose: true})[i].to.charAt(0) === 'b' || brd.moves({square: id,verbose: true})[i].to.charAt(0) === 'c' || brd.moves({square: id,verbose: true})[i].to.charAt(0) === 'd' || brd.moves({square: id,verbose: true})[i].to.charAt(0) === 'e')) {
                    v = true
                    break
                }
        }
        if(!v)
        {return}
        selected=id
        color=document.getElementById(id).style.backgroundColor
        document.getElementById(id).style.backgroundColor="#003355"
    }
    else if(selected===id)
    {
        selected="z"
        document.getElementById(id).style.backgroundColor=color
    }
    else if(selected!=="z")
    {
        for(let i=0;i<brd.moves({square:selected}).length;i++)
        {
            if(brd.moves({square:selected,verbose: true })[i].to===id)
            {
                let qa=false
                if(brd.get(selected).type=='p'&&id.charAt(1)=='4')
                {
                    qa=true
                }
                brd.move(selected+""+id,{ sloppy: true })
                if(qa)
                {
                    brd.put({type:'q', color:'b'},id)
                }
                document.getElementById(selected).style.backgroundColor=color
                selected="z"
                enp="z"
                create(brd.fen())
                break
            }
        }
        if(brd.get(selected).type=='p'&&brd.get(id)==null&&brd.get(id.charAt(0)+'6')==null&&id.charAt(1)=='7'&&selected.charAt(1)=='5'&&brd.turn()=="w"&&selected.charAt(0)==id.charAt(0))
        {
            brd.put({type:'p', color:'w'},id)
            brd.remove(selected)
            document.getElementById(selected).style.backgroundColor=color
            selected="z"
            enp=id
            swapTurn()
            create(brd.fen())
        }
        else if(brd.get(selected).type=='p'&&brd.get(id)==null&&enp.charAt(0)==id.charAt(0)&&selected.charAt(1)=="7"&&id.charAt(1)=="6"&&Math.abs(selected.charAt(0).charCodeAt(0)-id.charAt(0).charCodeAt(0))==1)
        {
            brd.put({type:'p', color:'b'},id)
            brd.remove(selected)
            brd.remove(enp)
            document.getElementById(selected).style.backgroundColor=color
            selected="z"
            enp="z"
            swapTurn()
            create(brd.fen())
        }
    }
}
function swapTurn() {
    let tokens = brd.fen().split(" ");
    tokens[1] = brd.turn() === "b" ? "w" : "b";
    tokens[3] = "-";
    brd.load(tokens.join(" "));
}

function bril()
{
    window.location="index.html"
}
