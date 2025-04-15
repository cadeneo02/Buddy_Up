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
      title: "1400 W. Devon Avenue",
      price: "$1,175 /mo",
      image: "Media/1400WDevonAvenue.jpg",
    },
    2: {
      title: "1135 W Sheridan Rd",
      price: "$2,599",
      image: "Media/1135WSheridanRd.jpg",
    },
    3: {
      title: "6401 N Sheridan Rd, Chicago",
      price: "$2,355",
      image: "Media/6401NSheridanRd.jpg",
    },
    4: {
      title: "6725 N Sheridan Rd",
      price: "$1,566",
      image: "Media/6725NSheridanRd.jpg",
    },
    5: {
      title: "6565 N Lakewood Ave",
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

document.addEventListener("DOMContentLoaded", function () {
  const listings = [
    {
      id: 1,
      title: "1400 W. Devon Avenue",
      image: "Media/1400WDevonAvenue.jpg",
      price: "$1,175 /mo",
      room: "1 Bed, 1 Bath",
      class: "Undergraduate",
      propertyFeatures: "in-unit",
      buildingAmenities: "24/7 security",
      location: "1400 W. Devon Avenue",
      leaseTerm: "12 months",
      securityDeposit: "$1200",
      utilities: "Not included",
      availableFrom: "August 2025",
      petPolicy: "Cats allowed",
      parking: "Available ($150/mo)",
      distance: "miles from Loyola University Chicago",
      description:
        "2 year lease special: 2nd & 3rd month rent free, no move in fee, no last month's rent due at signing! The apartment building features on-site laundry, secured entry, on-site management and maintenance. This Rogers Park apartment features Stainless Steel Appliances, Quartz Countertops, Oak Cabinets, Hardwood Floors throughout, Ceramic Bathroom, Ceiling Fans, Microwave, Air Conditioning units available for rent for $150.  The utility package is ONLY $89 per month for Studios, $131 for 1 bedrooms, and covers ALL UTILITIES. These apartments for rent in Rogers Park are excellent for students at Loyola University! Around the corner from CTA Bus 36, 151, and 155, a 15-minute walk to Union Pacific North Line 10-minute walk to Red Line Loyola station. Easy access to Downtown Chicago, Downtown Evanston, Lincoln Square, Rogers Park, West Ridge, Andersonville, Buena Park, Lakeview, and Edgewater!!",
      address: "1400 W Devon Ave, Chicago, IL 60660",
      url: "https://www.zillow.com/apartments/chicago-il/1400-w.-devon-avenue/CjjCMj/",
    },
    {
      id: 2,
      title: "1135 W Sheridan Rd",
      image: "Media/1135WSheridanRd.jpg",
      price: "$2,599 /mo",
      room: "2 Bed, 2 Bath",
      class: "Graduate",
      propertyFeatures: "in-unit",
      buildingAmenities: "24/7 security",
      location: "1400 W. Devon Avenue",
      leaseTerm: "12 months",
      securityDeposit: "$1200",
      utilities: "Not included",
      availableFrom: "August 2025",
      petPolicy: "Cats allowed",
      parking: "Available ($150/mo)",
      distance: "miles from Loyola University Chicago",
      description:
        "Spacious and modern apartments in the heart of Edgewater. We have floor plans to suit every need; 1-3 bedroom lux apartment homes. Each unit offers in-unit laundry, modern kitchens with stainless steel appliances, walk-in closets and elevated finishes throughout. The Arcade's location cannot be beat; we are steps away from the Red Line, retail, restaurants, transit, the Lakefront and Loyola University. You'll also enjoy amenities such as high speed WIFI, controlled access entry, package room, gym, heated garage, grilling station, fire pit, and sundeck. Call today to schedule a tour!",
      address: "1135 W Sheridan Rd, Chicago, IL 60660",
      url: "https://www.zillow.com/apartments/chicago-il/arcade-residences/CjjC4p/",
    },
    {
      id: 3,
      title: "6401 N Sheridan Rd, Chicago",
      image: "Media/6401NSheridanRd.jpg",
      price: "$2,355 /mo",
      room: "2 Bed, 1 Bath",
      class: "Undergraduate",
      propertyFeatures: "in-unit",
      buildingAmenities: "24/7 security",
      location: "1400 W. Devon Avenue",
      leaseTerm: "12 months",
      securityDeposit: "$1200",
      utilities: "Not included",
      availableFrom: "August 2025",
      petPolicy: "Cats allowed",
      parking: "Available ($150/mo)",
      distance: "miles from Loyola University Chicago",
      description:
        "Lease options currently range from 6 - 17 months. Prices and special offers are valid for new residents only. Pricing, lease options, and availability are subject to change at any time.",
      address: "6401 N Sheridan Rd, Chicago, IL 60626",
      url: "https://www.zillow.com/apartments/chicago-il/sheridan-lake-6401-n-sheridan-rd/5Xcqw9/",
    },
    {
      id: 4,
      title: "6725 N Sheridan Rd",
      image: "Media/6725NSheridanRd.jpg",
      price: "$1,566 /mo",
      room: "1 Bed, 1 Bath",
      class: "Undergraduate",
      propertyFeatures: "in-unit",
      buildingAmenities: "24/7 security",
      location: "1400 W. Devon Avenue",
      leaseTerm: "12 months",
      securityDeposit: "$1200",
      utilities: "Not included",
      availableFrom: "August 2025",
      petPolicy: "Cats allowed",
      parking: "Available ($150/mo)",
      distance: "miles from Loyola University Chicago",
      description:
        "Lease options currently range from 12 - 17 months. Prices and special offers are valid for new residents only. Pricing, lease options, and availability are subject to change at any time.",
      address: "6725 N Sheridan Rd, Chicago, IL 60626",
      url: "https://www.zillow.com/apartments/chicago-il/sheridan-terrace-6725-n-sheridan-rd/5Xfcjm/",
    },
    {
      id: 5,
      title: "6565 N Lakewood Ave",
      image: "Media/6565NLakewoodAve.jpg",
      price: "$1,650 /mo",
      room: "1 Bed, 1 Bath",
      class: "Undergraduate",
      propertyFeatures: "in-unit",
      buildingAmenities: "24/7 security",
      location: "1400 W. Devon Avenue",
      leaseTerm: "12 months",
      securityDeposit: "$1200",
      utilities: "Not included",
      availableFrom: "August 2025",
      petPolicy: "Cats allowed",
      parking: "Available ($150/mo)",
      distance: "miles from Loyola University Chicago",
      description:
        "1, 2, and 3 bedroom units available in a beautiful courtyard building, located just a few blocks from the Loyola campus and within easy walking distance of the lake. Five minute walk to the Loyola Red Line station and Sheridan bus route. Unit features hardwood floors throughout, stainless steel appliances including dishwashers, modern gray cabinetry, spacious floor plans with fireplaces (select units). Heat included in rent. App-operated laundry on site (no coins necessary!). Secure buzzer entry system. Pet friendly for cats and dogs.",
      address: "6725 N Sheridan Rd, Chicago, IL 60626",
      url: "https://www.zillow.com/apartments/chicago-il/lakewood/Ck4yZd/",
    },
  ];

  const urlParams = new URLSearchParams(window.location.search);
  const listingId = parseInt(urlParams.get("id"));
  const listing = listings.find((listing) => listing.id === listingId);

  if (listing) {
    document.getElementById("listing-title").textContent = listing.title;
    document.getElementById("listing-img").src = listing.image;
    document.getElementById("listing-price").textContent = listing.price;
    document.getElementById("listing-description").textContent =
      listing.description;
    document.getElementById("listing-address").textContent = listing.address;
  }
});

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
