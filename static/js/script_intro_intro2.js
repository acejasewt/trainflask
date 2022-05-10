const carouselslide2 = document.querySelector('.carousel_img2');
const carouselimages2 = document.querySelectorAll('.carousel_img2 div');

const prevbtn2 = document.querySelector('#pre2');
const nextbtn2 = document.querySelector('#next2');

let counter2 = 1;
const size2 = carouselimages2[0].clientWidth;

carouselslide2.style.transform = 'translateX(' + (-size2*counter2) + 'px)';

nextbtn2.addEventListener('click',()=>{
    if(counter2 >= carouselimages2.length -1) return;
    carouselslide2.style.transform = "transform 0.4s ease-in-out";
    counter2++;
    carouselslide2.style.transform= 'translateX(' + (-size2*counter2) + 'px)';
});
prevbtn2.addEventListener('click',()=>{
    if (counter2<=0) return;
    carouselslide2.style.transform = "transform 0.4s ease-in-out";
    counter2--;
    carouselslide2.style.transform= 'translateX(' + (-size2*counter2) + 'px)';
});
