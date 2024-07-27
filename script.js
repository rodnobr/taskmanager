// Selecao de elementos
const taskName = document.getElementById("taskName");
const taskPriority = document.getElementById("taskPriority");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const showAllBtn = document.getElementById("showAllBtn");
const showHighBtn = document.getElementById("showHighBtn");
const showMediumBtn = document.getElementById("showMediumBtn");
const showLowBtn = document.getElementById("showLowBtn");

// Event Listeners
addTaskBtn.addEventListener("click", addTask);
taskList.addEventListener("click", handleTaskClick);
showAllBtn.addEventListener("click", () => filterTasks("all"));
showHighBtn.addEventListener("click", () => filterTasks("alta"));
showMediumBtn.addEventListener("click", () => filterTasks("média"));
showLowBtn.addEventListener("click", () => filterTasks("baixa"));

// Adicionar uma tarefa
function addTask() {
  // Coletar infos da interface
  const name = taskName.value;
  const priority = taskPriority.value;
  // Objeto auxiliar para estilizar a bagde de prioridade
  const badges = {
    alta: "danger",
    média: "warning",
    baixa: "info",
  };
  // Adicionar Task à lista
  if (name) {
    const li = document.createElement("li");
    li.className = `list-group-item d-flex align-items-center ${priority} p-2 p-md-3 `;
    li.innerHTML = `
          <input type="checkbox" class="mr-3">
          <span>${name}</span>
          <span class="badge badge-${badges[priority]} ml-auto py-md-1 px-md-3 text-uppercase">${priority}</span>
          <button class="btn btn-danger btn-sm ml-2">Apagar</button>
      `;
    taskList.appendChild(li);
    // Resetar inputs
    taskName.value = "";
    taskPriority.value = "alta";
  }
}

function handleTaskClick(e) {
  // Remover a task da lista
  if (e.target.tagName === "BUTTON") {
    e.target.closest("li").remove(); // Uso de Event Delegation para encontrar a li a ser removida
  }
  // Detachar o texto da task ao clicar no input
  if (e.target.tagName === "INPUT") {
    const taskText = e.target.nextElementSibling; // Selecionar o Span com texto da Task
    taskText.style.textDecoration = e.target.checked ? "line-through" : "none";
  }
}

// Filtrar as tasks
function filterTasks(filter) {
  const tasks = taskList.querySelectorAll("li");
  for (let task of tasks) {
    // Verificacao se a task se inclui na categoria filtrada
    const isFiltered = filter === "all" || task.classList.contains(filter);
    task.classList.remove("d-flex"); // Tive que incluir essa linha pois no Bootstrap a classe d-flex possui !important e por isso o filtro nao estava funcionando
    task.style.display = isFiltered ? "flex" : "none";
  }
}
