
// Gtag for print icon - JOHAN
// See print.js at top
  
// ------------------------------------------------------

//Gtag for new-note-button - Ellen
// See notes.js at top

// ------------------------------------------------------

  // gtag för spara-knappen - Anna-Sara
  // See notes.js at top

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
  const settings = document.getElementById("gtag-settings");
  

  //Custom Gtag event to track settings
  settings.addEventListener("click", function(){
    gtag("event", "Settings_click",{
      event_category: "click-engagement",
      event_label: "Settings_button_click",
    });
  });

// ------------------------------------------------------

// gtag for reset button - Ali
// See settings.js at top
  
// ------------------------------------------------------

//gtag for fav button - Mustafa
  const favoriteBtn = document.getElementById("gtag-favorite");
  
  //custom gtag event when mark a note as fav
  favoriteBtn.addEventListener("click", function () {
    gtag("event", "FavoriteBtn", {
      event_category: "click_engagement",
      event_label: "favorite page click",
    });
  });

