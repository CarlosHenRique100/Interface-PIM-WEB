
document.addEventListener('DOMContentLoaded', function() {
    const chatBox = document.getElementById('chatBox');
    const chatInput = document.getElementById('chatInput');
    const sendMessageButton = document.getElementById('sendMessageButton');
    const resolutionButtons = document.getElementById('resolutionButtons');
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');
    const confirmationButtons = document.getElementById('confirmationButtons');
    const confirmDataButton = document.getElementById('confirmDataButton');
    const editDataButton = document.getElementById('editDataButton');

    let userData = null;

    // Lógica para exibir o usuário logado no cabeçalho
    const loginButton = document.querySelector('header nav .login-button');
    const storedLoggedInUser = localStorage.getItem('registeredUser');

    if (loginButton && storedLoggedInUser) {
        try {
            const loggedInUser = JSON.parse(storedLoggedInUser);
            if (loggedInUser && (loggedInUser.id || loggedInUser.email)) {
                loginButton.textContent = loggedInUser.email || loggedInUser.id;
                loginButton.href = "#"; // Remove a navegação para a página de login
                loginButton.style.pointerEvents = "none"; // Impede cliques
                loginButton.style.cursor = "default";
            }
        } catch (e) {
            console.error("Erro ao analisar dados do usuário logado do localStorage:", e);
        }
    }

    // Função para adicionar mensagem ao chat
    function addMessage(sender, message, isUser = false) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message');
        messageElement.classList.add(isUser ? 'user-message' : 'ai-message');
        messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight; // Rolar para a última mensagem
    }

    function showResolutionButtons() {
        if (resolutionButtons) {
            resolutionButtons.style.display = 'block';
            chatInput.disabled = true;
            sendMessageButton.disabled = true;
        }
    }

    function hideResolutionButtons() {
        if (resolutionButtons) {
            resolutionButtons.style.display = 'none';
            chatInput.disabled = false;
            sendMessageButton.disabled = false;
        }
    }

    function showConfirmationButtons() {
        if (confirmationButtons) {
            confirmationButtons.style.display = 'block';
            chatInput.disabled = true;
            sendMessageButton.disabled = true;
        }
    }

    function hideConfirmationButtons() {
        if (confirmationButtons) {
            confirmationButtons.style.display = 'none';
            chatInput.disabled = false;
            sendMessageButton.disabled = false;
        }
    }

    // Event listeners para os botões de resolução
    yesButton.addEventListener('click', function() {
        addMessage('IA', 'Ótimo! Fico feliz em ter ajudado a resolver o seu problema. Se precisar de mais alguma coisa, estarei aqui!');
        hideResolutionButtons();
        chatInput.disabled = true; // Desabilita o input
        sendMessageButton.disabled = true; // Desabilita o botão de enviar
    });

    noButton.addEventListener('click', function() {
        const callNumber = Math.floor(Math.random() * 1000000); // Gera um número aleatório de 6 dígitos
        addMessage('IA', `Compreendido. Um chamado foi aberto para você com o número: <strong>#${callNumber}</strong>. Nossa equipe entrará em contato em breve. Você pode fornecer mais detalhes aqui, se desejar.`);
        hideResolutionButtons();
        chatInput.disabled = false; // Habilita o input
        sendMessageButton.disabled = false; // Habilita o botão de enviar
    });

    // Event listeners para os botões de confirmação de dados
    confirmDataButton.addEventListener('click', function() {
        addMessage('IA', 'Ótimo! Seus dados foram confirmados. Como posso te ajudar com seu problema técnico hoje?');
        hideConfirmationButtons();
        // Não desabilita o chat aqui, pois o usuário vai começar a fazer perguntas.
    });

    editDataButton.addEventListener('click', function() {
        addMessage('IA', 'Entendi. Por favor, digite seus dados corretos: ID de Usuário, Telefone e E-mail.');
        hideConfirmationButtons();
        // Habilita o chat para o usuário digitar os dados.
        chatInput.disabled = false;
        sendMessageButton.disabled = false;
    });

    // Simula a IA saudando o usuário e pedindo confirmação de dados
    async function startAIChat() {
        addMessage('IA', 'Olá! Eu sou sua assistente virtual. Antes de começarmos, preciso confirmar alguns dos seus dados.');
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Tenta obter dados do usuário do localStorage (simulando registro)
        const storedUserData = localStorage.getItem('registeredUser');
        if (storedUserData) {
            userData = JSON.parse(storedUserData);
            addMessage('IA', `Por favor, confirme se estes são seus dados: <br>ID: <strong>${userData.id}</strong> <br>Telefone: <strong>${userData.phone}</strong> <br>E-mail: <strong>${userData.email}</strong>`);
            showConfirmationButtons(); // Exibe os botões de confirmação
            } else {
            addMessage('IA', 'Não encontrei seus dados de registro. Por favor, digite seu ID de Usuário, Telefone e E-mail para que eu possa confirmar.');
            // Aqui você poderia pedir cada dado separadamente se quisesse um fluxo mais detalhado
        }
    }

    // Lógica para processar a mensagem do usuário
    async function processUserMessage(message) {
        addMessage('Você', message, true);
        chatInput.value = ''; // Limpa o campo de entrada
        hideResolutionButtons(); // Oculta os botões ao enviar nova mensagem

        await new Promise(resolve => setTimeout(resolve, 1000)); // Simula tempo de resposta da IA

        // Removida a lógica de verificação de 'sim'/'não' pois agora usamos botões.

        if (message.toLowerCase().includes('id') || message.toLowerCase().includes('telefone') || message.toLowerCase().includes('e-mail')) {
             addMessage('IA', 'Obrigado por fornecer seus dados. Se estiverem corretos, podemos prosseguir. Como posso te ajudar com seu problema técnico hoje?');
             // Aqui você pode adicionar lógica para realmente tentar validar esses dados se não vieram do localStorage
        } else if (message.toLowerCase().includes('wifi') || message.toLowerCase().includes('internet')) {
            addMessage('IA', 'IA Sugestão: Tente reiniciar o seu roteador e o seu computador. Isso costuma resolver problemas de conexão.');
            showResolutionButtons(); // Exibe os botões após a sugestão
        } else if (message.toLowerCase().includes('computador lento') || message.toLowerCase().includes('performance')) {
            addMessage('IA', 'IA Sugestão: Tente fazer uma limpeza de disco e verificar por programas em segundo plano. Desinstale softwares que não usa.');
            showResolutionButtons(); // Exibe os botões após a sugestão
        } else if (message.toLowerCase().includes('impressora') || message.toLowerCase().includes('imprimir')) {
            addMessage('IA', 'IA Sugestão: Verifique se a impressora está ligada, conectada e se há papel. Tente reiniciar a impressora e o computador.');
            showResolutionButtons(); // Exibe os botões após a sugestão
        } else if (message.toLowerCase().includes('programa não abre') || message.toLowerCase().includes('aplicativo travou')) {
            addMessage('IA', 'IA Sugestão: Tente finalizar o programa pelo Gerenciador de Tarefas (Ctrl+Shift+Esc) e abri-lo novamente. Se persistir, reinicie o computador.');
            showResolutionButtons(); // Exibe os botões após a sugestão
        } else if (message.toLowerCase().includes('vírus') || message.toLowerCase().includes('ameaça')) {
            addMessage('IA', 'IA Sugestão: Execute um escaneamento completo com seu antivírus. Evite clicar em links suspeitos e baixar arquivos de fontes desconhecidas.');
            showResolutionButtons(); // Exibe os botões após a sugestão
        } else if (message) {
            addMessage('IA', 'Entendi o seu problema. Por favor, forneça mais detalhes ou o tipo de problema que você está enfrentando (ex: “problema com wifi”, “computador lento”).');
        }
    }

    // Event listener para o botão de enviar mensagem
    sendMessageButton.addEventListener('click', function() {
        const message = chatInput.value.trim();
        if (message) {
            processUserMessage(message);
        }
    });

    // Event listener para a tecla Enter no campo de entrada
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessageButton.click(); // Simula o clique no botão
        }
    });

    // Inicia o chat da IA quando a página carrega
    startAIChat();
});
