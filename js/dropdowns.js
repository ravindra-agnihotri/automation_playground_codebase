/****************************************
 DYNAMIC COUNTRY -> STATE -> CITY
 ****************************************/

const locationData = {

    India: {

        Maharashtra: [
            "Mumbai",
            "Pune",
            "Nashik",
            "Nagpur"
        ],

        MP: [
            "Jabalpur",
            "Bhopal",
            "Indore",
            "Gwalior"
        ],

        Gujarat: [
            "Ahmedabad",
            "Surat",
            "Vadodara"
        ]

    },

    USA: {

        California: [
            "Los Angeles",
            "San Diego",
            "San Francisco"
        ],

        Texas: [
            "Dallas",
            "Houston",
            "Austin"
        ]

    },

    UK: {

        England: [
            "London",
            "Manchester",
            "Liverpool"
        ],

        Scotland: [
            "Edinburgh",
            "Glasgow"
        ]

    }

};

/****************************************
 ELEMENTS
 ****************************************/

const country =
    document.getElementById("country");

const state =
    document.getElementById("state");

const city =
    document.getElementById("city");

/****************************************
 LOAD COUNTRIES
 ****************************************/

function loadCountries(){

    if(!country) return;

    country.innerHTML =
        '<option value="">Select Country</option>';

    Object.keys(locationData)
        .forEach(countryName => {

            const option =
                document.createElement("option");

            option.value =
                countryName;

            option.textContent =
                countryName;

            country.appendChild(option);

        });

}

/****************************************
 LOAD STATES
 ****************************************/

function loadStates(){

    state.innerHTML =
        '<option value="">Select State</option>';

    city.innerHTML =
        '<option value="">Select City</option>';

    const selectedCountry =
        country.value;

    if(!selectedCountry)
        return;

    Object.keys(
        locationData[selectedCountry]
    )
        .forEach(stateName => {

            const option =
                document.createElement("option");

            option.value =
                stateName;

            option.textContent =
                stateName;

            state.appendChild(option);

        });

}

/****************************************
 LOAD CITIES
 ****************************************/

function loadCities(){

    city.innerHTML =
        '<option value="">Select City</option>';

    const selectedCountry =
        country.value;

    const selectedState =
        state.value;

    if(
        !selectedCountry ||
        !selectedState
    ){
        return;
    }

    locationData
        [selectedCountry]
        [selectedState]
        .forEach(cityName => {

            const option =
                document.createElement("option");

            option.value =
                cityName;

            option.textContent =
                cityName;

            city.appendChild(option);

        });

}

/****************************************
 EVENTS
 ****************************************/

if(country){

    country.addEventListener(
        "change",
        loadStates
    );

}

if(state){

    state.addEventListener(
        "change",
        loadCities
    );

}

/****************************************
 SEARCHABLE DROPDOWN
 ****************************************/

const technologies = [

    "Java",
    "Spring Boot",
    "Hibernate",
    "Selenium",
    "Playwright",
    "Cypress",
    "AWS",
    "Azure",
    "Docker",
    "Kubernetes",
    "React",
    "Angular"

];

const searchInput =
    document.getElementById(
        "searchInput"
    );

const suggestionBox =
    document.getElementById(
        "suggestions"
    );

function renderSuggestions(
    value
){

    if(
        !suggestionBox ||
        !searchInput
    ){
        return;
    }

    suggestionBox.innerHTML = "";

    if(!value){

        suggestionBox.style.display =
            "none";

        return;
    }

    const filteredItems =
        technologies.filter(item =>

            item
                .toLowerCase()
                .includes(
                    value.toLowerCase()
                )

        );

    if(filteredItems.length === 0){

        suggestionBox.style.display =
            "none";

        return;

    }

    filteredItems.forEach(item => {

        const div =
            document.createElement("div");

        div.className =
            "suggestion-item";

        div.textContent =
            item;

        div.addEventListener(
            "click",
            () => {

                searchInput.value =
                    item;

                suggestionBox.style.display =
                    "none";

            }
        );

        suggestionBox.appendChild(div);

    });

    suggestionBox.style.display =
        "block";

}

if(searchInput){

    searchInput.addEventListener(
        "keyup",
        e => {

            renderSuggestions(
                e.target.value
            );

        }
    );

}

/****************************************
 HIDE SUGGESTIONS
 ****************************************/

document.addEventListener(
    "click",
    event => {

        if(
            suggestionBox &&
            searchInput &&
            !searchInput.contains(
                event.target
            ) &&
            !suggestionBox.contains(
                event.target
            )
        ){

            suggestionBox.style.display =
                "none";

        }

    }
);

/****************************************
 AJAX DROPDOWN
 ****************************************/

const loadCountriesBtn =
    document.getElementById(
        "loadCountriesBtn"
    );

const ajaxDropdown =
    document.getElementById(
        "ajaxDropdown"
    );

function loadAjaxCountries(){

    if(
        !ajaxDropdown
    ){
        return;
    }

    showLoader();

    setTimeout(()=>{

        const countries = [

            "India",
            "USA",
            "UK",
            "Australia",
            "Canada",
            "Germany",
            "Japan"

        ];

        ajaxDropdown.innerHTML =
            '<option value="">Select Country</option>';

        countries.forEach(item => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                item;

            option.textContent =
                item;

            ajaxDropdown.appendChild(
                option
            );

        });

        hideLoader();

        showToast(
            "Countries Loaded"
        );

    },3000);

}

if(loadCountriesBtn){

    loadCountriesBtn
        .addEventListener(
            "click",
            loadAjaxCountries
        );

}

/****************************************
 MULTI SELECT INFO
 ****************************************/

const technologyDropdown =
    document.getElementById(
        "technologyDropdown"
    );

if(technologyDropdown){

    technologyDropdown
        .addEventListener(
            "change",
            ()=>{

                const selectedValues =

                    Array.from(
                        technologyDropdown
                            .selectedOptions
                    )
                        .map(
                            option =>
                                option.value
                        );

                console.log(
                    "Selected Technologies:",
                    selectedValues
                );

            }
        );

}

/****************************************
 INITIALIZATION
 ****************************************/

document.addEventListener(
    "DOMContentLoaded",
    ()=>{

        loadCountries();

        console.log(
            "Dropdown Module Loaded"
        );

    }
);