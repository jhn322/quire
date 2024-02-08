function takeAll() {
  const allNotes = JSON.parse(localStorage.getItem("allNotes"));
  allNotes.forEach((e) => {
    createTumbnail(e);
  });
}

takeAll();
