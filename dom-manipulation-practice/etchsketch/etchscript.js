const cont = document.querySelector(".grid-container");
for (let i = 0; i < 16; i++) {
  let elem = document.createElement("div");
  cont.appendChild(elem);
  elem.setAttribute("class", "div-block");
}
divelem = document.getElementsByClassName("div-block");
cont.style.display = "flex";
cont.style.flexWrap = "wrap";

const styleDiv = {
  height: "25%",
  width: "25%",
};
for (let el of divelem) {
  Object.assign(el.style, styleDiv);
  el.addEventListener("mouseenter",()=>{
    el.style.backgroundColor = "blue";
  });
}

//adding button above container
const elem = document.createElement("button");
elem.innerText = "New";
const body = document.querySelector("body");
body.insertBefore(elem, cont);
