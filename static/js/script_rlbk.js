const minus = document.querySelectorAll(".btnl");
const plus = document.querySelectorAll(".btnr");

function minusFunc(){
    let parent = this.nextSibling.nextSibling;
    if(parent.value > 0)parent.value--;
}

function plusFunc(){
    let parent = this.previousSibling.previousSibling;
    if(parent.value < 6)parent.value++;
}

function back(){
    window.history.back();
}

minus.forEach(input => {
    input.addEventListener('click',minusFunc);
});

plus.forEach(input => {
    input.addEventListener('click',plusFunc);
});

