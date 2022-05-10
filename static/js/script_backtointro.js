var idnum = 0;
function namereturn(x){
    idnum = parseInt(x.id);
}
function backtointro(){
    if (idnum===1){
        document.getElementById("introbox").style.opacity = "0";
        document.getElementById("introbox").style.zIndex = "0";
        document.getElementById("carousel2").style.opacity = "1";
        document.getElementById("carousel2").style.zIndex = "3";
        document.getElementById("back2").style.opacity = "1";
        document.getElementById("back2").style.zIndex = "3";
    }
    else if (idnum===2){
        document.getElementById("introbox").style.opacity = "0";
        document.getElementById("introbox").style.zIndex = "0";
        document.getElementById("carousel").style.opacity = "1";
        document.getElementById("carousel").style.zIndex = "3";
        document.getElementById("back").style.opacity = "1";
        document.getElementById("back").style.zIndex = "3";
    }
    else if (idnum===3){
        document.getElementById("introbox").style.opacity = "0";
        document.getElementById("introbox").style.zIndex = "0";
        document.getElementById("carousel3").style.opacity = "1";
        document.getElementById("carousel3").style.zIndex = "3";
        document.getElementById("back3").style.opacity = "1";
        document.getElementById("back3").style.zIndex = "3";
    }
}