document.addEventListener("DOMContentLoaded", () => {
  // Initialize Feather Icons
  if (typeof feather !== "undefined") {
    feather.replace();
  }

  // Pull active user dynamically from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user")) || 
                     JSON.parse(localStorage.getItem("currentUser")) || 
                     JSON.parse(localStorage.getItem("signedInUser"));

  let firstName = "";
  let fullName = "";
  let role = "Team Member";

  if (storedUser) {
    if (storedUser.firstName) {
      firstName = storedUser.firstName;
      fullName = `${storedUser.firstName} ${storedUser.lastName || ""}`.trim();
    } else if (storedUser.name || storedUser.fullName) {
      fullName = storedUser.name || storedUser.fullName;
      firstName = fullName.split(" ")[0];
    }
    if (storedUser.role) {
      role = storedUser.role;
    }
  }

  function getInitials(name) {
    if (!name) return "--";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  }

  // Populate dynamic name fields
  const elFirstName = document.getElementById("user-firstname");
  const elFullName = document.getElementById("user-fullname");
  const elRole = document.getElementById("user-role");
  const elInitials = document.getElementById("avatar-initials");

  if (elFirstName) elFirstName.textContent = firstName;
  if (elFullName) elFullName.textContent = fullName;
  if (elRole) elRole.textContent = role;
  if (elInitials) elInitials.textContent = getInitials(fullName);

  // Live Clock
  function updateClock() {
    const clockEl = document.getElementById("live-clock");
    if (clockEl) {
      const now = new Date();
      const dateStr = now.toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' });
      const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      clockEl.innerHTML = `${dateStr}<br/>${timeStr}`;
    }
  }
  updateClock();
  setInterval(updateClock, 1000);

  // Modal setup
  const modal = document.getElementById("app-modal");
  const modalCloseBtn = document.getElementById("modal-close-btn");

  if (modalCloseBtn && modal) {
    modalCloseBtn.addEventListener("click", () => modal.classList.remove("active"));
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("active");
    });
  }
});