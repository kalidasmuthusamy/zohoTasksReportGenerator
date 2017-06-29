chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(null, {file: "jquery-3.2.1.js"});
  chrome.tabs.executeScript(null, {file: "tasksBuilder.js"});
  chrome.tabs.executeScript(null, {file: "ui-processor.js"});
});
