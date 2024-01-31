// Create and append modal HTML elements
const imgModal = document.createElement("div");
imgModal.id = "image-modal";
imgModal.classList.add("img-modal");
imgModal.style.display = "none";

// Added modal conent class
const modalContent = document.createElement("div");
modalContent.classList.add("img-modal-content");

// Added class to X button
const closeBtn = document.createElement("span");
closeBtn.classList.add("img-modal-close");
closeBtn.innerHTML = "&times;";

// Set label text
const label = document.createElement("label");
label.setAttribute("for", "image-url");
label.textContent = "Klistra in bildlänk:";

// Set input type to text
const input = document.createElement("input");
input.type = "text";
input.id = "image-url";

// Set id for button
const addButton = document.createElement("button");
addButton.id = "add-image-btn";
addButton.textContent = "Lägg till bild";

// Added class to error messages
const errorMsg = document.createElement("div");
errorMsg.classList.add("error-message");
modalContent.appendChild(errorMsg);

// Append every element
modalContent.appendChild(closeBtn);
modalContent.appendChild(label);
modalContent.appendChild(input);
modalContent.appendChild(addButton);
imgModal.appendChild(modalContent);
document.body.appendChild(imgModal);

// Event listener for add-image id from HTML
document.getElementById("add-image").addEventListener("click", function () {
  // Display the modal
  imgModal.style.display = "block";
});

// Close the modal when the user clicks on the close button
closeBtn.addEventListener("click", function () {
  imgModal.style.display = "none";
});

// Event listener for add-image-btn id from HTML
addButton.addEventListener("click", function () {
  // Clear Previous error messages
  errorMsg.innerHTML = "";

  // Prompt user for image URL
  let imageUrl = document.getElementById("image-url").value;

  // Check if valid URL is provided
  if (imageUrl) {
    // Creates a temporary image to check for dimensions
    let tempImg = new Image();

    // Event handler for succesful load of temporary image
    tempImg.onload = function () {
      // Checks if dimensions are more than 0
      if (tempImg.width > 0 && tempImg.height > 0) {
        // If image dimensions are more than zero approve image element
        let imgElement = document.createElement("img");
        imgElement.src = imageUrl;
        imgElement.alt = "Användarspecifik bild";
        imgElement.classList.add("note-img");

        // Close the modal after successful processing
        imgModal.style.display = "none";

        // Append the image to the note field
        document.getElementById("note-field").appendChild(imgElement);
      } else {
        // If dimensions are zero show alert
        displayError("Ogiltig bildlänk. Klistra in en giltig adress.");
      }
    };

    // Event handler for error showing temporary image
    tempImg.onerror = function () {
      // Show alert if invalid image URL
      displayError(
        "Ogiltig bildlänk angiven. Prova högerklicka på en bild och kopiera bildlänken."
      );
    };

    // Set temp source to the provided URL
    tempImg.src = imageUrl;
  }
});

function displayError(message) {
  const errorParagraph = document.createElement("p");
  errorParagraph.textContent = message;
  errorMsg.appendChild(errorParagraph);
}
