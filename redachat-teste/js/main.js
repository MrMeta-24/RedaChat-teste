document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const pdfUploadBtn = document.getElementById('pdf-upload-btn');
    const imageUploadBtn = document.getElementById('image-upload-btn');
    const loginBtn = document.getElementById('login-btn');
    const loginModal = document.getElementById('login-modal');
    const newChatModal = document.getElementById('new-chat-modal'); // Novo modal
    const closeLoginBtn = document.querySelector('.login-close');
    const closeChatBtn = document.querySelector('.chat-close'); // Novo botão de fechar
    const newChatBtn = document.getElementById('new-chat-btn');
    const previousChatsContainer = document.getElementById('previous-chats-container'); // Container das redações anteriores
    const chatTitle = document.getElementById('chat-title');
    
    // Inicializa a lista de chats existentes para manipulação
    let navItems = document.querySelectorAll('.nav-item');

    // Função para adicionar uma mensagem ao chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        if (sender === 'user') {
            messageDiv.classList.add('user-message');
        } else {
            messageDiv.classList.add('bot-message');
        }
        messageDiv.innerHTML = `<div class="message-content">${text}</div>`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Função para simular a resposta do bot
    function simulateBotResponse(userText) {
        let botResponse = 'Obrigado por enviar sua redação! Estou analisando seu texto...';
        if (userText.toLowerCase().includes('olá')) {
            botResponse = 'Olá! Por favor, cole o texto da sua redação para eu começar a análise.';
        } else if (userText.toLowerCase().includes('corrigir')) {
            botResponse = 'Para corrigir, cole o texto completo da sua redação. Eu darei sugestões sobre gramática, coesão e estrutura.';
        }
        
        setTimeout(() => {
            addMessage(botResponse, 'bot');
            setTimeout(() => {
                const finalResponse = 'Análise concluída. Verifique a ortografia, a concordância verbal e a repetição de palavras. Considere revisar o terceiro parágrafo para melhorar a fluidez.';
                addMessage(finalResponse, 'bot');
            }, 2000);
        }, 1000);
    }

    // Evento de clique para enviar a mensagem
    sendBtn.addEventListener('click', () => {
        const userText = userInput.value.trim();
        if (userText) {
            addMessage(userText, 'user');
            userInput.value = '';
            simulateBotResponse(userText);
        }
    });

    // Evento de tecla Enter para enviar a mensagem
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendBtn.click();
        }
    });

    // Ajusta a altura da textarea conforme o conteúdo
    userInput.addEventListener('input', () => {
        userInput.style.height = 'auto';
        userInput.style.height = userInput.scrollHeight + 'px';
    });

    // Simula a ação de upload de PDF
    pdfUploadBtn.addEventListener('click', () => {
        addMessage('Upload de PDF simulado. O arquivo será processado em breve.', 'user');
        setTimeout(() => {
            addMessage('PDF recebido! Analisando o conteúdo da redação...', 'bot');
            setTimeout(() => {
                const pdfResponse = 'Análise do PDF concluída. Sua tese é clara, mas os exemplos poderiam ser mais detalhados. Sugiro expandir o desenvolvimento do segundo argumento.';
                addMessage(pdfResponse, 'bot');
            }, 2000);
        }, 1000);
    });

    // Simula a ação de digitalizar imagem (OCR)
    imageUploadBtn.addEventListener('click', () => {
        addMessage('Digitalização de imagem (OCR) simulada. A conversão do seu texto manuscrito para digital está em andamento...', 'user');
        setTimeout(() => {
            addMessage('Imagem processada! O texto foi extraído com sucesso. Analisando a redação...', 'bot');
            setTimeout(() => {
                const imageResponse = 'Análise da redação digitalizada concluída. A estrutura está boa, mas preste atenção à caligrafia, pois algumas palavras foram difíceis de interpretar. Corrija a pontuação no final do primeiro parágrafo.';
                addMessage(imageResponse, 'bot');
            }, 2000);
        }, 1000);
    });
    
    // Lógica para abrir e fechar modais
    loginBtn.addEventListener('click', () => {
        loginModal.style.display = 'flex';
    });

    closeLoginBtn.addEventListener('click', () => {
        loginModal.style.display = 'none';
    });
    
    closeChatBtn.addEventListener('click', () => {
        newChatModal.style.display = 'none';
    });
    
    newChatBtn.addEventListener('click', (e) => {
        e.preventDefault();
        newChatModal.style.display = 'flex';
    });

    // Fechar modais clicando fora deles
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
        }
        if (e.target === newChatModal) {
            newChatModal.style.display = 'none';
        }
    });

    // Simula o envio do formulário de login (apenas para exibição)
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Login simulado com sucesso!');
        loginModal.style.display = 'none';
    });

    // Lógica para criar um novo chat
    document.getElementById('new-chat-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const chatName = document.getElementById('chat-name').value.trim();
        if (chatName) {
            // Cria um novo item na lista do menu
            const newChatItem = document.createElement('a');
            newChatItem.href = '#';
            newChatItem.classList.add('nav-item');
            newChatItem.innerHTML = `<i class="fas fa-file-alt"></i> ${chatName}`;

            // Adiciona o novo item no topo da lista de chats anteriores
            previousChatsContainer.prepend(newChatItem);
            
            // Re-seleciona todos os navItems para incluir o novo
            navItems = document.querySelectorAll('.nav-item');
            
            // Atualiza a visualização para o novo chat
            updateChatView(newChatItem);
            
            // Fecha o modal e reseta o formulário
            newChatModal.style.display = 'none';
            e.target.reset();
        }
    });

    // Lógica para "Nova Redação" e links de histórico
    function updateChatView(selectedItem) {
        // Remove a classe 'active' de todos os itens
        navItems.forEach(i => i.classList.remove('active'));
        
        // Adiciona a classe 'active' ao item clicado
        selectedItem.classList.add('active');

        // Simula a mudança de chat
        chatMessages.innerHTML = '';
        const redactionTitle = selectedItem.textContent.trim();
        chatTitle.textContent = redactionTitle;

        if (selectedItem.id === 'new-chat-btn') {
             addMessage('Olá! Sou o seu assistente de correção de redações. Cole seu texto, faça o upload de um PDF ou **digitalize uma imagem** para eu te ajudar!', 'bot');
        } else {
            addMessage(`Carregando análise da "${redactionTitle}"...`, 'bot');
            setTimeout(() => {
                addMessage('Análise anterior carregada. Sugestões de melhoria: fortalecer a introdução e usar conectivos variados.', 'bot');
            }, 1000);
        }
    }

    // Adiciona o evento de clique a todos os itens de navegação (incluindo os novos)
    document.addEventListener('click', (e) => {
        if (e.target.matches('.nav-item, .nav-item *')) {
            e.preventDefault();
            const targetItem = e.target.matches('.nav-item') ? e.target : e.target.closest('.nav-item');
            updateChatView(targetItem);
        }
    });
});