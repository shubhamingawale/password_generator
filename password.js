const answer = document.querySelector('[data-answer]');
const copy = document.querySelector('[data-copy]');
const copymsg = document.querySelector('[data-copymsg]');
const lengthdisplay = document.querySelector('[data-lengthnumber]');
const lengthslider = document.querySelector('[data-lengthslider]');
const upper = document.querySelector('#upper');
const lower = document.querySelector('#lower');
const number = document.querySelector('#numbers');
const symbol = document.querySelector('#symbols');
const indicator = document.querySelector('[data-indicator]');
const generator = document.querySelector('[data-generator]');
const allcheckbox = document.querySelectorAll('input[type=checkbox]');
const allsymbol = "~!@#$%^&*()_+-=[]';,./{}|:"

let password = "";
let passwordlength = 10;
let checkcount = 0;
handleslider();
//set length
console.log("1");
function handleslider() {
    lengthslider.value = passwordlength;
    lengthdisplay.innerText = passwordlength;
    const min = lengthslider.min;
    const max = lengthslider.max;
    lengthslider.style.backgroundSize = (( passwordlength - min)*100/(max - min) + "% 100%")
}

function setindicator(color) {
    indicator.style.backgroundColor = color;
}
//setindicator('#0f0');

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateRanNum() {
    return getRndInteger(0, 9);
}

function generateLowerCase() {
    return String.fromCharCode(getRndInteger(97, 123));
}

function generateUpperCase() {
    return String.fromCharCode(getRndInteger(65, 90));
}

function generateSymbol() {
    const rndno = getRndInteger(0, allsymbol.length);
    return allsymbol.charAt(rndno);
}
console.log("2");
function calstrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;

    if (upper.checked) hasUpper = true;
    if (lower.checked) hasLower = true;
    if (number.checked) hasNum = true;
    if (symbol.checked) hasSym = true;

    if (hasUpper && hasLower && (hasNum || hasSym) && (passwordlength >= 8)) {
        setindicator('#0f0');
    }
    else if ((hasUpper || hasLower) && (hasNum || hasSym) && (password >= 6)) {
        setindicator('#ff0');
    }
    else {
        setindicator('#f00');
    }
}

console.log("3");
//method to copy content on clipboard
async function copycontent() {
    try {
        await navigator.clipboard.writeText(answer.value);
        copymsg.innerText = "copied!";
    }
    catch (e) {
        copymsg.innerText = "failed!";
    }

    let active = copymsg.setAttribute("class", "scale-1");
    active;
    setTimeout(() => {
        copymsg.remove(active);
    }, 2000);
}

console.log("shuffle");
function shufflepassword(array) {
    //fisher yates method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str = +el));
    return str;

}

console.log("5");
function handlecheckbox() {
    checkcount = 0;
    allcheckbox.forEach((checkbox) => {
        if (checkbox.checked) {
            checkcount++;
        }
    });
    if (passwordlength < checkcount) {
        passwordlength = checkcount;
        handleslider();
    }
}
console.log("6");
allcheckbox.forEach((checkbox) => {
    checkbox.addEventListener('change', handlecheckbox);

});

console.log("4");
lengthslider.addEventListener('input', (e) => {
    passwordlength = e.target.value;
    handleslider();
});

copy.addEventListener('click', () => {
    if (answer.value) {
        copycontent();
    }
});


console.log("7");
generator.addEventListener('click', () => {
    // none of the checkbox selected
    if (checkcount == 0)
        return;

    if (passwordlength < checkcount) {
        passwordlength = checkcount;
        handleslider();
    }

    password = "";

    let funcArr = [];

    if (upper.checked)
        funcArr.push(generateUpperCase);

    if (lower.checked)
        funcArr.push(generateLowerCase);

    if (number.checked)
        funcArr.push(generateRanNum);

    if (symbol.checked)
        funcArr.push(generateSymbol);


    for (let i = 0; i < funcArr.length; i++) {
        password += funcArr[i]();
    }

    for (let i = 0; i < passwordlength - funcArr.length; i++) {
        let randIndex = getRndInteger(0, funcArr.length);
        password += funcArr[randIndex]();
    }

    //password = shufflepassword(Array.from(password));

    answer.value = password;

    calstrength();

});






