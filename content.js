const DEBUG = true;

let audioElement = null;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (DEBUG) console.log("Content script received message:", request);
  if (request.action === "extractText") {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText) {
      if (DEBUG)
        console.log("Extracted text:", selectedText.substring(0, 100) + "...");
      chrome.runtime.sendMessage({
        action: "textExtracted",
        text: selectedText,
      });
      // Stop and reset any existing audio playback
      if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
      }
    } else {
      console.warn("No text selected");
      chrome.runtime.sendMessage({ action: "noTextSelected" });
    }
  } else if (request.action === "playAudio") {
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
    }
    audioElement = new Audio(request.audioData);
    audioElement.play();
  } else if (request.action === "pauseReading") {
    if (audioElement) audioElement.pause();
  } else if (request.action === "stopReading") {
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
    }
  }
});
