const AddButton = document.querySelector("button");
const inputElement = document.getElementById("item");
const unListItems = document.querySelector("ul");
AddButton.addEventListener("click", () => {
  addElementToEndOfList(inputElement);
});
unListItems.addEventListener("click",(e)=>{deleteChildElements(e)})

function addElementToEndOfList(inputElem) {
  const liElement = document.createElement("li");
  createLiChildElements(liElement, inputElem);
  unListItems.appendChild(liElement);
  inputElem.value = '';
  inputElem.focus();
    
}
function createLiChildElements(parentNode, inputElem) {
  const spanElem = document.createElement("span");
  spanElem.appendChild(document.createTextNode(inputElem.value));
  const btnElem = document.createElement("button");
  btnElem.appendChild(document.createTextNode("Delete"));
  parentNode.appendChild(spanElem);
  parentNode.appendChild(btnElem);
}
function deleteChildElements(e){
    // gets event of the element which was clicked and if see if its nodename
    //is button or not and then removes it from it parentnode
    if(e.target && e.target.nodeName == "BUTTON"){
    e.target.parentNode.remove();
    }
}
