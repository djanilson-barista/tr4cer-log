document.addEventListener("DOMContentLoaded", function onDOMContentLoaded() {
  const container = document.getElementById("logs-container");

  const msgsReceived = [];
  const _filteredMsgs = []; // filtered messages
  let _inSearch = false;

  // Search logs in msgsReceived
  // function searchLogs() {
  //   _inSearch = true;
  //   const searchInput = document.getElementById("search-input");
  //   const searchValue = searchInput.value.toLowerCase();

  //   msgsReceived.map((logData) => {
  //     const logItem = document.querySelector(".log-item");

  //     if (JSON.stringify(logData.details).toLowerCase().includes(searchValue)) {
  //       logItem.style.display = "block";
  //       _filteredMsgs.unshift(logData);
  //     } else {
  //       logItem.style.display = "none";
  //     }
  //   });
  // }

  function toggleDetails(target) {
    const logHeader = target;
    const logDetails = logHeader.nextElementSibling;
    if (
      logDetails.style.display === "none" ||
      logDetails.style.display === ""
    ) {
      logDetails.style.display = "block";
    } else {
      logDetails.style.display = "none";
    }
  }

  function handleLogHeaderClick(event) {
    // identifica se o item clicado é um log header
    if (event.target.className === "log-header") {
      toggleDetails(event.target);
    }
  }

  function renderLogs() {
    msgsReceived.map((message) => {
      const title = message[0];
      let details = JSON.stringify(message[1], null, 2);

      // Cria um novo item de log
      const logHTML = `
        <div class="log-item">
          <div class="log-header">
            ${title}
          </div>
          <pre class="log-details" id="logDetails">${details}</pre>
        </div>
      `;

      container.insertAdjacentHTML("afterbegin", logHTML);
    });
  }

  function handleMessage(message) {
    console.log("[QA Logger] Mensagem recebida no popup:", message);

    document.querySelector("#instructions").style.display = "none";

    if (message.type === "QA_LOG") {
      if (msgsReceived.length >= 100) {
        msgsReceived.length = 0;
      }

      // add in beginning of the array
      msgsReceived.unshift(message.payload);
      renderLogs();
    }
  }

  // Escuta mensagens do background
  chrome.runtime.onMessage.addListener(handleMessage);

  document.addEventListener("click", handleLogHeaderClick);
});
