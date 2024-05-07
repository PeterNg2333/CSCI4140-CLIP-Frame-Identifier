// Select all elements you want to be clickable
const clickableElements = document.querySelectorAll(".clickable-videoClip il");
var previouslyClickedElement;

// Function to handle click event and resume previous
function handleClick(event) {
    if (previouslyClickedElement) {
      // Resume previously clicked element (if any)
      previouslyClickedElement.classList.remove("videoClipClicked");
    }
  
    // Set border or style change for the clicked element
    this.classList.add("videoClipClicked");
    previouslyClickedElement = this; // Update the previously clicked element
    var file_name = this.id.split("f-")[1] + ".mp4";
    video_title = document.querySelector("#" + this.id + " .videoTitle").textContent 
    // get the video title of the first 15 characters
    if (video_title.length > 15){
      video_title = video_title.substring(0, 15) + "...";
    }
    CardTitle = document.querySelector("#cardTitle")
    CardTitle.innerHTML = video_title;
    document.querySelector(".EditorSearchBtn").id = file_name;
    document.querySelector(".clickable-videoClip-Frame").innerHTML = '<p class="blue-purple-mix text-center" id="innearText" style="opacity: 0.75;"> Type it, Find it </p>'
    event.stopPropagation(); // Prevent event bubbling
    
  }
  
  // Add click event listener to each element
for (let i = 0; i < clickableElements.length; i++) {
    clickableElements[i].addEventListener("click", handleClick,false);
}


const clickableFrame = document.querySelectorAll(".clickable-videoClip-Frame il");
var previouslyClickedFrame;

// Function to handle click event and resume previous
function handleClickFrame(event) {
    var thiselement = event.target.parentElement.parentElement.parentElement;
    var img = thiselement.querySelector(".display");
    var timeline = thiselement.querySelector(".timeline");

    if (previouslyClickedFrame) {
      // Resume previously clicked element (if any)
      previouslyClickedFrame.classList.remove("col-12");
      previouslyClickedFrame.classList.remove("frame-clicked");
      previouslyClickedFrame.classList.add("col-6");
      console.log(previouslyClickedFrame.querySelector(".display video"))
      while (previouslyClickedFrame.querySelector(".display video").paused == false){
        previouslyClickedFrame.querySelector(".display video").pause();
      }
      event.target.innerHTML = "Expand";
      if (thiselement === previouslyClickedFrame) {
        previouslyClickedFrame = null;
        return;
      }
    }
  
    // Set border or style change for the clicked element
    thiselement.classList.add("col-12");
    thiselement.classList.add("frame-clicked");
    thiselement.classList.remove("col-6");
    event.target.innerHTML = "Collapse";
    thiselement.querySelector(".display video").play();
    // img.innerHTML =  `<video id="" 
    //                       class="archorpthumbnail" 
    //                       preload="metadata" 
    //                       autoplay
    //                       width="100%" 
    //                       height="100%"
    //                       style="margin-left: auto; margin-right: auto;"
    //                       poster="https://cloudinary-marketing-res.cloudinary.com/images/w_1000,c_scale/v1679921049/Image_URL_header/Image_URL_header-png?_i=AA">
    //                       <source src="https://cdn.flowplayer.com/a30bd6bc-f98b-47bc-abf5-97633d4faea0/v-de3f6ca7-2db3-4689-8160-0f574a5996ad.mp4" type="video/mp4">
                          
    //                   </video> <span class="bg-dark insidethumbnail-video"> 0s </span>`;
    // timeline.innerHTML = `<span >
    //                         from
    //                         <input type="time" id="appt" name="appt" min="00:00" max="24:00" value="00:00"> 
    //                         to
    //                         <input type="time" id="appt" name="appt" min="00:00" max="24:00" value="00:00">
    //                         <input type="button" class="bg-blue-purple-mix" value="Set" style="color:black !important;">
    //                       </span>`
    previouslyClickedFrame = thiselement; // Update the previously clicked element
    event.stopPropagation(); // Prevent event bubbling
    
  }
  
  // Add click event listener to each element
// for (let i = 0; i < clickableFrame.length; i++) {
//     clickableFrame[i].addEventListener("click", handleClickFrame,false);
// }

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(event, id){
  console.log(event.target + " : is doing nothing yet");
  event.dataTransfer.setData("text", id);
}

function drop(event){
    event.preventDefault();
    var targetElement = event.target.parentElement.parentElement;
    var id = event.dataTransfer.getData("text");
    var file_name = id.split("-")[1] + ".mp4";
    var targetVideoSrc = document.querySelector("#" + id + " video source").src;
    var starting_second = document.querySelector("#" + id + " .timeline").id.split("s-")[1].split(" e-")[0];
    var ending_second = document.querySelector("#" + id + " .timeline").id.split("s-")[1].split(" e-")[1];
    console.log(targetVideoSrc);
    console.log("Starting second: " + starting_second + " Ending second: " + ending_second);
    targetElement.innerHTML = `<il class="p-0 mb-1 inVideoItem bg-dark text-white list-group-item"">
                                    <div class="Added" id="${"clip-f_"+ file_name +"-s_" + starting_second + "-e_" + ending_second}" style="padding-left: 0px;padding-right: 0px;">
                                        <video  
                                                class="bg-dark" 
                                                width="105px"
                                                height="80px"
                                                muted
                                                id="videoClip-${id}"
                                                alt="">
                                                <source src="${targetVideoSrc}" type="video/mp4">
                                        </video>
                                    </div>
                                </il>`;
   video = document.querySelector("#videoClip-" + id);
   video.currentTime = starting_second;             
}

function searchframe(event){
  var query = document.querySelector("#query").value;
  var file_name = document.querySelector(".EditorSearchBtn").id;
  var url = "./getInVideoFrames"
  if (query == ""){
    alert("Please enter a query to search for")
    return;
  }
  if (file_name == ""){
    alert("Please select a video to search from")
    return;
  }

  fetch(url, {
    method: "POST",
    body: JSON.stringify({queryString: query, fileName: file_name}),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(response => {
    if (response.ok) {
    }else{
      alert("An error occurred, please try again")
    }
    // location.reload()
    return response.json()
  }).then(data => {
    document.querySelector(".clickable-videoClip-Frame").innerHTML = ""
    // sort the data
    data.sort(function(a, b){return a - b});
    file_id = "f-" + file_name.split('.')[0]
    file = document.querySelector("#" + file_id)
    file_src = file.querySelector(".videoSrc").src
    video_link = "./static/video/" + file_name
    ending_length = document.querySelector("#" + file_id + " .length").textContent
    var i = 0;
    data.forEach(element => {
      var frame = data[i]
      var frameDiv = document.createElement("div")
      var second_diffenrent = data[i+1] - Math.floor(data[i]/30)
      var starting_second = Math.floor(data[i]/30)
      var end_minute = Number(ending_length.split(":")[0]*60)
      var end_second = Number(ending_length.split(":")[1])
      var ending_time = i == data.length - 1 ? end_minute + end_second : Math.floor(data[i+1]/30)
      var time_diff = ending_time - starting_second
      frameDiv.innerHTML = `<il class="col-6 py-2 videoHover" draggable="true" ondragstart="drag(event, 'f-${file_name.split('.')[0]}-${i}')" id="f-${file_name.split('.')[0]}-${i}">
                                <div class="display" >
                                    <video  class="archorpthumbnail" 
                                                id = "vf-${file_name.split('.')[0]}-${i}"
                                                width="100%"
                                                height="100%"
                                                muted
                                                style="margin-left: auto; margin-right: auto;"
                                                muted
                                                alt="...">
                                                <source src="${video_link}" type="video/mp4">
                                                        
                                    </video>
                                    <span class="bg-dark insidethumbnail"> ${time_diff}s</span>
                                </div> 
                                <div class="card-body p-0 row pt-1 pb-2" style="opacity: 0.7;">
                                    <p class="m-0 text-nowrap col-4" style="overflow: hidden;"><button class="btn btn-sm btn-light text-white bg-dark " style="padding: 2px 6px !important;" onclick="handleClickFrame(event)"> Play </button></p>
                                    <p class="text-end mb-0 col-8 timeline timer-setting" style="margin-top: auto; margin-bottom: auto;"
                                      id="s-${starting_second} e-${ending_time}"
                                    > 
                                      <i class="fa-regular fa-clock"></i> 
                                      ${ Math.floor(data[i]/30/60) }:${ Math.floor(data[i]/30%60) }
                                      ~  
                                      ${i == data.length - 1 ? ending_length : Math.floor(data[i+1]/30/60) }${i == data.length - 1 ? "" : ":" + Math.floor(data[i+1]/30%60)  }
                                    </p>
                                </div>
                            </il>`
      document.querySelector(".clickable-videoClip-Frame").innerHTML += frameDiv.innerHTML
      var video = document.querySelector("#vf-" + file_name.split('.')[0] + "-" + i)
      video.currentTime = starting_second
      console.log(starting_second)
      i += 1;
    });
  });
}

global_timeline = []
current_time = {video: -1, time: 0}

async function playvideo(event){
  var video = document.querySelector("#videoPlayer");
  var video_src =document.querySelector("#videoPlayer source").src;
  var all_clips = document.querySelectorAll("#TimeLine-Clips il .Added");
  var clips_length = all_clips.length;
  global_timeline_length = global_timeline.length;
  // Update global timeline if the video source has changed
  if (global_timeline_length < clips_length) {
      for (let i = 0; i < all_clips.length; i++) {
        console.log(all_clips[i].id)
        var file_name = all_clips[i].id.split("_")[1].split("-")[0];
        var starting_second = all_clips[i].id.split("_")[2].split("-")[0];
        var ending_second = Number(all_clips[i].id.split("_")[3]) + 1 ;
        console.log(file_name + " " + starting_second + " " + ending_second)
        global_timeline.push({file: file_name, start: starting_second, end: ending_second})
    }
  }

  // Play the video and restore the previous video
  if (current_time.video == -1) {
    current_time.video = 0;
    current_time.time = global_timeline[0].start;
  }
  // play the video according to the global timeline and current time
  for (i = current_time.video; i < global_timeline.length; i++){
      document.querySelector("#videoPlayer source").src = "./static/video/" + global_timeline[i].file 
      if (document.querySelector("#videoPlayer").paused == false){
        document.querySelector("#videoPlayer").pause();
      }
      document.querySelector("#videoPlayer").load();
      document.querySelector("#videoPlayer").currentTime = current_time.time;
      document.querySelector("#videoPlayer").play();
      await timer(global_timeline[i].end - global_timeline[i].start*1000);
      console.log("Playing next video")
      current_time.video = i+1;
      current_time.time = global_timeline[i+1].start;
    }
    document.querySelector("#videoPlayer").pause();
}

const timer = ms => new Promise(res => setTimeout(res, ms))

// function stopvideo(event){
//   var video = document.querySelector("#videoClip-" + event.target.id);
//   video.pause();
//   video.currentTime = 0;
//   event.target.innerHTML = "Play";
// }