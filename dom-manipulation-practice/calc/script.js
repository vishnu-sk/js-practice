const buttons = document.getElementsByClassName("button-cont")[0];
buttons.addEventListener("click", (e) => {
  execute1(e);
});

function execute1(e) {
  if (e.target.id != "") {
    console.log(e.target.id);
    updateUI(e.target.id);
  }
}

function mathParser(val){
    
}

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  if (num2 != 0) {
    return num1 / num2;
  }
}

function updateUI(val) {
  document.getElementById("disp1").innerText = val;
}
