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
      event.target.innerHTML = "Expand";
      img.innerHTML =  `<img src="https://assets-global.website-files.com/659415b46df8ea43c3877776/65a6263826e433c2f84eb4d1_url-image-7a74f0de.png" 
                            class="" 
                            width="100%"
                            height="100%"
                            style="margin-left: auto; margin-right: auto;"
                            alt="...">`;
      timeline.innerHTML = `<i class="fa-regular fa-clock "></i> 00:00 ~  00:00 `
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
    img.innerHTML =  `<video id="" 
                          class="archorpthumbnail" 
                          preload="metadata" 
                          autoplay
                          width="100%" 
                          height="100%"
                          style="margin-left: auto; margin-right: auto;"
                          poster="https://cloudinary-marketing-res.cloudinary.com/images/w_1000,c_scale/v1679921049/Image_URL_header/Image_URL_header-png?_i=AA">
                          <source src="https://cdn.flowplayer.com/a30bd6bc-f98b-47bc-abf5-97633d4faea0/v-de3f6ca7-2db3-4689-8160-0f574a5996ad.mp4" type="video/mp4">
                          
                      </video> <span class="bg-dark insidethumbnail-video"> 0s </span>`;
    timeline.innerHTML = `<span >
                            from
                            <input type="time" id="appt" name="appt" min="00:00" max="24:00" value="00:00"> 
                            to
                            <input type="time" id="appt" name="appt" min="00:00" max="24:00" value="00:00">
                            <input type="button" class="bg-blue-purple-mix" value="Set" style="color:black !important;">
                          </span>`
    previouslyClickedFrame = thiselement; // Update the previously clicked element
    event.stopPropagation(); // Prevent event bubbling
    
  }
  
  // Add click event listener to each element
// for (let i = 0; i < clickableFrame.length; i++) {
//     clickableFrame[i].addEventListener("click", handleClickFrame,false);
// }
