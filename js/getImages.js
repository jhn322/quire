// Event listener for add-image id from HTML
document.getElementById("add-image").addEventListener("click", function () {
  // Prompt user for image URL
  let imageUrl = prompt("Klistra in en länk till en bild.");

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
        imgElement.alt = "User specified image";
        imgElement.classList.add("note-img");

        // Append the image to the note field
        document.getElementById("note-field").appendChild(imgElement);
      } else {
        // If dimensions are zero show alert
        alert("Ogiltig bildlänk. Klistra in en giltig adress.");
      }
    };

    // Event handler for error showing temporary image
    tempImg.onerror = function () {
      // Show alert if invalid image URL
      alert("Ogiltig bildlänk. Inte en giltig bildlänk.");
    };

    // Set temp source to the provided URL
    tempImg.src = imageUrl;
  } else {
    // Show alert if no URL
    alert("Ogiltig bildlänk. Klistra in en giltig bildlänk.");
  }
});
