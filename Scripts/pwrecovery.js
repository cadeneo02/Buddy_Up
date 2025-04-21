        document.addEventListener('DOMContentLoaded', function() {
            const resetForm = document.getElementById('reset-form');
            const errorMessage = document.getElementById('error-message');
            const successMessage = document.getElementById('success-message');
            const resetButton = document.getElementById('reset-button');
            
            resetForm.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                // Reset messages
                errorMessage.style.display = 'none';
                errorMessage.textContent = '';
                successMessage.style.display = 'none';
                successMessage.textContent = '';
                
                // Get form values
                const email = document.getElementById('email').value;
                
                // Disable button during request
                resetButton.disabled = true;
                resetButton.textContent = 'Sending...';
                
                try {
                    // Send password reset request to server
                    const response = await fetch('/api/auth/forgot-password', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ email })
                    });
                    
                    const data = await response.json();
                    
                    if (!response.ok) {
                        throw new Error(data.message || 'Password reset request failed');
                    }
                    
                    // Show success message
                    successMessage.textContent = 'If an account exists with this email, you will receive a password reset link shortly.';
                    successMessage.style.display = 'block';
                    
                    // Clear form
                    resetForm.reset();
                    
                } catch (error) {
                    // Display error message
                    errorMessage.textContent = error.message || 'Password reset request failed. Please try again.';
                    errorMessage.style.display = 'block';
                } finally {
                    // Reset button
                    resetButton.disabled = false;
                    resetButton.textContent = 'Send Reset Link';
                }
            });
        });