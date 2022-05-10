var i = 0;
var question = ["請問下列哪座車站為丙種簡易站?","請問TEMU1000型列車為下列哪一廠商製造?","請問下列哪座車站開業時間最晚?","請問下列哪座車站開業時間最早?","請問下列哪一部列車為台灣製造?","請問下列哪座車站從未改過名稱?","請問下列哪條被廢止的路線有復駛的計劃?","請問下列何者並非台鐵的姊妹鐵道?","請問下列何者並非台灣與日本同名的鐵道車站?","請問台鐵站距最長的為哪個路段?","請問台鐵站距最短的為哪個路段?","請問下列哪座車站不位於其站名的行政區?","請問下列哪座車站沒有任何自強號會停靠?","請問下列何者不是自強號所使用的車款?","請問以下何者為區間車所使用的車款?","請問莒光號每公里票價為何?"];
var bnthtml01 =["十分","Socimi","新富","埔心","DR2800型","南港","神岡線","山陽電鐵","板橋","南迴線<br>（枋山 – 大武）","屏東線<br>（民族 – 科工館）","民雄","楊梅","TEMU1000型","EMU300","1.46元"];
var bnthtml02 =["頭家厝","現代Rotem","三姓橋","田中","TEMU2000型","内壢","東港線","東武鐵道","香山","臺中線<br>（三義 – 泰安）","深澳線<br>（海科館 – 八斗子）","南州","萬華","EMU1200型","EMU800","1.75元"];
var bnthtml03 =["科工館","台灣車輛","民族","屏東","EMU600型","台中港","高雄臨港線","JR東日本","岡山","北迴線<br>（和仁 – 崇德）","臺中線<br>（烏日 – 新烏日）","萬榮","林榮新光","DR3000型","EMU1200","2.00元"];
var bnthtml04 =["林榮新光","日立製作所","北湖","吉安","EMU1200型","臺東","松山飛機場線","一畑電車","瑞穗","南迴線<br>（金崙 – 太麻里）","縱貫線<br>（三塊厝 – 高雄）","池上","隆田","EMU800型","DR2900","2.27元"];
var answer = ["a","d","c","a","d","a","b","c","b","a","b","c","d","d","b","b"];
var guess=["e","e","e","e","e","e","e","e","e","e","e","e","e","e","e","e"];
var correctnumber = 0 ;
function addanswer(idname){
    if (idname.id === "aswerbtn1"){
        guess[i] = "a";
    }
    if (idname.id === "aswerbtn2"){
        guess[i] = "b";
    }
    if (idname.id === "aswerbtn3"){
        guess[i] = "c";
    }
    if (idname.id === "aswerbtn4"){
        guess[i] = "d";
    }
}
function clickthis(btn){
    const btn1 = document.getElementById('aswerbtn1');
    const btn2 = document.getElementById('aswerbtn2');
    const btn3 = document.getElementById('aswerbtn3');
    const btn4 = document.getElementById('aswerbtn4');
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
    const btn1 = document.getElementById('aswerbtn1');
    const btn2 = document.getElementById('aswerbtn2');
    const btn3 = document.getElementById('aswerbtn3');
    const btn4 = document.getElementById('aswerbtn4');
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
    document.getElementById('aswerbtn1').innerHTML = bnthtml01[x];
    document.getElementById('aswerbtn2').innerHTML = bnthtml02[x];
    document.getElementById('aswerbtn3').innerHTML = bnthtml03[x];
    document.getElementById('aswerbtn4').innerHTML = bnthtml04[x];
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