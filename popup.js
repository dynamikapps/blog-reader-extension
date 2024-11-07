const DEBUG = true;

const extractButton = document.getElementById("extractText");
const startButton = document.getElementById("startReading");
const pauseButton = document.getElementById("pauseReading");
const stopButton = document.getElementById("stopReading");

extractButton.addEventListener("click", () => {
  if (DEBUG) console.log("Button clicked:", "extractText");
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "extractText" });
  });
  // Disable start button until new audio is ready
  startButton.disabled = true;
});

startButton.addEventListener("click", () => {
  if (DEBUG) console.log("Button clicked:", "startReading");
  chrome.runtime.sendMessage({ action: "startReading" });
  startButton.disabled = true;
  pauseButton.disabled = false;
  stopButton.disabled = false;
});

pauseButton.addEventListener("click", () => {
  if (DEBUG) console.log("Button clicked:", "pauseReading");
  chrome.runtime.sendMessage({ action: "pauseReading" });
  startButton.disabled = false;
  pauseButton.disabled = true;
});

stopButton.addEventListener("click", () => {
  if (DEBUG) console.log("Button clicked:", "stopReading");
  chrome.runtime.sendMessage({ action: "stopReading" });
  startButton.disabled = false;
  pauseButton.disabled = true;
  stopButton.disabled = true;
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "noTextSelected") {
    alert("Please select some text before clicking 'Extract Text'.");
  } else if (request.action === "textExtracted") {
    // Do nothing here, wait for audioReady message
  } else if (request.action === "audioReady") {
    startButton.disabled = false;
  }
});
