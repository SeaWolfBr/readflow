document.addEventListener("DOMContentLoaded", function () {
    const startBtn = document.getElementById("startBtn");
  
    startBtn.addEventListener("click", () => {
      const language = document.getElementById("language").value;
      const time = parseInt(document.getElementById("time").value); // segundos agora
      const topic = document.getElementById("topic").value.trim();
  
      if (!topic) {
        alert("Por favor, digite um tema para a leitura.");
        return;
      }
  
      const settings = {
        language,
        time,
        topic
      };
  
      localStorage.setItem("readflow_settings", JSON.stringify(settings));
      window.location.href = "leitura.html";
    });
  });
  