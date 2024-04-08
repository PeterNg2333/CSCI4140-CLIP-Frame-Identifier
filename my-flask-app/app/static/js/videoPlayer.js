// Description: This file contains the JavaScript code for the video player that modifies the video player's appearance and functionality.

// This code selects the video player element.
const videoContainer = document.querySelector("#videoPlayer");

// This code checks if the browser supports the video element and hides the default video controls if it does.
const videoWorks = !! document.createElement("video").canPlayType;
if (videoWorks) {
    videoContainer.controls = false;
}

// This code creates a play/pause button and appends it to the video player.
const playPauseBtn = document.querySelector(".playPauseBtn");

function togglePlay() {
  if (videoContainer.paused || videoContainer.ended) {
    videoContainer.play();
  } else {
    videoContainer.pause();
  }
}

// This code updates the play/pause button based on the video's state.
function updatePlayBtn() {
  playPauseBtn.innerHTML = videoContainer.paused ? "►" : "❚❚";
}
playPauseBtn.addEventListener("click", togglePlay);
videoContainer.addEventListener("click", togglePlay);
videoContainer.addEventListener("play", updatePlayBtn);
videoContainer.addEventListener("pause", updatePlayBtn);


// This code updates the progress bar as the video plays and allows the user to jump to a specific time in the video by clicking on the progress bar.
const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress__filled");

function handleProgress() {
  const progressPercentage = (videoContainer.currentTime / videoContainer.duration) * 100;
  progressBar.style.flexBasis = `${progressPercentage}%`;
}

function jump(e) {
  const position = (e.offsetX / progress.offsetWidth) * videoContainer.duration;
  videoContainer.currentTime = position;
}

videoContainer.addEventListener("timeupdate", handleProgress);
progress.addEventListener("click", jump);
let mousedown = false;
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mousemove", (e) => mousedown && jump(e));
progress.addEventListener("mouseup", () => (mousedown = false));