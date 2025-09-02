
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) {
        console.error('Login form not found.');
        return;
    }
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        const usernameInput = document.getElementById('username') as HTMLInputElement;
        const passwordInput = document.getElementById('password') as HTMLInputElement;
        const errorMessage = document.getElementById('errorMessage');

        if (!usernameInput || !passwordInput || !errorMessage) {
            console.error('One or more required elements not found.');
            return;
        }

        // Admin credentials
        const adminEmail = 'ADM@unimanagement';
        const adminPassword = 'adm123';

        if (usernameInput.value === adminEmail && passwordInput.value === adminPassword) {
            errorMessage.textContent = 'Login bem-sucedido! Redirecionando...';
            errorMessage.style.color = '#d4edda'; // Green color for success
            window.location.href = 'chamados/chamados.html';
        } else if (usernameInput.value !== adminEmail) {
            errorMessage.textContent = 'ID Do Usuário/E-mail Corp, errado.';
            errorMessage.style.color = '#ffdddd'; // Light red for error
        } else if (passwordInput.value !== adminPassword) {
            errorMessage.textContent = 'Senha errada.';
            errorMessage.style.color = '#ffdddd'; // Light red for error
        }
    });
});
