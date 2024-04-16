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