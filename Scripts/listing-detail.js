document.addEventListener("DOMContentLoaded", function () {
  const listings = [
    {
      id: 1,
      name: "Lake Shore Studio",
      title: "Lake Shore Studio",
      address: "1400 W. Devon Avenue",
      image: "Media/1400WDevonAvenue.jpg",
      price: "$1,175 /mo",
      room: "1 Bed, 1 Bath",
      size: "450 sq ft",
      class: "Undergraduate",
      location: "1400 W. Devon Avenue",
      leaseTerm: "12 months",
      securityDeposit: "$1200",
      utilities: "Not included",
      availableFrom: "August 2025",
      petPolicy: "Cats allowed",
      parking: "Available ($150/mo)",
      distance: "miles from Loyola University Chicago",
      features: [
        "In-unit Laundry",
        "Central Air Conditioning",
        "Stainless Steel Appliances",
        "Hardwood floors",
        "High-Speed Internet",
      ],
      amenities: [
        "24/7 Security",
        "Fitness Center",
        "Study Lounge",
        "Package Reception",
        "Bike Storage",
      ],
      description:
        "2 year lease special: 2nd & 3rd month rent free, no move in fee, no last month's rent due at signing! The apartment building features on-site laundry, secured entry, on-site management and maintenance. This Rogers Park apartment features Stainless Steel Appliances, Quartz Countertops, Oak Cabinets, Hardwood Floors throughout, Ceramic Bathroom, Ceiling Fans, Microwave, Air Conditioning units available for rent for $150.  The utility package is ONLY $89 per month for Studios, $131 for 1 bedrooms, and covers ALL UTILITIES. These apartments for rent in Rogers Park are excellent for students at Loyola University! Around the corner from CTA Bus 36, 151, and 155, a 15-minute walk to Union Pacific North Line 10-minute walk to Red Line Loyola station. Easy access to Downtown Chicago, Downtown Evanston, Lincoln Square, Rogers Park, West Ridge, Andersonville, Buena Park, Lakeview, and Edgewater!!",
      address: "1400 W Devon Ave, Chicago, IL 60660",
      url: "https://www.zillow.com/apartments/chicago-il/1400-w.-devon-avenue/CjjCMj/",
    },
    {
      id: 2,
      name: "Lake Shore Studio",
      title: "Lake Shore Studios",
      image: "Media/1135WSheridanRd.jpg",
      price: "$2,599 /mo",
      room: "2 Bed, 2 Bath",
      size: "500 sq ft",
      class: "Graduate",
      location: "1135 W Sheridan Rd",
      leaseTerm: "12 months",
      securityDeposit: "$1200",
      utilities: "Not included",
      availableFrom: "August 2025",
      petPolicy: "Cats allowed",
      parking: "Available ($150/mo)",
      distance: "miles from Loyola University Chicago",
      features: [
        "In-unit Laundry",
        "Central Air Conditioning",
        "Stainless Steel Appliances",
        "Hardwood floors",
        "High-Speed Internet",
      ],
      amenities: [
        "24/7 Security",
        "Fitness Center",
        "Study Lounge",
        "Package Reception",
        "Bike Storage",
      ],
      description:
        "Spacious and modern apartments in the heart of Edgewater. We have floor plans to suit every need; 1-3 bedroom lux apartment homes. Each unit offers in-unit laundry, modern kitchens with stainless steel appliances, walk-in closets and elevated finishes throughout. The Arcade's location cannot be beat; we are steps away from the Red Line, retail, restaurants, transit, the Lakefront and Loyola University. You'll also enjoy amenities such as high speed WIFI, controlled access entry, package room, gym, heated garage, grilling station, fire pit, and sundeck. Call today to schedule a tour!",
      address: "1135 W Sheridan Rd, Chicago, IL 60660",
      url: "https://www.zillow.com/apartments/chicago-il/arcade-residences/CjjC4p/",
    },
    {
      id: 3,
      name: "Lake Shore Studio",
      title: "Lake Shore Studio",
      image: "Media/6401NSheridanRd.jpg",
      price: "$2,355 /mo",
      room: "2 Bed, 1 Bath",
      size: "450 sq ft",
      class: "Undergraduate",
      location: "6401 N Sheridan Rd, Chicago",
      leaseTerm: "12 months",
      securityDeposit: "$1200",
      utilities: "Not included",
      availableFrom: "August 2025",
      petPolicy: "Cats allowed",
      parking: "Available ($150/mo)",
      distance: "miles from Loyola University Chicago",
      features: [
        "In-unit Laundry",
        "Central Air Conditioning",
        "Stainless Steel Appliances",
        "Hardwood floors",
        "High-Speed Internet",
      ],
      amenities: [
        "24/7 Security",
        "Fitness Center",
        "Study Lounge",
        "Package Reception",
        "Bike Storage",
      ],
      description:
        "Lease options currently range from 6 - 17 months. Prices and special offers are valid for new residents only. Pricing, lease options, and availability are subject to change at any time.",
      address: "6401 N Sheridan Rd, Chicago, IL 60626",
      url: "https://www.zillow.com/apartments/chicago-il/sheridan-lake-6401-n-sheridan-rd/5Xcqw9/",
    },
    {
      id: 4,
      name: "Lake Shore Studio",
      title: "Lake Shore Studio",
      image: "Media/6725NSheridanRd.jpg",
      price: "$1,566 /mo",
      room: "1 Bed, 1 Bath",
      size: "450 sq ft",
      class: "Undergraduate",
      location: "6725 N Sheridan Rd",
      leaseTerm: "12 months",
      securityDeposit: "$1200",
      utilities: "Not included",
      availableFrom: "August 2025",
      petPolicy: "Cats allowed",
      parking: "Available ($150/mo)",
      distance: "miles from Loyola University Chicago",
      features: [
        "In-unit Laundry",
        "Central Air Conditioning",
        "Stainless Steel Appliances",
        "Hardwood floors",
        "High-Speed Internet",
      ],
      amenities: [
        "24/7 Security",
        "Fitness Center",
        "Study Lounge",
        "Package Reception",
        "Bike Storage",
      ],
      description:
        "Lease options currently range from 12 - 17 months. Prices and special offers are valid for new residents only. Pricing, lease options, and availability are subject to change at any time.",
      address: "6725 N Sheridan Rd, Chicago, IL 60626",
      url: "https://www.zillow.com/apartments/chicago-il/sheridan-terrace-6725-n-sheridan-rd/5Xfcjm/",
    },
    {
      id: 5,
      name: "Lake Shore Studio",
      title: "Lake Shore Studio",
      image: "Media/6565NLakewoodAve.jpg",
      price: "$1,650 /mo",
      room: "1 Bed, 1 Bath",
      size: "450 sq ft",
      class: "Undergraduate",
      location: "6565 N Lakewood Ave",
      leaseTerm: "12 months",
      securityDeposit: "$1200",
      utilities: "Not included",
      availableFrom: "August 2025",
      petPolicy: "Cats allowed",
      parking: "Available ($150/mo)",
      distance: "miles from Loyola University Chicago",
      features: [
        "In-unit Laundry",
        "Central Air Conditioning",
        "Stainless Steel Appliances",
        "Hardwood floors",
        "High-Speed Internet",
      ],
      amenities: [
        "24/7 Security",
        "Fitness Center",
        "Study Lounge",
        "Package Reception",
        "Bike Storage",
      ],
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
    document.getElementById("listing-parking").textContent = listing.parking;

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
