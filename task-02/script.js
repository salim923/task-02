let startTime = 0;
let elapsedTime = 0;
let intervalId;
let isRunning = false;

const timeDisplay = document.getElementById("timeDisplay");
const startStopBtn = document.getElementById("startStopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapsList = document.getElementById("lapsList");

function formatTime(ms) {
    const milliseconds = Math.floor(ms % 1000).toString().padStart(3, '0');
    const seconds = Math.floor((ms / 1000) % 60).toString().padStart(2, '0');
    const minutes = Math.floor((ms / (1000 * 60)) % 60).toString().padStart(2, '0');
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function updateDisplay() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    timeDisplay.textContent = formatTime(elapsedTime);
}

function startStop() {
    if (isRunning) {
        clearInterval(intervalId);
        elapsedTime += Date.now() - startTime;
        startStopBtn.textContent = "Start";
        startStopBtn.style.backgroundColor = "#00bcd4";
    } else {
        startTime = Date.now();
        intervalId = setInterval(updateDisplay, 10);
        startStopBtn.textContent = "Pause";
        startStopBtn.style.backgroundColor = "#ffa726";
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(intervalId);
    elapsedTime = 0;
    timeDisplay.textContent = "00:00:00.000";
    startStopBtn.textContent = "Start";
    startStopBtn.style.backgroundColor = "#00bcd4";
    lapsList.innerHTML = "";
    isRunning = false;
}

function recordLap() {
    if (isRunning) {
        const lapTime = formatTime(elapsedTime);
        const lapItem = document.createElement("li");
        lapItem.innerHTML = `<span>Lap ${lapsList.children.length + 1}</span> ${lapTime}`;
        lapsList.appendChild(lapItem);
    }
}

startStopBtn.addEventListener("click", startStop);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", recordLap);
