const addBtn = document.querySelector(".add-btn");
const addTaskTextInput = document.querySelector("#new-task");
const closeBtns = document.querySelectorAll(".delete-x");
const newMenuBtn = document.querySelector(".new");
const toggleBarForDrag = document.querySelector("#drag-toggle");
let n = 5;

addTaskTextInput.addEventListener("click", setDefaultButtonVals);
addTaskTextInput.addEventListener("keyup", setButtonOnKeyPress);
addBtn.addEventListener("click", addTaskToList);
closeBtns.forEach(item => item.addEventListener("click", removeTask));

function addTaskToList() {
  document
    .querySelector(".list-group")
    .appendChild(createTask(addTaskTextInput.value));
}

function setDefaultButtonVals(e) {
  e.target.value = "";
  addBtn.disabled = true;
}

function setButtonOnKeyPress(e) {
  if (e.target.value != "") {
    console.log(e.target.value);
    addBtn.disabled = false;
  }
}

function createTask(taskMessage) {
  const liElement = document.createElement("li");
  const newTextElem = document.createTextNode(taskMessage);
  const closeElement = document.createTextNode("\u2715");
  const newSpan1 = document.createElement("span");
  const newSpan2 = document.createElement("span");
  const input1 = document.createElement("input");
  input1.type = "checkbox";
  input1.classList.add("list-item");
  input1.id = n;
  const label1 = document.createElement("label");
  label1.setAttribute("for", n++);
  label1.appendChild(newTextElem);
  newSpan1.appendChild(input1);
  newSpan1.appendChild(label1);
  newSpan2.classList.add("delete-x");
  newSpan2.appendChild(closeElement);
  liElement.classList.add("list");
  liElement.appendChild(newSpan1);
  liElement.appendChild(newSpan2);
  newSpan2.addEventListener("click", removeTask);
  return liElement;
}

function removeTask(e) {
  const parentNode = e.target.parentNode;
  parentNode.remove();
}

newMenuBtn.addEventListener("click", e => {
  console.log(e.target);
  document.querySelector(".dropdown-list").classList.toggle("show");
});

toggleBarForDrag.addEventListener("click", e => {
  if (toggleBarForDrag.checked) {
    document.querySelectorAll(".delete-x").forEach(item => {
      item.innerText = "=";
      item.removeEventListener("click", removeTask);
      item.parentNode.draggable = true;
    });
  } else {
    document.querySelectorAll(".delete-x").forEach(item => {
      item.innerText = "\u2715";
      item.addEventListener("click", removeTask);
      item.parentNode.draggable = false;
    });
  }
});

const listGroup = document.querySelector(".list-group");
// function dragElements(){
const lists = document.querySelector(".list");
listGroup.addEventListener("dragstart", e => {
  if (e.target.classList.contains("list")) {
    e.target.style.opacity = "0.5";
    e.target.classList.add("dragging");
  }
});

listGroup.addEventListener("dragend", e => {
  if (e.target.classList.contains("list")) {
    e.target.style.opacity = "1";
    e.target.classList.remove("dragging");
  }
});

const y = [];

listGroup.addEventListener("dragover", e => {
  if (e.target.classList.contains("list")) {
    const justBelowElement = getBelowElement(listGroup, e.clientY);
    const dragged = document.querySelector(".dragging");
    if (justBelowElement) {
      listGroup.insertBefore(dragged, justBelowElement);
    } else {
      listGroup.appendChild(dragged);
    }
  }
});

function getBelowElement(container, y) {
  let draggableElems = [...container.querySelectorAll(".list:not(.dragging)")];
  return draggableElems.reduce(
    (closest, child) => {
      console.log(child);
      const rect = child.getBoundingClientRect();
      const offset = y - rect.top - rect.height / 2;
      if (offset < 0 && offset > closest.offset) {
        console.log("CHILD" + child.innerText);
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY, element: null }
  ).element;
}
// }
