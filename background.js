// // background.js

// function messageListener(message, sender, sendResponse) {
//   console.log("[QA Logger] Mensagem recebida no background:", message);

//   if (message.type === "QA_LOG_BG") {
//     // Envia a mensagem para o popup
//     console.log("[QA Logger] Log recebido:", message.payload);

//     chrome.runtime.sendMessage({ type: "QA_LOG", payload: message.payload });
//   }
// }

// chrome.runtime.onMessage.addListener(messageListener);

function openApp(tab) {
  chrome.windows.create({
    url: chrome.runtime.getURL("popup.html"), // O arquivo HTML do popup
    type: "popup",
    width: 400,
    height: 600,
  });
}

chrome.action.onClicked.addListener(openApp);
