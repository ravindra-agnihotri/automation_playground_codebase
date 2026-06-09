/****************************************
 CONFIGURATION
 ****************************************/

let page = 1;

const maxPages = 10;

let loading = false;

const recordsPerPage = 10;

/****************************************
 ELEMENTS
 ****************************************/

const content =
    document.getElementById(
        "content"
    );

const spinner =
    document.getElementById(
        "spinner"
    );

const endMessage =
    document.getElementById(
        "endMessage"
    );

const scrollTopBtn =
    document.getElementById(
        "scrollTopBtn"
    );

/****************************************
 LOAD DATA
 ****************************************/

function loadData(){

    if(loading){
        return;
    }

    if(page > maxPages){

        if(endMessage){

            endMessage.style.display =
                "block";

        }

        return;
    }

    loading = true;

    if(spinner){

        spinner.style.display =
            "block";

    }

    setTimeout(()=>{

        appendRecords();

        loading = false;

        if(spinner){

            spinner.style.display =
                "none";

        }

    },1500);

}

/****************************************
 APPEND RECORDS
 ****************************************/

function appendRecords(){

    if(!content){
        return;
    }

    for(
        let i = 1;
        i <= recordsPerPage;
        i++
    ){

        const recordNumber =

            ((page - 1)
                * recordsPerPage)
            + i;

        const card =
            document.createElement(
                "div"
            );

        card.className =
            "item";

        card.setAttribute(
            "data-record",
            recordNumber
        );

        card.innerHTML =

            `
        <h3>
            Record ${recordNumber}
        </h3>

        <p>
            Dynamic content loaded
            using AJAX simulation.
        </p>
        `;

        content.appendChild(
            card
        );

    }

    page++;

}

/****************************************
 SCROLL CHECK
 ****************************************/

function checkScroll(){

    const scrollPosition =

        window.innerHeight +
        window.scrollY;

    const pageHeight =

        document.body.offsetHeight;

    if(
        scrollPosition >=
        pageHeight - 100
    ){

        loadData();

    }

    toggleScrollTopButton();

}

/****************************************
 TOP BUTTON
 ****************************************/

function toggleScrollTopButton(){

    if(!scrollTopBtn){
        return;
    }

    if(window.scrollY > 500){

        scrollTopBtn.style.display =
            "block";

    }
    else{

        scrollTopBtn.style.display =
            "none";

    }

}

/****************************************
 SCROLL TOP
 ****************************************/

function scrollToTop(){

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}

/****************************************
 LOAD ALL DATA
 ****************************************/

function loadEverything(){

    const interval =
        setInterval(()=>{

            if(page > maxPages){

                clearInterval(
                    interval
                );

                return;

            }

            loadData();

        },1700);

}

/****************************************
 RESET
 ****************************************/

function resetInfiniteScroll(){

    page = 1;

    loading = false;

    if(content){

        content.innerHTML = "";

    }

    if(endMessage){

        endMessage.style.display =
            "none";

    }

    loadData();

}

/****************************************
 RECORD COUNT
 ****************************************/

function getLoadedRecordCount(){

    return document
        .querySelectorAll(
            ".item"
        )
        .length;

}

/****************************************
 EVENT BINDING
 ****************************************/

window.addEventListener(
    "scroll",
    checkScroll
);

if(scrollTopBtn){

    scrollTopBtn
        .addEventListener(
            "click",
            scrollToTop
        );

}

/****************************************
 INITIALIZATION
 ****************************************/

document
    .addEventListener(
        "DOMContentLoaded",
        ()=>{

            loadData();

            console.log(
                "Infinite Scroll Module Loaded"
            );

        }
    );