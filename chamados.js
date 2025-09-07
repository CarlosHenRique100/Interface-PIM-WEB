
document.addEventListener('DOMContentLoaded', function() {
    const chatBox = document.getElementById('chatBox');
    const chatInput = document.getElementById('chatInput');
    const sendMessageButton = document.getElementById('sendMessageButton');

    let userData = null;

    // Função para adicionar mensagem ao chat
    function addMessage(sender, message, isUser = false) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message');
        messageElement.classList.add(isUser ? 'user-message' : 'ai-message');
        messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight; // Rolar para a última mensagem
    }

    // Simula a IA saudando o usuário e pedindo confirmação de dados
    async function startAIChat() {
        addMessage('IA', 'Olá! Eu sou sua assistente virtual. Antes de começarmos, preciso confirmar alguns dos seus dados.');
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Tenta obter dados do usuário do localStorage (simulando registro)
        const storedUserData = localStorage.getItem('registeredUser');
        if (storedUserData) {
            userData = JSON.parse(storedUserData);
            addMessage('IA', `Por favor, confirme se estes são seus dados: <br>ID: <strong>${userData.id}</strong> <br>Telefone: <strong>${userData.phone}</strong> <br>E-mail: <strong>${userData.email}</strong> <br>Você confirma (sim/não)?`);
            } else {
            addMessage('IA', 'Não encontrei seus dados de registro. Por favor, digite seu ID de Usuário, Telefone e E-mail para que eu possa confirmar.');
            // Aqui você poderia pedir cada dado separadamente se quisesse um fluxo mais detalhado
        }
    }

    // Lógica para processar a mensagem do usuário
    async function processUserMessage(message) {
        addMessage('Você', message, true);
        chatInput.value = ''; // Limpa o campo de entrada

        await new Promise(resolve => setTimeout(resolve, 1000)); // Simula tempo de resposta da IA

        if (userData && (message.toLowerCase() === 'sim' || message.toLowerCase() === 's')) {
            addMessage('IA', 'Ótimo! Seus dados foram confirmados. Como posso te ajudar com seu problema técnico hoje?');
            userData = null; // Confirmação feita, reseta para não perguntar novamente
        } else if (userData && (message.toLowerCase() === 'não' || message.toLowerCase() === 'n')) {
            addMessage('IA', 'Entendi. Por favor, forneça os dados corretos: ID, Telefone e E-mail.');
            // Aqui você poderia adicionar lógica para o usuário inserir os dados corretos
            userData = null; // Reseta para pedir novamente
        } else if (message.toLowerCase().includes('id') || message.toLowerCase().includes('telefone') || message.toLowerCase().includes('e-mail')) {
             addMessage('IA', 'Obrigado por fornecer seus dados. Se estiverem corretos, podemos prosseguir. Como posso te ajudar com seu problema técnico hoje?');
             // Aqui você pode adicionar lógica para realmente tentar validar esses dados se não vieram do localStorage
        } else if (message.toLowerCase().includes('wifi') || message.toLowerCase().includes('internet')) {
            addMessage('IA', 'IA Sugestão: Tente reiniciar o seu roteador e o seu computador. Isso costuma resolver problemas de conexão.');
        } else if (message.toLowerCase().includes('computador lento') || message.toLowerCase().includes('performance')) {
            addMessage('IA', 'IA Sugestão: Tente fazer uma limpeza de disco e verificar por programas em segundo plano. Desinstale softwares que não usa.');
        } else if (message.toLowerCase().includes('impressora') || message.toLowerCase().includes('imprimir')) {
            addMessage('IA', 'IA Sugestão: Verifique se a impressora está ligada, conectada e se há papel. Tente reiniciar a impressora e o computador.');
        } else if (message.toLowerCase().includes('programa não abre') || message.toLowerCase().includes('aplicativo travou')) {
            addMessage('IA', 'IA Sugestão: Tente finalizar o programa pelo Gerenciador de Tarefas (Ctrl+Shift+Esc) e abri-lo novamente. Se persistir, reinicie o computador.');
        } else if (message.toLowerCase().includes('vírus') || message.toLowerCase().includes('ameaça')) {
            addMessage('IA', 'IA Sugestão: Execute um escaneamento completo com seu antivírus. Evite clicar em links suspeitos e baixar arquivos de fontes desconhecidas.');
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
