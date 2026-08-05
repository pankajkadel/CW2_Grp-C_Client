
window.addEventListener('DOMContentLoaded', () => {
  const circumference = 2 * Math.PI * 45;
  const ring = document.getElementById('ringFill');
  ring.style.strokeDasharray = circumference;
  const pct = 0.62;
  requestAnimationFrame(() => {
    ring.style.strokeDashoffset = circumference * (1 - pct);
  });

  document.getElementById('barCompleted').style.width = (20/28*100) + '%';
  document.getElementById('barRemaining').style.width = (8/28*100) + '%';
});

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

// diaplay employee name/ company name / role

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if(currentUser){

    document.getElementById("profileName").textContent =
        currentUser.name;

    document.getElementById("profileRole").textContent =
        currentUser.role;

    document.getElementById("companyName").textContent =
        currentUser.name;

        // First letters of the name
    const initials = currentUser.name
        .split(" ")
        .map(word => word[0])
        .join("")
        .toUpperCase();

    document.getElementById("profileAvatar").textContent = initials;
    

}

//open schedlue 

function openSchedule(){

    document.querySelector(".grid").style.display="none";

    document.getElementById("schedulePage").style.display="block";


    loadEmployees();

}

function loadEmployees(){


const employees =
JSON.parse(localStorage.getItem("staffApplications")) || [];


const select =
document.getElementById("employeeSelect");


select.innerHTML="";


employees.forEach(employee=>{


if(employee.status==="approved"){


select.innerHTML += `

<option value="${employee.email}">
${employee.name}
</option>


`;

}


});


}

// assign shift

function assignShift(){

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
    employees.find(emp => emp.email === employeeEmail);


    if(employee){

        employee.shifts.push({

            shift:shift,
            date:date,
            start:start,
            end:end

        });


        localStorage.setItem(
            "staffApplications",
            JSON.stringify(employees)
        );


        alert("Shift assigned");

    }

}