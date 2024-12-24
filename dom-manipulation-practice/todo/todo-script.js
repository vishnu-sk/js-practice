const addBtn = document.querySelector(".add-btn");
const addTaskTextInput = document.querySelector("#new-task");
const closeBtns = document.querySelectorAll(".delete-x");
const newMenuBtn = document.querySelector(".new");
const toggleBarForDrag = document.querySelector("#drag-toggle");
let n = 5;
const listGroup = document.querySelector(".list-group");
const lists = document.querySelector(".list");

console.log(toggleBarForDrag.checked);

addTaskTextInput.addEventListener("click", setDefaultButtonVals);

addTaskTextInput.addEventListener("keyup", setButtonOnKeyPress);

addBtn.addEventListener("click", addTaskToList);

closeBtns.forEach(item => item.addEventListener("click", removeTask));

newMenuBtn.addEventListener("click",toggleShowforDropdown);

toggleBarForDrag.addEventListener("click", toggleButtonAction);

listGroup.addEventListener("dragstart", e => dragStartEnd(e, true));

listGroup.addEventListener("dragend", e => dragStartEnd(e, false));

listGroup.addEventListener("dragover", setElementPositionDuringDrag);


function addTaskToList() {
  document
    .querySelector(".list-group")
    .appendChild(createTask(addTaskTextInput.value));
}

function setDefaultButtonVals(e) {
  addTaskTextInput.value = "";
  addBtn.disabled = true;
}

function setButtonOnKeyPress(e) {
  if (e.target.value != "") {
    addBtn.disabled = false;
    if (e.key == "Enter") {
      addTaskToList();
      setDefaultButtonVals(e);
    }
  } else if (e.key == "Enter") {
    console.log("Hello EveryNyah;");
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

function getBelowElement(container, y) {
  let draggableElems = [...container.querySelectorAll(".list:not(.dragging)")];
  return draggableElems.reduce(
    (closest, child) => {
      // console.log(child);
      const rect = child.getBoundingClientRect();
      const offset = y - rect.top - rect.height / 2;
      if (offset < 0 && offset > closest.offset) {
        // console.log("CHILD" + child.innerText);
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY, element: null }
  ).element;
}

function setElementPositionDuringDrag(e) {
  if (e.target.classList.contains("list")) {
    const justBelowElement = getBelowElement(listGroup, e.clientY);
    const dragged = document.querySelector(".dragging");
    if (justBelowElement) {
      listGroup.insertBefore(dragged, justBelowElement);
    } else {
      listGroup.appendChild(dragged);
    }
  }
}

function toggleButtonAction() {
  if (toggleBarForDrag.checked) {
    document.querySelectorAll(".delete-x").forEach(item => {
      item.innerText = "=";
      item.removeEventListener("click", removeTask);
      item.parentNode.draggable = true;
    });
    addTaskTextInput.disabled = true;
    setDefaultButtonVals();
  } else {
    document.querySelectorAll(".delete-x").forEach(item => {
      item.innerText = "\u2715";
      item.addEventListener("click", removeTask);
      item.parentNode.draggable = false;
    });
    addTaskTextInput.disabled = false;
  }
}

function dragStartEnd(e, dragstart) {
  if (e.target.classList.contains("list")) {
    if (dragstart) {
      e.target.style.opacity = "0.5";
      e.target.classList.add("dragging");
    } else {
      e.target.style.opacity = "1";
      e.target.classList.remove("dragging");
    }
  }
}

function toggleShowforDropdown() {
  document.querySelector(".dropdown-list").classList.toggle("show");
}
