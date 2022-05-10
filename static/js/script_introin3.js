var secret = ["富岡車輛基地","桃林鐵馬道","臺東舊站","魚藤坪斷橋"];
var infor3 = ["富岡車輛基地位於桃園市楊梅區，於2013年啟用，取代原有台北機廠與新竹機務段之功能，是現今台鐵唯一可以進行蒸汽機車大檢修的地方。<br><br>住址：桃園市楊梅區富豐里9鄰富全街1號<br>交通方式：台鐵縱貫線新富車站旁",
"林口線是為了載運燃煤至林口火力發電廠及附近水泥工廠而設置，於1968年1月1日通車，2005年，桃園縣政府出資在林口線沿線增設數個簡易的客運車站，為強調該路線主要位於桃園縣，故當時命名為「桃林鐵路」，從同年10月27日起行駛免費客運列車服務沿線居民，林口線於2012年12月31日停駛後，桃園市政府推動「臺鐵林口線路廊活化工程」，將過往鐵道改建成「桃林鐵馬道」。<br><br>交通方式：台鐵縱貫線桃園車站步行1.3公里",
"甲午戰爭後，台灣成為日本的殖民地，為了能夠有效統治各地，發展交通成為首要任務。臺灣總督府鐵道部於1910年開始建設花蓮至璞石閣（今玉里）間的輕便鐵路，採用762mm軌距，而臺東（今台東舊站）至里壠（今關山）間的鐵路，由當時的台東開拓會社所建，於1919年通車。1926年，全線完工。1982年，臺東線，將軌距從762公厘拓寬為1,067公厘，在花蓮連接北迴線而與宜蘭線、縱貫線相通，新設卑南車站，2001年，將原位於市區、盲腸線的臺東舊站廢止，卑南車站改稱為臺東車站，而廢止的路段即為臺東線舊線",
"1908年，臺中線(山線)通車，1935年，新竹、臺中州大地震，山線遭受地震破壞，一直到1938年7月15日才修復完成。1998年，臺中線改線（新山線）完工通車後，舊山線廢止，目前有復駛之計畫。"];

var idname3 = 0;


function tointro3(){
    document.getElementById("carousel3").style.opacity = "0";
    document.getElementById("carousel3").style.zIndex = "0";
    document.getElementById("back3").style.opacity = "0";
    document.getElementById("back3").style.zIndex = "0";
    document.getElementById("introbox").style.opacity = "1";
    document.getElementById("introbox").style.zIndex = "3";
    document.getElementById("introbox").style.visibility = "visible";
}


function introin3(x){
    idname3 = parseInt(x.id);
    document.getElementById("introbox_word").innerHTML = infor3[idname3];
    document.getElementById("introimg").src = "static/img/secret/" + secret[idname3] + ".jpg";
    tointro3();
}