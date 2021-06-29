
function funj()
{
    txt=document.getElementById("nam").value
    typ=document.getElementById("cars").value
    if(txt!="")
    {
        document.cookie=txt+"%237%"+typ
    }
    console.log(txt)
    window.location=typ+".html"
}
