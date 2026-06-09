/****************************************
 APP CONFIG
 ****************************************/

const App = {

    version: "1.0.0",

    environment: "playground"

};

/****************************************
 TOAST
 ****************************************/

function showToast(
    message,
    type = "success"
){

    let toast =
        document.createElement("div");

    toast.className =
        `toast ${type}`;

    toast.innerText =
        message;

    Object.assign(
        toast.style,
        {

            position:"fixed",
            top:"20px",
            right:"20px",

            padding:"12px 20px",

            borderRadius:"6px",

            background:
                type === "success"

                    ? "#28a745"

                    : "#dc3545",

            color:"#fff",

            zIndex:"9999"

        }
    );

    document.body
        .appendChild(toast);

    setTimeout(()=>{

        toast.remove();

    },3000);

}

/****************************************
 LOADER
 ****************************************/

function showLoader(){

    let loader =
        document.getElementById(
            "globalLoader"
        );

    if(loader){

        loader.style.display =
            "flex";

    }

}

function hideLoader(){

    let loader =
        document.getElementById(
            "globalLoader"
        );

    if(loader){

        loader.style.display =
            "none";

    }

}

/****************************************
 STORAGE
 ****************************************/

function setStorage(
    key,
    value
){

    localStorage.setItem(
        key,
        JSON.stringify(value)
    );

}

function getStorage(
    key
){

    let value =
        localStorage.getItem(key);

    return value
        ? JSON.parse(value)
        : null;

}

function removeStorage(
    key
){

    localStorage.removeItem(key);

}

/****************************************
 SESSION
 ****************************************/

function setSession(
    key,
    value
){

    sessionStorage.setItem(
        key,
        JSON.stringify(value)
    );

}

function getSession(
    key
){

    let value =
        sessionStorage.getItem(key);

    return value
        ? JSON.parse(value)
        : null;

}

/****************************************
 NAVIGATION
 ****************************************/

function goTo(url){

    window.location.href =
        url;

}

function openNewTab(url){

    window.open(
        url,
        "_blank"
    );

}

/****************************************
 CONFIRM DIALOG
 ****************************************/

function confirmAction(
    message,
    callback
){

    const result =
        confirm(message);

    if(result){

        callback();

    }

}

/****************************************
 THEME
 ****************************************/

function toggleTheme(){

    document.body
        .classList
        .toggle("dark-mode");

}

/****************************************
 UUID
 ****************************************/

function generateId(){

    return Date.now() +

        Math.floor(
            Math.random() * 1000
        );

}

/****************************************
 TABLE HELPERS
 ****************************************/

function getRowCount(
    selector
){

    return document
        .querySelectorAll(
            selector
        ).length;

}

/****************************************
 AJAX MOCK
 ****************************************/

function mockApi(
    data,
    delay = 1000
){

    return new Promise(
        resolve => {

            setTimeout(()=>{

                resolve(data);

            },delay);

        }
    );

}

/****************************************
 INITIALIZE
 ****************************************/

document
    .addEventListener(
        "DOMContentLoaded",
        ()=>{

            console.log(
                "Automation Playground Loaded"
            );

        }
    );