const inputs = document.querySelectorAll('.input');

function focusFunc(){
    let parent = this.parentNode.parentNode;
    parent.classList.add('focus');
}
function unfocusFunc(){
    let parent = this.parentNode.parentNode;
    parent.classList.remove('focus');
    if (this.value == ""){
        this.parentNode.classList.remove('opac');
    }else{
        this.parentNode.classList.add('opac');
    }
}
inputs.forEach(input => {
    input.addEventListener('focus',focusFunc);
    input.addEventListener('focusout',unfocusFunc);
});