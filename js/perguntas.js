document.addEventListener("DOMContentLoaded", () => {
    const texto = localStorage.getItem("readflow_text");
    if (!texto) {
      alert("Texto não encontrado. Retornando para a leitura.");
      window.location.href = "leitura.html";
      return;
    }
  
    // 👉 Futuro: gerar perguntas com IA. Por agora, simulação:
    const perguntas = gerarPerguntasSimuladas();
  
    const container = document.getElementById("perguntasContainer");
  
    perguntas.forEach((pergunta, index) => {
      const div = document.createElement("div");
      div.classList.add("pergunta");
  
      const perguntaHTML = `
        <p><strong>${index + 1}. ${pergunta.pergunta}</strong></p>
        ${pergunta.alternativas.map((alt, i) => `
          <label>
            <input type="radio" name="pergunta${index}" value="${i}" required />
            ${alt}
          </label><br>
        `).join('')}
      `;
  
      div.innerHTML = perguntaHTML;
      container.appendChild(div);
    });
  
    // Salvar perguntas e gabarito no localStorage
    localStorage.setItem("readflow_perguntas", JSON.stringify(perguntas));
  
    // Enviar respostas
    document.getElementById("quizForm").addEventListener("submit", (e) => {
      e.preventDefault();
  
      const respostas = [];
      for (let i = 0; i < perguntas.length; i++) {
        const escolha = document.querySelector(`input[name="pergunta${i}"]:checked`);
        respostas.push(Number(escolha.value));
      }
  
      localStorage.setItem("readflow_respostas", JSON.stringify(respostas));
      window.location.href = "resultado.html";
    });
  });
  
  // Gera perguntas de exemplo (simulação)
  function gerarPerguntasSimuladas() {
    return [
      {
        pergunta: "Qual era o tema principal do texto?",
        alternativas: ["Tecnologia", "Educação", "Saúde", "Meio ambiente"],
        correta: 3
      },
      {
        pergunta: "Quantas palavras havia no texto?",
        alternativas: ["Cerca de 50", "Cerca de 200", "Cerca de 500", "Mais de 1000"],
        correta: 2
      },
      {
        pergunta: "Qual objetivo deste exercício?",
        alternativas: ["Aprender gramática", "Melhorar vocabulário", "Treinar leitura", "Traduzir textos"],
        correta: 2
      },
      {
        pergunta: "Qual idioma foi escolhido?",
        alternativas: ["Português", "Espanhol", "Inglês", "Chinês"],
        correta: 0
      },
      {
        pergunta: "O que o botão 'Terminei' faz?",
        alternativas: [
          "Fecha o site",
          "Envia suas respostas por e-mail",
          "Calcula o tempo de leitura",
          "Mostra um novo texto"
        ],
        correta: 2
      }
    ];
  }
  