        document.addEventListener('DOMContentLoaded', function() {
            const loginForm = document.getElementById('login-form');
            const errorMessage = document.getElementById('error-message');
            const loginButton = document.getElementById('login-button');
            
            loginForm.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                // Reset error message
                errorMessage.style.display = 'none';
                errorMessage.textContent = '';
                
                // Get form values
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                
                // Disable button during login attempt
                loginButton.disabled = true;
                loginButton.textContent = 'Logging in...';
                
                try {
                    // Send login request to server
                    const response = await fetch('/api/auth/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ email, password })
                    });
                    
                    const data = await response.json();
                    
                    if (!response.ok) {
                        throw new Error(data.message || 'Login failed');
                    }
                    
                    // Store auth data in localStorage
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userId', data.userId);
                    
                    // Redirect to dashboard
                    window.location.href = 'dashboard.html';
                    
                } catch (error) {
                    // Display error message
                    errorMessage.textContent = error.message || 'Login failed. Please try again.';
                    errorMessage.style.display = 'block';
                    
                    // Reset button
                    loginButton.disabled = false;
                    loginButton.textContent = 'Login';
                }
            });
        });
