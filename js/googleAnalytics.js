document.addEventListener("DOMContentLoaded", function () {
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

//Gtag for new-note-button - Ellen
const addNoteBtn = document.querySelector(".add-button");

  //eventListener with custom gtag event for click on new note
  addNoteBtn.addEventListener("click", function () {
    gtag("event", "Add_new_note", {
      event_category: "click_engagement",
      event_label: "new_note_click",
    });
  });
  // ------------------------------------------------------

  // gtag för spara-knappen - Anna-Sara
  const saveNoteBtn = document.getElementById("save-notes");

  // custom gtag event when you save a note
  saveNoteBtn.addEventListener("click", function () {
    gtag("event", "Save_button", {
      event_category: "click_engagement",
      event_label: "save_note",
    });
  });
});
// ------------------------------------------------------
