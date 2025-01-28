// content.js
(function () {
  // Injeta um script diretamente no DOM
  const script = document.createElement("script");
  script.src = chrome.runtime.getURL("injected.js"); // Um arquivo separado
  script.onload = function () {
    this.remove(); // Remove o script após ser carregado
  };
  document.head.appendChild(script);

  function handleMessage(event) {
    // Filtra apenas as mensagens do tipo QA_LOG
    if (event.source !== window || event.data.type !== "QA_LOG") return;

    // Envia a mensagem ao background.js
    chrome.runtime.sendMessage({ type: "QA_LOG", payload: event.data.payload });
  }

  window.addEventListener("message", handleMessage);
})();
