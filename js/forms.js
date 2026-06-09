/****************************************
 ELEMENTS
 ****************************************/

const form =
    document.getElementById(
        "registrationForm"
    );

const submitBtn =
    document.getElementById(
        "submitBtn"
    );

const resetBtn =
    document.getElementById(
        "resetBtn"
    );

const result =
    document.getElementById(
        "result"
    );

/****************************************
 VALIDATION
 ****************************************/

function validateForm(){

    const firstName =
        document.getElementById(
            "firstName"
        ).value.trim();

    const email =
        document.getElementById(
            "email"
        ).value.trim();

    const mobile =
        document.getElementById(
            "mobile"
        ).value.trim();

    if(firstName === ""){

        showToast(
            "First Name is required",
            "error"
        );

        return false;
    }

    if(!validateEmail(email)){

        showToast(
            "Invalid Email",
            "error"
        );

        return false;
    }

    if(!validateMobile(mobile)){

        showToast(
            "Invalid Mobile Number",
            "error"
        );

        return false;
    }

    return true;

}

/****************************************
 EMAIL
 ****************************************/

function validateEmail(email){

    const regex =

        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);

}

/****************************************
 MOBILE
 ****************************************/

function validateMobile(mobile){

    const regex =

        /^[0-9]{10}$/;

    return regex.test(mobile);

}

/****************************************
 FILE VALIDATION
 ****************************************/

function validateFile(){

    const fileInput =
        document.getElementById(
            "resumeUpload"
        );

    if(!fileInput ||
        fileInput.files.length === 0){

        return true;
    }

    const file =
        fileInput.files[0];

    const maxSize =
        2 * 1024 * 1024;

    if(file.size > maxSize){

        showToast(
            "File exceeds 2MB",
            "error"
        );

        return false;
    }

    return true;

}

/****************************************
 GET FORM DATA
 ****************************************/

function getFormData(){

    return {

        firstName:
        document.getElementById(
            "firstName"
        ).value,

        lastName:
        document.getElementById(
            "lastName"
        ).value,

        email:
        document.getElementById(
            "email"
        ).value,

        mobile:
        document.getElementById(
            "mobile"
        ).value,

        country:
        document.getElementById(
            "country"
        ).value,

        address:
        document.getElementById(
            "address"
        ).value

    };

}

/****************************************
 SUBMIT
 ****************************************/

submitBtn
    .addEventListener(
        "click",
        ()=>{

            if(!validateForm())
                return;

            if(!validateFile())
                return;

            const data =
                getFormData();

            console.log(
                "Submitted Data",
                data
            );

            setStorage(
                "lastFormSubmission",
                data
            );

            result.style.display =
                "block";

            result.innerHTML =

                `
        <strong>
            Form Submitted Successfully
        </strong>
        `;

            showToast(
                "Form Submitted"
            );

        }
    );

/****************************************
 RESET
 ****************************************/

resetBtn
    .addEventListener(
        "click",
        ()=>{

            form.reset();

            result.style.display =
                "none";

            showToast(
                "Form Reset"
            );

        }
    );

/****************************************
 AUTO SAVE
 ****************************************/

document
    .querySelectorAll(
        "input,textarea,select"
    )
    .forEach(element=>{

        element.addEventListener(
            "change",
            saveDraft
        );

    });

function saveDraft(){

    const draft =
        getFormData();

    setStorage(
        "formDraft",
        draft
    );

}

/****************************************
 LOAD DRAFT
 ****************************************/

window.addEventListener(
    "load",
    ()=>{

        const draft =
            getStorage(
                "formDraft"
            );

        if(!draft)
            return;

        Object.keys(draft)
            .forEach(key=>{

                const element =
                    document.getElementById(
                        key
                    );

                if(element){

                    element.value =
                        draft[key];

                }

            });

    }
);