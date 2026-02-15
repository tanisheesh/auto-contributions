// Learning Objective:
// This tutorial teaches you how to build a basic web-based text-to-speech reader
// using the browser's native Web Speech API. You will learn how to:
// - Access the SpeechSynthesis API to vocalize text.
// - Manage voice options (selecting different voices).
// - Control speech parameters like rate (speed) and pitch.
// - Interact with common HTML elements using JavaScript.
// - Implement event listeners for user interaction.
// This is a practical introduction to browser APIs, making your web pages speak!

// --- IMPORTANT: For this JavaScript code to work, you'll need a simple HTML structure. ---
// You would typically have elements like:
// <textarea id="text-to-speak"></textarea>
// <select id="voice-select"></select>
// <input type="range" id="rate-slider"> <span id="rate-value"></span>
// <input type="range" id="pitch-slider"> <span id="pitch-value"></span>
// <button id="speak-btn"></button>
// <button id="stop-btn"></button>
// ---------------------------------------------------------------------------------------

// 1. Get references to our HTML elements.
// We use `document.getElementById` to link our JavaScript variables
// to the actual elements on the web page, making them accessible.
const textArea = document.getElementById('text-to-speak');
const voiceSelect = document.getElementById('voice-select');
const rateSlider = document.getElementById('rate-slider');
const rateValueSpan = document.getElementById('rate-value'); // For displaying current rate
const pitchSlider = document.getElementById('pitch-slider');
const pitchValueSpan = document.getElementById('pitch-value'); // For displaying current pitch
const speakBtn = document.getElementById('speak-btn');
const stopBtn = document.getElementById('stop-btn');

// 2. Initialize the Web Speech API components.
// `speechSynthesis` is the main entry point for the browser's speech service.
// `SpeechSynthesisUtterance` represents a speech request – the text to speak
// and its associated parameters (voice, rate, pitch, etc.).
const speechSynthesis = window.speechSynthesis;
const utterance = new SpeechSynthesisUtterance();

let voices = []; // This array will store all available voices.

// 3. Function to populate the voice dropdown.
// Browsers have different voices available. This function fetches them
// and adds them as options to our HTML <select> element.
function populateVoiceList() {
    // `speechSynthesis.getVoices()` returns an array of SpeechSynthesisVoice objects.
    voices = speechSynthesis.getVoices();

    // Clear any existing options to prevent duplicates if called multiple times.
    voiceSelect.innerHTML = '';

    // Loop through each voice and create an <option> element for it.
    voices.forEach(voice => {
        const option = document.createElement('option');
        option.textContent = `${voice.name} (${voice.lang})`; // Display voice name and language.
        option.value = voice.name; // Use the voice name as its value.
        voiceSelect.appendChild(option);
    });

    // Set the initial voice for our utterance.
    // We try to find a default English voice, or just use the first available one.
    const defaultVoice = voices.find(voice => voice.lang === 'en-US') || voices[0];
    if (defaultVoice) {
        utterance.voice = defaultVoice;
        voiceSelect.value = defaultVoice.name; // Set the dropdown to show the default.
    }
}

// 4. Event listener for when voices are loaded.
// Browsers load voices asynchronously. We need to wait for the 'voiceschanged' event
// to ensure `getVoices()` returns the full list.
speechSynthesis.onvoiceschanged = populateVoiceList;

// If voices are already loaded when the script runs (e.g., page reloaded),
// we can try to populate them immediately.
if (speechSynthesis.getVoices().length) {
    populateVoiceList();
}

// 5. Update slider display values.
// These functions ensure the <span> elements next to the sliders
// always show the current rate and pitch settings.
function updateRateValue() {
    rateValueSpan.textContent = rateSlider.value;
}

function updatePitchValue() {
    pitchValueSpan.textContent = pitchSlider.value;
}

// Set initial display values for sliders.
updateRateValue();
updatePitchValue();

// 6. Event listeners for user input and controls.

// When the 'Speak' button is clicked:
speakBtn.addEventListener('click', () => {
    // Ensure there's text to speak.
    if (textArea.value.trim() === '') {
        alert('Please enter some text to speak!');
        return;
    }

    // Stop any currently speaking speech before starting a new one.
    // This prevents overlapping speech.
    speechSynthesis.cancel();

    // Set the text that the API should vocalize.
    utterance.text = textArea.value;

    // Set the rate (speed) of speech based on the slider value.
    // `rate` typically ranges from 0.1 (slowest) to 10 (fastest), with 1 being normal.
    utterance.rate = parseFloat(rateSlider.value);

    // Set the pitch (tone) of speech based on the slider value.
    // `pitch` typically ranges from 0 (lowest) to 2 (highest), with 1 being normal.
    utterance.pitch = parseFloat(pitchSlider.value);

    // Tell the browser's speech synthesis service to start speaking the utterance.
    speechSynthesis.speak(utterance);
});

// When the 'Stop' button is clicked:
stopBtn.addEventListener('click', () => {
    // `speechSynthesis.cancel()` immediately stops all ongoing speech.
    speechSynthesis.cancel();
});

// When the voice dropdown selection changes:
voiceSelect.addEventListener('change', () => {
    // Find the selected voice object from our `voices` array.
    // We match by the `value` (voice name) of the selected option.
    const selectedVoice = voices.find(voice => voice.name === voiceSelect.value);

    // If a voice is found, assign it to our utterance.
    if (selectedVoice) {
        utterance.voice = selectedVoice;
    }
});

// When the rate slider is moved:
rateSlider.addEventListener('input', () => {
    // Update the displayed rate value next to the slider.
    updateRateValue();
    // (Optional) You could also update `utterance.rate` here, but setting it
    // when `speakBtn` is clicked is often sufficient to avoid constant updates.
    // utterance.rate = parseFloat(rateSlider.value);
});

// When the pitch slider is moved:
pitchSlider.addEventListener('input', () => {
    // Update the displayed pitch value next to the slider.
    updatePitchValue();
    // (Optional) Similar to rate, updating on speak click is often fine.
    // utterance.pitch = parseFloat(pitchSlider.value);
});

// --- Example Usage (How to make this code run) ---
// 1. Save the above JavaScript code into a file named, for example, `script.js`.
// 2. Create an HTML file (e.g., `index.html`) in the same directory.
// 3. Copy and paste the HTML structure below into your `index.html` file.
//    (This HTML provides the elements with the IDs that the JavaScript expects).
// 4. Open `index.html` in a modern web browser (like Chrome, Firefox, Edge).
//    Type some text into the textarea, select a voice, adjust parameters, and click 'Speak'!

/*
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Web Speech API Reader</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 20px; background-color: #f4f4f4; color: #333; }
        h1 { color: #0056b3; }
        textarea { width: 90%; max-width: 600px; height: 120px; margin-bottom: 15px; padding: 12px; border: 1px solid #ccc; border-radius: 8px; font-size: 16px; box-shadow: inset 0 1px 3px rgba(0,0,0,0.1); resize: vertical; }
        div { margin-bottom: 15px; display: flex; align-items: center; }
        label { display: inline-block; width: 100px; font-weight: bold; margin-right: 10px; }
        select, input[type="range"] { flex-grow: 1; padding: 8px; border: 1px solid #ccc; border-radius: 5px; }
        input[type="range"] { -webkit-appearance: none; height: 8px; background: #ddd; outline: none; opacity: 0.7; transition: opacity .2s; }
        input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 20px; height: 20px; border-radius: 50%; background: #007bff; cursor: pointer; }
        span { min-width: 40px; text-align: right; margin-left: 10px; font-weight: bold; color: #0056b3; }
        button { padding: 10px 20px; margin-right: 10px; cursor: pointer; border: none; border-radius: 5px; font-size: 16px; transition: background-color 0.3s ease; }
        button#speak-btn { background-color: #28a745; color: white; }
        button#speak-btn:hover { background-color: #218838; }
        button#stop-btn { background-color: #dc3545; color: white; }
        button#stop-btn:hover { background-color: #c82333; }
    </style>
</head>
<body>
    <h1>Browser Text-to-Speech Reader</h1>

    <textarea id="text-to-speak" placeholder="Enter text here to vocalize..." autofocus>Hello there! This is an example of text-to-speech using the Web Speech API. You can change the voice, speed, and pitch.</textarea>

    <div>
        <label for="voice-select">Voice:</label>
        <select id="voice-select"></select>
    </div>

    <div>
        <label for="rate-slider">Rate:</label>
        <input type="range" id="rate-slider" min="0.1" max="10" value="1" step="0.1">
        <span id="rate-value">1.0</span>
    </div>

    <div>
        <label for="pitch-slider">Pitch:</label>
        <input type="range" id="pitch-slider" min="0" max="2" value="1" step="0.1">
        <span id="pitch-value">1.0</span>
    </div>

    <div>
        <button id="speak-btn">Speak</button>
        <button id="stop-btn">Stop</button>
    </div>

    <script src="script.js"></script>
</body>
</html>
*/