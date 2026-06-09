let employees = [];

const tableBody =
    document.getElementById("tableBody");

const rowCount =
    document.getElementById("rowCount");

/****************************************
 LOAD DATA
 ****************************************/

document
    .getElementById("loadDataBtn")
    .addEventListener("click", loadData);

function loadData(){

    setTimeout(()=>{

        employees = [

            {
                id:1,
                name:"Ravindra",
                department:"QA",
                salary:50000
            },

            {
                id:2,
                name:"Amit",
                department:"Developer",
                salary:70000
            },

            {
                id:3,
                name:"Priya",
                department:"HR",
                salary:45000
            }

        ];

        renderTable();

    },1000);

}

/****************************************
 RENDER TABLE
 ****************************************/

function renderTable(){

    tableBody.innerHTML = "";

    employees.forEach(employee=>{

        tableBody.innerHTML += `

        <tr data-id="${employee.id}">

            <td>

                <input
                    type="checkbox"
                    class="rowCheckbox">

            </td>

            <td>${employee.id}</td>

            <td class="name">
                ${employee.name}
            </td>

            <td class="department">
                ${employee.department}
            </td>

            <td class="salary">
                ${employee.salary}
            </td>

            <td>

                <button
                    class="edit-btn">

                    Edit

                </button>

                <button
                    class="save-btn"
                    style="display:none;">

                    Save

                </button>

                <button
                    class="delete-btn">

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

    bindEvents();

    updateRowCount();

}

/****************************************
 ADD ROW
 ****************************************/

document
    .getElementById("addRowBtn")
    .addEventListener("click",()=>{

        const id =
            employees.length + 1;

        employees.push({

            id:id,
            name:"New User",
            department:"QA",
            salary:30000

        });

        renderTable();

    });

/****************************************
 DELETE ROW
 ****************************************/

function deleteRow(id){

    employees =
        employees.filter(

            employee =>
                employee.id !== id

        );

    renderTable();

}

/****************************************
 EDIT ROW
 ****************************************/

function editRow(row){

    row
        .querySelector(".name")
        .contentEditable = true;

    row
        .querySelector(".department")
        .contentEditable = true;

    row
        .querySelector(".salary")
        .contentEditable = true;

    row
        .querySelector(".edit-btn")
        .style.display = "none";

    row
        .querySelector(".save-btn")
        .style.display = "inline-block";

}

/****************************************
 SAVE ROW
 ****************************************/

function saveRow(row){

    const id =
        Number(
            row.dataset.id
        );

    const employee =
        employees.find(
            e => e.id === id
        );

    employee.name =
        row
            .querySelector(".name")
            .innerText;

    employee.department =
        row
            .querySelector(".department")
            .innerText;

    employee.salary =
        row
            .querySelector(".salary")
            .innerText;

    row
        .querySelector(".name")
        .contentEditable = false;

    row
        .querySelector(".department")
        .contentEditable = false;

    row
        .querySelector(".salary")
        .contentEditable = false;

    row
        .querySelector(".edit-btn")
        .style.display = "inline-block";

    row
        .querySelector(".save-btn")
        .style.display = "none";

}

/****************************************
 SEARCH
 ****************************************/

document
    .getElementById("searchInput")
    .addEventListener("keyup",(event)=>{

        const keyword =
            event.target.value
                .toLowerCase();

        document
            .querySelectorAll(
                "#tableBody tr"
            )
            .forEach(row=>{

                const text =
                    row.innerText
                        .toLowerCase();

                row.style.display =

                    text.includes(keyword)

                        ? ""

                        : "none";

            });

    });

/****************************************
 SELECT ALL
 ****************************************/

document
    .getElementById("selectAll")
    .addEventListener("change",
        function(){

            document
                .querySelectorAll(
                    ".rowCheckbox"
                )
                .forEach(checkbox=>{

                    checkbox.checked =
                        this.checked;

                });

        });

/****************************************
 ROW COUNT
 ****************************************/

function updateRowCount(){

    rowCount.innerText =

        "Total Rows : " +

        employees.length;

}

/****************************************
 EVENT BINDING
 ****************************************/

function bindEvents(){

    document
        .querySelectorAll(
            ".edit-btn"
        )
        .forEach(button=>{

            button.onclick = ()=>{

                const row =
                    button.closest("tr");

                editRow(row);

            };

        });

    document
        .querySelectorAll(
            ".save-btn"
        )
        .forEach(button=>{

            button.onclick = ()=>{

                const row =
                    button.closest("tr");

                saveRow(row);

            };

        });

    document
        .querySelectorAll(
            ".delete-btn"
        )
        .forEach(button=>{

            button.onclick = ()=>{

                const row =
                    button.closest("tr");

                const id =
                    Number(
                        row.dataset.id
                    );

                deleteRow(id);

            };

        });

}