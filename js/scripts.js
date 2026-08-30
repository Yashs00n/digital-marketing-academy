document.addEventListener("DOMContentLoaded", function () {

    console.log("SCRIPT.JS LOADED");

    const form = document.getElementById("leadForm");
    const message = document.getElementById("form-message");

    console.log("Form:", form);

    if (!form) {
        console.error("leadForm not found");
        return;
    }

    const scriptURL =
        "https://script.google.com/macros/s/AKfycbx2kGYNdBMysbLgnFvHTx2AQtCrUVOpp2YI7CG1DMctEXVFI1N9NrsFdAvGgFyaDph9/exec";

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        console.log("FORM SUBMITTED");

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const status = document.getElementById("status").value;

        console.log({
            name,
            email,
            phone,
            status
        });

        if (!name) {
            message.textContent = "Please enter your name.";
            return;
        }

        if (!email) {
            message.textContent = "Please enter your email.";
            return;
        }

        if (!phone) {
            message.textContent = "Please enter your phone number.";
            return;
        }

        if (!status) {
            message.textContent = "Please select your status.";
            return;
        }

        if (!/^[0-9]{10}$/.test(phone)) {
            message.textContent =
                "Please enter a valid 10-digit phone number.";
            return;
        }

        message.textContent = "Submitting...";

        const formData = new URLSearchParams();

        formData.append("name", name);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("status", status);

        console.log("Sending data to Google Apps Script...");

        fetch(scriptURL, {
            method: "POST",
            mode: "no-cors",
            body: formData
        })
        .then(function () {

            console.log("REQUEST SENT");

            message.textContent =
                "Thank you! Your guide request has been received.";

            form.reset();

        })
        .catch(function (error) {

            console.error("Submission Error:", error);

            message.textContent =
                "Something went wrong. Please try again.";
        });

    });

});