var selected="z"
var uwhite=true;
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
var color= "#000000"
var brd

const sock=io()
document.addEventListener( 'DOMContentLoaded', _ =>
{
    create((new Chess()).fen())
    brd=new Chess()
})
function create(vals) {
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
    if (uwhite)
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
    if(uwhite)
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
    document.getElementById("a").style.backgroundColor="#FFFFFF"
    document.getElementById("b").style.backgroundColor="#808080"
    document.getElementById("c").style.backgroundColor="#FFFFFF"
    document.getElementById("d").style.backgroundColor="#808080"
    document.getElementById("e").style.backgroundColor="#FFFFFF"
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
}

function clicked(id)
{
    if(uwhite^brd.turn()=="w")
    {
        return
    }
    if(selected=="z"&&brd.get(id)!=null&&brd.moves({square:id}).length>0)
    {
        selected=id
        color=document.getElementById(id).style.backgroundColor
        document.getElementById(id).style.backgroundColor="#003355"
    }
    else if(selected.length==1&&selected!="z"&&brd.get(id)==null&&(selected!="e"||(id.charAt(2)!="1"&&id.charAt(2)!="8")))
    {
        temp=brd
        col='b'
        if(uwhite)
        {
            col='w'
        }
        if(selected=="a"&&qus>0)
        {
            temp.put({ type: 'q', color: col }, id)
        }
        else if(selected=="b"&&ros>0)
        {
            temp.put({ type: 'r', color: col }, id)
        }
        else if(selected=="c"&&bis>0)
        {
            temp.put({ type: 'b', color: col }, id)
        }
        else if(selected=="d"&&kns>0)
        {
            temp.put({ type: 'n', color: col }, id)
        }
        else if(pas>0)
        {
            temp.put({ type: 'p', color: col }, id)
        }
        if(temp.in_check())
        {
            return
        }
        if(selected=="a")
        {
            qus--
        }
        else if(selected=="b")
        {
            ros--
        }
        else if(selected=="c")
        {
            bis--
        }
        else if(selected=="d")
        {
            kns--
        }
        else
        {
            pas--
        }
        var tokens = brd.fen().split(' ');
        if(uwhite)
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
    else if(selected==id)
    {
        selected="z"
        str="ace"
        document.getElementById(id).style.backgroundColor=color
    }
    else if(selected!="z")
    {
        for(let i=0;i<brd.moves({square:selected}).length;i++)
        {
            if(brd.moves({square:selected,verbose: true })[i].to==id)
            {
                if(brd.get(id)==null)
                {

                }
                else if(brd.get(id).type=="q")
                {
                    tq++
                }
                else if(brd.get(id).type=="r")
                {
                    tr++
                }
                else if(brd.get(id).type=="b")
                {
                    tb++
                }
                else if(brd.get(id).type=="n")
                {
                    tn++
                }
                else if(brd.get(id).type=="p")
                {
                    tp++
                }
                brd.move(selected+""+id,{ sloppy: true })
                document.getElementById(selected).style.backgroundColor=color
                selected="z"
                create(brd.fen())
                break
            }
        }
    }
    if(brd.in_stalemate()||brd.in_threefold_repetition()||brd.insufficient_material())
    {
        document.getElementById("hi").textContent="Draw!"
    }
    if(brd.in_checkmate()&&((brd.turn()=="w"&&uwhite)||(brd.turn()=="b")&&!uwhite))
    {
        document.getElementById("hi").textContent="You Lose!"
    }
    else if(brd.in_checkmate())
    {
        document.getElementById("hi").textContent="You Win!"
    }
}

function clicker(id)
{
    if(uwhite^brd.turn()=='w')
    {return}
    if(selected==id)
    {
        selected="z"
        document.getElementById(id).style.backgroundColor=color
        return
    }
    else if(selected!="z")
    {
        return
    }
    if(id=="a")
    {
        if(qus>0)
        {
            color=document.getElementById("a").style.backgroundColor
            document.getElementById("a").style.backgroundColor="#003355"
            selected=id
        }
    }
    else if (id=="b")
    {
        if(ros>0)
        {
            color=document.getElementById("b").style.backgroundColor
            document.getElementById("b").style.backgroundColor="#003355"
            selected=id
        }
    }
    else if (id=="c")
    {
        if(bis>0)
        {
            color=document.getElementById("c").style.backgroundColor
            document.getElementById("c").style.backgroundColor="#003355"
            selected=id
        }
    }
    else if (id=="d")
    {
        if(kns>0)
        {
            color=document.getElementById("d").style.backgroundColor
            document.getElementById("d").style.backgroundColor="#003355"
            selected=id
        }
    }
    else
    {
        if(pas>0)
        {
            color=document.getElementById("e").style.backgroundColor
            document.getElementById("e").style.backgroundColor="#003355"
            selected=id
        }
    }
}
