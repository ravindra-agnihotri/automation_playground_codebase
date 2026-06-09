/****************************************
 ELEMENTS
 ****************************************/

const loginModal =
    document.getElementById(
        "loginModal"
    );

const confirmModal =
    document.getElementById(
        "confirmModal"
    );

const dynamicModal =
    document.getElementById(
        "dynamicModal"
    );

/****************************************
 HELPERS
 ****************************************/

function openModal(modal){

    if(!modal) return;

    modal.style.display =
        "block";

}

function closeModal(modal){

    if(!modal) return;

    modal.style.display =
        "none";

}

/****************************************
 LOGIN MODAL
 ****************************************/

const openLoginModalBtn =
    document.getElementById(
        "openLoginModal"
    );

if(openLoginModalBtn){

    openLoginModalBtn
        .addEventListener(
            "click",
            ()=>{

                openModal(
                    loginModal
                );

            }
        );

}

/****************************************
 LOGIN ACTION
 ****************************************/

const loginBtn =
    document.getElementById(
        "loginBtn"
    );

if(loginBtn){

    loginBtn
        .addEventListener(
            "click",
            ()=>{

                const username =
                    document
                        .getElementById(
                            "username"
                        )
                        .value
                        .trim();

                const password =
                    document
                        .getElementById(
                            "password"
                        )
                        .value
                        .trim();

                const result =
                    document
                        .getElementById(
                            "loginResult"
                        );

                if(
                    username ===
                    ""
                ){

                    result.innerHTML =

                        "<span style='color:red'>Username Required</span>";

                    return;

                }

                if(
                    password ===
                    ""
                ){

                    result.innerHTML =

                        "<span style='color:red'>Password Required</span>";

                    return;

                }

                result.innerHTML =

                    "<span class='success'>Login Successful</span>";

                showToast(
                    "Login Successful"
                );

            }
        );

}

/****************************************
 CONFIRM MODAL
 ****************************************/

const openConfirmModalBtn =
    document.getElementById(
        "openConfirmModal"
    );

if(openConfirmModalBtn){

    openConfirmModalBtn
        .addEventListener(
            "click",
            ()=>{

                openModal(
                    confirmModal
                );

            }
        );

}

/****************************************
 CONFIRM YES
 ****************************************/

const confirmYesBtn =
    document.getElementById(
        "confirmYes"
    );

if(confirmYesBtn){

    confirmYesBtn
        .addEventListener(
            "click",
            ()=>{

                showToast(
                    "Record Deleted"
                );

                closeModal(
                    confirmModal
                );

            }
        );

}

/****************************************
 CONFIRM NO
 ****************************************/

const confirmNoBtn =
    document.getElementById(
        "confirmNo"
    );

if(confirmNoBtn){

    confirmNoBtn
        .addEventListener(
            "click",
            ()=>{

                closeModal(
                    confirmModal
                );

            }
        );

}

/****************************************
 DYNAMIC MODAL
 ****************************************/

const openDynamicModalBtn =
    document.getElementById(
        "openDynamicModal"
    );

if(openDynamicModalBtn){

    openDynamicModalBtn
        .addEventListener(
            "click",
            ()=>{

                openModal(
                    dynamicModal
                );

                const content =
                    document
                        .getElementById(
                            "dynamicContent"
                        );

                content.innerHTML =
                    "Loading...";

                showLoader();

                setTimeout(()=>{

                    hideLoader();

                    content.innerHTML =

                        `
                <h3>
                    Data Loaded From Server
                </h3>

                <p>
                    Dynamic modal content
                    loaded successfully.
                </p>
                `;

                },3000);

            }
        );

}

/****************************************
 CLOSE BUTTONS
 ****************************************/

document
    .querySelectorAll(
        ".close"
    )
    .forEach(button=>{

        button.addEventListener(
            "click",
            ()=>{

                const modal =
                    button.closest(
                        ".modal"
                    );

                closeModal(
                    modal
                );

            }
        );

    });

/****************************************
 CLICK OUTSIDE
 ****************************************/

window.addEventListener(
    "click",
    event=>{

        document
            .querySelectorAll(
                ".modal"
            )
            .forEach(modal=>{

                if(
                    event.target ===
                    modal
                ){

                    closeModal(
                        modal
                    );

                }

            });

    }
);

/****************************************
 ESC KEY
 ****************************************/

document
    .addEventListener(
        "keydown",
        event=>{

            if(
                event.key ===
                "Escape"
            ){

                document
                    .querySelectorAll(
                        ".modal"
                    )
                    .forEach(modal=>{

                        closeModal(
                            modal
                        );

                    });

            }

        }
    );

/****************************************
 NESTED MODAL SUPPORT
 ****************************************/

function openNestedModal(
    modalId
){

    const modal =
        document.getElementById(
            modalId
        );

    openModal(
        modal
    );

}

/****************************************
 INIT
 ****************************************/

document
    .addEventListener(
        "DOMContentLoaded",
        ()=>{

            console.log(
                "Modal Module Loaded"
            );

        }
    );