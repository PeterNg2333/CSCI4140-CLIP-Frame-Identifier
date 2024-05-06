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

function getInVideoFrames(){
    // Get the query string from the url
    var url = videoPlayer.querySelector("source").src;
    var fileName = url.split("/video/")[1]
    var queryString = document.querySelector("#text-query-searchFrame").value
    if (queryString == null || queryString == "") {
        alert("You must provide a valid query string");
        return;
    }
    else{
        // display a loading spinner
        var videoFrames = document.getElementById("videoFrames")
        videoFrames.innerHTML = `<p class="blue-purple-mix text-white" id="innearText">  
                                    <img src="https://portal.ufvjm.edu.br/a-universidade/cursos/grade_curricular_ckan/loading.gif/@@images/image.gif" 
                                    class="pt-3" 
                                    width="35px"
                                    height="40px"
                                    alt="..."
                                    style="margin-left: auto; margin-right: auto; display: block; "
                                    > 
                                    It may take a few seconds to load the results specially for the unseen query strings
                                  </p>`

        // Send the url to the server using fetch
        fetch('/getInVideoFrames', {
          method: 'POST', body: JSON.stringify({queryString: queryString, fileName: fileName}), headers: {'Content-Type': 'application/json'}
        }).then(response => {
          if (response.ok) {
            // if the server responds with a 200 status code, hide the loading spinner
            // dialog.close()
          }else{
            // if the server responds with an error, display an alert message
            alert("An error occurred, please try again")
            // dialog.close()
            // Refresh the page to reset the controls
          }
          // location.reload()
          return response.json()
        }).then(data => {
          // console.log(data)
          document.querySelector("#text-query-searchFrame").value = ""
          videoFrames.innerHTML = ""
          // Sort the data
          data.sort(function(a, b){return a - b});
          if (data.length == 0){
            videoFrames.innerHTML = `<p class="blue-purple-mix" id="innearText">  
                                      No results found...
                                    </p>`
          }
          else{
            for (var i = 0; i < data.length; i++){
              var frame = data[i]
              var frameDiv = document.createElement("div")
              frameDiv.innerHTML = `<il class="mb-3 row ps-0 inVideoItem hover-shadow" onclick="jumpToVideo(${Math.floor(data[i]/30)})">
                                      <div class="col-8" style="padding-left: 0px;padding-right: 0px;">
                                        <video 
                                                class="" 
                                                id = v-${i}
                                                width="125px"
                                                height="95px"
                                                alt="..."
                                                muted
                                                autoplay="autoplay"
                                                >
                                                <source src="${url}" type="video/mp4">
                                        </video>
                                      </div>
                                      <div class="col-3 px-0 pt-3">
                                          <p class="card-text blue-purple-mix"><a class="text-muted" style="margin-top=auto; margin-bottom:auto;"> - ${Math.floor(data[i]/30)} s </a> </p>
                                      </div>
                                  </il>`
              videoFrames.appendChild(frameDiv)
              var videoImg = document.querySelector(`#v-${i}`)
              videoImg.currentTime = Math.floor(data[i]/30)
              videoImg.pause()
            }
          }

          // console.log(data.html)
        });
    }
    // alert(queryString + " " + file_name)
}

function jumpToVideo(time){
  videoPlayer.currentTime = time;
}

// This code adds event listeners to the video player for updating the progress bar and allowing the user to jump to a specific time in the video.
videoPlayer.addEventListener("timeupdate", handleProgress);
progress.addEventListener("click", jump);
let mousedown = false;
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mousemove", (e) => mousedown && jump(e));
progress.addEventListener("mouseup", () => (mousedown = false));

