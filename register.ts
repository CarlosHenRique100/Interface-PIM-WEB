document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    if (!registerForm) {
        console.error('Registration form not found.');
        return;
    }

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        const userIdInput = document.getElementById('userId') as HTMLInputElement;
        const fullNameInput = document.getElementById('fullName') as HTMLInputElement;
        const phoneNumberInput = document.getElementById('phoneNumber') as HTMLInputElement;
        const corporateEmailInput = document.getElementById('corporateEmail') as HTMLInputElement;
        const passwordInput = document.getElementById('password') as HTMLInputElement;
        const confirmPasswordInput = document.getElementById('confirmPassword') as HTMLInputElement;
        const errorMessage = document.getElementById('errorMessage');

        if (!userIdInput || !fullNameInput || !phoneNumberInput || !corporateEmailInput || !passwordInput || !confirmPasswordInput || !errorMessage) {
            console.error('One or more required elements not found for registration.');
            return;
        }

        // Basic validation
        if (passwordInput.value !== confirmPasswordInput.value) {
            errorMessage.textContent = 'As senhas não coincidem. Por favor, tente novamente.';
            errorMessage.style.color = '#ffdddd';
            return;
        }

        // In a real application, you would send this data to a server
        console.log('Dados de cadastro:', {
            userId: userIdInput.value,
            fullName: fullNameInput.value,
            phoneNumber: phoneNumberInput.value,
            corporateEmail: corporateEmailInput.value,
            password: passwordInput.value
        });

        errorMessage.textContent = 'Cadastro realizado com sucesso! Redirecionando para o login...';
        errorMessage.style.color = '#d4edda';
        // Redirect to login page after successful registration
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000); // Redirect after 2 seconds
    });
});
