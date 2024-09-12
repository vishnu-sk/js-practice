function subscribeAction(){
    const elem = document.querySelector(".btn-subscribe");
    if(elem.innerHTML === "Subscribe"){
        elem.innerHTML = "Subscribed";
    }
    else{
        elem.innerHTML = "Subscribe";
    }
}
function calculateTotal(){
    const valueInput = document.querySelector(".inp-number");
    const dispValue = document.querySelector(".p-calculate");
    let val = Number(valueInput.value);
    if(val < 40)
    {
    dispValue.innerHTML = val + 25;
    }
    else{
        dispValue.innerHTML = val;
    }
    console.log("0");
    console.log(valueInput.value);
}