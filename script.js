let storyAudio = null;
let currentAudio = null;
let timerOne = null;
let timerTwo = null;
let timerThree = null;

function openScreen(screenId) {
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.remove("active");
  });

  document.getElementById(screenId).classList.add("active");
  updateStars();
}

function saveRoutine() {
  const checkedBoxes = document.querySelectorAll("#routine input:checked").length;
  localStorage.setItem("moonNestStars", checkedBoxes);
  updateStars();
}

function finishRoutine() {
  const checkedBoxes = document.querySelectorAll("#routine input:checked").length;

  if (checkedBoxes < 5) {
    alert("Keep going. Finish all bedtime steps first.");
    return;
  }

  localStorage.setItem("moonNestStars", "5");
  updateStars();
  openScreen("rewards");
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

  const filePath = soundName + ".m4a";
  currentAudio = new Audio(filePath);
  currentAudio.loop = true;
  currentAudio.volume = 0.45;

  currentAudio.play().catch(() => {
    alert("Missing sound file: " + filePath);
  });
}

function stopVoice() {
  if (storyAudio) {
    storyAudio.pause();
    storyAudio.currentTime = 0;
    storyAudio = null;
  }
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
}

updateStars();