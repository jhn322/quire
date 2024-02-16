document.addEventListener("DOMContentLoaded", function () {
  // Creates modal div class
  const imgModal = document.createElement("div");
  imgModal.id = "image-modal";
  imgModal.classList.add("img-modal");
  imgModal.style.display = "none";

  // Added modal content class
  const modalContent = document.createElement("div");
  modalContent.classList.add("img-modal-window");

  // Added class to X button
  const closeBtn = document.createElement("button");
  closeBtn.classList.add("img-modal-close-btn");
  closeBtn.innerHTML = "&times;";

  // Set label text
  const label = document.createElement("label");
  label.setAttribute("for", "image-url");
  label.textContent = "Add/Paste Image Link";
  label.classList.add("img-modal-label");

  // Set input type to text
  const input = document.createElement("input");
  input.type = "text";
  input.id = "image-url";

  // Set id for button
  const addButton = document.createElement("button");
  addButton.classList.add("img-modal-add-btn");
  addButton.id = "add-image-btn";
  addButton.textContent = "Add Image";

  // Added class to error messages
  const errorMsg = document.createElement("div");
  errorMsg.classList.add("error-message");
  modalContent.appendChild(errorMsg);

  const addButtonContainer = document.createElement("div");
  addButtonContainer.classList.add("img-modal-btn-container");

  // Append every element
  modalContent.appendChild(closeBtn);
  modalContent.appendChild(label);
  modalContent.appendChild(input);
  modalContent.appendChild(addButton);
  imgModal.appendChild(modalContent);
  document.body.appendChild(imgModal);
  addButtonContainer.appendChild(addButton);
  modalContent.appendChild(addButtonContainer);
  modalContent.appendChild(errorMsg);

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
          imgElement.alt = "User Customized Image";
          imgElement.classList.add("note-img");

          // Close the modal after successful processing
          imgModal.style.display = "none";

          // Append the image to the note field
          document.getElementById("note-field").appendChild(imgElement);
          setNewObject();
          document.getElementById("note-field").scrollTop = document.getElementById("note-field").scrollHeight;
        } else {
          // If dimensions are zero show alert
          displayError("Upload error, please choose another image link.");
        }
      };

      // Event handler for error showing temporary image
      tempImg.onerror = function () {
        // Show alert if invalid image URL
        displayError("Invalid image link.");
      };

      // Set temp source to the provided URL
      tempImg.src = imageUrl;
    }
  });

  // Display error message in modal
  function displayError(message) {
    const errorParagraph = document.createElement("p");
    errorParagraph.textContent = message;
    errorMsg.appendChild(errorParagraph);

    // Screen shake
    imgModal.classList.add("img-modal-shake");
    setTimeout(() => {
      imgModal.classList.remove("img-modal-shake");
    }, 500);
  }
});
