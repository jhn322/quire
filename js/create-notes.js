function createTumbnail(noteObject) {
  const newListItem = document.createElement("li");
  const newTitle = document.createElement("h3");
  const newContent = document.createElement("p");
  const newDate = document.createElement("div");
  const favorite = document.createElement("p");
  const deletebtn = document.createElement("p");

  newListItem.id = noteObject.id + "Wrapper";
  newListItem.classList.add("note-thumbnail");
  newListItem.isFavorite = noteObject.isFavorite;

  newListItem.noteTitle = noteObject.title;
  newListItem.content = noteObject.content;
  newListItem.savedDate = noteObject.savedDate;
  newListItem.editedDate = noteObject.editedDate;
  newListItem.idAddress = noteObject.id;
  newListItem.images = noteObject.img;

  newTitle.textContent = noteObject.title;
  newTitle.className = "noteTitle";
  newContent.innerHTML = noteObject.content;
  newContent.className = "noteContent";

  favorite.innerHTML = '<i class="fas fa-star"></i>';
  newDate.className = "thumbnailDate";
  const savedDate = document.createElement("span");
  savedDate.textContent = `skapat ${noteObject.savedDate}`;
  const editDate = document.createElement("span");
  editDate.textContent = `senaste ändring ${noteObject.editedDate}`;
  newDate.appendChild(savedDate);
  newDate.appendChild(editDate);

  favorite.id = noteObject.id;
  favorite.className = "star greyStar";
  if (noteObject.isFavorite == false) favorite.className = "star greyStar";
  else favorite.className = "star";

  favorite.onclick = function () {
    if (newListItem.isFavorite == false) {
      newListItem.isFavorite = true;
      favorite.classList.remove("greyStar");
      searchInNote(noteObject.id, true);
    } else {
      newListItem.isFavorite = false;
      favorite.classList.add("greyStar");
      searchInNote(noteObject.id, false);
    }
  };

  deletebtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
  deletebtn.className = "deleteNote";
  // Delete notes
  deletebtn.onclick = () => {
    document.getElementById(newListItem.id).classList.add("noteDeleted");
    setTimeout(() => {
      document.getElementById(newListItem.id).remove();
    }, 300);
    let tempArray = noteArray;
    noteArray = tempArray.filter((n) => n.id != noteObject.id);
    localStorage.setItem("allNotes", JSON.stringify(noteArray));
  };

  // Put images in container
  const imageWrapper = document.createElement("div");
  imageWrapper.className = "imageWrapper";
  noteObject.img.forEach((img) => {
    const image = document.createElement("img");
    image.src = img;
    imageWrapper.appendChild(image);
  });

  newListItem.appendChild(newTitle);
  newListItem.appendChild(newContent);
  newListItem.appendChild(favorite);
  newListItem.appendChild(deletebtn);
  newListItem.appendChild(imageWrapper);
  newListItem.appendChild(newDate);
  document.querySelector(".note-list").appendChild(newListItem);

  noteArray = JSON.parse(localStorage.getItem("allNotes"));
}

function searchInNote(n, isFav) {
  noteArray.find((note) => {
    if (note.id == n) {
      note.isFavorite = isFav;
      localStorage.setItem("allNotes", JSON.stringify(noteArray));
    }
  });
}
