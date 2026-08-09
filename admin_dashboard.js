let calendarDate = new Date();

window.addEventListener('DOMContentLoaded', () => {

    const ring = document.getElementById('ringFill');

    if(ring){

        const circumference = 2 * Math.PI * 45;

        ring.style.strokeDasharray = circumference;

        const pct = 0.62;

        requestAnimationFrame(() => {
            ring.style.strokeDashoffset =
            circumference * (1 - pct);
        });

    }

    let currentPage = localStorage.getItem("currentPage");

    if (currentPage ==="employee"){
      openEmployees();
    }
    else if(currentPage === "schedule"){
        openSchedule();
    }
    else if(currentPage === "calendar"){
        openCalendar();
    }
    else if(currentPage === "notifications"){
        openNotifications();
    }
    else if(currentPage === "more"){
        openMore();
    }
    else if(currentPage === "employee"){
        openEmployees();
    }
    else{
        openHome();
    };

});

function saveCurrentPage(page){
    localStorage.setItem("currentPage", page);
}

document.querySelectorAll('.qa-btn').forEach(btn => {
  btn.addEventListener('click', () => showToast(btn.dataset.toast));
});

document.querySelectorAll('[data-nav]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-nav]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

let toastTimer;
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

// display company avatar
const initials = JSON.parse(localStorage.getItem("currentUser"))
    .companyName
    .trim()
    .split(/\s+/)
    .map(word => word[0])
    .join("")
    .substring(0, 3)
    .toUpperCase();

document.getElementById("profileAvatar").textContent = initials;

//display employee name/ company name / role
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if(currentUser){

    document.getElementById("profileName").textContent =
        currentUser.companyName;

    document.getElementById("profileRole").textContent =
        currentUser.role;
        

}
// hide the page
function hideAllPages(){

    const pages = [
        ".grid",
        "#employeePage",
        "#schedulePage",
        "#calendarPage",
        "#notificationPage",
        "#morePage",
        "#timeOffPage",
        "#swapPage",
        "#dropPage",
        "#leavePage"
        
    ];


    pages.forEach(page => {

        const element = document.querySelector(page);

        if(element){
            element.style.display = "none";
        }

    });

}
function backtohome(){
  openHome();
}
//open timeoff
function openTimeOffPage(){

    hideAllPages();

    document.getElementById("timeOffPage").style.display = "block";

    showTimeOffRequests();

}
//display function for timeoff
function showTimeOffRequests(){

    const currentUser =
    JSON.parse(localStorage.getItem("currentUser"));

    const requests =
    (JSON.parse(localStorage.getItem("timeOffRequests")) || [])
    .filter(req => req.companyID === currentUser.companyID);

    const list =
    document.getElementById("timeOffRequestList");

    list.innerHTML = "";

    requests.forEach(req => {

        list.innerHTML += `

        <div class="employee-card">

          <h3>${req.employeeName}</h3>

          <p>
          ${req.startDate} → ${req.endDate}
          </p>

          <p>
          ${req.reason}
          </p>

          <p>
          Status: ${req.status}
          </p>

          ${
              req.status === "pending"
              ?
              `<button onclick="approveTimeOff('${req.employeeName}', '${req.startDate}')">
                  Approve
              </button>`
              :
              `<p>✅ Approved</p>`
          }

        </div>

        `;

    });

}
//approve timeoff function
function approveTimeOff(employeeName, startDate){

    let requests =
    JSON.parse(localStorage.getItem("timeOffRequests")) || [];


    requests = requests.map(req => {


        if(
            req.employeeName === employeeName &&
            req.startDate === startDate
        ){

            req.status = "approved";

        }


        return req;

    });


    localStorage.setItem(
        "timeOffRequests",
        JSON.stringify(requests)
    );


    showTimeOffRequests();

}
// open swap
function openSwapPage(){
  hideAllPages();
  document.getElementById("swapPage").style.display="block";
  showSwapRequests();
  saveCurrentPage("swap");
}

//swap request list, approve or reject
function showSwapRequests(){

    const currentUser =
    JSON.parse(localStorage.getItem("currentUser"));


    const requests =
    (JSON.parse(localStorage.getItem("swapRequests")) || [])
    .filter(
        req => req.companyID === currentUser.companyID
    );


    const list =
    document.getElementById("swapRequestList");


    list.innerHTML = "";


    requests.forEach((req,index)=>{


        list.innerHTML += `

        <div class="employee-card">

            <h3>
            ${req.fromEmployee}
            wants to swap
            </h3>


            <p>
            Shift:
            ${req.fromShift.shift}
            </p>


            <p>
            Date:
            ${req.fromShift.date}
            </p>


            <p>
            Time:
            ${req.fromShift.start}
            -
            ${req.fromShift.end}
            </p>


            <p>
            With:
            ${req.toEmployee}
            </p>


            <p>
            Status:
            ${req.status}
            </p>


            ${
            req.status === "pending"

            ?

            `
            <button onclick="updateSwapStatus(${index}, 'approved')">
              Approve
            </button>

            <button onclick="updateSwapStatus(${index}, 'rejected')">
              Reject
            </button>
            `

            :

            `<p>Completed</p>`

            }


        </div>

        `;


    });

}
// approve/ reject swap function
function updateSwapStatus(index, status){

    let requests =
    JSON.parse(localStorage.getItem("swapRequests")) || [];


    let request = requests[index];


    // If admin approves, perform the swap
    if(status === "approved"){


        let employees =
        JSON.parse(localStorage.getItem("staffApplications")) || [];



        let fromEmployee =
        employees.find(
            emp => emp.email === request.fromEmail
        );


        let toEmployee =
        employees.find(
            emp => emp.name === request.toEmployee
        );



        if(fromEmployee && toEmployee){


            // Remove shift from first employee
            fromEmployee.shifts =
            fromEmployee.shifts.filter(shift =>

                !(
                shift.date === request.fromShift.date &&
                shift.start === request.fromShift.start &&
                shift.end === request.fromShift.end
                )

            );



            // Add shift to second employee
            toEmployee.shifts.push({

                shift: request.fromShift.shift,
                date: request.fromShift.date,
                start: request.fromShift.start,
                end: request.fromShift.end

            });



            localStorage.setItem(
                "staffApplications",
                JSON.stringify(employees)
            );

        }

    }



    // Update request status
    request.status = status;



    localStorage.setItem(
        "swapRequests",
        JSON.stringify(requests)
    );



    alert("Swap request " + status);



    showSwapRequests();

}
// drop shift page

function openDropPage(){

    hideAllPages();

    document.getElementById("dropPage").style.display = "block";
    saveCurrentPage("drop");
    showDropRequests();

}

// show drop request
function showDropRequests(){


const currentUser =
JSON.parse(localStorage.getItem("currentUser"));


const requests =
(JSON.parse(localStorage.getItem("dropRequests")) || [])
.filter(
req => req.companyID === currentUser.companyID
);



const list =
document.getElementById("dropRequestList");


list.innerHTML="";



requests.forEach((req)=>{

    let realIndex =
    (JSON.parse(localStorage.getItem("dropRequests")) || [])
    .findIndex(r =>
        r.employeeEmail === req.employeeEmail &&
        r.shift.date === req.shift.date &&
        r.shift.start === req.shift.start &&
        r.shift.end === req.shift.end
    );


    list.innerHTML += `

    <div class="employee-card">

        <h3>
        ${req.employeeName}
        wants to drop shift
        </h3>


        <p>
        Shift:
        ${req.shift.shift}
        </p>


        <p>
        Date:
        ${req.shift.date}
        </p>


        <p>
        Time:
        ${req.shift.start}
        -
        ${req.shift.end}
        </p>


        <p>
        Status:
        ${req.status}
        </p>


        ${
        req.status === "pending"

        ?

        `
        <button onclick="updateDropStatus(${realIndex},'approved')">
        Approve
        </button>


        <button onclick="updateDropStatus(${realIndex},'rejected')">
        Reject
        </button>
        `

        :

        `
        <p>Completed</p>
        `

        }


    </div>

    `;

});


}
// approve or reject drop shift
function updateDropStatus(index,status){


let requests =
JSON.parse(localStorage.getItem("dropRequests")) || [];


let request = requests[index];



if(status === "approved"){


    let employees =
    JSON.parse(localStorage.getItem("staffApplications")) || [];



    let employee =
    employees.find(
        emp => emp.email === request.employeeEmail
    );



    if(employee){


        employee.shifts =
        employee.shifts.filter(shift =>

            !(
            shift.date === request.shift.date &&
            shift.start === request.shift.start &&
            shift.end === request.shift.end
            )

        );


        localStorage.setItem(
            "staffApplications",
            JSON.stringify(employees)
        );


    }


}



request.status = status;



localStorage.setItem(
    "dropRequests",
    JSON.stringify(requests)
);



alert("Drop request " + status);



showDropRequests();


}

//open leave
function openLeavePage(){
  hideAllPages();
  document.getElementById("leavePage").style.display="block";
  showLeaveRequests();

}

// leave request list
function showLeaveRequests(){

    const currentUser =
    JSON.parse(localStorage.getItem("currentUser"));

    const requests =
    (JSON.parse(localStorage.getItem("leaveRequests")) || [])
    .filter(req => req.companyID === currentUser.companyID);

    const list =
    document.getElementById("leaveRequestlist");

    list.innerHTML = "";

    requests.forEach((req,index)=>{

        list.innerHTML += `

        <div class="employee-card">

            <h3>${req.employeeName}</h3>

            <p>
            Leave Type:
            ${req.leaveType}
            </p>

            <p>
            ${req.startDate}
            →
            ${req.endDate}
            </p>

            <p>
            Reason:
            ${req.reason}
            </p>

            <p>
            Status:
            ${req.status}
            </p>

            ${
                req.status==="pending"

                ?

                `
                <button onclick="updateLeaveStatus(${index},'approved')">
                    Approve
                </button>

                <button onclick="updateLeaveStatus(${index},'rejected')">
                    Reject
                </button>
                `

                :

                `<p>Completed</p>`
            }

        </div>

        `;

    });

}

function updateLeaveStatus(index,status){

    let requests =
    JSON.parse(localStorage.getItem("leaveRequests")) || [];


    let request = requests[index];


    request.status = status;


    if(status === "approved"){

        let employees =
        JSON.parse(localStorage.getItem("staffApplications")) || [];

        let employee =
        employees.find(
            emp => emp.email === request.employeeEmail
        );

        if(employee){

            if(!employee.leaveDates){

                employee.leaveDates = [];

            }

            employee.leaveDates.push({

                startDate: request.startDate,

                endDate: request.endDate

            });

        }

        localStorage.setItem(
            "staffApplications",
            JSON.stringify(employees)
        );

    }


    localStorage.setItem(
        "leaveRequests",
        JSON.stringify(requests)
    );

    showLeaveRequests();

}

function isEmployeeOnLeave(employee,date){

    if(!employee.leaveDates){

        return false;

    }

    return employee.leaveDates.some(leave=>{

        return date >= leave.startDate &&
               date <= leave.endDate;

    });

}



//open home
function openHome(){


  hideAllPages();

  document.querySelector(".grid").style.display="grid";

  showTodaySchedule();

  updateDashboardStats();
  saveCurrentPage("home");

}

// dashboard stats
function updateDashboardStats(){


    const currentUser =
    JSON.parse(localStorage.getItem("currentUser"));

    let employees =
    (JSON.parse(localStorage.getItem("staffApplications")) || [])
    .filter(emp => emp.companyID === currentUser.companyID);
    


    // Total employees

    document.getElementById("totalEmployees").textContent =
    employees.length;



    // Today's date

    let today =
    new Date().toISOString().split("T")[0];



    // Count today's shifts

    let todayShiftCount = 0;


    employees.forEach(employee=>{


        if(employee.shifts){


            employee.shifts.forEach(shift=>{


                if(shift.date === today){

                    todayShiftCount++;

                }


            });

        }


    });


    document.getElementById("todayShifts").textContent =
    todayShiftCount;



    // Leave today

    let leaveRequests =
    JSON.parse(localStorage.getItem("leaveRequests")) || [];


    let leaveCount = 0;


    leaveRequests.forEach(leave=>{


        if(
            leave.status === "approved" &&
            today >= leave.startDate &&
            today <= leave.endDate
        ){

            leaveCount++;

        }


    });


    document.getElementById("leaveToday").textContent =
    leaveCount;



    // Pending requests

    let swap =
    JSON.parse(localStorage.getItem("swapRequests")) || [];


    let drop =
    JSON.parse(localStorage.getItem("dropRequests")) || [];


    let timeOff =
    JSON.parse(localStorage.getItem("timeOffRequests")) || [];


    let leave =
    JSON.parse(localStorage.getItem("leaveRequests")) || [];



    let pending =
    [...swap,...drop,...timeOff,...leave]
    .filter(req=>req.status==="pending")
    .length;



    document.getElementById("pendingRequests").textContent =
    pending;


}

//open Employee
function openEmployees(){

  hideAllPages();

  document.getElementById("employeePage").style.display="block";

  showEmployees();
  loadApprovedEmployees();

  updateEmployeeStats();
  saveCurrentPage("employee");
 

}
//open schedlue 

function openSchedule(){

  hideAllPages();
  document.getElementById("schedulePage").style.display="block";
  
  showAssignedShifts()

  loadEmployees();
  saveCurrentPage("schedule");

}

//open calender
function openCalendar(){


    hideAllPages();

    document.getElementById("calendarPage").style.display="block";


    generateCalendar();

    setActiveNav(3);
    saveCurrentPage("calendar");

}


// open notification
function openNotifications(){

    hideAllPages();    
    document.getElementById("notificationPage").style.display="block";
    saveCurrentPage("notifications");
    showNotifications();


}

// Open more

function openMore(){

    hideAllPages();
    document.getElementById("morePage").style.display="block";
    saveCurrentPage("more");

}

// show all the employees
function showEmployees(){

  const currentUser =
  JSON.parse(localStorage.getItem("currentUser"));

  const employees =
  (JSON.parse(localStorage.getItem("staffApplications")) || [])
  .filter(employee => employee.companyID === currentUser.companyID);

  const employeeList =
  document.getElementById("employeeList");

  employeeList.innerHTML = "";


  employees.forEach(employee => {

    employeeList.innerHTML += `

    <div class="employee-card">

        <h3>${employee.name}</h3>

        <p>Email: ${employee.email}</p>

        <p>Status: ${employee.status}</p>

        ${
            employee.status === "pending"
            ?
            `<button onclick="approveEmployee('${employee.email}')">
                Approve
            </button>`
            :
            `<p>✅ Employee Active</p>`
        }

    </div>

    `;

  });

}

//approve the employees function

function approveEmployee(email){

    const currentUser =
    JSON.parse(localStorage.getItem("currentUser"));

    let employees =
    (JSON.parse(localStorage.getItem("staffApplications")) || [])
    .filter(employee => employee.companyID === currentUser.companyID);


    employees = employees.map(employee => {

        if(
            employee.email === email &&
            employee.companyID === currentUser.companyID
        ){

            employee.status = "approved";

        }

        return employee;

    });


    localStorage.setItem(
        "staffApplications",
        JSON.stringify(employees)
    );


    showEmployees();
    updateEmployeeStats();

}
function loadApprovedEmployees() {

    const currentUser =
        JSON.parse(localStorage.getItem("currentUser"));

    const employees =
        (JSON.parse(localStorage.getItem("staffApplications")) || [])
        .filter(employee =>
            employee.companyID === currentUser.companyID &&
            employee.status === "approved"
        );

    const select =
        document.getElementById("approveemployee");

    select.innerHTML = "";

    if (employees.length === 0) {

        const option = document.createElement("option");
        option.textContent = "No approved employees";
        option.disabled = true;
        option.selected = true;

        select.appendChild(option);

        return;
    }

    employees.forEach(employee => {

        const option = document.createElement("option");

        option.value = employee.email;
        option.textContent = employee.name;

        select.appendChild(option);
    });
}
//count the total, active and pending employees
function updateEmployeeStats(){

    const currentUser =
    JSON.parse(localStorage.getItem("currentUser"));


    const employees =
    (JSON.parse(localStorage.getItem("staffApplications")) || [])
    .filter(emp => emp.companyID === currentUser.companyID);



    document.getElementById("totalCount").textContent =
    employees.length;


    document.getElementById("pendingCount").textContent =
    employees.filter(emp => emp.status === "pending").length;


    document.getElementById("approvedCount").textContent =
    employees.filter(emp => emp.status === "approved").length;

}


// load the existance employee
function loadEmployees(){

    const currentUser =
    JSON.parse(localStorage.getItem("currentUser"));


    const employees =
    (JSON.parse(localStorage.getItem("staffApplications")) || [])
    .filter(employee =>
        employee.companyID === currentUser.companyID
    );


    const select =
    document.getElementById("employeeSelect");


    select.innerHTML =
    `<option>Select Employee</option>`;


    const selectedDate =
    document.getElementById("shiftDate").value;



    employees.forEach(employee=>{


        if(employee.status === "approved"){


            let unavailable = false;


            if(selectedDate){

                unavailable =
                isEmployeeOnLeave(employee, selectedDate);

            }



            select.innerHTML += `

            <option 
            value="${employee.email}"
            ${unavailable ? "disabled" : ""}
            >

            ${employee.name}
            ${unavailable ? "(On Leave)" : ""}

            </option>

            `;


        }


    });

}
//
document.getElementById("shiftDate")
.addEventListener("change", function(){

    loadEmployees();

});

// assign shift
function assignShift(){

    const currentUser =
    JSON.parse(localStorage.getItem("currentUser"));


    const employeeEmail =
    document.getElementById("employeeSelect").value;


    const shift =
    document.getElementById("shiftSelect").value;


    const date =
    document.getElementById("shiftDate").value;


    const start =
    document.getElementById("startTime").value;


    const end =
    document.getElementById("endTime").value;



    let employees =
    JSON.parse(localStorage.getItem("staffApplications")) || [];



    let employee =
    employees.find(
        emp =>
        emp.email === employeeEmail &&
        emp.companyID === currentUser.companyID
    );


    // Check employee leave before assigning

    if(isEmployeeOnLeave(employee, date)){

      alert(
          employee.name + " is on leave on this date"
      );

      return;

    }


    if(employee){

        employee.shifts.push({

            shift: shift,
            date: date,
            start: start,
            end: end

        });


        localStorage.setItem(
            "staffApplications",
            JSON.stringify(employees)
        );


        alert("Shift assigned");
        generateCalendar();

    }

}

function getShiftStatus(shift) {

    const now = new Date();

    const start = new Date(`${shift.date}T${shift.start}`);
    const end = new Date(`${shift.date}T${shift.end}`);

    if (now < start) {
        return "Upcoming";
    }

    if (now >= start && now <= end) {
        return "In Progress";
    }

    return "Completed";
}

// show assigned shift.
function showAssignedShifts(){
  

    const currentUser =
    JSON.parse(localStorage.getItem("currentUser"));


    const employees =
    (JSON.parse(localStorage.getItem("staffApplications")) || [])
    .filter(emp => emp.companyID === currentUser.companyID);


    const list =
    document.getElementById("assignedShiftList");


    list.innerHTML = "";


    employees.forEach(employee => {


        if(employee.shifts && employee.shifts.length > 0){


            employee.shifts.forEach(shift => {


                list.innerHTML += `

                <div class="schedule-row">

                    <h3>
                    ${employee.name}
                    </h3>

                    <p>
                    Shift: ${shift.shift}
                    </p>

                    <p>
                    Date: ${shift.date}
                    </p>

                    <p>
                    Time:
                    ${shift.start} - ${shift.end}
                    </p>

                </div>

                `;


            });

        }


    });

}

// working calander


function generateCalendar(){


const grid =
document.getElementById("calendarGrid");


const monthYear =
document.getElementById("monthYear");


grid.innerHTML="";


const year =
calendarDate.getFullYear();


const month =
calendarDate.getMonth();



const monthName =
calendarDate.toLocaleString(
"default",
{
month:"long"
});


monthYear.textContent =
`${monthName} ${year}`;



const firstDay =
new Date(year,month,1).getDay();


const totalDays =
new Date(year,month+1,0).getDate();



for(let i=0;i<firstDay;i++){

    grid.innerHTML += `<div></div>`;

}



for(let day=1; day<=totalDays; day++){


    let date =
    `${year}-${String(month+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;


    let shifts =
    getAdminShifts(date);



    grid.innerHTML += `

    <div class="day">

        <div class="day-number">
        ${day}
        </div>


        ${shifts.map(shift=>`

            <div class="shift-event">
            <b>${shift.employee}</b>
            <br>

            ${shift.shift}
            <br>
            ${shift.start}-${shift.end}

            </div>


        `).join("")}


    </div>


    `;


}


}

function getAdminShifts(date){


const currentUser =
JSON.parse(localStorage.getItem("currentUser"));



const employees =
(JSON.parse(localStorage.getItem("staffApplications")) || [])
.filter(
emp => emp.companyID === currentUser.companyID
);



let shifts = [];



employees.forEach(employee=>{


employee.shifts.forEach(shift=>{


if(shift.date === date){


shifts.push({

employee: employee.name,
shift: shift.shift,
start: shift.start,
end: shift.end

});


}


});


});



return shifts;


}

function previousMonth(){

    calendarDate.setMonth(
        calendarDate.getMonth()-1
    );

    generateCalendar();

}


function nextMonth(){

    calendarDate.setMonth(
        calendarDate.getMonth() + 1
    );

    generateCalendar();

}

function setActiveNav(index){

    const buttons = document.querySelectorAll(".nav-btn");

    buttons.forEach(btn=>{
        btn.classList.remove("active");
    });

    buttons[index].classList.add("active");

}



function showNotifications(){

    let notifications =
    JSON.parse(localStorage.getItem("notifications")) || [];


    let list =
    document.getElementById("notificationList");


    list.innerHTML = "";


    if(notifications.length === 0){

        list.innerHTML = `
        <p>No notifications</p>
        `;

        return;

    }


    notifications.forEach((noti)=>{


        list.innerHTML += `

        <div class="employee-card">

            <h3>
            ${noti.message}
            </h3>

            <p>
            ${noti.date}
            </p>

        </div>

        `;


    });

}

// send motification
function sendNotification(requestType){

    let notifications =
    JSON.parse(localStorage.getItem("notifications")) || [];


    const currentUser =
    JSON.parse(localStorage.getItem("currentUser"));


    notifications.push({

        employeeName: currentUser.name,

        employeeEmail: currentUser.email,

        message:
        `${currentUser.name} sent a ${requestType} request`,

        type: requestType,

        date: new Date().toLocaleString(),

        read:false

    });


    localStorage.setItem(
        "notifications",
        JSON.stringify(notifications)
    );

}



// today schedule
function showTodaySchedule(){

    const currentUser =
    JSON.parse(localStorage.getItem("currentUser"));

    const employees =
    JSON.parse(localStorage.getItem("staffApplications")) || [];

    const today =
    new Date().toISOString().split("T")[0];

    const list =
    document.getElementById("todayScheduleList");

    list.innerHTML = "";


    employees.forEach(employee=>{

        if(employee.companyID !== currentUser.companyID) return;

        if(!employee.shifts) return;


        employee.shifts.forEach(shift=>{

            if(shift.date === today){

                list.innerHTML += `

                <div class="schedule-row">

                    <div class="sched-avatar display">
                        ${employee.name.substring(0,2).toUpperCase()}
                    </div>

                    <span class="sched-name">
                        ${employee.name}
                    </span>

                    <span class="sched-time">
                        ${shift.start} – ${shift.end}
                    </span>

                    <span class="status-pill pending">
                        ${shift.shift}
                    </span>

                </div>

                `;

            }

        });

    });


    if(list.innerHTML === ""){

        list.innerHTML =
        "<p>No employees scheduled today.</p>";

    }

}




