document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".listing img").forEach(img => {
        img.addEventListener("click", function () {
            const listingId = this.getAttribute("data-id");
            window.location.href = `listing-details.html?id=${listingId}`;
        });
    });

    // Load listing details based on ID in URL
    const params = new URLSearchParams(window.location.search);
    const listingId = params.get("id");

    if (listingId && document.querySelector(".details")) {
        const details = {
            "1": {
                title: "Cozy Apartment",
                price: "$250,000",
                location: "456 City Road, New York",
                details: "2 Beds, 1 Bath, 1,200 sqft",
                images: [
                    "https://via.placeholder.com/800x400",
                    "https://via.placeholder.com/800x400",
                    "https://via.placeholder.com/800x400"
                ]
            },
            "2": {
                title: "Luxury Villa",
                price: "$500,000",
                location: "123 Dream Street, Beverly Hills",
                details: "4 Beds, 3 Baths, 2,500 sqft",
                images: [
                    "https://via.placeholder.com/800x400",
                    "https://via.placeholder.com/800x400",
                    "https://via.placeholder.com/800x400"
                ]
            }
        };
        
        const listing = details[listingId];
        if (listing) {
            document.querySelector(".details h2").textContent = listing.title;
            document.querySelector(".details p strong").textContent = listing.price;
            document.querySelector(".details p:nth-of-type(2)").textContent = "Location: " + listing.location;
            document.querySelector(".details p:nth-of-type(3)").textContent = "Details: " + listing.details;
            
            const gallery = document.querySelector(".image-gallery");
            gallery.innerHTML = "";
            listing.images.forEach(src => {
                const img = document.createElement("img");
                img.src = src;
                img.alt = listing.title;
                gallery.appendChild(img);
            });
        }
    }
});
