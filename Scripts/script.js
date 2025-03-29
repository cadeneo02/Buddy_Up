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

// Store appointments
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

// Load appointments when page refreshed
function loadAppointments() {
    let storedAppointments = JSON.parse(localStorage.getItem("appointments")) || {};
    appointments = storedAppointments;
    updateCalendar(currentMonth, currentYear);
}

// Navigation links are clickable
function setupNavigation() {
    document.querySelectorAll(".header-nav a").forEach(navLink => {
        navLink.href = "#";
    });
}

document.addEventListener("DOMContentLoaded", function() {
    loadFavorites();
    updateFavoriteButtons();
    updateFavoriteCounts();
});

// Function to toggle favorite listings
function toggleFavorite(listingId) {
    let favorites = JSON.parse(localStorage.getItem("favoriteListings")) || [];
    let favoriteCounts = JSON.parse(localStorage.getItem("favoriteCounts")) || {};

    if (favorites.includes(listingId)) {
        favorites = favorites.filter(id => id !== listingId); // Remove from favorites
        favoriteCounts[listingId] = (favoriteCounts[listingId] || 1) - 1;
    } else {
        favorites.push(listingId); // Add to favorites
        favoriteCounts[listingId] = (favoriteCounts[listingId] || 0) + 1;
    }

    localStorage.setItem("favoriteListings", JSON.stringify(favorites));
    localStorage.setItem("favoriteCounts", JSON.stringify(favoriteCounts));

    loadFavorites();
    updateFavoriteButtons();
    updateFavoriteCounts();
}

// Function to update favorite counts
function updateFavoriteCounts() {
    let favoriteCounts = JSON.parse(localStorage.getItem("favoriteCounts")) || {};
    Object.keys(favoriteCounts).forEach(id => {
        let countElement = document.getElementById(`fav-count-${id}`);
        if (countElement) {
            countElement.innerHTML = `❤️ ${favoriteCounts[id]} Favorites`;
        }
    });
}

// Function to sort favorites
function sortFavorites() {
    let sortOption = document.getElementById("sort-favorites").value;
    let favorites = JSON.parse(localStorage.getItem("favoriteListings")) || [];
    let favoriteCounts = JSON.parse(localStorage.getItem("favoriteCounts")) || {};

    const listings = {
        1: { title: "Luxury Villa", price: 500000, image: "Media/image1.jpg", count: favoriteCounts[1] || 0 },
        2: { title: "Modern Apartment", price: 300000, image: "Media/image2.jpg", count: favoriteCounts[2] || 0 },
        3: { title: "Cozy Cottage", price: 250000, image: "Media/image3.jpg", count: favoriteCounts[3] || 0 }
    };

    let favoriteList = favorites.map(id => ({ id, ...listings[id] }));

    if (sortOption === "title") {
        favoriteList.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "price") {
        favoriteList.sort((a, b) => a.price - b.price);
    } else if (sortOption === "most-favorited") {
        favoriteList.sort((a, b) => b.count - a.count); // Sort by most favorited
    } else {
        favoriteList.reverse(); // Newest first (default order)
    }

    displayFavorites(favoriteList);
}

// Function to copy listing link
function copyLink(listingId) {
    const url = window.location.origin + `/listing-detail.html?id=${listingId}`;
    navigator.clipboard.writeText(url).then(() => {
        alert("📋 Link copied to clipboard!");
    }).catch(err => {
        console.error("Failed to copy link: ", err);
    });
}

    const listings = {
        1: { title: "Luxury Villa", price: "$500,000", image: "Media/image1.jpg" },
        2: { title: "Modern Apartment", price: "$300,000", image: "Media/image2.jpg" },
        3: { title: "Cozy Cottage", price: "$250,000", image: "Media/image3.jpg" }
    };

    favorites.forEach(id => {
        if (listings[id]) {
            let listing = listings[id];
            let listingElement = document.createElement("div");
            listingElement.classList.add("favorite-item");
            listingElement.innerHTML = `
                <img src="${listing.image}" alt="${listing.title}">
                <h4>${listing.title}</h4>
                <p>${listing.price}</p>
                <button onclick="toggleFavorite(${id})">❌ Remove</button>
            `;
            favoriteContainer.appendChild(listingElement);
        }
    });

// Open popup
document.querySelectorAll('.popup-trigger').forEach(trigger => {
  trigger.addEventListener('click', function (event) {
    event.preventDefault();
    const popupId = trigger.getAttribute('data-popup');
    const popup = document.getElementById(popupId);
    if (popup) {
      popup.style.display = 'flex';
    }
  });
});

// Close popup with X
document.querySelectorAll('.close-popup').forEach(button => {
  button.addEventListener('click', () => {
    const overlay = button.closest('.popup-overlay');
    if (overlay) {
      overlay.style.display = 'none';
    }
  });
});

// Close popup by clicking outside the popup-content
document.querySelectorAll('.popup-overlay').forEach(overlay => {
  overlay.addEventListener('click', event => {
    if (event.target === overlay) {
      overlay.style.display = 'none';
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
