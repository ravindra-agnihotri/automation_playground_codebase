/****************************************
 ELEMENTS
 ****************************************/

const result =
    document.getElementById(
        "result"
    );

/****************************************
 HELPER
 ****************************************/

function updateResult(message){

    result.style.display =
        "block";

    result.innerHTML =
        message;

}

/****************************************
 SIMPLE ALERT
 ****************************************/

document
    .getElementById(
        "simpleAlertBtn"
    )
    .addEventListener(
        "click",
        ()=>{

            alert(
                "This is a simple alert!"
            );

        }
    );

/****************************************
 CONFIRM ALERT
 ****************************************/

document
    .getElementById(
        "confirmAlertBtn"
    )
    .addEventListener(
        "click",
        ()=>{

            const response =
                confirm(
                    "Do you want to continue?"
                );

            updateResult(

                response

                    ? "User clicked OK"

                    : "User clicked Cancel"

            );

        }
    );

/****************************************
 PROMPT ALERT
 ****************************************/

document
    .getElementById(
        "promptAlertBtn"
    )
    .addEventListener(
        "click",
        ()=>{

            const value =
                prompt(
                    "Enter your name"
                );

            updateResult(

                value

                    ? `Entered Name : ${value}`

                    : "Prompt Cancelled"

            );

        }
    );

/****************************************
 DELAYED ALERT
 ****************************************/

document
    .getElementById(
        "delayedAlertBtn"
    )
    .addEventListener(
        "click",
        ()=>{

            updateResult(
                "Waiting for alert..."
            );

            setTimeout(()=>{

                alert(
                    "Delayed Alert after 5 seconds"
                );

            },5000);

        }
    );

/****************************************
 CUSTOM ALERT
 ****************************************/

function showCustomAlert(
    message
){

    showToast(
        message
    );

}

/****************************************
 AUTO NOTIFICATION
 ****************************************/

function showTimedNotification(){

    setTimeout(()=>{

        showToast(
            "Timed Notification"
        );

    },3000);

}