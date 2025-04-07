document.addEventListener("DOMContentLoaded", function () {
    initCalendar();
    handlePopups();
    setupNavigation();
    loadAppointments();
    loadFavorites();
    updateFavoriteButtons();
    updateFavoriteCounts();
    setActiveNavLink();
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
document.querySelectorAll('.footer-socials a').forEach(icon => {
  icon.addEventListener('click', event => {
    event.preventDefault();
    const url = icon.getAttribute('href');
    if (url) {
      window.open(url, '_blank');
    }
  });
});

// Navigation links are clickable
function setupNavigation() {
    document.querySelectorAll(".header-nav a").forEach(navLink => {
        navLink.href = "#";
    });
}

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

// Function to copy listing link
function copyLink(listingId) {
    const url = window.location.origin + `/listing-detail.html?id=${listingId}`;
    navigator.clipboard.writeText(url).then(() => {
        alert("📋 Link copied to clipboard!");
    }).catch(err => {
        console.error("Failed to copy link: ", err);
    });
}

function displayFavorites(favorites) {
    const favoriteContainer = document.getElementById("favorite-container");
    favoriteContainer.innerHTML = "";

    favorites.forEach(favorite => {
        let listingElement = document.createElement("div");
        listingElement.classList.add("favorite-item");
        listingElement.innerHTML = `
            <img src="${favorite.image}" alt="${favorite.title}">
            <h4>${favorite.title}</h4>
            <p>${favorite.price}</p>
            <button onclick="toggleFavorite(${favorite.id})">❌ Remove</button>
        `;
        favoriteContainer.appendChild(listingElement);
    });
}

function loadFavorites() {
    const favoriteContainer = document.getElementById("favorite-container");
    if (!favoriteContainer) return;

    let favorites = JSON.parse(localStorage.getItem("favoriteListings")) || [];
    let favoriteCounts = JSON.parse(localStorage.getItem("favoriteCounts")) || {};

    const listings = {
        1: { title: "1400 W. Devon Avenue", price: "$1,175 /mo", image: "Media/1400WDevonAvenue.jpg" },
        2: { title: "1135 W Sheridan Rd", price: "$2,599", image: "Media/1135WSheridanRd.jpg" },
        3: { title: "6401 N Sheridan Rd, Chicago", price: "$2,355", image: "Media/6401NSheridanRd.jpg" },
        4: { title: "6725 N Sheridan Rd", price: "$1,566", image: "Media/6725NSheridanRd.jpg" },
        5: { title: "6565 N Lakewood Ave", price: "$1,650", image: "Media/6565NLakewoodAve.jpg" }
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
}

document.addEventListener("DOMContentLoaded", function() {
    const listings = [
      {
        id: 1,
        title: "1400 W. Devon Avenue",
        image: "Media/1400WDevonAvenue.jpg",
        price: "$1,175 /mo",
        description: "1 Bed, 1 Bath - Undergraduate",
        address: "1400 W Devon Ave, Chicago, IL 60660"
      },
      {
        id: 2,
        title: "1135 W Sheridan Rd",
        image: "Media/1135WSheridanRd.jpg",
        price: "$2,599",
        description: "2 Bed, 2 Bath - Graduate",
        address: "1135 W Sheridan Rd, Chicago, IL 60660"
      },
      {
        id: 3,
        title: "6401 N Sheridan Rd, Chicago",
        image: "Media/6401NSheridanRd.jpg",
        price: "$2,355",
        description: "2 Bed, 1 Bath - Undergraduate",
        address: "6401 N Sheridan Rd, Chicago, IL 60626"
      },
      {
        id: 4,
        title: "6725 N Sheridan Rd",
        image: "Media/6725NSheridanRd.jpg",
        price: "$1,566",
        description: "1 Bed, 1 Bath - Undergraduate",
        address: "6725 N Sheridan Rd, Chicago, IL 60626"
      },
      {
        id: 5,
        title: "6565 N Lakewood Ave",
        image: "Media/6565NLakewoodAve.jpg",
        price: "$1,650",
        description: "1 Bed, 1 Bath - Undergraduate",
        address: "6725 N Sheridan Rd, Chicago, IL 60626"
      }
    ];

    const urlParams = new URLSearchParams(window.location.search);
    const listingId = parseInt(urlParams.get("id"));
    const listing = listings.find(listing => listing.id === listingId);

    if (listing) {
      document.getElementById("listing-title").textContent = listing.title;
      document.getElementById("listing-img").src = listing.image;
      document.getElementById("listing-price").textContent = listing.price;
      document.getElementById("listing-description").textContent = listing.description;
      document.getElementById("listing-address").textContent = listing.address;
    }
});

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.header-nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setActiveNavLink();
});
