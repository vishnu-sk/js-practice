function subscribeAction() {
  const elem = document.querySelector(".btn-subscribe");
  if (elem.innerHTML === "Subscribe") {
    elem.innerHTML = "Subscribed";
  } else {
    elem.innerHTML = "Subscribe";
  }
}
function calculateTotal() {
  const valueInput = document.querySelector(".inp-number");
  const dispValue = document.querySelector(".p-calculate");
  let htmlElem =
    '<p style="background: azure; color: red; display: inline-block;font-weight:800;">!Invalid entry. Enter a positive number.</p>';
  if (valueInput.value == "") 
    {
    dispValue.innerHTML = htmlElem;
    return;
    }
  let val = Number(valueInput.value);
  console.log(valueInput.value);
  console.log(val);
  
    if ((val < 40) & (val >= 0)) 
    {
        dispValue.innerHTML = val + 25;
    }
    else if (val >= 40) 
    {
        dispValue.innerHTML = val;
    }
    else 
    {
        dispValue.innerHTML = htmlElem;
        valueInput.value = "";
    }
}
function clearField() {
  const valueInput = document.querySelector(".inp-number");
  valueInput.value = "";
}
