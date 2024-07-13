console.log(window.innerWidth);
///////////////////////////////////


function appendYouTubeButton() {
    document.querySelector("#logo > a").click();
    document.querySelector("ytd-logo yt-icon#logo-icon").click();
}

function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
}
function updateButtonText(button, text) {
    if (button) {
        button.innerText = text;
    } else {
        console.log('Button not found.');
    }
}

function createButton(text, classes, onClickHandler) {
    let button = document.createElement('button');
    button.innerText = text;
    button.classList.add(...classes);
    button.onclick = onClickHandler;
    return button;
}

function changePlaybackRate(delta) {
    let myvideoele = document.querySelector('#new-div2 video');

    if (myvideoele) {
        myvideoele.playbackRate += delta;
        updateButtonText(document.querySelector('#controls .myplayRate'), myvideoele.playbackRate);

        console.log(`Playback rate: ${myvideoele.playbackRate}`);
    } else {
        console.log('Video not found.');
    }
}

function downloadScreenshot() {
    let myvideoele = document.querySelector('#new-div2 video');

    if (myvideoele) {
        let canvas = document.createElement('canvas');
        canvas.width = myvideoele.videoWidth;
        canvas.height = myvideoele.videoHeight;
        let ctx = canvas.getContext('2d');
        ctx.drawImage(myvideoele, 0, 0, canvas.width, canvas.height);

        let title = document.querySelector('#title > h1').innerText;
        let time = formatTime(myvideoele.currentTime);
        let fileName = `${title} - ${time}.png`;

        canvas.toBlob(blob => {
            let link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = fileName;
            link.click();
        }, 'image/png');
    } else {
        console.log('Video not found.');
    }
}

function playPauseVideo(button) {
    let myvideoele = document.querySelector('#new-div2 video');

    if (myvideoele) {
        if (myvideoele.paused) {
            myvideoele.play();
            button.innerText = 'Pause';
        } else {
            myvideoele.pause();
            button.innerText = 'Play';
        }
    } else {
        console.log('Video not found.');
    }
}

function stopVideo() {
    let myvideoele = document.querySelector('#new-div2 video');

    if (myvideoele) {
        myvideoele.pause();
        myvideoele.currentTime = myvideoele.duration - 1;

        console.log('Video stopped.');
    } else {
        console.log('Video not found.');
    }
}

function toggleMute(button) {
    let myvideoele = document.querySelector('#new-div2 video');

    if (myvideoele) {
        myvideoele.muted = !myvideoele.muted;
        button.innerText = myvideoele.muted ? 'Unmute' : 'Mute';
        console.log(`Video ${myvideoele.muted ? 'muted' : 'unmuted'}.`);
    } else {
        console.log('Video not found.');
    }
}
function fullcss(){
  document.querySelector("#seekBar").style.top = "40vw";
  document.querySelector("#my-cl").style.height = "44vw";
  document.querySelector("#my-cr").style.height = "44vw";


  let elements = document.querySelectorAll(".roh-buttnn");
                elements.forEach(element => {
                    element.style.height = "70px";
                });
            
}
function halfcss(){
    document.querySelector("#seekBar").style.top = "38vw";
    document.querySelector("#my-cl").style.height = "39vw";
    document.querySelector("#my-cr").style.height = "39vw";
        let elements = document.querySelectorAll(".roh-buttnn");
        elements.forEach(element => {
            element.style.height = "100px";
        });
    
}
let isFullscreen = false;

function toggleFullscreenAndOrientation() {
    let myvideoele = document.querySelector('#new-div2');
    if (myvideoele) {
        if (!isFullscreen) {
            fullcss();
            if (myvideoele.requestFullscreen) myvideoele.requestFullscreen();
            else if (myvideoele.mozRequestFullScreen) myvideoele.mozRequestFullScreen();
            else if (myvideoele.webkitRequestFullscreen) myvideoele.webkitRequestFullscreen();
            else if (myvideoele.msRequestFullscreen) myvideoele.msRequestFullscreen();

            // Change to landscape orientation
            if (screen.orientation && screen.orientation.lock) {
                screen.orientation.lock('landscape').catch(function (error) {
                    console.log('Orientation lock failed:', error);
                });
            }
        } else {
            halfcss();
            if (document.exitFullscreen) document.exitFullscreen();
            else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
            else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
            else if (document.msExitFullscreen) document.msExitFullscreen();

            // Change to portrait orientation
            if (screen.orientation && screen.orientation.lock) {
                screen.orientation.lock('portrait').catch(function (error) {
                    console.log('Orientation lock failed:', error);
                });
            }
        }

        isFullscreen = !isFullscreen;
    } else {
        console.log('Video not found.');
    }
}
//////////////////////////////
function createControlsDiv() {

    let controlsDiv = document.createElement('div');
    controlsDiv.id = 'controls';
    let cl = document.createElement('div');
    cl.id = 'my-cl';
    let cr = document.createElement('div');
    cr.id = 'my-cr';
    controlsDiv.appendChild(cl);
    controlsDiv.appendChild(cr);



    let playPauseButton = createButton('Play', ['roh-buttnn', 'pnpover', 'playnpaz'], function () {
        playPauseVideo(playPauseButton);
    });
    controlsDiv.appendChild(playPauseButton);
    ////////////////////////////
    cl.appendChild(createButton('Stop', ['roh-buttnn', 'stp'], stopVideo));
    //////////////////////
    let seekBar = document.createElement('input');
    seekBar.type = 'range';
    seekBar.id = 'seekBar';
    seekBar.classList.add(['roh-buttnn']);
    seekBar.value = 0;
    seekBar.min = 0;
    seekBar.max = 100;

    seekBar.oninput = function () {
        let myvideoele = document.querySelector('#new-div2 video');

        if (myvideoele) {
            let newTime = myvideoele.duration * (seekBar.value / 100);
            if (isFinite(newTime)) {
                myvideoele.currentTime = Math.floor(newTime);
            } else {
                console.log('Calculated time is non-finite.');
            }
        } else {
            console.log('Video not found.');
        }
    };
    controlsDiv.appendChild(seekBar);

    //////////////////////////////
    function updateSeekBar() {

        let myvideoele = document.querySelector('#new-div2 video');

        if (myvideoele) {
            let seekBar = document.querySelector('#seekBar');
            let button = document.querySelector('#controls .stp');

            seekBar.value = (myvideoele.currentTime / myvideoele.duration) * 100;

            button.innerText = formatTime(myvideoele.currentTime);
        }
    }

    setInterval(updateSeekBar, 5000);
    ///////////////////////////////
    let volumeBar = document.createElement('input');
    volumeBar.type = 'range';
    volumeBar.id = 'volumeBar';
    volumeBar.classList.add(['roh-buttnn']);
    volumeBar.value = 1;
    volumeBar.min = 0;
    volumeBar.max = 1;
    volumeBar.step = 0.1;
    volumeBar.oninput = function () {
        let myvideoele = document.querySelector('#new-div2 video');

        if (myvideoele) {
            myvideoele.volume = volumeBar.value;
        } else {
            console.log('Video not found.');
        }
    };
    cl.appendChild(volumeBar);
    ///////////////////////////////
    cl.appendChild(createButton('Full-Screen', ['roh-buttnn'], toggleFullscreenAndOrientation));
    /////////////////////
    cl.appendChild(createButton('Increase Rate', ['roh-buttnn'], function () {
        changePlaybackRate(0.5);
    }));
    ////////////////////////////
    cl.appendChild(createButton('Decrease Rate', ['roh-buttnn'], function () {
        changePlaybackRate(-0.25);

    }));
    ///////////////////////////////
    cl.appendChild(createButton('One Rate', ['roh-buttnn', 'myplayRate'], function () {
        let myvideoele = document.querySelector('#new-div2 video');

        let nn = myvideoele.playbackRate;
        changePlaybackRate(1 - nn);
    }));
    //////////////////////////////
    cr.appendChild(createButton('back10', ['roh-buttnn', 'pnpover', 'back10'],
        function () {
            let myvideoele = document.querySelector('#new-div2 video');
            myvideoele.currentTime = myvideoele.currentTime - 10;

        }));
    //////////////////////// 
    cr.appendChild(createButton('back30', ['roh-buttnn', 'pnpover', 'back30'],
        function () {
            let myvideoele = document.querySelector('#new-div2 video');
            myvideoele.currentTime = myvideoele.currentTime - 30;

        }));
    ////////////////////////
    cr.appendChild(createButton('fore30', ['roh-buttnn', 'pnpover', 'fore30'],
        function () {

            let myvideoele = document.querySelector('#new-div2 video');
            myvideoele.currentTime = myvideoele.currentTime + 30;

        }));

    ///////////////////////////////

    cl.appendChild(createButton('Youtube', ['roh-buttnn'], appendYouTubeButton));
    ///////////////////////////////

    cr.appendChild(createButton('Screenshot', ['roh-buttnn'], downloadScreenshot));
    /////////////////////////////
    let muteButton = createButton('Mute', ['roh-buttnn'], function () {
        toggleMute(muteButton);
    });
    cr.appendChild(muteButton);
    ////////////////////////////

    const linkButton = document.createElement('a');
    linkButton.textContent = 'YouTube';
    linkButton.classList.add('roh-buttnn');
    linkButton.href = '/';
    //linkButton.target = '_blank'; // Optional: Opens the link in a new tab

    cr.appendChild(linkButton);

    //////////////////////////////////////
    return controlsDiv;
}

///////////////////////////////////////////////////////
function bbb() {
    if (document.querySelector("#new-div")) document.querySelector("#new-div").classList.remove(['hide-me']);
    setTimeout(function () {
        console.log('3 seconds have passed');

        // Check if the current URL matches the specified YouTube watch page
        if (window.location.href.includes('https://www.youtube.com/watch')) {
            console.log('URL match confirmed');

            // Create a new div element
            const newDiv = document.createElement('div');
            newDiv.id = 'new-div';
            newDiv.style.border = '1px solid #ccc'; // Example styling
            newDiv.style.padding = '10px'; // Example styling
            newDiv.style.display = 'flex';
            newDiv.style.flexDirection = 'column';

            // Append the new div to the body or a specific container
            document.body.appendChild(newDiv);
            console.log('New div created and appended to the body');
            ////////////////////////////

            /////////////////////////////////
            // Find the #movie_player > div.html5- myvideoele-container
            const videoContainer = document.querySelector('#movie_player > div.html5-video-container');
            if (videoContainer) {
                console.log('Video container found');

                // Create a new div element for new-div2
                const newDiv2 = document.createElement('div');
                newDiv2.id = 'new-div2';
                newDiv2.style.border = '1px solid #ccc'; // Example styling
                // newDiv2.style.margin = '10px'; // Example styling

                // Move the  myvideoele container into new-div2
                newDiv2.appendChild(videoContainer);
                newDiv2.appendChild(createControlsDiv());
                console.log('Video container moved to new-div2');

                // Append new-div2 to new-div
                newDiv.appendChild(newDiv2);
                console.log('new-div2 appended to new-div');


                //////////////////////////////////
                // Find the existing div with the id #below
                const belowDiv = document.getElementById('below');
                console.log('Searching for div with id "below"');

                // Check if the #below div exists and append it to the new div
                if (belowDiv) {
                    console.log('Div with id "below" found');
                    newDiv.appendChild(belowDiv);
                    console.log('Div with id "below" moved to the new div');
                } else {
                    console.error('Div with id "below" not found');
                }



                //[[[[]]]]
                const relatedDivs = document.querySelectorAll('#related');

                if (relatedDivs.length > 0) {
                    console.log(`Found ${relatedDivs.length} div(s) with id "related" inside #secondary`);

                    // Append each found element to the new div
                    relatedDivs.forEach(relatedDiv => {
                        newDiv.appendChild(relatedDiv);
                        console.log('Div with id "related" moved to the new div');
                    });
                } else {
                    console.error('No divs with id "related" found inside #secondary');
                }


                // Find the existing div with the id #related inside #secondary
                const secondaryDiv = document.getElementById('top-row');
                const relatedDiv = secondaryDiv ? document.querySelector('#secondary-inner') : null;
                console.log('Searching for div with id "related" inside #secondary');

                // Check if the #related div exists and append it to the new div
                if (relatedDiv) {
                    console.log('Div with id "playlist" found');
                    secondaryDiv.appendChild(relatedDiv);
                    console.log('Div with id "playlist" moved to the new div');
                } else {
                    console.error('Div with id "playlist" not found');
                }
                ////////
                if (document.querySelector("#controls") && document.querySelector("#new-div")) {
                    const controls = document.querySelector("#controls");
                    const newDiv = document.querySelector("#new-div");

                    newDiv.addEventListener("click", () => {
                        controls.style.opacity = "1";  // Make controls visible
                        setTimeout(() => {
                            controls.style.opacity = "0.1";  // Set opacity to 0.1 after 5 seconds
                        }, 5000);
                    });
                }

                ////////

            } else {
                console.error('Video container not found');
            }
        } else {
            console.log('URL does not match');
        }
    }, 3000);


}




///////----home--------////////////////////
function assignIDsToElements() {
    let elements = document.querySelectorAll('.style-scope.ytd-rich-grid-row');
    //console.log(`Number of elements selected: ${elements.length}`);

    elements.forEach((element, index) => {
        if (!element.id) {
            element.id = `rohitg-${index}`;
            //console.log(`Assigned ID: rohitg-${index} to element`);

            let videoTitle = element.querySelector('#video-title-link');
            if (videoTitle) {

                let lowerCaseTitle = videoTitle.title.toLowerCase();
                const wordsToCheck = ['ssc', 'cgl', 'chsl', 'math', 'reasoning', 'grammar', 'pyq'];
                if (wordsToCheck.some(word => lowerCaseTitle.includes(word))) {
                    //console.log('The title contains "PURI" or "ORISA"');
                } else {
                    element.style.setProperty('display', 'none', 'important');
                    console.log(videoTitle.title);
                }
            }
        }
    });
}

function handleNewElements(mutationsList, observer) {
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    assignIDsToElements(); // Assign IDs to new elements
                }
            });
        }
    }
}

function onDOMContentLoaded() {
    console.log('loaded home');
    // if (document.querySelector("#new-div")) document.querySelector("#new-div").classList.add(['hide-me']);
    const element = document.querySelector("#new-div");
    if (element) {
        element.remove();
    }

    // Select all elements that match the CSS selector
    var elements = document.querySelectorAll('yt-chip-cloud-chip-renderer[chip-style=STYLE_HOME_FILTER]');

    // Loop through each element
    elements.forEach(function (element) {
        const wordsToCheck = ['Combined Graduate Level Examination', 'cgl', 'chsl', 'staff selection commission', 'vocabulary', 'ssc', 'pyq'];
        if (wordsToCheck.some(word => element.querySelector('#text').title.toLowerCase().includes(word.toLowerCase()))) {
            // Create a new click event
            var event = new MouseEvent('click', {
                'view': window,
                'bubbles': true,
                'cancelable': true
            });

            // Dispatch the click event on the current element
            element.dispatchEvent(event);
        }
    });

    /////////////////////////////
    assignIDsToElements(); // Assign IDs to existing elements

    // Observer to handle future DOM mutations
    const observer = new MutationObserver(handleNewElements);
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}


//////----home--------////////////////////
(function () {
    let previousUrl = '';

    function checkUrl() {
        const currentUrl = window.location.href;

        if (currentUrl.includes("https://www.youtube.com/watch?") && currentUrl !== previousUrl) {

            movedtonext = true;
            console.log("url changed", currentUrl, movedtonext);
            bbb();
            previousUrl = currentUrl;
        }

        if (currentUrl === "https://www.youtube.com/" && currentUrl !== previousUrl) {
            console.log("url changed", currentUrl);

            if (['complete'].includes(document.readyState)) {
                // DOMContentLoaded has already fired, wait for 2 seconds
                setTimeout(onDOMContentLoaded, 2000); // 2000 milliseconds = 2 seconds
            } else {
                // Wait for DOMContentLoaded event
                document.addEventListener('DOMContentLoaded', () => {
                    setTimeout(onDOMContentLoaded, 2000); // 2000 milliseconds = 2 seconds
                });
            }
            previousUrl = currentUrl;
        }
    }

    // Check the URL initially
    checkUrl();

    // Use MutationObserver to listen for changes in the document's body (where the title is likely to change in SPAs)
    const observer = new MutationObserver(checkUrl);
    observer.observe(document.body, { childList: true, subtree: true });

    // Override pushState and replaceState to catch URL changes made by the application
    const pushState = history.pushState;
    history.pushState = function () {
        pushState.apply(history, arguments);
        checkUrl();
    };

    const replaceState = history.replaceState;
    history.replaceState = function () {
        replaceState.apply(history, arguments);
        checkUrl();
    };

    // Listen for popstate events (back/forward navigation)
    window.addEventListener('popstate', checkUrl);
})();










///////////////csss//////////////////

//////----home--------////////////////////
// Define the CSS content
const cssContent = `
:root {
    --my-vidht: calc(100vw *9/16);
    /* 16:9*/
    --my-vidwt: 100vw;


    --my-vidht2: calc(var(--my-vidht) - 7vw);
}

/*------------------------------*/
ytd-mini-guide-renderer.style-scope.ytd-app {
    display: none;
}

.hide-me,
ytd-rich-section-renderer {

    display: none !important;
}

ytm-reel-shelf-renderer {
    display: none !important;
}

ytd-preview {
    display: none !important;
}

/*------------------------------*/
ytd-rich-item-renderer {
    width: 880px !important;
    height: 495px !important;
    margin: 10px !important;
    border: 2px solid red;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;

    zoom: 1.7;
}

ytd-rich-grid-row #contents.ytd-rich-grid-row {
    /*rohit:rohit;*/
    display: flex !important;
    flex-direction: column;
    align-items: flex-start;
    align-items: center;
    margin: 20px !important;
}

#content.ytd-rich-item-renderer {
    zoom: 1.2;
}

/*------------------------------*/
/* watch done////////////////////*/

/*////////////////////*/
ytd-comments {
    display: none !important;
}

div#below {
    font-size: 28px !important;
    line-height: 30px !important;

    margin-block: 50px;

    #info,
    #meta {
        display: none !important;
    }
}

#secondary {
    display: none !important;
}

#secondary #donation-shelf {
    display: none !important;

}

#secondary #chat-container {
    display: none !important;
}

#related div#items {

    zoom: 2;
    /*width: 10vw !important; noeffect*/
}

#video-title.ytd-compact-video-renderer {

    font-size: 28px !important;
    line-height: 30px !important;
    font-weight: 500 !important;
    overflow: hidden;
    display: block;
    max-height: 16rem !important;
    -webkit-line-clamp: 4 !important;

}

ytd-compact-video-renderer.style-scope.ytd-watch-next-secondary-results-renderer {
    width: 55vw !important;
}

.ytp-chrome-bottom {}

.ytp-left-controls {}

.ytp-right-controls {}

/*////////////////////*/

#new-div {
    margin-top: var(--my-vidht) !important;
    overflow: scroll;
    position: absolute;
    width: var(--my-vidwt) !important;


}

#new-div2 {
    z-index: 9994;
    position: fixed;
    top: 0;
    left: 0;
    height: var(--my-vidht) !important;
    width: var(--my-vidwt) !important;

}

.html5-video-container {
    height: 100% !important;
    width: 100% !important;
}

video {
    height: 100% !important;
    width: 100% !important;
}

/*------------------------------*/
#controls {
    position: absolute;
    top: 20px;
    display: flex;
    flex-wrap: wrap;
    max-width: 300px;
    max-height: 300tx;
    z-index: 99995;
}

.roh-buttnn {
    margin-left: 10px;
    margin-bottom: 10px;

    opacity: 0.8;
    cursor: pointer;
    color: cyan;
    width: 100px;
    font-size: 24px;
    height: 100px;
    background: white;
}

a.roh-buttnn {}

.myfullscreen {}

.playnpaz {
    position: absolute;
    background: transparent;
    height: 200px;
    width: 200px;
    top: calc(-1*var(--my-vidht)/1.6);
    top: 100px;
    border: 2px solid black;
    color: transparent;
    left: calc(var(--my-vidwt)/2.5);
}



.back30 {
    /*left: calc(var(--my-vidwt)/9);*/

}


.fore30 {
    /*left: calc(var(--my-vidwt)/1.5);*/

}

#seekBar {
    position: absolute;
    left: 16vw;
    top: 40vw;
    width: 68vw;
}



#my-cl {
    position: absolute;
    display: flex;
    flex-wrap: wrap;
    overflow: scroll;
    height: var(--my-vidht2) ;
    top: 10px;
    left: 10px;

    background: redd;
}

#my-cr {
    position: absolute;
    display: flex;
    flex-wrap: wrap;
    overflow: scroll;
    height: var(--my-vidht2) ;
    top: 10px;
    left: 90vw;

    background: redd;
}`;


const style = document.createElement('style');
style.textContent = cssContent;
document.head.appendChild(style);

//////----home--------////////////////////