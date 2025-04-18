

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
  