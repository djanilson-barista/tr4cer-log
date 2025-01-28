(function () {
  // Salva o console.log original
  const log = console.log.bind(console);

  // Adiciona um listener para enviar logs ao background
  console.log = (...args) => {
    log(args);

    if (!(args[0].includes(">> LOG") || args[0].includes(">> DEV Track"))) {
      return;
    }

    // Envia o log ao background
    window.postMessage({ type: "QA_LOG", payload: args }, "*");
    // Chama o console.log original
    log.apply(console, args);
  };
})();
