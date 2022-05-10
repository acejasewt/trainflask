var train = ["DR2800型","DR3100型","E1000型","E200型","E400型","EMU1200型","EMU300型","EMU500型","EMU600型","EMU700型","EMU800型","R100型","R150型","R20型","TEMU1000型","TEMU2000型"];
var infor = ["產地：日本<br>製造商：東急車輛製造<br>用於：自強號<br>投入服務：1982年<br>","產地：日本<br>製造商：日本車輛製造<br>用於：自強號<br>投入服務：1998年<br>","產地：南非<br>製造商：聯邦鐵路客貨車公司（UCW）<br>用於：推拉式自強號列車牽引<br>投入服務：1996年<br>","產地：美國<br>製造商：奇異運輸（GE）<br>用於：莒光號列車牽引<br>投入服務：1978年<br>","產地：美國<br>製造商：奇異運輸（GE）<br>用於：莒光號列車牽引<br>投入服務：1980年<br>","產地：臺灣<br>製造商：台灣車輛股份有限公司（TRSC）<br>用於：自強號<br>投入服務：2002年<br>","產地：義大利<br>製造商：米蘭工業製造公司（Socimi）<br>用於：自強號<br>投入服務：1989年<br>","產地：韓國<br>製造商：大宇重工<br>用於：區間車<br>投入服務：1995年<br>","產地：韓國<br>製造商：現代Rotem<br>用於：區間車<br>投入服務：2001年<br>","產地：日本・臺灣<br>製造商：日本車輛製造・台灣車輛股份有限公司（TRSC）<br>用於：區間車<br>投入服務：2007年<br>","產地：日本・臺灣<br>製造商：日本車輛製造・台灣車輛股份有限公司（TRSC）<br>用於：區間車<br>投入服務：2014年<br>","產地：美國<br>製造商：易安迪（EMD）<br>投入服務：1969年<br>","產地：美國<br>製造商：易安迪（EMD）<br>用於：貨運列車牽引<br>投入服務：1973年<br>","產地：美國<br>製造商：易安迪（EMD）<br>用於：貨運列車牽引<br>投入服務：1960年<br>","產地：日本<br>製造商：日立製作所<br>用於：太魯閣號<br>投入服務：2007年<br>","產地：日本<br>製造商：日本車輛製造<br>用於：普悠瑪號<br>投入服務：2013年<br>"];
var idname = 0;


function backtointro(){
    document.getElementById("introbox").style.opacity = "0";
    document.getElementById("introbox").style.zIndex = "0";
    document.getElementById("carousel").style.opacity = "1";
    document.getElementById("carousel").style.zIndex = "3";
    document.getElementById("back").style.opacity = "1";
    document.getElementById("back").style.zIndex = "3";
}
function tointro(){
    document.getElementById("carousel").style.opacity = "0";
    document.getElementById("carousel").style.zIndex = "0";
    document.getElementById("back").style.opacity = "0";
    document.getElementById("back").style.zIndex = "0";
    document.getElementById("introbox").style.opacity = "1";
    document.getElementById("introbox").style.zIndex = "3";
    document.getElementById("introbox").style.visibility = "visible";
}


function introin(x){
    idname = parseInt(x.id);
    document.getElementById("introbox_word").innerHTML = infor[idname];
    document.getElementById("introimg").src = "static/img/train/" + train[idname] + ".jpg";
    tointro();
}