/* =========================================================
   SHIFTY STAFF DASHBOARD
   staff_dashboard.js
========================================================= */


/* =========================================================
   POSSIBLE LOGIN STORAGE KEYS
========================================================= */

const possibleUserKeys = [
    "shiftlyCurrentUser",
    "currentUser",
    "loggedInUser",
    "user",
    "userData",
    "authUser"
];


/* =========================================================
   GET LOGGED-IN USER
========================================================= */

function getLoggedInUser() {

    for (const key of possibleUserKeys) {

        const raw =
            localStorage.getItem(key) ||
            sessionStorage.getItem(key);

        if (raw) {

            try {

                const user =
                    JSON.parse(raw);

                if (
                    user &&
                    typeof user === "object"
                ) {

                    return user;

                }

            } catch (error) {

                console.log(
                    "Could not read user from:",
                    key
                );

            }

        }

    }

    return null;
}


/* =========================================================
   USER INFORMATION
========================================================= */

const storedUser =
    getLoggedInUser();


const employee = {

    name:
        storedUser?.name ||
        storedUser?.fullName ||
        storedUser?.displayName ||
        "Sarah Johnson",

    role:
        storedUser?.role ||
        storedUser?.userRole ||
        "Team Member",

    email:
        storedUser?.email ||
        "sarah.johnson@example.com",

    phone:
        storedUser?.phone ||
        storedUser?.phoneNumber ||
        "+44 7700 900123",

    employeeId:
        storedUser?.employeeId ||
        storedUser?.employeeID ||
        storedUser?.staffId ||
        storedUser?.id ||
        "EMP25847",

    location:
        storedUser?.location ||
        storedUser?.branch ||
        storedUser?.store ||
        storedUser?.company ||
        "Main Branch"

};


/* =========================================================
   EMPLOYEE INITIALS
========================================================= */

function employeeInitials() {

    const words =
        employee
        .name
        .trim()
        .split(/\s+/);

    if (words.length >= 2) {

        return (
            words[0][0] +
            words[words.length - 1][0]
        ).toUpperCase();

    }

    return employee
        .name
        .substring(0, 2)
        .toUpperCase();

}


/* =========================================================
   GREETING
========================================================= */

function getGreeting() {

    const hour =
        new Date().getHours();

    if (hour < 12) {

        return "Good morning";

    }

    if (hour < 18) {

        return "Good afternoon";

    }

    return "Good evening";

}


/* =========================================================
   LOAD EMPLOYEE INTO DASHBOARD
========================================================= */

function loadEmployee() {

    const firstName =
        employee
        .name
        .split(" ")[0];


    const firstNameElement =
        document.getElementById(
            "firstName"
        );

    const greetingElement =
        document.getElementById(
            "greeting"
        );


    if (firstNameElement) {

        firstNameElement.textContent =
            firstName;

    }


    if (greetingElement) {

        greetingElement.textContent =
            getGreeting();

    }


    const sidebarName =
        document.getElementById(
            "sidebarName"
        );

    const headerName =
        document.getElementById(
            "headerName"
        );

    const sidebarRole =
        document.getElementById(
            "sidebarRole"
        );

    const headerRole =
        document.getElementById(
            "headerRole"
        );

    const sidebarAvatar =
        document.getElementById(
            "sidebarAvatar"
        );

    const headerAvatar =
        document.getElementById(
            "headerAvatar"
        );


    if (sidebarName) {

        sidebarName.textContent =
            employee.name;

    }


    if (headerName) {

        headerName.textContent =
            employee.name;

    }


    if (sidebarRole) {

        sidebarRole.textContent =
            employee.role;

    }


    if (headerRole) {

        headerRole.textContent =
            employee.role;

    }


    const initials =
        employeeInitials();


    if (sidebarAvatar) {

        sidebarAvatar.textContent =
            initials;

    }


    if (headerAvatar) {

        headerAvatar.textContent =
            initials;

    }

}


/* =========================================================
   MODAL SYSTEM
========================================================= */

const modalOverlay =
    document.getElementById(
        "modalOverlay"
    );


function openModal(
    title,
    content
) {

    const modalTitle =
        document.getElementById(
            "modalTitle"
        );

    const modalBody =
        document.getElementById(
            "modalBody"
        );


    if (modalTitle) {

        modalTitle.textContent =
            title;

    }


    if (modalBody) {

        modalBody.innerHTML =
            content;

    }


    if (modalOverlay) {

        modalOverlay
            .classList
            .add("open");

    }


    if (window.lucide) {

        lucide.createIcons();

    }

}


function closeModal() {

    if (modalOverlay) {

        modalOverlay
            .classList
            .remove("open");

    }

}


/* CLOSE MODAL WHEN CLICKING OUTSIDE */

if (modalOverlay) {

    modalOverlay
        .addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    modalOverlay
                ) {

                    closeModal();

                }

            }
        );

}


/* CLOSE WITH ESC KEY */

document
    .addEventListener(
        "keydown",
        function (event) {

            if (
                event.key ===
                "Escape"
            ) {

                closeModal();

            }

        }
    );


/* =========================================================
   TOAST MESSAGE
========================================================= */

function success(message) {

    const toast =
        document.getElementById(
            "toast"
        );


    if (!toast) {

        return;

    }


    toast.textContent =
        "✓ " + message;


    toast
        .classList
        .add("show");


    setTimeout(
        function () {

            toast
                .classList
                .remove("show");

        },
        3000
    );

}


/* =========================================================
   SAVE REQUEST
========================================================= */

function saveRequest(request) {

    let requests =
        JSON.parse(
            localStorage.getItem(
                "staffRequests"
            )
        ) || [];


    request.id =
        Date.now();


    request.employee =
        employee.name;


    request.employeeId =
        employee.employeeId;


    request.status =
        request.status ||
        "Pending";


    request.submittedAt =
        new Date()
        .toLocaleString();


    requests.push(
        request
    );


    localStorage.setItem(
        "staffRequests",
        JSON.stringify(
            requests
        )
    );

}


/* =========================================================
   REQUEST TIME OFF
========================================================= */

function openTimeOff() {

    openModal(
        "Request Time Off",
        `

        <form id="timeOffForm">

            <div class="form-grid">

                <div class="field">

                    <label>
                        Start Date
                    </label>

                    <input
                        type="date"
                        id="timeOffStart"
                        required
                    >

                </div>


                <div class="field">

                    <label>
                        End Date
                    </label>

                    <input
                        type="date"
                        id="timeOffEnd"
                        required
                    >

                </div>


                <div class="field full">

                    <label>
                        Reason
                    </label>

                    <textarea
                        id="timeOffReason"
                        placeholder="Enter your reason"
                        required
                    ></textarea>

                </div>

            </div>


            <div class="form-actions">

                <button
                    type="button"
                    class="cancel"
                    onclick="closeModal()"
                >
                    Cancel
                </button>


                <button
                    type="submit"
                    class="submit-purple"
                >
                    Submit Request
                </button>

            </div>

        </form>

        `
    );


    document
        .getElementById(
            "timeOffForm"
        )
        .addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const startDate =
                    document
                    .getElementById(
                        "timeOffStart"
                    )
                    .value;


                const endDate =
                    document
                    .getElementById(
                        "timeOffEnd"
                    )
                    .value;


                const reason =
                    document
                    .getElementById(
                        "timeOffReason"
                    )
                    .value
                    .trim();


                if (
                    !startDate ||
                    !endDate ||
                    !reason
                ) {

                    alert(
                        "Please complete all fields."
                    );

                    return;

                }


                if (
                    new Date(endDate) <
                    new Date(startDate)
                ) {

                    alert(
                        "End date cannot be before the start date."
                    );

                    return;

                }


                saveRequest({

                    type:
                        "Time Off",

                    startDate:
                        startDate,

                    endDate:
                        endDate,

                    reason:
                        reason,

                    status:
                        "Pending"

                });


                closeModal();


                success(
                    "Time-off request submitted successfully!"
                );

            }
        );

}


/* =========================================================
   SWAP SHIFT
========================================================= */

function openSwap() {

    openModal(
        "Swap Shift",
        `

        <form id="swapForm">

            <div class="form-grid">

                <div class="field full">

                    <label>
                        My Shift
                    </label>

                    <select
                        id="myShift"
                        required
                    >

                        <option value="">
                            Select your shift
                        </option>

                        <option>
                            Tue, 13 Aug — 2:00 PM - 10:00 PM
                        </option>

                        <option>
                            Wed, 14 Aug — 9:00 AM - 5:00 PM
                        </option>

                        <option>
                            Fri, 16 Aug — 9:00 AM - 5:00 PM
                        </option>

                        <option>
                            Sat, 17 Aug — 11:00 AM - 7:00 PM
                        </option>

                    </select>

                </div>


                <div class="field full">

                    <label>
                        Swap With
                    </label>

                    <select
                        id="swapWith"
                        required
                    >

                        <option value="">
                            Select another shift
                        </option>

                        <option>
                            Thu, 15 Aug — 9:00 AM - 5:00 PM
                        </option>

                        <option>
                            Sat, 17 Aug — 11:00 AM - 7:00 PM
                        </option>

                        <option>
                            Sun, 18 Aug — 2:00 PM - 10:00 PM
                        </option>

                    </select>

                </div>


                <div class="field full">

                    <label>
                        Reason
                    </label>

                    <textarea
                        id="swapReason"
                        placeholder="Why do you need to swap?"
                        required
                    ></textarea>

                </div>

            </div>


            <div class="form-actions">

                <button
                    type="button"
                    class="cancel"
                    onclick="closeModal()"
                >
                    Cancel
                </button>


                <button
                    type="submit"
                    class="submit-green"
                >
                    Submit Swap
                </button>

            </div>

        </form>

        `
    );


    document
        .getElementById(
            "swapForm"
        )
        .addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const myShift =
                    document
                    .getElementById(
                        "myShift"
                    )
                    .value;


                const swapWith =
                    document
                    .getElementById(
                        "swapWith"
                    )
                    .value;


                const reason =
                    document
                    .getElementById(
                        "swapReason"
                    )
                    .value
                    .trim();


                if (
                    !myShift ||
                    !swapWith ||
                    !reason
                ) {

                    alert(
                        "Please complete all fields."
                    );

                    return;

                }


                saveRequest({

                    type:
                        "Swap Shift",

                    shift:
                        myShift,

                    swapWith:
                        swapWith,

                    reason:
                        reason,

                    status:
                        "Pending"

                });


                closeModal();


                success(
                    "Swap request submitted successfully!"
                );

            }
        );

}


/* =========================================================
   DROP SHIFT
========================================================= */

function openDrop() {

    openModal(
        "Drop Shift",
        `

        <form id="dropForm">

            <div class="form-grid">

                <div class="field full">

                    <label>
                        Select Shift
                    </label>

                    <select
                        id="dropShift"
                        required
                    >

                        <option value="">
                            Select your shift
                        </option>

                        <option>
                            Fri, 16 Aug — 9:00 AM - 5:00 PM
                        </option>

                        <option>
                            Sat, 17 Aug — 11:00 AM - 7:00 PM
                        </option>

                    </select>

                </div>


                <div class="field full">

                    <label>
                        Reason
                    </label>

                    <textarea
                        id="dropReason"
                        placeholder="Why do you need to drop this shift?"
                        required
                    ></textarea>

                </div>

            </div>


            <div class="form-actions">

                <button
                    type="button"
                    class="cancel"
                    onclick="closeModal()"
                >
                    Cancel
                </button>


                <button
                    type="submit"
                    class="submit-red"
                >
                    Submit Drop
                </button>

            </div>

        </form>

        `
    );


    document
        .getElementById(
            "dropForm"
        )
        .addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const shift =
                    document
                    .getElementById(
                        "dropShift"
                    )
                    .value;


                const reason =
                    document
                    .getElementById(
                        "dropReason"
                    )
                    .value
                    .trim();


                if (
                    !shift ||
                    !reason
                ) {

                    alert(
                        "Please complete all fields."
                    );

                    return;

                }


                saveRequest({

                    type:
                        "Drop Shift",

                    shift:
                        shift,

                    reason:
                        reason,

                    status:
                        "Pending"

                });


                closeModal();


                success(
                    "Drop shift request submitted successfully!"
                );

            }
        );

}


/* =========================================================
   PAYSLIP
========================================================= */

function openPayslip() {

    openModal(
        "Payslip",
        `

        <div class="detail">

            <span>
                Employee
            </span>

            <strong>
                ${employee.name}
            </strong>

        </div>


        <div class="detail">

            <span>
                Employee ID
            </span>

            <strong>
                ${employee.employeeId}
            </strong>

        </div>


        <div class="detail">

            <span>
                Week
            </span>

            <strong>
                05 Aug – 11 Aug 2024
            </strong>

        </div>


        <div class="detail">

            <span>
                Hours Worked
            </span>

            <strong>
                24.5 hrs
            </strong>

        </div>


        <div class="detail">

            <span>
                Rate
            </span>

            <strong>
                £10.42 /hr
            </strong>

        </div>


        <div class="detail">

            <span>
                Gross Pay
            </span>

            <strong>
                £255.29
            </strong>

        </div>


        <div class="detail">

            <span>
                Tax
            </span>

            <strong>
                -£30.63
            </strong>

        </div>


        <div class="detail">

            <span>
                NI
            </span>

            <strong>
                -£20.16
            </strong>

        </div>


        <div class="detail">

            <span>
                Net Pay
            </span>

            <strong
                style="
                    color:#3fd49c;
                    font-size:12px;
                "
            >
                £204.50
            </strong>

        </div>


        <button
            class="primary-button"
            style="
                width:100%;
                justify-content:center;
            "
            onclick="downloadPayslip()"
        >
            Download Payslip
        </button>

        `
    );

}


/* =========================================================
   DOWNLOAD PAYSLIP
========================================================= */

function downloadPayslip() {

    const text =
`
SHIFTY PAYSLIP

Employee:
${employee.name}

Employee ID:
${employee.employeeId}

Week:
05 Aug - 11 Aug 2024

Hours Worked:
24.5 hrs

Rate:
£10.42 /hr

Gross Pay:
£255.29

Tax:
-£30.63

NI:
-£20.16

Net Pay:
£204.50
`;


    const file =
        new Blob(
            [text],
            {
                type:
                    "text/plain"
            }
        );


    const url =
        URL.createObjectURL(
            file
        );


    const link =
        document.createElement(
            "a"
        );


    link.href =
        url;


    link.download =
        "Shifty_Payslip.txt";


    document.body
        .appendChild(
            link
        );


    link.click();


    link.remove();


    URL.revokeObjectURL(
        url
    );


    success(
        "Payslip downloaded."
    );

}


/* =========================================================
   SHIFT DETAILS
========================================================= */

function openShiftDetails() {

    openModal(
        "Shift Details",
        `

        <div class="detail">

            <span>
                Date
            </span>

            <strong>
                Monday, 12 August
            </strong>

        </div>


        <div class="detail">

            <span>
                Time
            </span>

            <strong>
                9:00 AM – 5:00 PM
            </strong>

        </div>


        <div class="detail">

            <span>
                Department
            </span>

            <strong>
                Front of House
            </strong>

        </div>


        <div class="detail">

            <span>
                Location
            </span>

            <strong>
                ${employee.location}
            </strong>

        </div>


        <div class="detail">

            <span>
                Role
            </span>

            <strong>
                ${employee.role}
            </strong>

        </div>


        <div class="detail">

            <span>
                Status
            </span>

            <strong>
                Upcoming
            </strong>

        </div>

        `
    );

}


/* =========================================================
   MY SHIFTS
========================================================= */

function openMyShifts() {

    openModal(
        "My Shifts",
        `

        <div class="tabs">

            <button class="active">
                Upcoming
            </button>

            <button>
                Completed
            </button>

            <button>
                Cancelled
            </button>

        </div>


        <div class="detail">
            <span>Mon, 12 Aug</span>
            <strong>9:00 AM – 5:00 PM</strong>
        </div>


        <div class="detail">
            <span>Tue, 13 Aug</span>
            <strong>2:00 PM – 10:00 PM</strong>
        </div>


        <div class="detail">
            <span>Wed, 14 Aug</span>
            <strong>9:00 AM – 5:00 PM</strong>
        </div>


        <div class="detail">
            <span>Thu, 15 Aug</span>
            <strong>Day Off</strong>
        </div>


        <div class="detail">
            <span>Fri, 16 Aug</span>
            <strong>9:00 AM – 5:00 PM</strong>
        </div>


        <div class="detail">
            <span>Sat, 17 Aug</span>
            <strong>11:00 AM – 7:00 PM</strong>
        </div>

        `
    );

}


/* =========================================================
   CALENDAR
========================================================= */

function openCalendar() {

    const weekdays = [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun"
    ];


    let html = "";


    weekdays.forEach(
        function (day) {

            html +=
            `
            <div>
                <strong>
                    ${day}
                </strong>
            </div>
            `;

        }
    );


    for (
        let day = 1;
        day <= 31;
        day++
    ) {

        const working =
            [
                12,
                13,
                14,
                16,
                17
            ].includes(
                day
            );


        const dayOff =
            [
                15,
                18
            ].includes(
                day
            );


        html +=
        `
        <div>

            <strong>
                ${day}
            </strong>

            ${
                working

                ?

                `
                <br>

                <span
                    style="
                        font-size:6px;
                        color:#a98cff;
                    "
                >
                    Working
                </span>
                `

                :

                dayOff

                ?

                `
                <br>

                <span
                    style="
                        font-size:6px;
                        color:#929fb1;
                    "
                >
                    Day Off
                </span>
                `

                :

                ""
            }

        </div>
        `;

    }


    openModal(
        "August 2024",
        `
        <div class="calendar">
            ${html}
        </div>
        `
    );

}


/* =========================================================
   REQUESTS
========================================================= */

function openRequests() {

    const requests =
        JSON.parse(
            localStorage.getItem(
                "staffRequests"
            )
        ) || [];


    let html =
    `

    <div class="tabs">

        <button class="active">
            All
        </button>

        <button>
            Time Off
        </button>

        <button>
            Swap
        </button>

        <button>
            Drop
        </button>

    </div>

    `;


    if (
        requests.length === 0
    ) {

        html +=
        `

        <div
            style="
                color:#929fb1;
                text-align:center;
                padding:20px;
                font-size:9px;
            "
        >
            No requests submitted yet.
        </div>

        `;

    }


    requests
        .slice()
        .reverse()
        .forEach(
            function (request) {

                html +=
                `

                <div
                    style="
                        padding:10px;
                        margin-bottom:7px;
                        border:1px solid #27384d;
                        border-radius:7px;
                        background:#111c2b;
                    "
                >

                    <div
                        style="
                            display:flex;
                            justify-content:space-between;
                            gap:10px;
                        "
                    >

                        <strong
                            style="
                                font-size:9px;
                            "
                        >
                            ${request.type}
                        </strong>


                        <span
                            class="status pending"
                        >
                            ${request.status}
                        </span>

                    </div>


                    ${
                        request.reason

                        ?

                        `
                        <p
                            style="
                                color:#929fb1;
                                font-size:8px;
                            "
                        >
                            ${request.reason}
                        </p>
                        `

                        :

                        ""
                    }


                    <small
                        style="
                            color:#68788c;
                            font-size:7px;
                        "
                    >
                        Submitted:
                        ${request.submittedAt}
                    </small>

                </div>

                `;

            }
        );


    openModal(
        "Requests",
        html
    );

}


/* =========================================================
   NOTIFICATIONS
========================================================= */

function openNotifications() {

    openModal(
        "Notifications",
        `

        <div class="notification-row">

            <span class="dot dot-purple"></span>

            <span>
                Your shift on 16 Aug has been updated
            </span>

            <time>
                10 min ago
            </time>

        </div>


        <div class="notification-row">

            <span class="dot dot-orange"></span>

            <span>
                New manager announcement
            </span>

            <time>
                1 hour ago
            </time>

        </div>


        <div class="notification-row">

            <span class="dot dot-green"></span>

            <span>
                Your time-off request was received
            </span>

            <time>
                2 hours ago
            </time>

        </div>


        <button
            class="outline-button"
            style="
                width:100%;
                justify-content:center;
                margin-top:10px;
            "
            onclick="
                success(
                    'All notifications marked as read.'
                )
            "
        >

            Mark all as read

        </button>

        `
    );

}


/* =========================================================
   MANAGER UPDATES
========================================================= */

function openManagerUpdates() {

    openModal(
        "Manager Updates",
        `

        <div
            style="
                padding:11px;
                border:1px solid #27384d;
                border-radius:7px;
                margin-bottom:8px;
            "
        >

            <strong
                style="
                    font-size:9px;
                "
            >
                Team Meeting
            </strong>

            <p
                style="
                    color:#929fb1;
                    font-size:8px;
                "
            >
                Team meeting on Friday at 4 PM.
            </p>

        </div>


        <div
            style="
                padding:11px;
                border:1px solid #27384d;
                border-radius:7px;
            "
        >

            <strong
                style="
                    font-size:9px;
                "
            >
                Schedule Reminder
            </strong>

            <p
                style="
                    color:#929fb1;
                    font-size:8px;
                "
            >
                Please review your upcoming shifts.
            </p>

        </div>

        `
    );

}


/* =========================================================
   PROFILE
========================================================= */

function openProfile() {

    openModal(
        "Profile",
        `

        <div
            style="
                display:flex;
                align-items:center;
                gap:10px;
                margin-bottom:13px;
            "
        >

            <div class="avatar">

                ${employeeInitials()}

            </div>


            <div>

                <strong
                    style="
                        font-size:12px;
                    "
                >
                    ${employee.name}
                </strong>


                <p
                    style="
                        margin:3px 0 0;
                        color:#929fb1;
                        font-size:8px;
                    "
                >
                    ${employee.role}
                </p>

            </div>

        </div>


        <div class="detail">

            <span>
                Employee ID
            </span>

            <strong>
                ${employee.employeeId}
            </strong>

        </div>


        <div class="detail">

            <span>
                Phone
            </span>

            <strong>
                ${employee.phone}
            </strong>

        </div>


        <div class="detail">

            <span>
                Email
            </span>

            <strong>
                ${employee.email}
            </strong>

        </div>


        <div class="detail">

            <span>
                Location
            </span>

            <strong>
                ${employee.location}
            </strong>

        </div>


        <div class="detail">

            <span>
                Role
            </span>

            <strong>
                ${employee.role}
            </strong>

        </div>

        `
    );

}


/* =========================================================
   SETTINGS
========================================================= */

function openSettings() {

    openModal(
        "Settings",
        `

        <div class="detail">

            <span>
                Email Notifications
            </span>

            <strong>
                Enabled
            </strong>

        </div>


        <div class="detail">

            <span>
                Shift Reminders
            </span>

            <strong>
                Enabled
            </strong>

        </div>


        <div class="detail">

            <span>
                Request Updates
            </span>

            <strong>
                Enabled
            </strong>

        </div>


        <div class="detail">

            <span>
                Dark Mode
            </span>

            <strong>
                Enabled
            </strong>

        </div>

        `
    );

}


/* =========================================================
   HELP
========================================================= */

function openHelp() {

    openModal(
        "Help & Support",
        `

        <div
            style="
                padding:10px;
                border:1px solid #27384d;
                border-radius:7px;
                margin-bottom:7px;
            "
        >

            <strong
                style="
                    font-size:9px;
                "
            >
                Schedule Problem
            </strong>


            <p
                style="
                    color:#929fb1;
                    font-size:8px;
                "
            >
                Contact your manager if your shift is incorrect or missing.
            </p>

        </div>


        <div
            style="
                padding:10px;
                border:1px solid #27384d;
                border-radius:7px;
                margin-bottom:7px;
            "
        >

            <strong
                style="
                    font-size:9px;
                "
            >
                Request Problem
            </strong>


            <p
                style="
                    color:#929fb1;
                    font-size:8px;
                "
            >
                Open Requests to check your latest request status.
            </p>

        </div>


        <div
            style="
                padding:10px;
                border:1px solid #27384d;
                border-radius:7px;
            "
        >

            <strong
                style="
                    font-size:9px;
                "
            >
                Technical Support
            </strong>


            <p
                style="
                    color:#929fb1;
                    font-size:8px;
                "
            >
                Refresh the page or contact the system administrator.
            </p>

        </div>

        `
    );

}


/* =========================================================
   LOGOUT
========================================================= */

function logout() {

    possibleUserKeys
        .forEach(
            function (key) {

                localStorage.removeItem(
                    key
                );

                sessionStorage.removeItem(
                    key
                );

            }
        );


    window.location.href =
        "login.html";

}


/* =========================================================
   NAVIGATION ACTIVE STATE
========================================================= */

const navItems =
    document.querySelectorAll(
        ".nav-item"
    );


navItems.forEach(
    function (item) {

        item.addEventListener(
            "click",
            function () {

                navItems.forEach(
                    function (nav) {

                        nav.classList.remove(
                            "active"
                        );

                    }
                );


                item.classList.add(
                    "active"
                );

            }
        );

    }
);


/* =========================================================
   INITIALISE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadEmployee();


        if (window.lucide) {

            lucide.createIcons();

        }

    }
);