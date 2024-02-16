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

// ------------------------------------------------------

  //Gtag for modal - Söderwall
  const trackModalIcon = document.querySelector(".fa-question");

  //Custom Gtag event that tracks how many times the modal has been re-opened
  trackModalIcon.addEventListener("click", function(){
    gtag("event", "Modal_click",{
      event_category: "click-engagement",
      event_label: "Modal re-open count",
    });
  });
// ------------------------------------------------------

  //Gtag Alexander Kuiper
  const settings = document.querySelector(".fa-gear");

  //Custom Gtag event to track settings
  settings.addEventListener("click", function(){
    gtag("event", "Settings_click",{
      event_category: "click-engagement",
      event_label: "Settings button click",
    });
  });
  // ------------------------------------------------------

  // gtag for reset button - Ali
  const resetBtn = document.getElementById("resetSettings");
  
  //custom gtag event when you reset changes
  resetBtn.addEventListener("click", function () {
    gtag("event", "Reset_button", {
      event_category: "click_engagement",
      event_label: "reset_settings",
    });
  });
// ------------------------------------------------------

  //gtag for fav button - Mustafa
  const favoriteBtn = document.querySelector(".fa-star")
  
  //custom gtag event when mark a note as fav
  favoriteBtn.addEventListener("click", function () {
    gtag("event", "FavoriteBtn", {
      event_category: "click_engagement",
      event_label: "favorite page click",
    });
  });
});
