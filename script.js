const habitForm = document.getElementById("habit-form");
const habitInput = document.getElementById("habit-input");
const habitList = document.getElementById("habit-list");
const clearCompletedButton = document.getElementById("clear-completed");
const clearAllButton = document.getElementById("clear-all");
const clock = document.getElementById("clock");
let habits = JSON.parse(localStorage.getItem("habits")) || [];
function saveHabits() {
  localStorage.setItem("habits", JSON.stringify(habits));
}
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
habitForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newHabit = { name: habitInput.value, done: false };
  habits.push(newHabit);
  saveHabits();
  renderHabits();
  habitInput.value = "";
});
window.toggleHabit = function(index) {
  habits[index].done = !habits[index].done;
  saveHabits();
  renderHabits();
};
window.deleteHabit = function(index) {
  habits.splice(index, 1);
  saveHabits();
  renderHabits();
};
clearCompletedButton.addEventListener("click", () => {
  habits = habits.filter(habit => !habit.done);
  saveHabits();
  renderHabits();
});
clearAllButton.addEventListener("click", () => {
  habits = [];
  saveHabits();
  renderHabits();
});
function updateClock() {
  const now = new Date();
  let hours = now.getHours().toString().padStart(2, "0");
  let minutes = now.getMinutes().toString().padStart(2, "0");
  let seconds = now.getSeconds().toString().padStart(2, "0");
  clock.textContent = `${hours}:${minutes}:${seconds}`;
}
setInterval(updateClock, 1000);
updateClock();
renderHabits();
