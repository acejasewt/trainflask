const container = document.querySelector('.hiscontentbox');
const containimg = document.querySelectorAll('.contentcard');
var count = 0;
var z = 0;
const imgsize = containimg[0].clientWidth;
function movenext(){
    container.style.transition = "transform 1s ease-in-out";
    count++;
    container.style.transform= 'translateX(' + (-imgsize*count) + 'px)';
}
function moveprev(){
    container.style.transition = "transform 1s ease-in-out";
    count--;
    container.style.transform= 'translateX(' + (-imgsize*count) + 'px)';
}
if (z===0){
    document.getElementById("hisprev").style.visibility = "hidden";
}else{
    document.getElementById("hisprev").style.visibility = "visible";
}
function mvprev(){
    z--;
    moveprev();
    if (z===0){
        document.getElementById("hisprev").style.visibility = "hidden";
    }
    else if(z==2){
        document.getElementById("hisnext").style.visibility = "hidden";
    }else{
        document.getElementById("hisprev").style.visibility = "visible";
        document.getElementById("hisnext").style.visibility = "visible";
    }
}
function mvnext(){
    z++;
    movenext();
    if (z===0){
        document.getElementById("hisprev").style.visibility = "hidden";
    }
    else if(z==2){
        document.getElementById("hisnext").style.visibility = "hidden";
    }else{
        document.getElementById("hisprev").style.visibility = "visible";
        document.getElementById("hisnext").style.visibility = "visible";
    }
}