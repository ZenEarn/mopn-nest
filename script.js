let storyAudio = null;

function playStoryVoice() {
  stopVoice();

  storyAudio = new Audio("story.mp3");
  storyAudio.volume = 0.9;

  storyAudio.play().catch(() => {
    alert("Add a file called story.mp3 to your GitHub repo.");
  });
}

function stopVoice() {
  if (storyAudio) {
    storyAudio.pause();
    storyAudio.currentTime = 0;
    storyAudio = null;
  }

  speechSynthesis.cancel();
}