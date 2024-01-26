document.getElementById("add-image").addEventListener("click", function () {
  let imageUrl = prompt("Klistra in en länk till en bild.");

  if (imageUrl) {
    let imgElement = document.createElement("img");
    imgElement.src = imageUrl;
    imgElement.alt = "User specified image";
    imgElement.classList.add("note-img");

    document.getElementById("note-field").appendChild(imgElement);
  } else {
    alert("Ogiltig bildlänk. Skriv in en giltig adress.");
  }
});
