// Social media links open in new tab
document.querySelectorAll('.footer-socials a').forEach(icon => {
    icon.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default navigation
        let url = icon.getAttribute('href');
        if (url) {
            window.open(url, '_blank'); // Open link
        }
    });
});
