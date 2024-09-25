const cont = document.querySelector(".grid-container");

//adding button above container
const elem = document.createElement("button");
let rowSize = 4;
elem.innerText = "Custom grid Layout";
const body = document.querySelector("body");
body.insertBefore(elem, cont);
console.log(elem);
elem.addEventListener("click", () => {
  promptEnter(cont);
});

MaxGridElem = rowSize * rowSize;
addNNoOfChildren(cont, rowSize * rowSize);

//adding style to child divs and cont divs
setGridStyle();
cont.style.display = "flex";
cont.style.flexWrap = "wrap";
CreateEventListeners();

//setGridStyle();

function setGridStyle() {
  let divelem = document.getElementsByClassName("div-block");
  const styleDiv = {
    height: String(100 / rowSize) + "%",
    width: String(100 / rowSize) + "%",
  };
  console.log(styleDiv);
  [...divelem].forEach(
    function (element) {
      Object.assign(element.style, styleDiv);
    } 
  );
}

function CreateEventListeners() {
  let divelem = document.querySelectorAll(".div-block");
  cont.addEventListener("mouseover", (e) => {
    if (e.target.className == "grid-container"){}
    else {
      e.target.style.backgroundColor = colorGenerator();
    }
  });
}

//assigning style to all elements. Adding eventListeners also.
// for (let el of divelem) {
//   Object.assign(el.style, styleDiv);
//   el.addEventListener("mouseenter", () => {
//     el.style.backgroundColor = "blue";
//   });
// }

function deleteChildren(elem) {
  elem.textContent = "";
  while (elem.firstChild) {
    elem.removeChild(elem.lastChild);
  }
}
function addNNoOfChildren(elem, numberOfDivs) {
  for (let i = 0; i < numberOfDivs; i++) {
    let newElem = document.createElement("div");
    elem.appendChild(newElem);
    newElem.setAttribute("class", "div-block");
  }
}
function promptEnter(elem) {
  gridSize = prompt("enter the number of rows for grid: ");
  if (gridSize >= 4 && gridSize <= 100) {
    //nothing to do
  } else if (gridSize > 100) {
    gridSize = 120;
  } else {
    gridSize = 4;
  }
  rowSize = gridSize;
  deleteChildren(elem);
  addNNoOfChildren(elem, rowSize * rowSize);
  setGridStyle();
  CreateEventListeners();
}

function colorGenerator(){
    let r = Math.floor(Math.random()*255);
    let g = Math.floor(Math.random()*255);
    let b = Math.floor(Math.random()*255);
    return "rgb("+r+","+g+","+b+")";
}
