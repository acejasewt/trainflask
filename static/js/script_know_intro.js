const carouselslide = document.querySelector('.carousel_img');
const carouselimages = document.querySelectorAll('.carousel_img div');

const prevbtn = document.querySelector('#pre');
const nextbtn = document.querySelector('#next');

let counter = 1;
const size = carouselimages[0].clientWidth;

carouselslide.style.transform = 'translateX(' + (-size*counter) + 'px)';

nextbtn.addEventListener('click',()=>{
    if(counter >= carouselimages.length -1) return;
    carouselslide.style.transform = "transform 0.4s ease-in-out";
    counter++;
    carouselslide.style.transform= 'translateX(' + (-size*counter) + 'px)';
});
prevbtn.addEventListener('click',()=>{
    if (counter<=0) return;
    carouselslide.style.transform = "transform 0.4s ease-in-out";
    counter--;
    carouselslide.style.transform= 'translateX(' + (-size*counter) + 'px)';
});
