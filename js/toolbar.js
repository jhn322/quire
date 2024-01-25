//variable for all icons in toolbar
const toolIcons = document.querySelectorAll('.tool-icon');

toolIcons.forEach(function(toolIcon){
    toolIcon.addEventListener('click', (event)=> {
        const { target } = event;
        console.log(target);
    })
})
