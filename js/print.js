// Gtag for print icon - Johan
const printPageIcon = document.getElementById("printPage");

  printPageIcon.addEventListener("click", function () {
    // Custom gtag event when the print icon is clicked
    gtag("event", "Print_Page", {
      event_category: "click_engagement",
      event_label: "print_page",
    });
  });
 // ------------------------------------------------------

//function to print page
function printPage(){
    window.print();
}
//print icon event listener
const printIcon = document.querySelector('.printButton');
printIcon.addEventListener('click', event => {
    printPage()
});