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

const modalText = document.createElement("p");
modalText.textContent =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus quidem nesciunt commodi adipisci sapiente blanditiis facilis aliquid consectetur vero qui magnam, quia aliquam minus, molestias, dolor minima consequuntur sed modi!";

//Find the body to attach the modal
const modalWindowAttacher = document.getElementById("modalWindowAttacher");
modalWindowAttacher.appendChild(modalBackground);
modalBackground.appendChild(modalWindow);
modalWindow.appendChild(modalButton);
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
