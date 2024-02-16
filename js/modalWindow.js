//Creates elements
const modalWindow = document.createElement("div");
modalWindow.className = "modalWindow";
const modalBackground = document.createElement("div");
modalBackground.className = "modalBackground";
const modalButton = document.createElement("button");

//Gives button an event listener to remove the modal
modalButton.addEventListener("click", removeModal);
modalButton.innerHTML = "&times;";
modalButton.className = "modalButton";

const modalTitle = document.createElement("p");
modalTitle.classList.add("modalTitle");
modalTitle.textContent = "⭐Welcome to Quire!⭐";

const modalText = document.createElement("div");
modalText.classList.add("modalText");
modalText.innerHTML =
`<p>Quire is a digital assistant for creating, saving, and editing everyday notes. Whether one intends to leave a small reminder for the next day, or create a chapter for a sketch. It aids the user to optimally create new notes and to save and re-use existing notes. Just enter a title and write as much text as you desire.</p>
  <br>
  <p>Change style, add images, or make indented notes wherever in the note with utmost ease and efficiency. It is easy to search among older notes with just a word or phrase. Change the style of the app at anytime or reset to its original look with one click! All notes are locally saved and can be retrieved at anytime! So enter a title and start writing your thoughts and ideas.</p>
  <br>
  <p>Quire, where ideas become inspiration!</p>`;

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
