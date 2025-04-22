document.addEventListener("DOMContentLoaded", () => {
    const texto = localStorage.getItem("readflow_text") || "";
    const palavras = texto.trim().split(/\s+/).length;
  
    const duracaoSegundos = parseInt(localStorage.getItem("readflow_duracao")) || 60;
    const wpm = Math.round((palavras / duracaoSegundos) * 60);
  
    const respostas = JSON.parse(localStorage.getItem("readflow_respostas")) || [];
    const perguntas = JSON.parse(localStorage.getItem("readflow_perguntas")) || [];
    const settings = JSON.parse(localStorage.getItem("readflow_settings")) || { language: 'pt' };
  
    let acertos = 0;
  
    const feedbackContainer = document.getElementById("feedbackPerguntas");
    feedbackContainer.innerHTML = "<h3>Respostas:</h3>";
  
    perguntas.forEach((pergunta, index) => {
      const correta = pergunta.correta;
      const respostaUser = respostas[index];
      const corretaTxt = pergunta.alternativas[correta];
      const userTxt = pergunta.alternativas[respostaUser];
      const acertou = correta === respostaUser;
  
      if (acertou) acertos++;
  
      const p = document.createElement("p");
      p.innerHTML = `
        <strong>${index + 1}. ${pergunta.pergunta}</strong><br>
        Sua resposta: <span style="color: ${acertou ? 'green' : 'red'}">${userTxt || 'Nenhuma'}</span><br>
        Resposta correta: <strong>${corretaTxt}</strong>
      `;
      feedbackContainer.appendChild(p);
    });
  
    // Exibir dados
    document.getElementById("tempoLeitura").textContent = `${duracaoSegundos} segundos`;
    document.getElementById("velocidade").textContent = wpm;
    document.getElementById("acertos").textContent = acertos;
    document.getElementById("classificacao").textContent = classificarLeitura(wpm, settings.language);
  });
  
  function classificarLeitura(wpm, idioma) {
    const limites = {
      pt: [100, 150, 200],   // lenta, normal, rápida
      en: [120, 180, 250],
      es: [110, 160, 220],
      zh: [80, 120, 180]
    };
  
    const [lenta, normal, rapida] = limites[idioma] || [100, 150, 200];
  
    if (wpm < lenta) return "Lenta";
    if (wpm < normal) return "Normal";
    if (wpm < rapida) return "Rápida";
    return "Dinâmica";
  }
  
  function refazer() {
    window.location.href = "index.html";
  }
  
  function reler() {
    window.location.href = "leitura.html";
  }
  
  function encerrar() {
    localStorage.clear();
    alert("Treinamento encerrado. Volte sempre!");
    window.location.href = "index.html";
  }
  