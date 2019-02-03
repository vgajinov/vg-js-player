
// Load style files
loadExtraFile("vg-js-player/fontawesome/css/all.css");
loadExtraFile("vg-js-player/vg-js-player.css");



function loadExtraFile (filename) {
    var fileref = document.createElement("link");
    fileref.rel = "stylesheet";
    fileref.type = "text/css";
    fileref.href = filename;
    document.getElementsByTagName("head")[0].appendChild(fileref);
}


function addVideoControls() {
    var videoTags = document.getElementsByTagName("video");
    for (item of videoTags) {
        if (item.hasAttribute("vg-js-player")) {
            var controlBar = createControls();
            item.parentNode.insertBefore(controlBar, item.nextSibling);
        }
    }
}


function createControls() {
    var div = document.createElement("div");
    div.setAttribute("id", "vg-controls");
    
    var table = document.createElement("table");
    table.setAttribute("id", "vg-controls-table");
    
    var tr = document.createElement("tr");
    
    // Play Button
    var td1 = document.createElement("td");
    td1.setAttribute("class", "vg-td");
    var playBtn = document.createElement("button");
    playBtn.setAttribute("type", "button");
    playBtn.setAttribute("class", "vg-button");
    playBtn.setAttribute("id", "vg-play-pause");
    var playIcon = document.createElement("i");
    playIcon.setAttribute("class","fa fa-play-circle");
    playBtn.appendChild(playIcon);
    td1.appendChild(playBtn);
    
    // Seek Bar
    var td2 = document.createElement("td");
    td2.setAttribute("class", "vg-td");
    var seekBar = document.createElement("input");
    seekBar.setAttribute("type", "range");
    seekBar.setAttribute("id", "vg-seek-bar");
    seekBar.setAttribute("class", "vg-slider");
    seekBar.setAttribute("value", "0");
    td2.appendChild(seekBar);
    
    // Progress Label
    var td3 = document.createElement("td");
    td3.setAttribute("class", "vg-td");
    var progressLabel = document.createElement("label");
    progressLabel.setAttribute("id", "vg-progress");
    progressLabel.innerHTML = "00:00/00:00";
    td3.appendChild(progressLabel);
    
    // Mute Button
    var td4 = document.createElement("td");
    td4.setAttribute("class", "vg-td");
    var muteBtn = document.createElement("button");
    muteBtn.setAttribute("type", "button");
    muteBtn.setAttribute("class", "vg-button");
    muteBtn.setAttribute("id", "vg-mute");
    var muteIcon = document.createElement("i");
    muteIcon.setAttribute("class","fa fa-volume-up");
    muteBtn.appendChild(muteIcon);
    td4.appendChild(muteBtn);
    
    // Volume Slider
    var td5 = document.createElement("td");
    td5.setAttribute("class", "vg-td");
    var volumeSlider = document.createElement("input");
    volumeSlider.setAttribute("type", "range");
    volumeSlider.setAttribute("id", "vg-volume-bar");
    volumeSlider.setAttribute("class", "vg-slider");
    volumeSlider.setAttribute("min", "0");
    volumeSlider.setAttribute("max", "1");
    volumeSlider.setAttribute("step", "0.1");
    volumeSlider.setAttribute("value", "1");
    td5.appendChild(volumeSlider);
    
    // Speed Control
    var td6 = document.createElement("td");
    td6.setAttribute("class", "vg-td");
    var speedLabel = document.createElement("label");
    speedLabel.setAttribute("id", "vg-speed-rate");
    speedLabel.innerHTML = "1.0x";
    td6.appendChild(speedLabel);
    // minus button
    var minusBtn = document.createElement("button");
    minusBtn.setAttribute("type", "button");
    minusBtn.setAttribute("class", "vg-button");
    minusBtn.setAttribute("id", "vg-speed-rate-down");
    var minusIcon = document.createElement("i");
    minusIcon.setAttribute("class","fa fa-minus");
    minusIcon.setAttribute("aria-hidden","true");
    minusBtn.appendChild(minusIcon);
    td6.appendChild(minusBtn);
    // plus button
    var plusBtn = document.createElement("button");
    plusBtn.setAttribute("type", "button");
    plusBtn.setAttribute("class", "vg-button");
    plusBtn.setAttribute("id", "vg-speed-rate-up");
    var plusIcon = document.createElement("i");
    plusIcon.setAttribute("class","fa fa-plus");
    plusIcon.setAttribute("aria-hidden","true");
    plusBtn.appendChild(plusIcon);
    td6.appendChild(plusBtn);
    
    // Full-screen Button
    var td7 = document.createElement("td");
    td7.setAttribute("class", "vg-td");
    var expandBtn = document.createElement("button");
    expandBtn.setAttribute("type", "button");
    expandBtn.setAttribute("class", "vg-button");
    expandBtn.setAttribute("id", "vg-full-screen");
    var expandIcon = document.createElement("i");
    expandIcon.setAttribute("class","fa fa-expand");
    expandBtn.appendChild(expandIcon);
    td7.appendChild(expandBtn);
    
    
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tr.appendChild(td7);
    table.appendChild(tr);
    div.appendChild(table);
    
    return div;
}



window.onload = function() {
    // add control bar for each video with our attribute
    addVideoControls();
    
    // Container & table
    var container = document.getElementById("video-container");
    var ctable    = document.getElementById("vg-controls-table");

    // Video
    var video     = document.getElementById("video");

    // Buttons
    var playButton       = document.getElementById("vg-play-pause");
    var muteButton       = document.getElementById("vg-mute");
    var fullScreenButton = document.getElementById("vg-full-screen");
    var speedUpButton    = document.getElementById("vg-speed-rate-up");
    var speedDownButton  = document.getElementById("vg-speed-rate-down");

    // Sliders
    var seekBar          = document.getElementById("vg-seek-bar");
    var volumeBar        = document.getElementById("vg-volume-bar");
    
    // Labels
    var progressLabel    = document.getElementById("vg-progress");
    var speedLabel       = document.getElementById("vg-speed-rate");
    
    
    // Set the widths of video controls
    var seekBarWidth = container.offsetWidth - 400 - 15;  // 400 = total width of other columns, 15 =  total padding for columns (7*2px)
    ctable.rows[0].cells[0].width =  30;
    ctable.rows[0].cells[1].width = seekBarWidth;
    ctable.rows[0].cells[2].width =  80;
    ctable.rows[0].cells[3].width =  30;
    ctable.rows[0].cells[4].width = 100;
    ctable.rows[0].cells[5].width = 100;
    ctable.rows[0].cells[6].width =  40;
    seekBar.style.width = '' + 100 + '%';
    

    
    function updateVideoMetadata() {
        var date = new Date(null);
        date.setSeconds(video.duration);
        var duration = date.toISOString().substr(14, 5);
        progressLabel.innerHTML =  '00:00/' + duration;
    }
    
    function updateCurrentVideoTime() {
        var date = new Date(null);
        date.setSeconds(video.currentTime);
        var currentTime = date.toISOString().substr(14, 5);
        var date2 = new Date(null);
        date2.setSeconds(video.duration);
        var duration = date2.toISOString().substr(14, 5);
        progressLabel.innerHTML = currentTime + '/' + duration;

        // Update the slider value
        var value = (100 / video.duration) * video.currentTime;
        seekBar.value = value;
    }
    
    // Set event handlers for video tags
    var videoTags = document.getElementsByTagName("video");
    for (item of videoTags) {
        // add timeupdate event handler
        item.addEventListener("timeupdate", function() {
            updateCurrentVideoTime();
        });
        
        if (item.readyState === 4 ) {
            // Handle the known race condition with the browser event handling.
            // When the page is loaded too fast the event handlers will miss the events
            // Video is loaded so just update the metadata directly
            updateVideoMetadata();
        }
        else {
            // add loadedmetadata event handler
            item.addEventListener("loadedmetadata", function() {
                updateVideoMetadata();
            });
        }
    }
    
  
    // Event listener for the play/pause button
    playButton.addEventListener("click", function() {
        if (video.paused == true) {
            // Play the video
            video.play();

            // Update the button text to 'Pause'
            playButton.innerHTML = '<i class="fa fa-pause-circle"></i>';
        } else {
            // Pause the video
            video.pause();

            // Update the button text to 'Play'
            playButton.innerHTML = '<i class="fa fa-play-circle"></i>';
        }
    });

    // Event listener for the mute button
    muteButton.addEventListener("click", function() {
        if (video.muted == false) {
            // Mute the video
            video.muted = true;

            // Update the button text
            muteButton.innerHTML = '<i class="fa fa-volume-mute"></i>';
        } else {
            // Unmute the video
            video.muted = false;

            // Update the button text
            muteButton.innerHTML = '<i class="fa fa-volume-up"></i>';
        }
    });
    
    
    // Event listener for the full-screen button
    fullScreenButton.addEventListener("click", function() {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen(); // Firefox
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen(); // Chrome and Safari
        }
    });
    

    // Event listener for the seek bar
    seekBar.addEventListener("change", function() {
        // Calculate the new time
        var time = video.duration * (seekBar.value / 100);

        // Update the video time
        video.currentTime = time;
    });

    
    // Pause the video when the slider handle is being dragged
    seekBar.addEventListener("mousedown", function() {
        video.pause();
    });

    // Play the video when the slider handle is dropped
    seekBar.addEventListener("mouseup", function() {
        video.play();
        playButton.innerHTML = '<i class="fa fa-pause-circle"></i>';
    });
        
        
    // Event listener for the volume bar
    volumeBar.addEventListener("change", function() {
        // Update the video volume
        video.volume = volumeBar.value;
    });
    
    
    // Event listener for the speed-down
    speedDownButton.addEventListener("click", function() {
        // Decrease speed 
        video.playbackRate = video.playbackRate - 0.1;
        speedLabel.innerHTML = video.playbackRate.toLocaleString('en', {maximumSignificantDigits : 2}) + 'x';
    });
    
    // Event listener for the speed-up
    speedUpButton.addEventListener("click", function() {
        // Increase speed 
        video.playbackRate = video.playbackRate + 0.1;
        speedLabel.innerHTML = video.playbackRate.toLocaleString('en', {maximumSignificantDigits : 2}) + 'x';
    });

}




