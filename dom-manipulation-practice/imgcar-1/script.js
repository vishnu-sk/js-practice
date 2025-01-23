const imgCont = document.querySelector(".image-slide");
const right = document.querySelector(".right-arrow button");
const left = document.querySelector(".left-arrow button");
const points = document.querySelectorAll(".point");

right.addEventListener("click", e => Move(e, true));
left.addEventListener("click", e => Move(e, false));

function Move(e, right = true) {
    console.log("1-" + imgCont.style.left);
    let leftVal = imgCont.style.left == "" ? "0px" : imgCont.style.left;
    console.log("2=" + leftVal);
    leftVal = parseInt(leftVal.slice(0, leftVal.indexOf("px")));

    //update points or the bottom bar
    let index = leftVal/800 * (-1);
    console.log("index "+index );
    points[index].classList.remove("highlight");
    if (right) {
        leftVal = leftVal <= 0 && leftVal > -2400 ? leftVal - 800 : 0;
    }
    else {
        leftVal = leftVal >= -2400 && leftVal < 0 ? leftVal + 800 : -2400;
    }

    //update points or the bottom bar   
    index = leftVal/800 * -1;
    points[index].classList.add("highlight");
    imgCont.style.left = leftVal + "px";
}