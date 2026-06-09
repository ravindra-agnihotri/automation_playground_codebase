/****************************************
 ELEMENTS
 ****************************************/

const startBtn =
    document.getElementById(
        "startProgressBtn"
    );

const pauseBtn =
    document.getElementById(
        "pauseProgressBtn"
    );

const resumeBtn =
    document.getElementById(
        "resumeProgressBtn"
    );

const resetBtn =
    document.getElementById(
        "resetProgressBtn"
    );

const progressBar =
    document.getElementById(
        "progressBar"
    );

const progressText =
    document.getElementById(
        "progressText"
    );

const circularProgress =
    document.getElementById(
        "circularProgress"
    );

/****************************************
 STATE
 ****************************************/

let progress = 0;

let timer = null;

let paused = false;

/****************************************
 UPDATE UI
 ****************************************/

function updateProgress(){

    if(progressBar){

        progressBar.style.width =
            progress + "%";

    }

    if(progressText){

        progressText.innerText =
            progress + "%";

    }

    if(circularProgress){

        circularProgress.innerText =
            progress + "%";

    }

}

/****************************************
 START
 ****************************************/

function startProgress(){

    clearInterval(timer);

    progress = 0;

    paused = false;

    updateProgress();

    timer = setInterval(()=>{

        if(paused)
            return;

        progress++;

        updateProgress();

        if(progress >= 100){

            clearInterval(
                timer
            );

            showToast(
                "Process Completed"
            );

        }

    },100);

}

/****************************************
 PAUSE
 ****************************************/

function pauseProgress(){

    paused = true;

    showToast(
        "Progress Paused"
    );

}

/****************************************
 RESUME
 ****************************************/

function resumeProgress(){

    paused = false;

    showToast(
        "Progress Resumed"
    );

}

/****************************************
 RESET
 ****************************************/

function resetProgress(){

    clearInterval(timer);

    progress = 0;

    paused = false;

    updateProgress();

    showToast(
        "Progress Reset"
    );

}

/****************************************
 FAKE FILE UPLOAD
 ****************************************/

function simulateUpload(){

    resetProgress();

    timer = setInterval(()=>{

        progress += 2;

        updateProgress();

        if(progress >= 100){

            clearInterval(
                timer
            );

            showToast(
                "Upload Complete"
            );

        }

    },100);

}

/****************************************
 FAKE DOWNLOAD
 ****************************************/

function simulateDownload(){

    resetProgress();

    timer = setInterval(()=>{

        progress += 4;

        updateProgress();

        if(progress >= 100){

            clearInterval(
                timer
            );

            showToast(
                "Download Complete"
            );

        }

    },100);

}

/****************************************
 STEP PROGRESS
 ****************************************/

function updateStepProgress(
    step
){

    document
        .querySelectorAll(
            ".step"
        )
        .forEach((item,index)=>{

            if(index < step){

                item.classList.add(
                    "completed"
                );

            }
            else{

                item.classList.remove(
                    "completed"
                );

            }

        });

}

/****************************************
 INDETERMINATE
 ****************************************/

function startIndeterminate(){

    if(!progressBar)
        return;

    progressBar.classList.add(
        "indeterminate"
    );

}

/****************************************
 STOP INDETERMINATE
 ****************************************/

function stopIndeterminate(){

    if(!progressBar)
        return;

    progressBar.classList.remove(
        "indeterminate"
    );

}

/****************************************
 EVENTS
 ****************************************/

if(startBtn){

    startBtn
        .addEventListener(
            "click",
            startProgress
        );

}

if(pauseBtn){

    pauseBtn
        .addEventListener(
            "click",
            pauseProgress
        );

}

if(resumeBtn){

    resumeBtn
        .addEventListener(
            "click",
            resumeProgress
        );

}

if(resetBtn){

    resetBtn
        .addEventListener(
            "click",
            resetProgress
        );

}

/****************************************
 API
 ****************************************/

function getProgress(){

    return progress;

}

function setProgress(value){

    progress = value;

    updateProgress();

}

/****************************************
 INIT
 ****************************************/

document
    .addEventListener(
        "DOMContentLoaded",
        ()=>{

            updateProgress();

            console.log(
                "Progress Module Loaded"
            );

        }
    );