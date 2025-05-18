// Redirect if not logged in
function checkLogin() {
  if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
  }
  loadEntries();
}

// Logout function
function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "login.html";
}

// Add Workout
function addWorkout() {
  const name = document.getElementById("workoutName").value;
  const calories = document.getElementById("caloriesBurned").value;

  if (name && calories) {
    const workout = {
      id: Date.now(),
      type: "Workout",
      name,
      calories: parseInt(calories)
    };
    saveEntry(workout);
    clearFields("workoutName", "caloriesBurned");
  }
}

// Add Meal
function addMeal() {
  const name = document.getElementById("mealName").value;
  const calories = document.getElementById("caloriesGained").value;

  if (name && calories) {
    const meal = {
      id: Date.now(),
      type: "Meal",
      name,
      calories: parseInt(calories)
    };
    saveEntry(meal);
    clearFields("mealName", "caloriesGained");
  }
}

// Save entry to localStorage
function saveEntry(entry) {
  let entries = JSON.parse(localStorage.getItem("entries")) || [];
  entries.push(entry);
  localStorage.setItem("entries", JSON.stringify(entries));
  loadEntries();
}

// Load and show entries
function loadEntries() {
  const container = document.getElementById("entries");
  container.innerHTML = "";

  const entries = JSON.parse(localStorage.getItem("entries")) || [];
  entries.forEach((item) => {
    const div = document.createElement("div");
    div.className = "entry";
    div.innerHTML = `
      <strong>${item.type}</strong>: ${item.name} - ${item.calories} cal
      <button onclick="deleteEntry(${item.id})">Delete</button>
    `;
    container.appendChild(div);
  });
}

// Delete entry
function deleteEntry(id) {
  let entries = JSON.parse(localStorage.getItem("entries")) || [];
  entries = entries.filter(item => item.id !== id);
  localStorage.setItem("entries", JSON.stringify(entries));
  loadEntries();
}

// Clear input fields
function clearFields(...ids) {
  ids.forEach(id => document.getElementById(id).value = "");
}

// Set daily reminder
function setReminder() {
  const time = document.getElementById("reminderTime").value;
  if (time) {
    localStorage.setItem("reminderTime", time);
    alert("Reminder set for " + time);
  }
}

// Reminder check every minute
setInterval(() => {
  const reminderTime = localStorage.getItem("reminderTime");
  if (reminderTime) {
    const now = new Date();
    const current = now.getHours().toString().padStart(2, '0') + ":" +
                    now.getMinutes().toString().padStart(2, '0');
    if (current === reminderTime) {
      alert("Time for your fitness activity!");
    }
  }
}, 60000);