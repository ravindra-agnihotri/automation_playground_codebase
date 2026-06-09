/****************************************
 DATA SOURCE
 ****************************************/

const employees = [];

for(let i = 1; i <= 100; i++){

    employees.push({

        id: i,

        name: `Employee ${i}`,

        department:
            `Department ${((i - 1) % 5) + 1}`

    });

}

/****************************************
 PAGINATION STATE
 ****************************************/

let currentPage = 1;

let pageSize = 5;

/****************************************
 ELEMENTS
 ****************************************/

const tableBody =
    document.getElementById(
        "tableBody"
    );

const recordCount =
    document.getElementById(
        "recordCount"
    );

const currentPageElement =
    document.getElementById(
        "currentPage"
    );

const pageNumbers =
    document.getElementById(
        "pageNumbers"
    );

const pageSizeDropdown =
    document.getElementById(
        "pageSize"
    );

const firstBtn =
    document.getElementById(
        "firstBtn"
    );

const prevBtn =
    document.getElementById(
        "prevBtn"
    );

const nextBtn =
    document.getElementById(
        "nextBtn"
    );

const lastBtn =
    document.getElementById(
        "lastBtn"
    );

/****************************************
 TOTAL PAGES
 ****************************************/

function getTotalPages(){

    return Math.ceil(

        employees.length /
        pageSize

    );

}

/****************************************
 TABLE RENDER
 ****************************************/

function renderTable(){

    tableBody.innerHTML =
        "";

    const start =

        (currentPage - 1)
        * pageSize;

    const end =

        start + pageSize;

    const data =

        employees.slice(
            start,
            end
        );

    data.forEach(employee=>{

        tableBody.innerHTML +=

            `
        <tr>

            <td>
                ${employee.id}
            </td>

            <td>
                ${employee.name}
            </td>

            <td>
                ${employee.department}
            </td>

        </tr>
        `;

    });

    recordCount.innerText =

        employees.length;

    currentPageElement.innerText =

        currentPage;

    renderPageButtons();

    updateButtons();

}

/****************************************
 PAGE BUTTONS
 ****************************************/

function renderPageButtons(){

    pageNumbers.innerHTML =
        "";

    const totalPages =
        getTotalPages();

    for(
        let i = 1;
        i <= totalPages;
        i++
    ){

        const button =
            document.createElement(
                "button"
            );

        button.innerText = i;

        if(
            i === currentPage
        ){

            button.classList.add(
                "active"
            );

        }

        button.addEventListener(
            "click",
            ()=>{

                currentPage = i;

                renderTable();

            }
        );

        pageNumbers.appendChild(
            button
        );

    }

}

/****************************************
 BUTTON STATES
 ****************************************/

function updateButtons(){

    const totalPages =
        getTotalPages();

    firstBtn.disabled =
        currentPage === 1;

    prevBtn.disabled =
        currentPage === 1;

    nextBtn.disabled =
        currentPage === totalPages;

    lastBtn.disabled =
        currentPage === totalPages;

}

/****************************************
 FIRST PAGE
 ****************************************/

function firstPage(){

    currentPage = 1;

    renderTable();

}

/****************************************
 PREVIOUS PAGE
 ****************************************/

function previousPage(){

    if(
        currentPage > 1
    ){

        currentPage--;

        renderTable();

    }

}

/****************************************
 NEXT PAGE
 ****************************************/

function nextPage(){

    const totalPages =
        getTotalPages();

    if(
        currentPage < totalPages
    ){

        currentPage++;

        renderTable();

    }

}

/****************************************
 LAST PAGE
 ****************************************/

function lastPage(){

    currentPage =
        getTotalPages();

    renderTable();

}

/****************************************
 PAGE SIZE CHANGE
 ****************************************/

function changePageSize(){

    pageSize =
        parseInt(
            pageSizeDropdown.value
        );

    currentPage = 1;

    renderTable();

    showToast(
        `Page Size: ${pageSize}`
    );

}

/****************************************
 EVENTS
 ****************************************/

if(firstBtn){

    firstBtn
        .addEventListener(
            "click",
            firstPage
        );

}

if(prevBtn){

    prevBtn
        .addEventListener(
            "click",
            previousPage
        );

}

if(nextBtn){

    nextBtn
        .addEventListener(
            "click",
            nextPage
        );

}

if(lastBtn){

    lastBtn
        .addEventListener(
            "click",
            lastPage
        );

}

if(pageSizeDropdown){

    pageSizeDropdown
        .addEventListener(
            "change",
            changePageSize
        );

}

/****************************************
 GO TO PAGE API
 ****************************************/

function goToPage(pageNumber){

    const totalPages =
        getTotalPages();

    if(
        pageNumber >= 1 &&
        pageNumber <= totalPages
    ){

        currentPage =
            pageNumber;

        renderTable();

    }

}

/****************************************
 REFRESH TABLE
 ****************************************/

function refreshPagination(){

    renderTable();

}

/****************************************
 INITIALIZATION
 ****************************************/

document
    .addEventListener(
        "DOMContentLoaded",
        ()=>{

            renderTable();

            console.log(
                "Pagination Module Loaded"
            );

        }
    );