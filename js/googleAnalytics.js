// Gtag for search icon - Johan.S
const searchIcon = document.querySelector(
  ".search-icon.fa-solid.fa-magnifying-glass"
);

searchIcon.addEventListener("click", function () {
  // Custom gtag event when the search icon is clicked
  gtag("event", "search", {
    event_category: "clicks",
    event_label: "search_icon_click",
  });
});
// ------------------------------------------------------
