

const decrease = document.getElementById("decrease");
const reset = document.getElementById("reset");
const increase = document.getElementById("increase");
const countLabel = document.getElementById("countLabel");

let count = 0;

increase.onclick = function(){
    count++;
    countLabel.textContent = count;
}

decrease.onclick = function(){
    count--;
    countLabel.textContent = count;
}

reset.onclick = function(){
    count = 0;
    countLabel.textContent = count;
}

const myCheckbox = document.getElementById("myCheckbox");
const visaBtn = document.getElementById("visaBtn");
const masterCardBtn = document.getElementById("masterCardBtn");
const blikBtn = document.getElementById("blikBtn");
const mySubmit = document.getElementById("mySubmit");
const checkboxResult = document.getElementById("checkboxResult");
const paymentResult = document.getElementById("paymentResult");

mySubmit.onclick = function(){
    if(myCheckbox.checked){
        checkboxResult.textContent = "zaznaczone";
    }
    else{
        checkboxResult.textContent = "nie zaznaczone";
    }

    if(visaBtn.checked){
        paymentResult.textContent="Wybrano visa";
    }
    else  if(masterCardBtn.checked){
        paymentResult.textContent="Wybrano masterCard";
    }
    else  if(blikBtn.checked){
        paymentResult.textContent="Wybrano blik";
    }
    else{
        paymentResult.textContent="pick smth";
    }
}


const temperature = document.getElementById("temperature");
const toFahrenheit = document.getElementById("toFahrenheit");
const toCelcius = document.getElementById("toCelcius");
const temperatureResult = document.getElementById("temperatureResult");
let temp;

function convert() {
    if (toFahrenheit.checked) {
        temp = Number(temperature.value);
        temp = temp*9/5+32;
        temperatureResult.textContent = temp + "°";
    } 
    else if (toCelcius.checked) {
        temp = Number(temperature.value);
        temp = (temp - 32)*(5/9);
        temperatureResult.textContent = temp + "°";;
    } 
    else {
        temperatureResult.textContent = "Select a unit";
    }
}

//dice roller

function rollDice(){
    const numOfDice = document.getElementById("inputDice").value;
    const diceResult = document.getElementById("diceResult");
    const diceImages = document.getElementById("diceImages");
    const values = [];
    const images = [];

    for(let i = 0; i<numOfDice; i++){
        const value = Math.floor(Math.random() * 6) + 1;
        values.push(value);
        images.push(`<img src="dice_images/${value}.png">`);
    }
    diceResult.textContent = `dice: ${values.join(', ')}`;
    diceImages.innerHTML = images.join('');
}


//password generator

function generatePassword() {
    const length = parseInt(document.getElementById("length").value);
    const includeLowercase = document.getElementById("includeLowercase").checked;
    const includeUppercase = document.getElementById("includeUppercase").checked;
    const includeNumbers = document.getElementById("includeNumbers").checked;
    const includeSymbols = document.getElementById("includeSymbols").checked;

    let password = "";

    const lowercaseChars = "qwertyuiopasdfghjklzxcvbnm";
    const uppercaseChars = "QWERTYUIOPASDFGHJKLZXCVBNM";
    const numbersChars = "1234567890";
    const symbolsChars = "!@#$%^&*()_+=-";

    let allowedChars = "";
    allowedChars += includeLowercase ? lowercaseChars : "";
    allowedChars += includeUppercase ? uppercaseChars : "";
    allowedChars += includeNumbers ? numbersChars : "";
    allowedChars += includeSymbols ? symbolsChars : "";

    if (length <= 7) {
        password = "(password length must be at least 8)";
    } else if (allowedChars.length === 0) {
        password = "(at least one set of characters must be selected)";
    } else {
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * allowedChars.length);
            password += allowedChars[randomIndex];
        }
    }

    const passwordResult = document.getElementById("passwordResult");
    passwordResult.textContent = password;

    // Create copy button
    const copyButton = document.createElement("button");
    copyButton.textContent = "Copy";
    copyButton.addEventListener("click", function() {
        // Copy password to clipboard
        const textarea = document.createElement("textarea");
        textarea.value = password;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        alert("Password copied to clipboard");
    });

    // Append copy button to password result div
    passwordResult.appendChild(copyButton);
}