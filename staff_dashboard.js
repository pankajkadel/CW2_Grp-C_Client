document.addEventListener("DOMContentLoaded", function () {

    const overlay = document.getElementById("overlay");
    const panels = document.querySelectorAll(".panel");


    function openPanel(id) {

        panels.forEach(function (panel) {
            panel.classList.remove("show");
        });

        const panel = document.getElementById(id);

        if (panel) {
            panel.classList.add("show");
            overlay.classList.add("show");
        }
    }


    function closePanels() {

        panels.forEach(function (panel) {
            panel.classList.remove("show");
        });

        overlay.classList.remove("show");
    }


    document.querySelectorAll("[data-panel]").forEach(function (button) {

        button.addEventListener("click", function () {
            openPanel(button.dataset.panel);
        });
    });


    document.querySelectorAll(".close-panel").forEach(function (button) {

        button.addEventListener("click", closePanels);
    });


    document.querySelectorAll(".cancel-btn").forEach(function (button) {

        button.addEventListener("click", closePanels);
    });


    overlay.addEventListener("click", closePanels);


    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closePanels();
        }
    });


    const hour = new Date().getHours();

    let greeting = "Good morning";

    if (hour >= 12 && hour < 18) {
        greeting = "Good afternoon";
    }

    if (hour >= 18) {
        greeting = "Good evening";
    }

    document.querySelector("header h1").innerHTML =
        greeting + ', <span id="firstName">John</span>! 👋';


    document.getElementById("bellBtn").addEventListener("click", function () {
        openPanel("notificationsPanel");
    });


    document.getElementById("profileHeaderBtn").addEventListener("click", function () {
        openPanel("profilePanel");
    });


    document.getElementById("profileArrowBtn").addEventListener("click", function () {
        openPanel("profilePanel");
    });


    document.getElementById("searchBtn").addEventListener("click", function () {

        openPanel("searchPanel");

        setTimeout(function () {
            document.getElementById("searchInput").focus();
        }, 100);
    });


    document.querySelector('[data-action="dashboard"]').addEventListener("click", function () {

        closePanels();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });


    document.getElementById("timeOffForm").addEventListener("submit", function (event) {

        event.preventDefault();

        const start = document.getElementById("startDate").value;
        const end = document.getElementById("endDate").value;

        if (new Date(end) < new Date(start)) {

            alert("End date cannot be before start date.");
            return;
        }

        const request = {
            type: "Time Off",
            start: start,
            end: end,
            reason: document.getElementById("timeReason").value,
            status: "Pending"
        };

        saveRequest(request);

        document.getElementById("timeSuccess").textContent =
            "✓ Time-off request submitted successfully!";
    });


    document.getElementById("swapForm").addEventListener("submit", function (event) {

        event.preventDefault();

        saveRequest({
            type: "Swap Shift",
            status: "Pending"
        });

        document.getElementById("swapSuccess").textContent =
            "✓ Swap request submitted successfully!";
    });


    document.getElementById("dropForm").addEventListener("submit", function (event) {

        event.preventDefault();

        saveRequest({
            type: "Drop Shift",
            status: "Pending"
        });

        document.getElementById("dropSuccess").textContent =
            "✓ Drop shift request submitted successfully!";
    });


    function saveRequest(request) {

        const requests =
            JSON.parse(localStorage.getItem("staffRequests")) || [];

        request.id = Date.now();

        requests.push(request);

        localStorage.setItem(
            "staffRequests",
            JSON.stringify(requests)
        );
    }


    document.getElementById("downloadPayslip").addEventListener("click", function () {

        const payslip =
`STAFF PAYSLIP

Employee: John Smith
Week: 05 Aug - 11 Aug 2026

Hours Worked: 24.5 hrs
Rate: £10.42/hr
Gross Pay: £255.29
Tax: -£30.63
National Insurance: -£20.16

Net Pay: £204.50
`;

        const file = new Blob(
            [payslip],
            { type: "text/plain" }
        );

        const link = document.createElement("a");

        link.href = URL.createObjectURL(file);
        link.download = "Staff_Payslip.txt";

        link.click();

        URL.revokeObjectURL(link.href);
    });


    document.querySelectorAll(".tab").forEach(function (tab) {

        tab.addEventListener("click", function () {

            document.querySelectorAll(".tab").forEach(function (item) {
                item.classList.remove("active");
            });

            document.querySelectorAll(".tab-content").forEach(function (content) {
                content.classList.remove("active");
            });

            tab.classList.add("active");

            document
                .getElementById(tab.dataset.tab)
                .classList.add("active");
        });
    });


    document.querySelectorAll(".request-tab").forEach(function (button) {

        button.addEventListener("click", function () {

            document.querySelectorAll(".request-tab").forEach(function (tab) {
                tab.classList.remove("active");
            });

            button.classList.add("active");

            const filter = button.dataset.filter;

            document.querySelectorAll(".request-entry").forEach(function (request) {

                if (
                    filter === "all" ||
                    request.dataset.type === filter
                ) {
                    request.style.display = "block";
                } else {
                    request.style.display = "none";
                }
            });
        });
    });


    document.getElementById("markRead").addEventListener("click", function () {

        document.querySelectorAll(".notification-item").forEach(function (item) {
            item.classList.remove("unread");
        });

        document.querySelectorAll(".notification-count").forEach(function (badge) {
            badge.textContent = "0";
        });

        document.getElementById("markRead").textContent = "All read";
    });


    let currentMonth = 7;
    let currentYear = 2026;

    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];


    const shifts = {

        "2026-08-12": {
            time: "9:00 AM - 5:00 PM",
            role: "Front of House"
        },

        "2026-08-13": {
            time: "2:00 PM - 10:00 PM",
            role: "Front of House"
        },

        "2026-08-14": {
            time: "9:00 AM - 5:00 PM",
            role: "Front of House"
        },

        "2026-08-16": {
            time: "9:00 AM - 5:00 PM",
            role: "Front of House"
        },

        "2026-08-17": {
            time: "11:00 AM - 7:00 PM",
            role: "Front of House"
        }
    };


    const daysOff = [
        "2026-08-15",
        "2026-08-18"
    ];


    function drawCalendar() {

        const grid = document.getElementById("calendarGrid");

        grid.innerHTML = "";

        document.getElementById("calendarTitle").textContent =
            monthNames[currentMonth] + " " + currentYear;


        const headings = [
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sun"
        ];


        headings.forEach(function (day) {

            const heading = document.createElement("div");

            heading.className =
                "calendar-cell calendar-heading";

            heading.textContent = day;

            grid.appendChild(heading);
        });


        const firstDay =
            new Date(currentYear, currentMonth, 1);

        let startingDay =
            firstDay.getDay();

        if (startingDay === 0) {
            startingDay = 7;
        }

        startingDay--;


        const totalDays =
            new Date(
                currentYear,
                currentMonth + 1,
                0
            ).getDate();


        for (let i = 0; i < startingDay; i++) {

            const blank =
                document.createElement("div");

            blank.className =
                "calendar-cell";

            grid.appendChild(blank);
        }


        for (let day = 1; day <= totalDays; day++) {

            const cell =
                document.createElement("button");

            cell.className =
                "calendar-cell calendar-day";

            cell.type = "button";

            cell.innerHTML =
                `<span class="calendar-number">${day}</span>`;


            const month =
                String(currentMonth + 1).padStart(2, "0");

            const date =
                String(day).padStart(2, "0");

            const dateKey =
                `${currentYear}-${month}-${date}`;


            if (shifts[dateKey]) {

                cell.classList.add("working-day");

                const shiftLabel =
                    document.createElement("span");

                shiftLabel.className =
                    "calendar-shift";

                shiftLabel.textContent =
                    shifts[dateKey].time;

                cell.appendChild(shiftLabel);
            }


            if (daysOff.includes(dateKey)) {

                cell.classList.add("day-off");

                const offLabel =
                    document.createElement("span");

                offLabel.className =
                    "calendar-off";

                offLabel.textContent =
                    "Day Off";

                cell.appendChild(offLabel);
            }


            cell.addEventListener("click", function () {

                if (shifts[dateKey]) {

                    showCalendarDetails(
                        day,
                        shifts[dateKey].time,
                        shifts[dateKey].role
                    );

                } else if (daysOff.includes(dateKey)) {

                    showCalendarDayOff(day);

                } else {

                    showCalendarEmptyDay(day);
                }
            });


            grid.appendChild(cell);
        }
    }


    function showCalendarDetails(day, time, role) {

        const details =
            document.getElementById("calendarDetails");

        details.innerHTML = `
            <h3>
                ${day} ${monthNames[currentMonth]} ${currentYear}
            </h3>

            <div class="calendar-detail-row">
                <span>Shift</span>
                <strong>${time}</strong>
            </div>

            <div class="calendar-detail-row">
                <span>Role</span>
                <strong>${role}</strong>
            </div>

            <span class="calendar-status working">
                Scheduled
            </span>
        `;

        details.classList.add("show");
    }


    function showCalendarDayOff(day) {

        const details =
            document.getElementById("calendarDetails");

        details.innerHTML = `
            <h3>
                ${day} ${monthNames[currentMonth]} ${currentYear}
            </h3>

            <p>You are not scheduled to work on this day.</p>

            <span class="calendar-status off">
                Day Off
            </span>
        `;

        details.classList.add("show");
    }


    function showCalendarEmptyDay(day) {

        const details =
            document.getElementById("calendarDetails");

        details.innerHTML = `
            <h3>
                ${day} ${monthNames[currentMonth]} ${currentYear}
            </h3>

            <p>No shift has been scheduled for this date.</p>
        `;

        details.classList.add("show");
    }


    document.getElementById("previousMonth").addEventListener("click", function () {

        currentMonth--;

        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }

        drawCalendar();

        document
            .getElementById("calendarDetails")
            .classList.remove("show");
    });


    document.getElementById("nextMonth").addEventListener("click", function () {

        currentMonth++;

        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }

        drawCalendar();

        document
            .getElementById("calendarDetails")
            .classList.remove("show");
    });


    drawCalendar();


    document.getElementById("editProfileBtn").addEventListener("click", function () {

        document
            .getElementById("profileForm")
            .classList.remove("hidden");

        document.getElementById("editProfileBtn").style.display =
            "none";
    });


    document.getElementById("profileForm").addEventListener("submit", function (event) {

        event.preventDefault();

        const name =
            document.getElementById("nameInput").value;

        const phone =
            document.getElementById("phoneInput").value;

        const email =
            document.getElementById("emailInput").value;


        document.getElementById("profileName").textContent =
            name;

        document.getElementById("phoneDisplay").textContent =
            phone;

        document.getElementById("emailDisplay").textContent =
            email;

        document.getElementById("firstName").textContent =
            name.split(" ")[0];


        document
            .getElementById("profileForm")
            .classList.add("hidden");

        document.getElementById("editProfileBtn").style.display =
            "block";

        alert("Profile updated.");
    });


    document.getElementById("contactManager").addEventListener("click", function () {

        alert("Support request sent to your manager.");
    });


    const searchItems = [
        "My Schedule",
        "Calendar",
        "Requests",
        "Time Off",
        "Swap Shift",
        "Drop Shift",
        "Payslip",
        "Notifications",
        "Profile",
        "Settings"
    ];


    document.getElementById("searchInput").addEventListener("input", function () {

        const value =
            this.value.toLowerCase();

        const results =
            document.getElementById("searchResults");

        results.innerHTML = "";


        searchItems
            .filter(function (item) {
                return item.toLowerCase().includes(value);
            })
            .forEach(function (item) {

                const result =
                    document.createElement("p");

                result.textContent =
                    item;

                results.appendChild(result);
            });
    });


    document.getElementById("logoutBtn").addEventListener("click", function () {

        const logout =
            confirm("Are you sure you want to logout?");

        if (logout) {

            localStorage.removeItem("loggedInUser");

            alert("You have been logged out.");
        }
    });

});