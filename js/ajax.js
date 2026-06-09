/****************************************
 ELEMENTS
 ****************************************/

const loadUsersBtn =
    document.getElementById(
        "loadUsersBtn"
    );

const spinner =
    document.getElementById(
        "spinner"
    );

const status =
    document.getElementById(
        "status"
    );

const userTableBody =
    document.getElementById(
        "userTableBody"
    );

const searchBtn =
    document.getElementById(
        "searchBtn"
    );

const searchBox =
    document.getElementById(
        "searchBox"
    );

const searchResult =
    document.getElementById(
        "searchResult"
    );

const retryBtn =
    document.getElementById(
        "retryBtn"
    );

const retryResult =
    document.getElementById(
        "retryResult"
    );

const lazyLoadBtn =
    document.getElementById(
        "lazyLoadBtn"
    );

const lazyContent =
    document.getElementById(
        "lazyContent"
    );

const replaceBtn =
    document.getElementById(
        "replaceBtn"
    );

/****************************************
 DATA
 ****************************************/

const users = [

    {
        id:1,
        name:"Ravindra",
        dept:"QA"
    },

    {
        id:2,
        name:"John",
        dept:"Developer"
    },

    {
        id:3,
        name:"Amit",
        dept:"DevOps"
    },

    {
        id:4,
        name:"Priya",
        dept:"HR"
    },

    {
        id:5,
        name:"Sneha",
        dept:"Support"
    }

];

/****************************************
 LOAD USERS
 ****************************************/

function renderUsers(){

    userTableBody.innerHTML =
        "";

    users.forEach(user=>{

        userTableBody.innerHTML +=

            `
        <tr>

            <td>${user.id}</td>

            <td>${user.name}</td>

            <td>${user.dept}</td>

        </tr>
        `;

    });

}

function loadUsers(){

    spinner.style.display =
        "block";

    status.innerHTML =
        "";

    setTimeout(()=>{

        spinner.style.display =
            "none";

        renderUsers();

        status.innerHTML =

            `
        <span class="success">
            Data Loaded Successfully
        </span>
        `;

        showToast(
            "Users Loaded"
        );

    },3000);

}

if(loadUsersBtn){

    loadUsersBtn
        .addEventListener(
            "click",
            loadUsers
        );

}

/****************************************
 AJAX SEARCH
 ****************************************/

function searchUser(){

    const keyword =

        searchBox.value
            .trim()
            .toLowerCase();

    searchResult.innerHTML =
        "Searching...";

    setTimeout(()=>{

        const user =
            users.find(item=>

                item.name
                    .toLowerCase()
                    .includes(keyword)

            );

        if(user){

            searchResult.innerHTML =

                `
            <span class="success">

                Found :

                ${user.name}

            </span>
            `;

        }
        else{

            searchResult.innerHTML =

                `
            <span class="error">

                User Not Found

            </span>
            `;

        }

    },2000);

}

if(searchBtn){

    searchBtn
        .addEventListener(
            "click",
            searchUser
        );

}

/****************************************
 ENTER KEY SEARCH
 ****************************************/

if(searchBox){

    searchBox
        .addEventListener(
            "keypress",
            event=>{

                if(
                    event.key ===
                    "Enter"
                ){

                    searchUser();

                }

            }
        );

}

/****************************************
 RETRY SERVICE
 ****************************************/

let retryCount = 0;

function callService(){

    retryCount++;

    if(retryCount < 3){

        retryResult.innerHTML =

            `
        <span class="error">

            Service Unavailable

            (Attempt ${retryCount})

        </span>
        `;

    }
    else{

        retryResult.innerHTML =

            `
        <span class="success">

            Success After Retry

        </span>
        `;

        showToast(
            "Retry Successful"
        );

    }

}

if(retryBtn){

    retryBtn
        .addEventListener(
            "click",
            callService
        );

}

/****************************************
 LAZY LOAD
 ****************************************/

let page = 1;

function loadMoreContent(){

    lazyLoadBtn.disabled =
        true;

    lazyLoadBtn.innerText =
        "Loading...";

    setTimeout(()=>{

        lazyContent.innerHTML +=

            `
        <div>

            Content Block ${page}

        </div>
        `;

        page++;

        lazyLoadBtn.disabled =
            false;

        lazyLoadBtn.innerText =
            "Load More";

    },1500);

}

if(lazyLoadBtn){

    lazyLoadBtn
        .addEventListener(
            "click",
            loadMoreContent
        );

}

/****************************************
 STALE ELEMENT DEMO
 ****************************************/

function replaceElement(){

    const oldElement =
        document.getElementById(
            "replaceableText"
        );

    if(!oldElement)
        return;

    oldElement.outerHTML =

        `
    <p id="replaceableText">

        New Element Created

    </p>
    `;

    showToast(
        "Element Replaced"
    );

}

if(replaceBtn){

    replaceBtn
        .addEventListener(
            "click",
            replaceElement
        );

}

/****************************************
 MOCK API
 ****************************************/

async function fetchUsers(){

    try{

        showLoader();

        const response =

            await mockApi(
                users,
                1000
            );

        hideLoader();

        return response;

    }
    catch(error){

        hideLoader();

        console.error(
            error
        );

        return [];

    }

}

/****************************************
 INIT
 ****************************************/

document
    .addEventListener(
        "DOMContentLoaded",
        ()=>{

            console.log(
                "AJAX Module Loaded"
            );

        }
    );