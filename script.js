const button = document.querySelector("#btn");

//Feature 2 - SAVED NOTES
const saveNotes = () => {
  // there is a problem: if 1st note is saved , 2nd is unsaved and 3rd note is saved then result in saving of 2nd note also

  const notes = document.querySelectorAll(".note textarea");
  // console.log(notes);
  const data = [];
  // if(notes!=""){
  notes.forEach((note) => {
    console.log(note.value);
    data.push(note.value);
  });
  // }
  // else{
  //     notes.remove();
  // }

  // console.log(data);

  // if there is nothing in data Array then remove the notes from local storage/
  if (data.length === 0) {
    localStorage.removeItem("notes");
  } else {
    localStorage.setItem("notes", JSON.stringify(data));
  }
};

//Feature 2 - ADD NOTES..
button.addEventListener("click", () => {
  addNote();
});
// used default parameter in addNote function
const addNote = (text = "", texthead = "") => {
  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = `
     <div class="head">
        <i class="fas fa-save save"></i>
        <i class="fas fa-trash-alt trash"></i>
      </div> 
    
    <textarea>${text}</textarea>
    `;
  //--REMOVE
  note.querySelector(".trash").addEventListener("click", () => {
    // TO DELETE A CHILD
    note.remove();

    // on pressing remove button the notes must be saved in the local Storage. otherwise it will print/show the deleted notes again
    saveNotes();
  });
  //--SAVE
  note.querySelector(".save").addEventListener("click", () => {
    saveNotes();
  });

  document.getElementById("notepad").appendChild(note);
  saveNotes();

  //FOR AUTOSAVE
  // note.querySelector("textarea").addEventListener("focusout", function () {
  //   saveNotes();
  // });
};

//SELF CALLING FUNCTION
(function () {
  //AFTER PAGE RELOAD TAKES THE ITEM FROM LOCAL STORAGE PRINT ON CONSOLE
  // nOW IF NEW NOTE IS SAVED THEN IT OVERWRITES THE PREVIOUS ONES.
  // SO FOR THAT WE USE JASON .PARSE
  const lsNotes = JSON.parse(localStorage.getItem("notes"));
  // console.log(lsNotes);
  if (lsNotes === null) {
    addNote();
  } else {
    lsNotes.forEach((lsnote) => {
      if (lsnote != "") {
        addNote(lsnote);
      }
    });
  }
})();
