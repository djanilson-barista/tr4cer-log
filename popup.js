document.addEventListener("DOMContentLoaded", function onDOMContentLoaded() {
  var mockData = [
    [
      ">> DEV Track: [login_click_email] ",
      {
        shopcode: "not-fond",
        storeName: "",
        storePlan: "not-fond",
        storeMail: "",
        owner: "not-fond",
        origin_domain: "http://localhost:3000",
        origin: "PC",
        screen_size: "1829x1029",
        eventName: "input_interaction",
        arguments: ["enter_email", "login"],
      },
    ],
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
    [
      ">> LOG TRACK: [input_interaction]",
      {
        event: "genericEvent",
        event_name: "input_interaction",
        event_parameter_1: "enter_email",
        event_parameter_2: "recovery_password",
      },
    ],
    [
      ">> LOG TRACK: [input_interaction]",
      {
        event: "genericEvent",
        event_name: "input_interaction",
        event_parameter_1: "enter_email",
        event_parameter_2: "recovery_password",
      },
    ],
  ];

  const _container = document.getElementById("logs-container");

  let _searchDelay = null;
  let _msgsReceived = [];
  let _filteredMsgs = []; // filtered messages
  let _inSearch = false;

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
    _container.innerHTML = "";
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

    list.map((message) => {
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
      _msgsReceived.unshift(message.payload);
      renderLogs();
    }
  }

  function searchLogs(searchValue) {
    _inSearch = true;
    _msgsReceived.map((logData) => {
      const details = logData[1];

      if (JSON.stringify(details).toLowerCase().includes(searchValue)) {
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

  // // debugger;
  const debuggerMode = false;

  if (!debuggerMode) {
    // Escuta mensagens do background
    chrome.runtime.onMessage.addListener(handleMessage);
  } else {
    _msgsReceived = mockData;
    renderLogs();
  }

  document.addEventListener("click", handleLogHeaderClick);
  document.addEventListener("click", ({ target }) => {
    if (target.id === "clear-logs") {
      _msgsReceived.length = 0;
      renderLogs();
    }
  });

  document.addEventListener("keyup", handleSearch);
});
