let currentAudio = null;
let breathingTimerOne = null;
let breathingTimerTwo = null;
let breathingTimerThree = null;

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
    alert("Keep going little dreamer. Finish all bedtime steps first.");
    return;
  }

  localStorage.setItem("moonNestStars", 5);
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
  clearTimeout(breathingTimerOne);
  clearTimeout(breathingTimerTwo);
  clearTimeout(breathingTimerThree);

  const butterfly = document.getElementById("butterfly");
  const breathText = document.getElementById("breathText");

  breathText.textContent = "Breathe in...";
  butterfly.classList.add("big");

  breathingTimerOne = setTimeout(() => {
    breathText.textContent = "Hold softly...";
  }, 3000);

  breathingTimerTwo = setTimeout(() => {
    breathText.textContent = "Breathe out...";
    butterfly.classList.remove("big");
  }, 5500);

  breathingTimerThree = setTimeout(() => {
    breathText.textContent = "Beautiful. Again?";
  }, 9000);
}

function playStoryVoice() {
  const storyText = `
    Luna the puppy looked up at the big glowing moon.
    It is time to rest, whispered Bree the Butterfly.
    Luna climbed into her soft moon nest, tucked her paws under the blanket,
    and listened to the stars twinkle above.
    Bree fluttered slowly in the sky.
    Breathe in slowly and breathe out softly.
    Luna's eyes grew heavy.
    The clouds became pillows, the stars became night lights, and the moon smiled gently.
    You are safe. You are loved. It is time to dream.
    And Luna drifted into a peaceful sleep.
  `;

  speechSynthesis.cancel();

  const voice = new SpeechSynthesisUtterance(storyText);
  voice.rate = 0.72;
  voice.pitch = 1.08;
  voice.volume = 0.9;

  const voices = speechSynthesis.getVoices();

  const preferredVoice = voices.find((item) => {
    const name = item.name.toLowerCase();
    return name.includes("samantha") || name.includes("karen") || name.includes("female");
  });

  if (preferredVoice) {
    voice.voice = preferredVoice;
  }

  speechSynthesis.speak(voice);
}

function stopVoice() {
  speechSynthesis.cancel();
}

function playSound(soundName) {
  stopSound();

  const filePath = "sounds/" + soundName + ".mp3";
  currentAudio = new Audio(filePath);
  currentAudio.loop = true;
  currentAudio.volume = 0.45;

  currentAudio.play().catch(() => {
    alert("Sound file not found yet. Add this file to your GitHub repo: " + filePath);
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