(function () {
  // Salva o console.log original
  const log = console.log;

  // Adiciona um listener para enviar logs ao background
  console.log = (...args) => {
    if (!(args[0].includes(">> LOG") || args[0].includes(">> DEV Track"))) {
      log(...args);

      return;
    }

    // Envia o log ao background
    window.postMessage({ type: "QA_LOG", payload: args }, "*");
  };
})();
