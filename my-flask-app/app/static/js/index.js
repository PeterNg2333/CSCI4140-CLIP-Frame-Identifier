// callback function after some time to hide the controls area
// Upload the url to the server and display a loading spinner until the server responds
function updateYTURL(event){
    event.preventDefault();
    // display a popup message and ask the user to provide a valid youtube url
    var url = prompt("Please enter the youtube url", "https://www.youtube.com/watch?v=...");
    if (url == null || url == "") {
        alert("You must provide a valid youtube url");
        return;
    }
    
    // display a loading spinner
    // Send the url to the server using fetch


}