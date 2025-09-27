document.addEventListener('DOMContentLoaded', function () {
    var registerForm = document.getElementById('registerForm');
    if (!registerForm) {
        console.error('Registration form not found.');
        return;
    }
    registerForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission
        var userIdInput = document.getElementById('userId');
        var fullNameInput = document.getElementById('fullName');
        var phoneNumberInput = document.getElementById('phoneNumber');
        var corporateEmailInput = document.getElementById('corporateEmail');
        var passwordInput = document.getElementById('password');
        var confirmPasswordInput = document.getElementById('confirmPassword');
        var errorMessage = document.getElementById('errorMessage');
        if (!userIdInput || !fullNameInput || !phoneNumberInput || !corporateEmailInput || !passwordInput || !confirmPasswordInput || !errorMessage) {
            console.error('One or more required elements not found for registration.');
            return;
        }
        // Basic validation
        // Validate User ID contains only numbers
        var userIdValue = userIdInput.value.trim();
        if (!/^[0-9]+$/.test(userIdValue)) {
            errorMessage.textContent = 'Não foi possível registrar a sua conta, tente incluir o seu ID do usuário sem LETRAS apenas NÚMEROS';
            errorMessage.style.color = '#FF0000';
            return;
        }
        if (passwordInput.value !== confirmPasswordInput.value) {
            errorMessage.textContent = 'As senhas não coincidem. Por favor, tente novamente.';
            errorMessage.style.color = '#FF0000';
            return;
        }
        // In a real application, you would send this data to a server
        var fullCorporateEmail = corporateEmailInput.value + '@unimanagement.com';
        console.log('Dados de cadastro:', {
            userId: userIdInput.value,
            fullName: fullNameInput.value,
            phoneNumber: phoneNumberInput.value,
            corporateEmail: fullCorporateEmail,
            password: passwordInput.value
        });
        // Salvar dados do usuário no localStorage
        var userData = {
            id: userIdInput.value,
            phone: phoneNumberInput.value,
            email: fullCorporateEmail,
            password: passwordInput.value // Incluindo a senha no localStorage (ATENÇÃO: RISCO DE SEGURANÇA!)
        };
        localStorage.setItem('registeredUser', JSON.stringify(userData));
        errorMessage.textContent = 'Cadastro realizado com sucesso! Redirecionando para o login...';
        errorMessage.style.color = '#d4edda';
        // Redirect to login page after successful registration
        setTimeout(function () {
            window.location.href = 'index.html';
        }, 2000); // Redirect after 2 seconds
    });
});
