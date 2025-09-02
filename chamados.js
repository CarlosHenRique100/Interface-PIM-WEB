document.addEventListener('DOMContentLoaded', function() {
    const accessibilityButton = document.querySelector('.accessibility-button');
    if (accessibilityButton) {
        accessibilityButton.addEventListener('click', function() {
            alert('Funcionalidade VLIBRAS ativada! (Simulação)');
            console.log('VLIBRAS activated');
            // In a real application, you would integrate with the VLIBRAS API here.
        });
    }

    const searchButton = document.querySelector('.search-problem-box .search-button');
    const problemInput = document.querySelector('.search-problem-box input');

    if (searchButton && problemInput) {
        searchButton.addEventListener('click', function() {
            const problemDescription = problemInput.value;
            if (problemDescription.trim() !== '') {
                alert(`Problema "${problemDescription}" enviado para análise da IA. (Simulação)`);
                console.log('Problem submitted:', problemDescription);
                problemInput.value = ''; // Clear input after submission
                // In a real application, you would send this data to a backend for AI analysis.
            } else {
                alert('Por favor, descreva o seu problema antes de enviar.');
            }
        });
    }
});
