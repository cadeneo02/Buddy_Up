let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let appointments = {}; // Store appointments in { "YYYY-MM-DD": ["time1", "time2"] }

function generateCalendar(month, year) {
    const tbody = document.querySelector("#calendar tbody");
    tbody.innerHTML = "";
    document.getElementById("month-year").innerText = new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' });

    let firstDay = new Date(year, month, 1).getDay();
    let daysInMonth = new Date(year, month + 1, 0).getDate();
    let date = 1;

    for (let i = 0; i < 6; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < 7; j++) {
            let cell = document.createElement("td");

            if (i === 0 && j < firstDay) {
                cell.innerHTML = "";
            } else if (date > daysInMonth) {
                break;
            } else {
                let cellDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
                cell.innerHTML = `<strong>${date}</strong>`;
                cell.dataset.date = cellDate;

                // Show existing appointments
                if (appointments[cellDate]) {
                    appointments[cellDate].forEach(time => {
                        let eventDiv = document.createElement("div");
                        eventDiv.classList.add("event");
                        eventDiv.innerText = time;
                        cell.appendChild(eventDiv);
                    });
                }

                // Click event to select date
                cell.onclick = function() {
                    document.querySelectorAll("td").forEach(td => td.classList.remove("selected"));
                    cell.classList.add("selected");
                    document.getElementById("event-date").value = cellDate;
                };

                date++;
            }
            row.appendChild(cell);
        }
        tbody.appendChild(row);
    }
}

function bookAppointment() {
    let eventDate = document.getElementById("event-date").value;
    let eventTime = document.getElementById("event-time").value;

    if (!eventDate || !eventTime) {
        alert("Please select a date and time!");
        return;
    }

    if (!appointments[eventDate]) {
        appointments[eventDate] = [];
    }
    appointments[eventDate].push(eventTime);
    generateCalendar(currentMonth, currentYear);
}

function prevMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar(currentMonth, currentYear);
}

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar(currentMonth, currentYear);
}

generateCalendar(currentMonth, currentYear);

// Function to show popup when a footer info is clicked
document.querySelectorAll('.popup-trigger').forEach(trigger => {
    trigger.addEventListener('click', (event) => { //Sets listener to monitor for click bu user
        event.preventDefault(); // Prevents default link behavior
        let popupId = trigger.getAttribute('data-popup'); //attatches popuo function
        let popup = document.getElementById(popupId);
        if (popup) {
            popup.style.display = 'flex'; // Shows the popup
        }
    });
});

// Function to close popup when 'X' is clicked
document.querySelectorAll('.close-popup').forEach(closeBtn => { // Same functionality as the last function, but for close instead of open
    closeBtn.addEventListener('click', () => {
        let popup = closeBtn.closest('.popup-window');
        if (popup) {
            popup.style.display = 'none'; // Hides popup
        }
    });
});

// Social media links open in new tab
document.socialSelector('.footer-socials a').forEach(icon => {
    icon.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default navigation
        let url = icon.getAttribute('href');
        if (url) {
            window.open(url, 'new_window'); // Open link
        }
    });
});
