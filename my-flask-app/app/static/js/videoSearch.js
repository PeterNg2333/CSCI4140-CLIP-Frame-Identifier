function openVideo(event){
    event.stopPropagation();
    location.href = "/videoPlayer";
    
}

function openVideoFrame(event){
    event.stopPropagation();
    alert(event.target);
    location.href = "/videoPlayer";
}
