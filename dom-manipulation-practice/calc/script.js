const buttons = document.getElementsByClassName("button-cont")[0];
const ops = document.querySelectorAll(".operator");
var arr = [];
var text = {text: ""};
var calcVars = {first: "", second: "", operator: ""};

buttons.addEventListener("click", e => {
  execute1(e);
});
if (calcVars.first == "") {
  console.log(calcVars);
  ops.forEach(button => {
    button.disabled = true;
  });
}

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
      case "equal":
        key = "=";
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
      if (ops[0].disabled === true) {
        console.log("Enabled the operator buttons");
        ops.forEach(button => {
          button.disabled = false;
        });
      }
    } else {
      calcVars.operator = val;
    }
  } else {
    if (!operatorPressed(val)) {
      setNumbers(val, calcVars, "second");
      updateUI(calcVars.second);
    } else {
      if (calcVars.second != "") {
        console.log(
          calcVars.first +
            " " +
            calcVars.second +
            " " +
            performOperation(calcVars.operator)
        );
        calcVars.first = performOperation(calcVars.operator);
        calcVars.second = "";
        calcVars.operator = val;
        updateUI(calcVars.first);
      }
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
    case "equal":

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
