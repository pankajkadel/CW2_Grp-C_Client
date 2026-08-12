document.addEventListener("DOMContentLoaded", function () {

    const timeOffBtn = document.getElementById("timeOffBtn");
    const timeOffModal = document.getElementById("timeOffModal");
    const closeTimeOffBtn = document.getElementById("closeTimeOffModal");
    const cancelTimeOffBtn = document.getElementById("cancelTimeOff");
    const timeOffForm = document.getElementById("timeOffForm");
    const successMessage = document.getElementById("successMessage");

    const genericModal = document.getElementById("genericModal");
    const genericTitle = document.getElementById("genericModalTitle");
    const genericContent = document.getElementById("genericModalContent");
    const closeGenericBtn = document.getElementById("closeGenericModal");


    // changes greeting depending on the time
    const hour = new Date().getHours();

    let greeting = "Good morning";

    if (hour >= 12 && hour < 18) {
        greeting = "Good afternoon";
    }

    if (hour >= 18) {
        greeting = "Good evening";
    }

    document.querySelector(".top-header h1").innerHTML =
        greeting + ', <span id="userFirstName">John</span>! 👋';


    // open time off form
    function openTimeOffForm() {
        timeOffModal.classList.add("show");
        successMessage.classList.remove("show");
    }

    function closeTimeOffForm() {
        timeOffModal.classList.remove("show");
    }


    timeOffBtn.addEventListener("click", openTimeOffForm);

    document.getElementById("requestsNav").addEventListener("click", function (event) {
        event.preventDefault();
        openTimeOffForm();
    });

    closeTimeOffBtn.addEventListener("click", closeTimeOffForm);
    cancelTimeOffBtn.addEventListener("click", closeTimeOffForm);


    timeOffModal.addEventListener("click", function (event) {

        if (event.target === timeOffModal) {
            closeTimeOffForm();
        }

    });


    // saves a time off request
    timeOffForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const startDate = document.getElementById("startDate").value;
        const endDate = document.getElementById("endDate").value;
        const reason = document.getElementById("timeOffReason").value.trim();

        if (new Date(endDate) < new Date(startDate)) {

            alert("End date cannot be before the start date.");
            return;

        }

        const savedRequests =
            JSON.parse(localStorage.getItem("timeOffRequests")) || [];

        const newRequest = {
            startDate: startDate,
            endDate: endDate,
            reason: reason,
            status: "Pending"
        };

        savedRequests.push(newRequest);

        localStorage.setItem(
            "timeOffRequests",
            JSON.stringify(savedRequests)
        );

        successMessage.classList.add("show");

        setTimeout(function () {

            timeOffForm.reset();
            closeTimeOffForm();

        }, 1500);

    });


    // used for the smaller information popups
    function showPopup(title, content) {

        genericTitle.textContent = title;
        genericContent.innerHTML = content;
        genericModal.classList.add("show");

    }

    function closePopup() {
        genericModal.classList.remove("show");
    }

    closeGenericBtn.addEventListener("click", closePopup);


    genericModal.addEventListener("click", function (event) {

        if (event.target === genericModal) {
            closePopup();
        }

    });


    // next shift details
    document.getElementById("viewShiftBtn").addEventListener("click", function () {

        showPopup(
            "Shift Details",
            `
            <p><strong>Date:</strong> Today</p>
            <p><strong>Time:</strong> 9:00 AM - 5:00 PM</p>
            <p><strong>Department:</strong> Front of House</p>
            <p><strong>Role:</strong> Team Member</p>
            <p><strong>Break:</strong> 30 minutes</p>
            `
        );

    });


    // manager updates
    document.getElementById("updatesBtn").addEventListener("click", function () {

        showPopup(
            "Manager Updates",
            `
            <p>Team meeting on Friday at 4 PM.</p>
            <br>
            <p>Next week's rota has been published.</p>
            <br>
            <p>Please complete any outstanding training.</p>
            `
        );

    });


    // swap shift
    document.getElementById("swapShiftBtn").addEventListener("click", function () {

        showPopup(
            "Swap Shift",
            `
            <p>Select the shift you would like to swap.</p>

            <br>

            <select id="swapSelect">
                <option>Mon 12 Aug - 9:00 AM to 5:00 PM</option>
                <option>Tue 13 Aug - 2:00 PM to 10:00 PM</option>
                <option>Fri 16 Aug - 9:00 AM to 5:00 PM</option>
            </select>

            <br><br>

            <button class="submit-btn" id="sendSwapBtn">
                Request Swap
            </button>
            `
        );

        document.getElementById("sendSwapBtn").addEventListener("click", function () {

            alert("Shift swap request submitted.");
            closePopup();

        });

    });


    // drop shift
    document.getElementById("dropShiftBtn").addEventListener("click", function () {

        showPopup(
            "Drop Shift",
            `
            <p>Select the shift you want to give up.</p>

            <br>

            <select id="dropSelect">
                <option>Mon 12 Aug - 9:00 AM to 5:00 PM</option>
                <option>Tue 13 Aug - 2:00 PM to 10:00 PM</option>
                <option>Sat 17 Aug - 11:00 AM to 7:00 PM</option>
            </select>

            <br><br>

            <button class="submit-btn" id="sendDropBtn">
                Submit Request
            </button>
            `
        );

        document.getElementById("sendDropBtn").addEventListener("click", function () {

            alert("Drop shift request submitted.");
            closePopup();

        });

    });


    // payslip details
    function showPayslip() {

        showPopup(
            "Payslip",
            `
            <p><strong>August 2026</strong></p>
            <br>
            <p>Hours worked: 24.5 hours</p>
            <p>Gross pay: £184.50</p>
            <p>Tax: £12.00</p>
            <p>Net pay: £172.50</p>
            `
        );

    }


    document.getElementById("viewPayslipBtn").addEventListener("click", showPayslip);


    document.getElementById("payslipNav").addEventListener("click", function (event) {

        event.preventDefault();
        showPayslip();

    });


    // calendar
    document.getElementById("calendarNav").addEventListener("click", function (event) {

        event.preventDefault();

        showPopup(
            "August 2026",
            `
            <p>Your working schedule for August 2026.</p>
            <br>
            <p>Purple shows scheduled shifts.</p>
            <p>Green shows morning shifts.</p>
            <p>Grey shows days off.</p>
            `
        );

    });


    // profile
    document.getElementById("profileNav").addEventListener("click", function (event) {

        event.preventDefault();

        showPopup(
            "My Profile",
            `
            <p><strong>John Smith</strong></p>
            <br>
            <p>Role: Team Member</p>
            <p>Department: Front of House</p>
            <p>Employee ID: ST1024</p>
            `
        );

    });


    // settings
    document.getElementById("settingsNav").addEventListener("click", function (event) {

        event.preventDefault();

        showPopup(
            "Settings",
            `
            <p>Notifications: On</p>
            <br>
            <p>Theme: Dark</p>
            <br>
            <p>Language: English</p>
            `
        );

    });


    // notifications
    document.getElementById("viewAllNotifications").addEventListener("click", function () {

        showPopup(
            "Notifications",
            `
            <p>Your shift on 16 Aug has been updated.</p>
            <br>
            <p>New manager announcement.</p>
            <br>
            <p>Your time-off request was received.</p>
            `
        );

    });


    // logout
    document.getElementById("logoutBtn").addEventListener("click", function () {

        const logout = confirm("Are you sure you want to logout?");

        if (logout) {
            alert("You have been logged out.");
        }

    });


    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeTimeOffForm();
            closePopup();
        }

    });

});