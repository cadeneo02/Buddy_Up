document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');
    const signupButton = document.getElementById('signup-button');
    
    // Check if elements exist before adding event listeners
    if (!signupForm || !errorMessage || !successMessage || !signupButton) {
        console.error('One or more required elements not found in the DOM');
        return;
    }
    
    signupForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Reset messages
        errorMessage.style.display = 'none';
        errorMessage.textContent = '';
        successMessage.style.display = 'none';
        successMessage.textContent = '';
        
        // Get form elements
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirm-password');
        
        // Check if form elements exist
        if (!nameInput || !emailInput || !passwordInput || !confirmPasswordInput) {
            showError('Form elements not found. Please refresh the page and try again.');
            return;
        }
        
        // Get form values and trim whitespace
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        // Basic validation
        if (!name || !email || !password || !confirmPassword) {
            showError('All fields are required');
            return;
        }
        
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('Please enter a valid email address');
            return;
        }
        
        // Password strength validation (at least 8 characters)
        if (password.length < 8) {
            showError('Password must be at least 8 characters long');
            return;
        }
        
        // Validate passwords match
        if (password !== confirmPassword) {
            showError('Passwords do not match');
            return;
        }
        
        // Disable button during signup attempt
        signupButton.disabled = true;
        signupButton.textContent = 'Creating Account...';
        
        try {
            // Send signup request to server
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password }),
                credentials: 'include' // Include cookies for authentication if needed
            });
            
            let data;
            try {
                data = await response.json();
            } catch (e) {
                // Handle case where response is not JSON
                throw new Error('Invalid response from server');
            }
            
            if (!response.ok) {
                throw new Error(data.message || `Signup failed (${response.status})`);
            }
            
            // Show success message
            successMessage.textContent = 'Account created successfully! Redirecting to login...';
            successMessage.style.display = 'block';
            
            // Clear form
            signupForm.reset();
            
            // Redirect to login page after a delay
            setTimeout(() => {
                window.location.href = '/login' || 'index.html';
            }, 2000);
            
        } catch (error) {
            // Display error message
            showError(error.message || 'Signup failed. Please try again.');
        } finally {
            // Reset button state regardless of outcome
            signupButton.disabled = false;
            signupButton.textContent = 'Create Account';
        }
    });
    
    // Helper function to show error messages
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        signupButton.disabled = false;
        signupButton.textContent = 'Create Account';
    }
});