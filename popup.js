document.addEventListener("DOMContentLoaded", function onDOMContentLoaded() {
  const _container = document.getElementById("logs-container");
  let _searchDelay = null;
  let _msgsReceived = [];
  let _filteredMsgs = []; // filtered messages
  let _inSearch = false;

  function toggleDetails(target) {
    const logDetails = target;
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
    if (event.target.className.includes("toggle-act")) {
      // suba até o log-item
      const logItem = event.target
        .closest(".log-item")
        .querySelector("#logDetails");

      toggleDetails(logItem);
    }
  }

  function renderLogs() {
    _container.innerHTML = "";

    // lista de logs a serem renderizados (filtrados ou não)
    const list = _inSearch ? _filteredMsgs : _msgsReceived;

    if (list.length === 0) {
      _container.innerHTML = `
      <p id="instructions">
        Seu log irá aparecer aqui quando ele for interceptado.
      </p>`;
    }

    document.querySelector("#logs-count").innerText = list.length
      ? `(${list.length})`
      : "";

    list.forEach((message, idx) => {
      const num = idx + 1 > 9 ? idx + 1 : `0${idx + 1}`;
      const title = message[0];
      let details = JSON.stringify(message[1], null, 2);

      // Cria um novo item de log
      const logHTML = `
        <div class="log-item">
          <div class="log-header toggle-act">
            <span class="toggle-act">${title}</span> <small>#${num}</small> 
          </div>
          <pre class="log-details" id="logDetails">${details}</pre>
        </div>
      `;

      _container.insertAdjacentHTML("afterbegin", logHTML);
    });
  }

  function handleMessage(message) {
    console.log("[QA Logger] Mensagem recebida no popup:", message);

    if (document.querySelector("#instructions")) {
      document.querySelector("#instructions").style.display = "none";
    }

    if (message.type === "QA_LOG") {
      if (_msgsReceived.length >= 100) {
        _msgsReceived.length = 0;
      }

      // add in beginning of the array
      _msgsReceived.push(message.payload);
      renderLogs();
    }
  }

  function searchLogs(searchValue) {
    _inSearch = true;
    _msgsReceived.forEach((logData) => {
      const details = logData;

      if (
        JSON.stringify(details)
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      ) {
        _filteredMsgs.push(logData);
      }

      renderLogs();
    });
  }

  function handleSearch({ target }) {
    _searchDelay && clearTimeout(_searchDelay);

    setTimeout(() => {
      _inSearch = false;
      _filteredMsgs = [];

      if (target.id === "search-input") {
        searchLogs(target.value);
      }
    }, 800);
  }

  function runDebugger() {
    _msgsReceived = [
      [
        ">> LOG TRACK: [forgot_password]",
        {
          event: "genericEvent",
          event_name: "forgot_password",
        },
      ],
      [
        ">> DEV Track: [login_click_forgot_password] ",
        {
          shopcode: "not-fond",
          storeName: "",
          storePlan: "not-fond",
          storeMail: "",
          owner: "not-fond",
          origin_domain: "http://localhost:3000",
          origin: "PC",
          screen_size: "1829x1029",
          eventName: "forgot_password",
          arguments: [],
        },
      ],
    ];

    renderLogs();
  }

  function handleClearLogs({ target }) {
    if (target.id === "clear-logs") {
      _msgsReceived.length = 0;
      _filteredMsgs.length = 0;
      _inSearch = false;

      renderLogs();
    }
  }

  const _debuggerMode = false;

  if (_debuggerMode) {
    runDebugger();
  } else {
    // Escuta mensagens do background
    chrome.runtime.onMessage.addListener(handleMessage);
  }

  document.addEventListener("click", handleLogHeaderClick);
  document.addEventListener("click", handleClearLogs);
  document.addEventListener("keyup", handleSearch);
});
