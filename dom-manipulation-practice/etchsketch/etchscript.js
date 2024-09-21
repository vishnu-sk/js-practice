const cont = document.querySelector(".grid-container");
for(let i=0; i< 16; i++){
    let elem = document.createElement("div");
    cont.appendChild(elem);
}
document.getElementsByClassName("grid-container")[0].style.display = "flex";