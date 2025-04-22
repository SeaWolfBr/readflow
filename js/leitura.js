document.addEventListener("DOMContentLoaded", async () => {
    const idiomaSpan = document.getElementById("idioma");
    const temaSpan = document.getElementById("tema");
    const tempoSpan = document.getElementById("tempo");
    const textoElement = document.getElementById("texto");
    const cronometro = document.getElementById("cronometro");
  
    const settings = JSON.parse(localStorage.getItem("readflow_settings"));
  
    if (!settings) {
      alert("Configuração não encontrada. Voltando à tela inicial.");
      window.location.href = "index.html";
      return;
    }
  
    // Mostrar configurações na tela
    idiomaSpan.textContent = idiomaNome(settings.language);
    temaSpan.textContent = settings.topic;
    tempoSpan.textContent = settings.time;
  
    try {
      textoElement.textContent = "Gerando texto com inteligência artificial, aguarde...";
  
      const textoGerado = await gerarTextoComIA(settings.topic, idiomaNome(settings.language), settings.time);
  
      textoElement.textContent = textoGerado;
      localStorage.setItem("readflow_text", textoGerado);
  
      // Agora sim: iniciar o cronômetro
      let segundos = 0;
      cronometro.textContent = "Tempo: 0s";
      cronometro.style.display = "block";
  
      const cronometroInterval = setInterval(() => {
        segundos++;
        cronometro.textContent = `Tempo: ${segundos}s`;
      }, 1000);
  
      // Botão de finalizar leitura
      document.getElementById("finalizarLeitura").addEventListener("click", () => {
        clearInterval(cronometroInterval);
        localStorage.setItem("readflow_duracao", segundos);
        localStorage.setItem("readflow_start_time", Date.now());
        window.location.href = "perguntas.html";
      });
  
    } catch (error) {
      textoElement.textContent = "Erro ao gerar texto. Tente novamente mais tarde.";
      console.error(error);
    }
  });
  
  // Retorna o nome do idioma legível
  function idiomaNome(code) {
    const nomes = {
      pt: "Português",
      en: "Inglês",
      es: "Espanhol",
      zh: "Chinês"
    };
    return nomes[code] || code;
  }
  
  // Chamada à OpenAI para gerar o texto
  async function gerarTextoComIA(tema, idioma, tempo) {
    const apiKey = localStorage.getItem("openai_api_key"); // chave lida do navegador
  
    const prompt = `Crie um texto no idioma ${idioma} sobre o tema "${tema}", com aproximadamente ${tempo} minutos de leitura. O texto deve ser interessante, informativo e ideal para treino de leitura.`;
  
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
      })
    });
  
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Resposta da OpenAI:", response.status, errorText);
      throw new Error("Erro na resposta da OpenAI");
    }
  
    const data = await response.json();
    return data.choices[0].message.content.trim();
  }
  