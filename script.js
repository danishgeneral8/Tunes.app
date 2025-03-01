let synth; // Declare synth

// Start Tone.js when the page is clicked
document.body.addEventListener("click", () => {
  if (!synth) {
    Tone.start().then(() => {
      synth = new Tone.Synth().toDestination(); // Initialize Synth
      console.log("Audio started");
    }).catch((err) => console.error("Tone.js failed to start:", err));
  }
});

// Function to play a note
function playNote(note) {
  if (!synth) {
    console.warn("Synth not initialized yet!");
    return;
  }

  synth.triggerAttackRelease(`${note}4`, "8n"); // Play note
  let key = document.getElementById(note); 
  if (key) {
    key.classList.add("active"); // Add active class
    setTimeout(() => key.classList.remove("active"), 200); // Reset key after 200ms
  }
}

// Click Event for On-Screen Piano Keys
document.querySelectorAll(".key").forEach((key) => {
  key.addEventListener("click", () => {
    let note = key.dataset.note; // Get note from data attribute
    playNote(note);
  });
});

// Keyboard Press Detection
document.onkeydown = function (e) {
  let keyMap = {
    "s": "C",
    "d": "D",
    "f": "E",
    "g": "F",
    "h": "G",
    "j": "A",
    "k": "B"
  };

  let note = keyMap[e.key.toLowerCase()];
  if (note) playNote(note);
};