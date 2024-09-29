// Função para chamar a API do ChatGPT 
async function getChatGPTResponse(prompt) {
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer SUA_CHAVE_DE_API`  // Substitua pela sua chave de API
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",  // Usando o modelo gpt-3.5-turbo para gerar o quiz
                messages: [
                    { role: "user", content: prompt }
                ]
            })
        });

        if (!response.ok) {
            console.error("Erro na resposta da API:", response.status, response.statusText);
            return "Erro ao gerar a pergunta. Por favor, tente novamente.";
        }

        const data = await response.json();
        console.log("Resposta da API:", data);  // Verifique a resposta no console
        return data.choices[0].message.content;
    } catch (error) {
        console.error("Erro ao chamar a API do ChatGPT:", error);
        return "Erro ao conectar ao ChatGPT. Verifique sua chave de API ou conexão.";
    }
}

// Função para gerar uma pergunta de quiz
async function createQuiz() {
    const quizPrompt = "Gere uma pergunta de quiz sobre curiosidades do mundo com 4 opções de resposta. Indique a resposta correta.";
    
    // Chamando a API
    const quiz = await getChatGPTResponse(quizPrompt);

    // Exibir o resultado no contêiner
    console.log("Quiz gerado:", quiz);  // Exibe no console para depuração
    if (quiz) {
        document.getElementById('quiz-container').innerText = quiz;
    } else {
        document.getElementById('quiz-container').innerText = "Erro ao gerar o quiz.";
    }
}

// Adiciona o evento de clique ao botão para gerar o quiz
document.getElementById('generate-quiz-btn').addEventListener('click', createQuiz);
