document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const listingId = urlParams.get("id");

    // Example listing data (Replace with real database/API integration)
    const listings = {
        1: {
            title: "Luxury Villa",
            price: "$500,000",
            description: "A stunning luxury villa with 4 bedrooms, 3 bathrooms, and a private pool.",
            image: "Media/image1.jpg"
        },
        2: {
            title: "Modern Apartment",
            price: "$300,000",
            description: "A stylish modern apartment with 2 beds, 2 baths, and a city skyline view.",
            image: "Media/image2.jpg"
        },
        3: {
            title: "Cozy Cottage",
            price: "$250,000",
            description: "A cozy cottage perfect for a small family with 3 beds and 2 baths.",
            image: "Media/image3.jpg"
        }
    };

    // Check if listing exists
    const listing = listings[listingId];
    if (listing) {
        document.getElementById("listing-title").textContent = listing.title;
        document.getElementById("listing-price").textContent = listing.price;
        document.getElementById("listing-description").textContent = listing.description;
        document.getElementById("listing-img").src = listing.image;
    } else {
        document.getElementById("listing-title").textContent = "Listing Not Found";
        document.getElementById("listing-price").textContent = "";
        document.getElementById("listing-description").textContent = "Sorry, this listing does not exist.";
    }
});

// Book a Visit Function
function bookVisit() {
    let visitDate = document.getElementById("visit-date").value;
    let visitTime = document.getElementById("visit-time").value;
    let listingId = new URLSearchParams(window.location.search).get("id");

    if (!visitDate || !visitTime) {
        alert("Please select a valid date and time.");
        return;
    }

    // Store visit data in localStorage
    let visits = JSON.parse(localStorage.getItem("scheduledVisits")) || {};
    
    if (visits[`${listingId}-${visitDate}-${visitTime}`]) {
        alert("This time slot is already booked. Please choose another.");
        return;
    }

    visits[`${listingId}-${visitDate}-${visitTime}`] = { date: visitDate, time: visitTime, listingId };
    localStorage.setItem("scheduledVisits", JSON.stringify(visits));

    document.getElementById("visit-confirmation").innerHTML = `<p style="color:green;">✅ Visit scheduled for ${visitDate} at ${visitTime}.</p>`;
}
