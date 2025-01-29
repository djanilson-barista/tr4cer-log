// background.js
function openApp(tab) {
  chrome.windows.create({
    url: chrome.runtime.getURL("popup.html"), // O arquivo HTML do popup
    type: "popup",
    width: 400,
    height: 600,
  });
}

chrome.action.onClicked.addListener(openApp);
