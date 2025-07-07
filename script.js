let timerDisplay = document.getElementById('timer');
let startBtn = document.getElementById('start');
let pauseBtn = document.getElementById('pause');
let resetBtn = document.getElementById('reset');
let statusText = document.getElementById('status');

let totalSeconds = 25 * 60;
let interval = null;
let isWork = true;

function updateDisplay() {
  let mins = Math.floor(totalSeconds / 60);
  let secs = totalSeconds % 60;
  timerDisplay.textContent = \`\${String(mins).padStart(2, '0')}:\${String(secs).padStart(2, '0')}\`;
}

function startTimer() {
  if (interval) return;

  interval = setInterval(() => {
    if (totalSeconds > 0) {
      totalSeconds--;
      updateDisplay();
    } else {
      clearInterval(interval);
      interval = null;
      isWork = !isWork;
      totalSeconds = isWork ? 25 * 60 : 5 * 60;
      statusText.textContent = \`Status: \${isWork ? '⏳ Fokus' : '☕ Istirahat'}\`;
      updateDisplay();
      startTimer(); // auto start next session
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(interval);
  interval = null;
}

function resetTimer() {
  clearInterval(interval);
  interval = null;
  isWork = true;
  totalSeconds = 25 * 60;
  updateDisplay();
  statusText.textContent = 'Status: ⏳ Fokus';
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

updateDisplay(); // initial load
