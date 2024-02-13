//function to print page
function printPage(){
    window.print();
}
//print icon event listener
const printIcon = document.querySelector('.printPage');
printIcon.addEventListener('click', event => {
    printPage()
});