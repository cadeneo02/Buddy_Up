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
  