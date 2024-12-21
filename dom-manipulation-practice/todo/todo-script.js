const addBtn = document.querySelector(".add-btn");
const addTaskTextInput = document.querySelector("#new-task");
const closeBtns = document.querySelectorAll(".delete-x");
let n = 5;

addTaskTextInput.addEventListener("click", setDefaultButtonVals);
addTaskTextInput.addEventListener("keyup", setButtonOnKeyPress);
addBtn.addEventListener("click", addTaskToList);
closeBtns.forEach((item)=> item.addEventListener("click", removeTask));

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

function removeTask(e){
    const parentNode = e.target.parentNode;
    parentNode.remove();
}

