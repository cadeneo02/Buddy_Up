document.addEventListener("DOMContentLoaded", function () {
    initCalendar();
    handlePopups();
    setupNavigation();
    loadAppointments();
});

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
const monthYearDisplay = document.getElementById("month-year");
const calendarBody = document.querySelector("#calendar tbody");

// Store appointments in localStorage
let appointments = JSON.parse(localStorage.getItem("appointments")) || {};

function initCalendar() {
    updateCalendar(currentMonth, currentYear);
}

function updateCalendar(month, year) {
    monthYearDisplay.textContent = new Date(year, month).toLocaleString("default", { month: "long", year: "numeric" });

    let firstDay = new Date(year, month, 1).getDay();
    let daysInMonth = new Date(year, month + 1, 0).getDate();

    calendarBody.innerHTML = ""; // Clear old calendar

    let row = document.createElement("tr");

    for (let i = 0; i < firstDay; i++) {
        let emptyCell = document.createElement("td");
        row.appendChild(emptyCell);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        if ((firstDay + day - 1) % 7 === 0 && day !== 1) {
            calendarBody.appendChild(row);
            row = document.createElement("tr");
        }

        let cell = document.createElement("td");
        let dateStr = `${year}-${(month + 1).toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;

        cell.textContent = day;
        cell.dataset.date = dateStr;
        cell.classList.add("calendar-day");

        if (appointments[dateStr]) {
            cell.classList.add("booked");
        }

        cell.addEventListener("click", function () {
            document.getElementById("event-date").value = this.dataset.date;
        });

        row.appendChild(cell);
    }
    calendarBody.appendChild(row);
}

function prevMonth() {
    if (currentMonth === 0) {
        currentMonth = 11;
        currentYear--;
    } else {
        currentMonth--;
    }
    updateCalendar(currentMonth, currentYear);
}

function nextMonth() {
    if (currentMonth === 11) {
        currentMonth = 0;
        currentYear++;
    } else {
        currentMonth++;
    }
    updateCalendar(currentMonth, currentYear);
}

function bookAppointment() {
    let selectedDate = document.getElementById("event-date").value;
    let selectedTime = document.getElementById("event-time").value;

    if (!selectedDate || !selectedTime) {
        alert("Please select a valid date and time for your appointment.");
        return;
    }

    if (appointments[selectedDate]) {
        alert("This date is already booked. Please select another date.");
        return;
    }

    appointments[selectedDate] = selectedTime;
    localStorage.setItem("appointments", JSON.stringify(appointments));

    alert(`Your appointment is booked for ${selectedDate} at ${selectedTime}.`);
    updateCalendar(currentMonth, currentYear);
}

// Load appointments when the page is refreshed
function loadAppointments() {
    let storedAppointments = JSON.parse(localStorage.getItem("appointments")) || {};
    appointments = storedAppointments;
    updateCalendar(currentMonth, currentYear);
}

// Popups Handling
function handlePopups() {
    document.querySelectorAll(".popup-trigger").forEach(trigger => {
        trigger.addEventListener("click", function (event) {
            event.preventDefault();
            let targetPopup = document.getElementById(this.dataset.popup);
            if (targetPopup) targetPopup.style.display = "block";
        });
    });

    document.querySelectorAll(".close-popup").forEach(closeBtn => {
        closeBtn.addEventListener("click", function () {
            this.closest(".popup-window").style.display = "none";
        });
    });

    window.addEventListener("click", function (event) {
        if (event.target.classList.contains("popup-window")) {
            event.target.style.display = "none";
        }
    });
}

// Ensure navigation links are clickable
function setupNavigation() {
    document.querySelectorAll(".header-nav a").forEach(navLink => {
        navLink.href = "#";
    });
}
