let startTime;
let elapsedTime = 0;
let intervalId;
let laps = [];

const displayElement = document.getElementById('display');
const lapsElement = document.getElementById('laps');

function updateDisplay() {
  const ms = elapsedTime % 1000;
  const s = Math.floor(elapsedTime / 1000) % 60;
  const m = Math.floor(elapsedTime / (1000 * 60)) % 60;
  displayElement.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
}

function startStopwatch() {
  startTime = Date.now() - elapsedTime;
  intervalId = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
  }, 1);
}

function pauseStopwatch() {
  clearInterval(intervalId);
}

function resetStopwatch() {
  clearInterval(intervalId);
  elapsedTime = 0;
  laps = [];
  lapsElement.innerHTML = '';
  updateDisplay();
}

function recordLap() {
  const lapTime = elapsedTime;
  laps.push(lapTime);
  const lapItem = document.createElement('li');
  lapItem.textContent = `Lap ${laps.length}: ${formatTime(lapTime)}`;
  lapsElement.appendChild(lapItem);
}

function formatTime(time) {
  const ms = time % 1000;
  const s = Math.floor(time / 1000) % 60;
  const m = Math.floor(time / (1000 * 60)) % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
}

document.getElementById('start').addEventListener('click', startStopwatch);
document.getElementById('pause').addEventListener('click', pauseStopwatch);
document.getElementById('reset').addEventListener('click', resetStopwatch);
document.getElementById('lap').addEventListener('click', recordLap);