// callback function after some time to hide the controls area
// Upload the url to the server and display a loading spinner until the server responds
function updateYTURL(event){
    // display a popup message and ask the user to provide a valid youtube url
    var url = prompt("Please enter the youtube url", "https://www.youtube.com/watch?v=...");
    if (url == null || url == "") {
        alert("You must provide a valid youtube url");
        return;
    }
    console.log(url)
    // get the query string from the url
    // var queryString = url.split("?")[1]
    // watch = queryString.split("=")[1].split("&")[0]
    // ab_channel = queryString.split("&")[1].split("=")[1]

    // display a loading spinner
    dialog = document.getElementById("spinning")
    dialog.showModal()
    
    // Send the url to the server using fetch
    fetch('/uploadURL', {
        method: 'POST',
        // body: JSON.stringify({watch: watch, ab_channel: ab_channel}),
        body: JSON.stringify({url: url}),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            // if the server responds with a 200 status code, hide the loading spinner
            dialog.close()
        }else{
            // if the server responds with an error, display an alert message
            alert("An error occurred, please try again")
            dialog.close()
            // Refresh the page to reset the controls
        }
        location.reload()
    });
}

function searchframe(event){
    // Get the text query from the input field
    var queryString = document.querySelector("#videoSearch").value
    // Load new search page by getting the query string from the url
    if (queryString == null || queryString == "") {
        alert("You must provide a valid query string");
        return;
    }
    url = "./videoSearch?query=" + queryString
    location.href = url
}