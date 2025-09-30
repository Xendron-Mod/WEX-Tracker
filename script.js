const habitForm = document.getElementById("habit-form");
const habitInput = document.getElementById("habit-input");
const habitList = document.getElementById("habit-list");
const clearCompletedButton = document.getElementById("clear-completed");
const clearAllButton = document.getElementById("clear-all");
const clock = document.getElementById("clock");

// Load saved habits from localStorage
let habits = JSON.parse(localStorage.getItem("habits")) || [];

// Save habits to localStorage
function saveHabits() {
  localStorage.setItem("habits", JSON.stringify(habits));
}

// Render habits on the screen
function renderHabits() {
  habitList.innerHTML = "";
  habits.forEach((habit, index) => {
    const li = document.createElement("li");
    li.className = "habit-item";
    li.innerHTML = `
      <span>${habit.name}</span>
      <input type="checkbox" ${habit.done ? "checked" : ""} onchange="toggleHabit(${index})">
      <button onclick="deleteHabit(${index})">❌</button>
    `;
    habitList.appendChild(li);
  });
}

// Add new habit
habitForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newHabit = { name: habitInput.value, done: false };
  habits.push(newHabit);
  saveHabits();
  renderHabits();
  habitInput.value = "";
});

// Toggle habit done/undone
window.toggleHabit = function(index) {
  habits[index].done = !habits[index].done;
  saveHabits();
  renderHabits();
};

// Delete single habit
window.deleteHabit = function(index) {
  habits.splice(index, 1);
  saveHabits();
  renderHabits();
};

// Clear only completed habits
clearCompletedButton.addEventListener("click", () => {
  habits = habits.filter(habit => !habit.done);
  saveHabits();
  renderHabits();
});

// Clear ALL habits
clearAllButton.addEventListener("click", () => {
  habits = [];
  saveHabits();
  renderHabits();
});

// Real-time clock
function updateClock() {
  const now = new Date();
  let hours = now.getHours().toString().padStart(2, "0");
  let minutes = now.getMinutes().toString().padStart(2, "0");
  let seconds = now.getSeconds().toString().padStart(2, "0");
  clock.textContent = `${hours}:${minutes}:${seconds}`;
}
setInterval(updateClock, 1000);
updateClock();

// Initial render
renderHabits();
