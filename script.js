// Social media links open in new tab
document.socialSelector('.footer-socials a').forEach(icon => {
    icon.addEventListener('click', (event) => { // Adds listener to look for user's click
        event.preventDefault(); // Prevent default navigation
        let url = icon.getAttribute('href'); // This directs attatches the link from the href of the icon clicked to the function
        if (url) {
            window.open(url, 'new_window'); // Opens link
        }
    });
});
