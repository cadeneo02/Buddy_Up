// Initialize the data
document.addEventListener("DOMContentLoaded", function () {
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
    document.getElementById("listing-room").textContent = listing.room;
    document.getElementById("listing-size").textContent = listing.size;
    document.getElementById("listing-lease").textContent = listing.leaseTerm;
    document.getElementById("listing-security").textContent =
      listing.securityDeposit;
    document.getElementById("listing-utilities").textContent =
      listing.utilities;
    document.getElementById("listing-availability").textContent =
      listing.availableFrom;
    document.getElementById("listing-pet-policy").textContent =
      listing.petPolicy;

    document.getElementById("listing-credit-check").textContent =
      listing.creditCheck;

    const featuresListing = document.getElementById("listing-features");

    listing.features.forEach((feature) => {
      const list = document.createElement("li");
      const icon = document.createElement("i");

      icon.className = "fa-solid fa-check icon-check";
      list.appendChild(icon);
      list.appendChild(document.createTextNode(" " + feature));
      featuresListing.appendChild(list);
    });

    const amenitiesListing = document.getElementById("listing-amenities");

    listing.features.forEach((feature) => {
      const list = document.createElement("li");
      const icon = document.createElement("i");

      icon.className = "fa-solid fa-check icon-check";
      list.appendChild(icon);
      list.appendChild(document.createTextNode(" " + feature));
      amenitiesListing.appendChild(list);
    });

    //  Mapping with Leaflet and Nominatum
    const loyolaAddress = L.latLng(41.993, -87.6543);

    // Get coordinates dynamically using Nominatim
    function getCoordinates(address, callback) {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        address
      )}`;

      fetch(url, {
        headers: {
          "User-Agent": "LoyolaMapApp/1.0 (jlateef@luc.edu)",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && data.length > 0) {
            const lat = parseFloat(data[0].lat);
            const lon = parseFloat(data[0].lon);
            callback(L.latLng(lat, lon));
          } else {
            console.error("No geocoding result found.");
            callback(null);
          }
        })
        .catch((error) => {
          console.error("Geocoding error:", error);
          callback(null);
        });
    }
    // Call the function to get coordinates and render the map
    getCoordinates(listing.address, function (apartmentCoords) {
      if (!apartmentCoords) {
        document.getElementById("listing-map").innerHTML =
          "Could not find location.";
        return;
      }

      // Initialize the map centered at the apartment
      const map = L.map("listing-map").setView(apartmentCoords, 14);

      // Add OpenStreetMap tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      // Add marker for the apartment
      L.marker(apartmentCoords).addTo(map).bindPopup(listing.title).openPopup();

      // Add marker for Loyola
      L.marker(loyolaAddress).addTo(map).bindPopup("Loyola University Chicago");

      // Calculate distance in miles
      const distanceMeters = loyolaAddress.distanceTo(apartmentCoords);
      const distanceMiles = (distanceMeters / 1609.34).toFixed(2);
      document.getElementById(
        "listing-distance"
      ).textContent = `${distanceMiles} miles from Loyola University Chicago `;
    });
  }
});
