function printPage(){
    window.print();
}

const printIcon = document.querySelector('.printPage');
printIcon.addEventListener('click', event => {
    printPage()
});