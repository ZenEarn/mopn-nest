let currentAudio = null;
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

  updateStars();
  updateJourney();
}

function saveRoutine() {
  const checkedBoxes = document.querySelectorAll("#routine input:checked").length;

  localStorage.setItem("moonNestStars", checkedBoxes);
  updateStars();
  updateJourney();
}

function finishRoutine() {
  const checkedBoxes = document.querySelectorAll("#routine input:checked").length;

  if (checkedBoxes < 5) {
    alert("Keep going. Finish all bedtime steps first.");
    return;
  }

  localStorage.setItem("moonNestStars", checkedBoxes);
  localStorage.setItem("moonNestRoutineDone", "yes");

  updateStars();
  updateJourney();
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
  localStorage.removeItem("moonNestRoutineDone");

  document.querySelectorAll("#routine input").forEach((box) => {
    box.checked = false;
  });

  updateStars();
  updateJourney();
}

function updateJourney() {
  const routineDone = localStorage.getItem("moonNestRoutineDone") === "yes";
  const stars = Number(localStorage.getItem("moonNestStars") || "0");

  setStep("stepRoutine", routineDone || stars >= 5);
  setStep("stepBreathing", routineDone);
  setStep("stepStory", false);
  setStep("stepSleep", false);
}

function setStep(id, isDone) {
  const step = document.getElementById(id);

  if (!step) {
    return;
  }

  if (isDone) {
    step.classList.add("done");
  } else {
    step.classList.remove("done");
  }
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

  const filePath = soundName;

  currentAudio = new Audio(filePath);
  currentAudio.loop = true;
  currentAudio.volume = 0.45;

  currentAudio.play().catch(() => {
    alert("Missing sound file: " + filePath);
  });
}

function stopSound() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }

  if (window.soundTimer) {
    clearTimeout(window.soundTimer);
    window.soundTimer = null;
  }

  const timerStatus = document.getElementById("timerStatus");

  if (timerStatus) {
    timerStatus.textContent = "Sound stopped.";
  }
}

function setSoundTimer(minutes) {
  const timerStatus = document.getElementById("timerStatus");

  if (!timerStatus) {
    alert("Timer status line is missing in index.html.");
    return;
  }

  if (!currentAudio) {
    timerStatus.textContent = "Choose a sound first.";
    alert("Choose a sound first.");
    return;
  }

  if (window.soundTimer) {
    clearTimeout(window.soundTimer);
  }

  timerStatus.textContent = "Sound will stop in " + minutes + " minutes.";

  window.soundTimer = setTimeout(() => {
    stopSound();
    timerStatus.textContent = "Sound stopped.";
  }, minutes * 60 * 1000);
}

updateStars();
updateJourney();