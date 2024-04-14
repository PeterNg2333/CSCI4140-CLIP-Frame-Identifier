// Description: This file contains the JavaScript code for the video player that modifies the video player's appearance and functionality.

// This code selects the video player element.
const videoPlayer = document.querySelector("#videoPlayer");
const videoContainer = document.querySelector(".video-container");

// This code checks if the browser supports the video element and hides the default video controls if it does.
const videoWorks = !! document.createElement("video").canPlayType;
if (videoWorks) {
    videoPlayer.controls = false;
}

// This code creates a play/pause button and appends it to the video player.
const playPauseBtn = document.querySelector(".playPauseBtn");

function togglePlay() {
  if (videoPlayer.paused || videoPlayer.ended) {
    videoPlayer.play();
  } else {
    videoPlayer.pause();
  }
  videoContainer.classList.remove('controls-disabled'); // Add the 'disabled' class to the button
  setTimeout(function() {
    videoContainer.classList.add('controls-disabled'); // Remove the 'disabled' class after a delay
  }, 3000); // Delay in milliseconds (2 seconds in this example)
  
}


// This code updates the play/pause button based on the video's state.
function updatePlayBtn() {
  playPauseBtn.innerHTML = videoPlayer.paused ? '<i class="fa-solid fa-play"></i>' : '<i class="fa-solid fa-pause"></i>';
}
playPauseBtn.addEventListener("click", togglePlay);
videoPlayer.addEventListener("click", togglePlay);
videoPlayer.addEventListener("play", updatePlayBtn);
videoPlayer.addEventListener("pause", updatePlayBtn);


// This code updates the progress bar as the video plays and allows the user to jump to a specific time in the video by clicking on the progress bar.
const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress-bar");

function handleProgress() {
  const progressPercentage = (videoPlayer.currentTime / videoPlayer.duration) * 100;
  progressBar.style.flexBasis = `${progressPercentage}%`;
}

function jump(e) {
  // Calculate the position of the click on the progress bar and set the video's current time accordingly.
  const position = (e.offsetX / progress.offsetWidth) * videoPlayer.duration;
  videoPlayer.currentTime = position;
}



// This code allows the user to toggle fullscreen mode by clicking on the fullscreen button.
function toggleFullScreen(Event){
  document.getElementById("videoPlayer").requestFullscreen();
}

videoPlayer.addEventListener("dblclick", toggleFullScreen);

// Time display
const currentTime = document.querySelector(".current-time");
const videoDuration = document.querySelector(".duration");
if (videoPlayer.duration == NaN) {
  // add timer to update current time after video is loaded
  videoPlayer.addEventListener("loadedmetadata", () => {
    currentTime.textContent = formatTime(videoPlayer.currentTime);
    videoDuration.textContent = formatTime(videoPlayer.duration);
  });
}

// Add timer to update current time
videoPlayer.addEventListener("timeupdate", () => {
  currentTime.textContent = formatTime(videoPlayer.currentTime);
  videoDuration.textContent = formatTime(videoPlayer.duration);
});

// This code formats the time in seconds to a human-readable format (HH:MM:SS).
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

// open invideoSearher container
var opened = false;
function openVideoSearcher(){
  var inVideoSearcherContent = document.querySelector("#inVideoSearcherContent");
  var openinVideoSearcher = document.querySelector("#openinVideoSearcher");
  inVideoSearcherContent.style.display = "block";
  openinVideoSearcher.style.display = "none";
}

function closeVideoSearcher(){
  var inVideoSearcherContent = document.querySelector("#inVideoSearcherContent");
  var openinVideoSearcher = document.querySelector("#openinVideoSearcher");
  inVideoSearcherContent.style.display = "none";
  openinVideoSearcher.style.display = "block";
}


// This code adds event listeners to the video player for updating the progress bar and allowing the user to jump to a specific time in the video.
videoPlayer.addEventListener("timeupdate", handleProgress);
progress.addEventListener("click", jump);
let mousedown = false;
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mousemove", (e) => mousedown && jump(e));
progress.addEventListener("mouseup", () => (mousedown = false));

