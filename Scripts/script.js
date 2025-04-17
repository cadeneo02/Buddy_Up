document.addEventListener("DOMContentLoaded", function () {
  // initCalendar();
  handlePopups();
  setupNavigation();
  loadAppointments();
  loadFavorites();
  updateFavoriteButtons();
  updateFavoriteCounts();
  setActiveNavLink();
});

// Open popup
document.querySelectorAll(".popup-trigger").forEach((trigger) => {
  trigger.addEventListener("click", function (event) {
    event.preventDefault();
    const popupId = trigger.getAttribute("data-popup");
    const popup = document.getElementById(popupId);
    if (popup) {
      popup.style.display = "flex";
    }
  });
});

// Close popup with X
document.querySelectorAll(".close-popup").forEach((button) => {
  button.addEventListener("click", () => {
    const overlay = button.closest(".popup-overlay");
    if (overlay) {
      overlay.style.display = "none";
    }
  });
});

// Close popup by clicking outside the popup-content
document.querySelectorAll(".popup-overlay").forEach((overlay) => {
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      overlay.style.display = "none";
    }
  });
});

// Social media links open in new tab
document.querySelectorAll(".footer-socials a").forEach((icon) => {
  icon.addEventListener("click", (event) => {
    event.preventDefault();
    const url = icon.getAttribute("href");
    if (url) {
      window.open(url, "_blank");
    }
  });
});

// Navigation links are clickable
function setupNavigation() {
  document.querySelectorAll(".header-nav a").forEach((navLink) => {
    navLink.href = "#";
  });
}

// Function to toggle favorite listings
function toggleFavorite(listingId) {
  let favorites = JSON.parse(localStorage.getItem("favoriteListings")) || [];
  let favoriteCounts = JSON.parse(localStorage.getItem("favoriteCounts")) || {};

  if (favorites.includes(listingId)) {
    favorites = favorites.filter((id) => id !== listingId); // Remove from favorites
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
  Object.keys(favoriteCounts).forEach((id) => {
    let countElement = document.getElementById(`fav-count-${id}`);
    if (countElement) {
      countElement.innerHTML = `❤️ ${favoriteCounts[id]} Favorites`;
    }
  });
}

// Function to copy listing link
function copyLink(listingId) {
  const url = window.location.origin + `/listing-detail.html?id=${listingId}`;
  navigator.clipboard
    .writeText(url)
    .then(() => {
      alert("📋 Link copied to clipboard!");
    })
    .catch((err) => {
      console.error("Failed to copy link: ", err);
    });
}

function displayFavorites(favorites) {
  const favoriteContainer = document.getElementById("favorite-container");
  favoriteContainer.innerHTML = "";

  favorites.forEach((favorite) => {
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
    1: {
      // name: "Lake Shore Studio",
      title: "Lake Shore Studio",
      price: "$1,175 /mo",
      image: "Media/1400WDevonAvenue.jpg",
    },
    2: {
      // name: "Lake Shore Studio",
      title: "Lake Shore Studio",
      price: "$2,599",
      image: "Media/1135WSheridanRd.jpg",
    },
    3: {
      // name: "Lake Shore Studio",
      title: "Lake Shore Studio",
      price: "$2,355",
      image: "Media/6401NSheridanRd.jpg",
    },
    4: {
      // name: "Lake Shore Studio",
      title: "Lake Shore Studio",
      price: "$1,566",
      image: "Media/6725NSheridanRd.jpg",
    },
    5: {
      // name: "Lake Shore Studio",
      title: "Lake Shore Studio",
      price: "$1,650",
      image: "Media/6565NLakewoodAve.jpg",
    },
  };

  favorites.forEach((id) => {
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

function setActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".header-nav a");

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setActiveNavLink();
});

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".featured-container");

  let isDown = false;
  let startX;
  let scrollLeft;

  container.addEventListener("mousedown", (e) => {
    isDown = true;
    container.classList.add("active");
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
  });

  container.addEventListener("mouseleave", () => {
    isDown = false;
    container.classList.remove("active");
  });

  container.addEventListener("mouseup", () => {
    isDown = false;
    container.classList.remove("active");
  });

  container.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 3; // Scroll-fast
    container.scrollLeft = scrollLeft - walk;
  });
});

// Optionally, enable smooth scrolling for the review slider
document.addEventListener("DOMContentLoaded", () => {
  const reviewSlider = document.querySelector(".review-slider");
  if (reviewSlider) {
    reviewSlider.addEventListener("wheel", (event) => {
      event.preventDefault();
      reviewSlider.scrollBy({
        left: event.deltaY < 0 ? -100 : 100,
        behavior: "smooth",
      });
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Load the header dynamically
  fetch("header.html")
    .then((response) => response.text())
    .then((html) => {
      document.body.insertAdjacentHTML("afterbegin", html);

      // Ensure menu toggle functionality works
      const menuToggle = document.querySelector(".menu-toggle");
      const menuClose = document.querySelector(".menu-close");
      const mobileMenu = document.querySelector(".mobile-menu");

      menuToggle.addEventListener("click", () => {
        mobileMenu.classList.add("active");
      });

      menuClose.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
      });
    })
    .catch((error) => {
      console.error("Failed to load header:", error);
    });
});

// Function to search listings based on user input
function searchListings() {
  const input = document
    .getElementById("search-input")
    .value.toLowerCase()
    .trim();

  if (!input) {
    alert("Please enter a valid search term.");
    return;
  }

  // Mock dataset of listings (Replace with actual API call or database query)
  const listings = [
    {
      id: 1,
      title: "1400 W. Devon Avenue",
      description: "1 Bed, 1 Bath - $1,175 /mo",
      location: "Devon Avenue",
    },
    {
      id: 2,
      title: "1135 W Sheridan Rd",
      description: "2 Bed, 2 Bath - $2,599",
      location: "Sheridan Rd",
    },
    {
      id: 3,
      title: "6725 N Sheridan Rd",
      description: "1 Bed, 1 Bath - $1,566",
      location: "Sheridan Rd",
    },
    {
      id: 4,
      title: "Edgewater Apartment",
      description: "3 Bed, 2 Bath - $2,000",
      location: "Edgewater",
    },
    {
      id: 5,
      title: "Rogers Park Flat",
      description: "2 Bed, 1 Bath - $1,200",
      location: "Rogers Park",
    },
  ];

  // Filter listings based on user input
  const results = listings.filter(
    (listing) =>
      listing.title.toLowerCase().includes(input) ||
      listing.description.toLowerCase().includes(input) ||
      listing.location.toLowerCase().includes(input)
  );

  // Display the results
  const resultsContainer = document.createElement("div");
  resultsContainer.id = "results-container";

  if (results.length > 0) {
    results.forEach((result) => {
      const resultItem = document.createElement("div");
      resultItem.className = "result-item";
      resultItem.innerHTML = `
        <h3>${result.title}</h3>
        <p>${result.description}</p>
        <small>Location: ${result.location}</small>
      `;
      resultsContainer.appendChild(resultItem);
    });
  } else {
    resultsContainer.innerHTML =
      "<p>No listings found matching your search.</p>";
  }

  // Clear previous results and append new ones
  const existingResults = document.getElementById("results-container");
  if (existingResults) {
    existingResults.remove();
  }
  document.body.appendChild(resultsContainer);
}

// Function to handle search and redirect to the listings page
function searchListings() {
  const input = document
    .getElementById("search-input")
    .value.toLowerCase()
    .trim();

  if (!input) {
    alert("Please enter a valid search term.");
    return;
  }

  // Redirect to listings page with the search query as a URL parameter
  const encodedQuery = encodeURIComponent(input);
  window.location.href = `listings.html?search=${encodedQuery}`;
}
