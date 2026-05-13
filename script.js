let currentAudio = null;
let soundTimer = null;
let timerOne = null;
let timerTwo = null;
let timerThree = null;

function openScreen(screenId) {
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.remove("active");
  });

  const screen = document.getElementById(screenId);

  if (screen) {
    screen.classList.add("active");
  }

  stopVideos();
  updateStars();
  window.scrollTo(0, 0);
}

function saveRoutine() {
  const boxes = document.querySelectorAll("#routine input");
  const checkedBoxes = document.querySelectorAll("#routine input:checked").length;

  const routineState = [];

  boxes.forEach((box) => {
    routineState.push(box.checked);
  });

  localStorage.setItem("moonNestRoutine", JSON.stringify(routineState));
  localStorage.setItem("moonNestStars", checkedBoxes);

  updateStars();
}

function loadRoutine() {
  const savedRoutine = localStorage.getItem("moonNestRoutine");

  if (!savedRoutine) {
    return;
  }

  const routineState = JSON.parse(savedRoutine);
  const boxes = document.querySelectorAll("#routine input");

  boxes.forEach((box, index) => {
    box.checked = routineState[index] || false;
  });
}

function finishRoutine() {
  const checkedBoxes = document.querySelectorAll("#routine input:checked").length;

  if (checkedBoxes < 5) {
    alert("Keep going. Finish all bedtime steps first.");
    return;
  }

  localStorage.setItem("moonNestStars", checkedBoxes);
  updateStars();
  openScreen("breathing");
}

function updateStars() {
  const stars = localStorage.getItem("moonNestStars") || "0";
  const starNumber = document.getElementById("starNumber");

  if (starNumber) {
    starNumber.textContent = stars + " ⭐";
  }
}

function resetStars() {
  localStorage.setItem("moonNestStars", "0");
  localStorage.removeItem("moonNestRoutine");

  document.querySelectorAll("#routine input").forEach((box) => {
    box.checked = false;
  });

  updateStars();
}

function startBreathing() {
  clearTimeout(timerOne);
  clearTimeout(timerTwo);
  clearTimeout(timerThree);

  const circle = document.getElementById("breathCircle");
  const text = document.getElementById("breathText");

  if (!circle || !text) {
    return;
  }

  text.textContent = "Breathe in...";
  circle.classList.add("big");

  timerOne = setTimeout(() => {
    text.textContent = "Hold softly...";
  }, 3000);

  timerTwo = setTimeout(() => {
    text.textContent = "Breathe out...";
    circle.classList.remove("big");
  }, 5500);

  timerThree = setTimeout(() => {
    text.textContent = "Beautiful. Again?";
  }, 9000);
}

function playSound(soundName) {
  stopSound();

  currentAudio = new Audio(soundName);
  currentAudio.loop = true;
  currentAudio.volume = 0.45;

  currentAudio.play().catch(() => {
    alert("Tap again to play the sound, or check that this file exists: " + soundName);
  });

  const timerStatus = document.getElementById("timerStatus");

  if (timerStatus) {
    timerStatus.textContent = "Playing: " + soundName;
  }
}

function stopSound() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }

  if (soundTimer) {
    clearTimeout(soundTimer);
    soundTimer = null;
  }

  const timerStatus = document.getElementById("timerStatus");

  if (timerStatus) {
    timerStatus.textContent = "Sound stopped.";
  }
}

function setSoundTimer(minutes) {
  const timerStatus = document.getElementById("timerStatus");

  if (!timerStatus) {
    return;
  }

  if (!currentAudio) {
    timerStatus.textContent = "Choose a sound first.";
    alert("Choose a sound first.");
    return;
  }

  if (soundTimer) {
    clearTimeout(soundTimer);
  }

  timerStatus.textContent = "Sound will stop in " + minutes + " minutes.";

  soundTimer = setTimeout(() => {
    stopSound();
    timerStatus.textContent = "Sound stopped.";
  }, minutes * 60 * 1000);
}

function stopVideos() {
  document.querySelectorAll("video").forEach((video) => {
    video.pause();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadRoutine();
  updateStars();
});