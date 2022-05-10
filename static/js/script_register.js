const inputs = document.querySelectorAll('.input');

function focusFunc(){
    let parent = this.parentNode.parentNode;
    parent.classList.add('focus');
}
function unfocusFunc(){
    let parent = this.parentNode.parentNode;
    parent.classList.remove('focus');
}
inputs.forEach(input => {
    input.addEventListener('focus',focusFunc);
    input.addEventListener('focusout',unfocusFunc);
});