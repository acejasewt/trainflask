const carouselslide3 = document.querySelector('.carousel_img3');
const carouselimages3 = document.querySelectorAll('.carousel_img3 div');

const prevbtn3 = document.querySelector('#pre3');
const nextbtn3 = document.querySelector('#next3');

let counter3 = 1;
const size3 = carouselimages3[0].clientWidth;

carouselslide3.style.transform = 'translateX(' + (-size3*counter3) + 'px)';

nextbtn3.addEventListener('click',()=>{
    if(counter3 >= carouselimages3.length -1) return;
    carouselslide3.style.transform = "transform 0.4s ease-in-out";
    counter3++;
    carouselslide3.style.transform= 'translateX(' + (-size3*counter3) + 'px)';
});
prevbtn3.addEventListener('click',()=>{
    if (counter3<=0) return;
    carouselslide3.style.transform = "transform 0.4s ease-in-out";
    counter3--;
    carouselslide3.style.transform= 'translateX(' + (-size3*counter3) + 'px)';
});
