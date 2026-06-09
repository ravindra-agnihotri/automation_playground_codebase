/****************************************
 DATA SOURCE
 ****************************************/

const suggestionsData = [

    "Java",
    "Java 8",
    "Java 17",
    "Spring",
    "Spring Boot",
    "Spring MVC",
    "Hibernate",
    "Maven",
    "Gradle",
    "JUnit",
    "TestNG",
    "Mockito",
    "Selenium",
    "Selenium WebDriver",
    "Playwright",
    "Cypress",
    "Rest Assured",
    "Postman",
    "Docker",
    "Kubernetes",
    "Jenkins",
    "Git",
    "GitHub",
    "AWS",
    "Azure",
    "GCP",
    "React",
    "Angular",
    "Vue",
    "TypeScript",
    "JavaScript"

];

/****************************************
 ELEMENTS
 ****************************************/

const searchInput =
    document.getElementById(
        "searchInput"
    );

const suggestionContainer =
    document.getElementById(
        "suggestionContainer"
    );

/****************************************
 STATE
 ****************************************/

let currentIndex = -1;

let currentSuggestions = [];

/****************************************
 HIGHLIGHT
 ****************************************/

function highlightMatch(
    text,
    keyword
){

    if(!keyword){
        return text;
    }

    const regex =
        new RegExp(
            `(${keyword})`,
            "gi"
        );

    return text.replace(
        regex,
        "<strong>$1</strong>"
    );

}

/****************************************
 RENDER
 ****************************************/

function renderSuggestions(
    keyword
){

    if(
        !suggestionContainer
    ){
        return;
    }

    suggestionContainer.innerHTML =
        "";

    currentIndex = -1;

    if(!keyword){

        suggestionContainer
            .style.display =
            "none";

        return;
    }

    currentSuggestions =

        suggestionsData.filter(item=>

            item
                .toLowerCase()
                .includes(
                    keyword.toLowerCase()
                )

        );

    if(
        currentSuggestions.length === 0
    ){

        suggestionContainer
            .style.display =
            "none";

        return;

    }

    currentSuggestions
        .forEach(
            (
                item,
                index
            )=>{

                const div =
                    document
                        .createElement(
                            "div"
                        );

                div.className =
                    "suggestion-item";

                div.setAttribute(
                    "data-index",
                    index
                );

                div.innerHTML =

                    highlightMatch(
                        item,
                        keyword
                    );

                div.addEventListener(
                    "click",
                    ()=>{

                        selectSuggestion(
                            item
                        );

                    }
                );

                suggestionContainer
                    .appendChild(
                        div
                    );

            }
        );

    suggestionContainer
        .style.display =
        "block";

}

/****************************************
 SELECT
 ****************************************/

function selectSuggestion(
    value
){

    searchInput.value =
        value;

    suggestionContainer
        .style.display =
        "none";

    showToast(
        `Selected: ${value}`
    );

}

/****************************************
 KEYBOARD NAVIGATION
 ****************************************/

function moveDown(){

    if(
        currentIndex <
        currentSuggestions.length - 1
    ){

        currentIndex++;

        updateSelection();

    }

}

function moveUp(){

    if(currentIndex > 0){

        currentIndex--;

        updateSelection();

    }

}

function updateSelection(){

    document
        .querySelectorAll(
            ".suggestion-item"
        )
        .forEach(item=>{

            item.classList.remove(
                "active"
            );

        });

    const selectedItem =

        document
            .querySelector(
                `[data-index='${currentIndex}']`
            );

    if(selectedItem){

        selectedItem
            .classList
            .add(
                "active"
            );

    }

}

function selectCurrent(){

    if(
        currentIndex >= 0 &&
        currentSuggestions[
            currentIndex
            ]
    ){

        selectSuggestion(

            currentSuggestions[
                currentIndex
                ]

        );

    }

}

/****************************************
 AJAX SIMULATION
 ****************************************/

function fetchSuggestions(
    keyword
){

    suggestionContainer.innerHTML =

        `
    <div class="loading">

        Loading...

    </div>
    `;

    suggestionContainer
        .style.display =
        "block";

    setTimeout(()=>{

        renderSuggestions(
            keyword
        );

    },500);

}

/****************************************
 SEARCH EVENT
 ****************************************/

if(searchInput){

    searchInput
        .addEventListener(
            "keyup",
            event=>{

                if(

                    event.key ===
                    "ArrowDown" ||

                    event.key ===
                    "ArrowUp" ||

                    event.key ===
                    "Enter"

                ){
                    return;
                }

                const value =

                    event.target.value
                        .trim();

                fetchSuggestions(
                    value
                );

            }
        );

}

/****************************************
 KEY EVENTS
 ****************************************/

if(searchInput){

    searchInput
        .addEventListener(
            "keydown",
            event=>{

                switch(
                    event.key
                    ){

                    case "ArrowDown":

                        moveDown();

                        event.preventDefault();

                        break;

                    case "ArrowUp":

                        moveUp();

                        event.preventDefault();

                        break;

                    case "Enter":

                        selectCurrent();

                        event.preventDefault();

                        break;

                }

            }
        );

}

/****************************************
 OUTSIDE CLICK
 ****************************************/

document
    .addEventListener(
        "click",
        event=>{

            if(

                searchInput &&
                suggestionContainer &&

                !searchInput.contains(
                    event.target
                ) &&

                !suggestionContainer
                    .contains(
                        event.target
                    )

            ){

                suggestionContainer
                    .style.display =
                    "none";

            }

        }
    );

/****************************************
 CLEAR
 ****************************************/

function clearSuggestions(){

    if(
        suggestionContainer
    ){

        suggestionContainer
            .innerHTML = "";

        suggestionContainer
            .style.display =
            "none";

    }

}

/****************************************
 API
 ****************************************/

function getSuggestionCount(){

    return currentSuggestions.length;

}

function getCurrentSuggestions(){

    return currentSuggestions;

}

/****************************************
 INIT
 ****************************************/

document
    .addEventListener(
        "DOMContentLoaded",
        ()=>{

            console.log(
                "Autosuggestion Module Loaded"
            );

        }
    );