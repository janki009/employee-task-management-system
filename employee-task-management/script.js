const employees = JSON.parse(localStorage.getItem("employees")) || [
  { id: 1, name: "Aarav Sharma", email: "aarav@example.com", department: "IT" },
  { id: 2, name: "Priya Singh", email: "priya@example.com", department: "HR" }
];

let tasks = JSON.parse(localStorage.getItem("tasks")) || [
  { id: 1, title: "Website Testing", description: "Test login page", employeeId: 1, priority: "High", status: "Pending" },
  { id: 2, title: "Update Documentation", description: "Update project document", employeeId: 2, priority: "Medium", status: "Completed" }
];

function saveData() {
  localStorage.setItem("employees", JSON.stringify(employees));
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderEmployees() {
  const select = document.getElementById("taskEmployee");
  select.innerHTML = employees.map(e =>
    `<option value="${e.id}">${e.name} - ${e.department}</option>`
  ).join("");
}

function updateStats() {
  document.getElementById("totalTasks").textContent = tasks.length;
  document.getElementById("pendingTasks").textContent = tasks.filter(t => t.status === "Pending").length;
  document.getElementById("progressTasks").textContent = tasks.filter(t => t.status === "In Progress").length;
  document.getElementById("completedTasks").textContent = tasks.filter(t => t.status === "Completed").length;
}

function renderTasks() {
  const list = document.getElementById("taskList");
  const search = document.getElementById("searchInput").value.toLowerCase();
  const filter = document.getElementById("filterStatus").value;

  const filtered = tasks.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(search) || t.description.toLowerCase().includes(search);
    const matchesFilter = filter === "All" || t.status === filter;
    return matchesSearch && matchesFilter;
  });

  if (filtered.length === 0) {
    list.innerHTML = "<p>No tasks found.</p>";
    return;
  }

  list.innerHTML = filtered.map(task => {
    const employee = employees.find(e => e.id === task.employeeId);
    return `
      <div class="task">
        <div class="task-top">
          <div>
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <small>Assigned to: ${employee ? employee.name : "Unknown"}</small>
          </div>
          <span class="badge">${task.priority}</span>
        </div>
        <p><strong>Status:</strong> ${task.status}</p>
        <button class="status" onclick="changeStatus(${task.id})">Change Status</button>
        <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
      </div>`;
  }).join("");
}

document.getElementById("employeeForm").addEventListener("submit", function(e) {
  e.preventDefault();
  employees.push({
    id: Date.now(),
    name: document.getElementById("employeeName").value,
    email: document.getElementById("employeeEmail").value,
    department: document.getElementById("employeeDepartment").value
  });
  saveData();
  renderEmployees();
  this.reset();
  alert("Employee added successfully!");
});

document.getElementById("taskForm").addEventListener("submit", function(e) {
  e.preventDefault();
  tasks.push({
    id: Date.now(),
    title: document.getElementById("taskTitle").value,
    description: document.getElementById("taskDescription").value,
    employeeId: Number(document.getElementById("taskEmployee").value),
    priority: document.getElementById("taskPriority").value,
    status: document.getElementById("taskStatus").value
  });
  saveData();
  updateStats();
  renderTasks();
  this.reset();
  alert("Task created successfully!");
});

function changeStatus(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;
  if (task.status === "Pending") task.status = "In Progress";
  else if (task.status === "In Progress") task.status = "Completed";
  else task.status = "Pending";
  saveData();
  updateStats();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveData();
  updateStats();
  renderTasks();
}

document.getElementById("searchInput").addEventListener("input", renderTasks);
document.getElementById("filterStatus").addEventListener("change", renderTasks);

renderEmployees();
updateStats();
renderTasks();
