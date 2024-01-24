//Creates elements
const modalWindow = document.createElement("div");
modalWindow.className = "modalWindow";
const modalBackground = document.createElement("div");
modalBackground.className = "modalBackground";
const modalButton = document.createElement("button");

//Gives button an event listener to remove the modal
modalButton.addEventListener("click", removeModal);
modalButton.textContent = "X";
modalButton.className = "modalButton";

const modalTitle = document.createElement("p");
modalTitle.classList.add("modalTitle");
modalTitle.textContent = "Välkommen till Quire!";

const modalText = document.createElement("p");
modalText.classList.add("modalText");
modalText.textContent =
  "Quire är appen för att skapa och spara alla dina anteckningar på ett smidigt sätt. Klicka på knappen med pennan för att skapa en ny anteckning!";

//Find the body to attach the modal
const modalWindowAttacher = document.getElementById("modalWindowAttacher");
modalWindowAttacher.appendChild(modalBackground);
modalBackground.appendChild(modalWindow);
modalWindow.appendChild(modalButton);
modalWindow.appendChild(modalTitle);
modalWindow.appendChild(modalText);

//Function to remove the modal
function removeModal() {
  modalBackground.remove();
}

// Grab the question mark icon class
const questionMarkIcon = document.querySelector(".fa-question");

// Event listener for question mark icon
questionMarkIcon.addEventListener("click", openModal);

// Function to open the modal
function openModal() {
  document.body.appendChild(modalBackground);
}

(() => {
  if (localStorage.firstVisit == undefined || localStorage.firstVisit == null) {
    localStorage.firstVisit = true;
  } else {
    removeModal();
  }
})();
