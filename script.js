// script.js

let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const timeDisplay = document.getElementById('time');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

const formatTime = (time) => {
  const date = new Date(time);
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
  return `${minutes}:${seconds}:${milliseconds}`;
};

const updateTime = () => {
  elapsedTime = Date.now() - startTime;
  timeDisplay.textContent = formatTime(elapsedTime);
};

const start = () => {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 10);
    isRunning = true;
  }
};

const stop = () => {
  if (isRunning) {
    clearInterval(timerInterval);
    isRunning = false;
  }
};

const reset = () => {
  stop();
  elapsedTime = 0;
  timeDisplay.textContent = '00:00:00';
  lapsList.innerHTML = '';
};

const lap = () => {
  if (isRunning) {
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = lapTime;
    lapsList.appendChild(lapItem);
  }
};

startButton.addEventListener('click', start);
stopButton.addEventListener('click', stop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);
