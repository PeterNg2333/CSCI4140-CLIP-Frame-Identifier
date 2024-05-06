function openVideo(event){
    event.stopPropagation();
    location.href = "/videoPlayer";
    
}

function openVideoFrame(event){
    event.stopPropagation();
    alert(event.target);
    location.href = "/videoPlayer";
}

// Run this function when the page is loaded
document.body.onload = function(){
    Initization();
}

function Initization(){
    query = document.querySelector("#videoSearch").value;
    // get all the video items from get api
    fetch('/getMetaList', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (!response.ok) {
            alert("An error occurred, please try again")
        }
        return response.json()
    }).then(data => {
        // console.log(data)
        count = 0 
        data.forEach(element => {
            // searchVideoOneByOne(data[i], query)
            console.log(element)
            var root = document.querySelector("#video-container")
            getInVideoFrames(element, query, root)

            count += 1
        });
    });
}

function createHTML(fileMeta, queryString, root){
    var ResultItemDiv = document.createElement("div") 
    ResultItemDiv.innerHTML = `<div class="card mb-3 bg-dark " style="max-width: 100%;" onclick="window.location.href='videoPlayer?video_name=${fileMeta['name'] }'" id="f-${ fileMeta['name']}" >
                        <div class="row g-0 searchItem">
                                <div class="col-md-5 ps-2 py-2" >
                                    <img src="${fileMeta['thumbnail']}"  
                                    class="img-fluid rounded" 
                                    alt="...">
                                </div>
                                <div class="col-md-7">
                                    <div class="searchItemCard card-body row pb-1 ">
                                        <h5 class="card-title col-8">${fileMeta['title']}</h5>
                                        <p class="text-end card-title col-4"> <i class="fa-solid fa-eye" style="color: #ffffff;"></i> ${ fileMeta['views'] > 1000000?(Math.floor(fileMeta['views']/1000000)+" M"):(Math.floor(fileMeta['views']/1000)+ " K")}  </p>
                                        <p class="card-text col-12 mb-2"><small class="text-muted"> Time: ${ Math.floor(fileMeta['length']/60) } m ${ fileMeta['length']%60 } s </small></p>
                                        <p class="card-text col-3 my-1 text-white"> <u class="blue-purple-mix fw-bolder rounded p-1 px-2" style="font-size: 1.1rem;"> Frame: </u> </p>
                                        
                                    </div>
                                    <section class="card-body row pt-0" >
                                        <div class=" ps-3 ">
                                            <!-- <ul class="card-title list-group list-group-horizontal-sm rounded border border-white SearchResult-frame" style="overflow-y: hidden; overflow-x: scroll; max-width: 100%; display: inline-block"> -->
                                            <ul id="f-${fileMeta['name'].split(".")[0]}-SearchResult" class="list-group SearchResult list-group-horizontal position-relative overflow-auto w-100 SearchResult-frame bg-dark rounded border border-dark ">
                                                <p class="blue-purple-mix text-white" id="innearText" style="opacity: 0.6;">  
                                                    <img src="https://portal.ufvjm.edu.br/a-universidade/cursos/grade_curricular_ckan/loading.gif/@@images/image.gif" 
                                                        class="pb-1" 
                                                        width="35px"
                                                        height="40px"
                                                        alt="..."
                                                        style="margin-right: auto; display: block;"
                                                        > 
                                                        It may take a few seconds to load the results
                                                </p>

                                            </ul>

                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>`
    
    root.appendChild(ResultItemDiv)
    return ResultItemDiv
}

function getInVideoFrames(fileMeta, queryString, root){
    fetch('/getInVideoFrames', {
        method: 'POST', body: JSON.stringify({queryString: queryString, fileName: fileMeta['name']}), headers: {'Content-Type': 'application/json'}
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
        // Sort the data
        if (data.length > 0){
            var result = createHTML(fileMeta, queryString, root)
            setTimeout(function(){
                var frame = result.querySelector("ul")
                var fid = frame.id
                var new_frame = document.querySelector("#"+fid)
                if (new_frame == null){
                    while (document.querySelector("#"+fid) == null){
                        console.log("waiting")
                    }
                }
                if (new_frame != null){
                    frame.innerHTML = ""
                    var temp
                    data.sort(function(a, b){return a - b});
                    console.log(data)
                    for (var i = 0; i < data.length; i++){
                        temp = document.createElement("div")
                        url = "static/video/"+fileMeta['name']
                        file_name = fileMeta['name'].split(".")[0]
                        temp.innerHTML = `<il class="ps-0 pt-0 inVideoItem bg-dark text-white list-group-item mx-1"  onclick="openVideoFrame(event)">
                            <div class="col-6" style="padding-left: 0px;padding-right: 0px;">
                                <video class="searchItem-frame" " 
                                        class="" 
                                        id = v-${i}-${file_name}
                                        width="100px"
                                        height="80px"
                                        muted
                                        alt="...">
                                    <source src="${url}" type="video/mp4">
                                </video>
                            </div>
                            <div class="col-6 px-0 pt-1">
                                <p class="card-text"><small class="text-muted">-0.01</small></p>
                            </div>
                            </il>`
                        
                    new_frame.appendChild(temp)
                    var videoImg = document.querySelector(`#v-${i}-${file_name}`)
                    videoImg.currentTime = Math.floor(data[i]/30)
                    videoImg.pause()
                    }
                }
            }, 2000)
            
        }else{
            root.innerHTML = ""
            
        }

      });
      
  }




