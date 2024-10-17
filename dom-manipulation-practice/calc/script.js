const buttons = document.getElementsByClassName("button-cont")[0];
buttons.addEventListener("click", (e) => {
  execute1(e);
});

var arr = [];
var text = { text: "" };
var calcVars = { first: "", second: "", operator: "" };

function execute1(e) {
  if (e.target.id != "") {
    console.log(e.target.id);
    //updateUI(e.target.id);
    mathParser(e.target.id);
  }
}

function operatorPressed(key) {
  var arr = ["add", "subtract", "divide", "multiply", "equal"];
  return arr.includes(key);
}

function numberGenerator(key, number) {
  return number + key;
}

function setNumbers(key, calcVariables, firstSecond) {
  if (firstSecond === "first") {
    calcVariables.first = numberGenerator(key, calcVariables.first);
  } else if (firstSecond === "second") {
    calcVariables.second = numberGenerator(key, calcVariables.second);
  }
}

function UIText(key, text) {
  if (operatorPressed(key)) {
    switch (key) {
      case "add":
        key = "+";
        break;
      case "subtract":
        key = "-";
        break;
      case "multiply":
        key = "x";
        break;
      case "divide":
        key = "/";
        break;
      default:
    }
  }
  //console.log(text.text + " , " + key);
  text.text += key;
  return text.text;
}

function mathParser(val) {
  if (calcVars.operator === "") {
    if (!operatorPressed(val)) {
      setNumbers(val, calcVars, "first");
      updateUI(calcVars.first);
    } else {
      calcVars.operator = val;
    }
  } else {
    if (!operatorPressed(val)) {
      setNumbers(val, calcVars, "second");
      updateUI(calcVars.second);
    } else {
      console.log(
        calcVars.first + " " + calcVars.second + " " + performOperation(val)
      );
      calcVars.first = performOperation(val);
      calcVars.second = "";
      calcVars.operator = "";
      updateUI(calcVars.first);
    }
  }

  //updateUI(UIText(val, text));
}

function performOperation(key) {
  switch (key) {
    case "add":
      console.log(calcVars.first + " " + calcVars.second);
      return add(calcVars.first, calcVars.second);
    case "subtract":
      return subtract(calcVars.first, calcVars.second);
    case "multiply":
      return multiply(calcVars.first, calcVars.second);
    case "divide":
      return divide(calcVars.first, calcVars.second);
    default:
      performOperation(calcVars.operator);
  }
}

function add(num1, num2) {
  return parseFloat(num1) + parseFloat(num2);
}

function subtract(num1, num2) {
  return parseFloat(num1) - parseFloat(num2);
}

function multiply(num1, num2) {
  return parseFloat(num1) * parseFloat(num2);
}

function divide(num1, num2) {
  if (num2 != 0) {
    return parseFloat(num1) / parseFloat(num2);
  }
}

function updateUI(val) {
  document.getElementById("disp1").innerText = val;
}
