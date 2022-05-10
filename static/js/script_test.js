var i = 0;
var question = ["請問台鐵所使用的是以下何種軌距?","請問台鐵最早通車的路段是以下何者?","請問台灣第一條鐵路支線是以下何者?","請問台鐵平均每日進出人次最多為哪座車站?","請問台鐵平均每日進出人次最少為哪座車站?","請問下列哪座車站為特等站?","請問下列哪座車站為台鐵最東端的車站?","請問下列哪座車站為台鐵最北端的車站?","請問下列哪一個是代替台北機廠的列車基地?","請問台鐵在下列哪一路段為高架化?","請問下列何者不是台鐵的路線?","請問下列哪座車站無法轉乘其他路線?","請問下列哪座車站沒有三鐵共站?","請問下列哪座車站沒有道路可以直接抵達?","請問下列哪條路線最晚電氣化?","請問下列哪座車站尚未被廢止?"];
var bnthtml1 =["762mm<br>(二英尺六英寸鐵軌)","台北（大稻埕）<br>至雞籠（基隆）","淡水線<br>（台北 – 淡水）","桃園站","山里站","基隆","福隆","基隆","七堵調車場","縱貫線<br>（南港 – 板橋）","內灣線<br>（新竹 – 內灣）","新竹","台北","三貂嶺","宜蘭線","大華"];
var bnthtml2 =["1,000mm<br>(米軌)","台北（大稻埕）<br>至錫口（松山）","新店線<br>（萬華 – 新店）","臺中站","大華站","新竹","大里","海科館","樹林調車場","縱貫線<br>（鳳鳴 – 平鎮）","阿里山線<br>（嘉義 – 沼平）","二水","新烏日","崎頂","北迴線","勝興"];
var bnthtml3 =["1,067mm<br>(三英尺六英寸鐵軌)","台北（大稻埕）<br>至新竹","集集線<br>（二水 – 車埕）","臺北站","枋山站","花蓮","台東","八斗子","南港機廠","臺中線<br>（泰安 – 大慶）","沙崙線<br>（中洲 – 沙崙）","枋寮","新左營","枋山","南迴線","建興"];
var bnthtml4 =["1,435mm<br>(標準軌)","台北（大稻埕）<br>至桃仔園（桃園）","平溪線<br>（三貂嶺 – 菁桐）","高雄站","內獅站","台東","石城","台北","富岡基地","縱貫線+屏東線<br>（左營 – 鳳山）","深澳線<br>（瑞芳 – 八斗子）","宜蘭","高雄","山里","臺東線","初鹿"];
var answer = ["c","b","a","c","d","c","a","b","d","c","b","d","d","a","c","a"];
var guess=["e","e","e","e","e","e","e","e","e","e","e","e","e","e","e","e"];
var correctnumber = 0 ;
function widthmax(){
    const btn1 = document.getElementById('answerbtn1');
    const btn2 = document.getElementById('answerbtn2');
    const btn3 = document.getElementById('answerbtn3');
    const btn4 = document.getElementById('answerbtn4');
    var arr = [];
    arr[0] = btn1.offsetWidth;
    arr[1] = btn2.offsetWidth;
    arr[2] = btn3.offsetWidth;
    arr[3] = btn4.offsetWidth;
    max = Math.max.apply(Math, arr);
    btn1.style.width = max +"px";
    btn2.style.width = max +"px";
    btn3.style.width = max +"px";
    btn4.style.width = max +"px";
}
widthmax();
function addanswer(idname){
    if (idname.id === "answerbtn1"){
        guess[i] = "a";
    }
    if (idname.id === "answerbtn2"){
        guess[i] = "b";
    }
    if (idname.id === "answerbtn3"){
        guess[i] = "c";
    }
    if (idname.id === "answerbtn4"){
        guess[i] = "d";
    }
}
function clickthis(btn){
    const btn1 = document.getElementById('answerbtn1');
    const btn2 = document.getElementById('answerbtn2');
    const btn3 = document.getElementById('answerbtn3');
    const btn4 = document.getElementById('answerbtn4');
    if(btn1.classList.contains("choose")){
       btn1.classList.remove("choose");
    }
    if(btn2.classList.contains("choose")){
        btn2.classList.remove("choose");
    }
    if(btn3.classList.contains("choose")){
        btn3.classList.remove("choose");
     }
    if(btn4.classList.contains("choose")){
        btn4.classList.remove("choose");
    }
    btn.classList.toggle("choose");
    addanswer(btn);
}
function removeborder(){
    const btn1 = document.getElementById('answerbtn1');
    const btn2 = document.getElementById('answerbtn2');
    const btn3 = document.getElementById('answerbtn3');
    const btn4 = document.getElementById('answerbtn4');
    if(btn1.classList.contains("choose")){
       btn1.classList.remove("choose");
    }
    if(btn2.classList.contains("choose")){
        btn2.classList.remove("choose");
    }
    if(btn3.classList.contains("choose")){
        btn3.classList.remove("choose");
     }
    if(btn4.classList.contains("choose")){
        btn4.classList.remove("choose");
    }
}

function numberchange(x){
    document.getElementById('number').innerHTML = x;
}
function questionchange(x){
    document.getElementById('question').innerHTML = question[x];
}
function btnhtmlchange(x){
    document.getElementById('answerbtn1').innerHTML = bnthtml1[x];
    document.getElementById('answerbtn2').innerHTML = bnthtml2[x];
    document.getElementById('answerbtn3').innerHTML = bnthtml3[x];
    document.getElementById('answerbtn4').innerHTML = bnthtml4[x];
}
function correct(){
    if (guess[i-1]===answer[i-1]){
        correctnumber++;
    }
}
function correctrm(){
    if (guess[i]===answer[i]){
        correctnumber--;
    }
}
function widthlength(){
    document.getElementById('pink').style.width = ((i+1)*(100/16)) + "%";
}
function ifbtn(){
    const prev = document.getElementById('back');
    const next = document.getElementById('next');
    if(i===0){
        prev.style.display = "none";
        next.style.marginLeft = "0%";
    }else{
        prev.style.display = "block";
        next.style.marginLeft = "2.5%";
    }
    if (i===15){
        next.innerHTML = "計算成績";
    }else{
        next.style.display = "block";
        prev.style.marginRight = "2.5%";
    }
}

ifbtn();
function back(){
    i--;
    ifbtn();
    widthlength();
    removeborder();
    questionchange(i);
    btnhtmlchange(i);
    numberchange(i+1);
    correctrm();
}
function next(){
    i++;
    ifbtn();
    widthlength();
    removeborder();
    questionchange(i);
    btnhtmlchange(i);
    numberchange(i+1);
    correct();
    if (i === 16){
        document.getElementById('correctword').innerHTML = correctnumber;
        document.getElementById('contentest').style.visibility = "hidden";
        document.getElementById('contentcorrect').style.display = "flex";
    }
}