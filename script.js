console.log("O script.ts (compilado para .js) está sendo executado!");
document.addEventListener('DOMContentLoaded', function () {
    var loginForm = document.getElementById('loginForm');
    if (!loginForm) {
        console.error('Login form not found.');
        return;
    }
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission
        var usernameInput = document.getElementById('username');
        var passwordInput = document.getElementById('password');
        var errorMessage = document.getElementById('errorMessage');
        if (!usernameInput || !passwordInput || !errorMessage) {
            console.error('One or more required elements not found.');
            return;
        }
        // Admin credentials (fixed)
        var adminUsername = 'ADM';
        var adminPassword = 'adm123';
        // Registered user credentials (from localStorage)
        var storedUserData = localStorage.getItem('registeredUser');
        var registeredUser = null;
        if (storedUserData) {
            registeredUser = JSON.parse(storedUserData);
        }
        // Check for Admin Login
        if (usernameInput.value === adminUsername && passwordInput.value === adminPassword) {
            errorMessage.textContent = 'Login de Administrador bem-sucedido! Redirecionando...';
            errorMessage.style.color = '#d4edda'; // Green color for success
            window.location.href = 'chamados.html';
        }
        // Check for Registered User Login
        else if (registeredUser &&
            (usernameInput.value === registeredUser.id || usernameInput.value === registeredUser.email) &&
            passwordInput.value === registeredUser.password) {
            errorMessage.textContent = 'Login de Usuário Registrado bem-sucedido! Redirecionando...';
            errorMessage.style.color = '#d4edda'; // Green color for success
            window.location.href = 'chamados.html';
        }
        // Invalid Credentials
        else {
            errorMessage.textContent = 'ID Do Usuário/E-mail ou Senha inválidos. Por favor, tente novamente.';
            errorMessage.style.color = '#FF0000'; // Red color for error
        }
    });
});
