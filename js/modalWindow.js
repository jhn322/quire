const modalWindow = document.createElement("div");
modalWindow.className = "modalWindow";
const modalBackground = document.createElement("div");
modalBackground.className = "modalBackground";
const modalButton = document.createElement("button");
modalButton.textContent = "X";

const modalWindowAttacher = document.getElementById("modalWindowAttacher");
modalWindowAttacher.appendChild(modalBackground);
modalBackground.appendChild(modalWindow);
modalWindow.appendChild(modalButton);
