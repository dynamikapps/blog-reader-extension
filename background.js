const DEBUG = true;

let apiKey;

function initializeOpenAI() {
  apiKey = "your_api_key_here";
}

initializeOpenAI();

let audioData = null;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (DEBUG) console.log("Received message:", request);
  if (request.action === "textExtracted") {
    generateSpeech(request.text);
  } else if (request.action === "startReading") {
    if (audioData) {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: "playAudio",
          audioData: audioData,
        });
      });
    }
  } else if (
    request.action === "pauseReading" ||
    request.action === "stopReading"
  ) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: request.action });
    });
  }
});

async function generateSpeech(text) {
  if (DEBUG)
    console.log("Generating speech for:", text.substring(0, 100) + "...");
  try {
    const response = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "tts-1",
        input: text,
        voice: "nova",
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (DEBUG) console.log("Speech generated successfully");

    const audioBlob = await response.blob();
    const reader = new FileReader();
    reader.readAsDataURL(audioBlob);
    reader.onloadend = function () {
      audioData = reader.result;
      if (DEBUG) console.log("Audio data created");
      // Notify that new audio is ready
      chrome.runtime.sendMessage({ action: "audioReady" });
    };
  } catch (error) {
    console.error("Error generating speech:", error);
  }
}
