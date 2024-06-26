
//switch to light/dark mode
document.getElementById('colorSwitch').addEventListener('change', function() {
    if (this.checked) {
        document.body.style.backgroundColor = "hsl(0,0%,15%)";
    } else {
        document.body.style.backgroundColor = "white";
    }
});



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
    copyButton.id = "copyButton";
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

//Stopwatch 

const display = document.getElementById("display");
let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;

function start(){

    if(!isRunning){
        startTime = Date.now() - elapsedTime;
        timer = setInterval(update, 10);
        isRunning = true;
    }
}

function stop(){
    if(isRunning){
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
    }
}


function resetTimer(){
    clearInterval(timer);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    display.textContent = "00:00:00:00";
}

function update(){

    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    let seconds = Math.floor(elapsedTime /1000 %60);
    let milliseconds = Math.floor(elapsedTime %1000/10);

    hours = String(hours).padStart(2,"0");
    minutes = String(minutes).padStart(2,"0");
    seconds = String(seconds).padStart(2,"0");
    milliseconds = String(milliseconds).padStart(2,"0");

    display.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}



//calculator

const calculatorDisplay = document.getElementById("calculatorDisplay");


function appendToDisplay(input) {
    const lastChar = calculatorDisplay.value.slice(-1);
    const operators = ['+', '-', '*', '/'];

    if (operators.includes(input) && operators.includes(lastChar)) {
        // Prevent adding multiple operators in a row
        return;
    }

    calculatorDisplay.value += input;
}

function clerCalculator(){
    calculatorDisplay.value= "";
}

function calculate(){
    try{
        calculatorDisplay.value= eval(calculatorDisplay.value);
    }
    catch(error){
        calculatorDisplay.value= "error";
    }
    
}

// rock paper scissors
const rpsChoices = ["rock", "paper", "scissors"];
const playerDisplay = document.getElementById("playerDisplay");
const computerDisplay = document.getElementById("computerDisplay");
const resultRockPaperScissorsDisplay = document.getElementById("resultRockPaperScissorsDisplay");
const playerScoreDisplay = document.getElementById("playerScoreDisplay");
const computerScoreDisplay = document.getElementById("computerScoreDisplay");

let playerScore = 0;
let computerScore = 0;

function playGame(playerChoice) {

    const computerChoice = rpsChoices[Math.floor(Math.random()*3)];
    let  result = "";

    if(playerChoice === computerChoice){
        result = "It's a tie!"
    }
    else{
        switch(playerChoice){
            case "rock":
                result = (computerChoice === "scissors") ? "You win!" : "You lose!";
                break;
            case "paper":
                result = (computerChoice === "rock") ? "You win!" : "You lose!";
                break;   
            case "scissors":
                result = (computerChoice === "paper") ? "You win!" : "You lose!";
                break;    
        }
    }
    playerDisplay.textContent = `Player ${playerChoice}`
    computerDisplay.textContent = `Computer ${computerChoice}`
    resultRockPaperScissorsDisplay.textContent = result;

    switch(result){
        case "You win!":
            resultRockPaperScissorsDisplay.classList.remove("redText");
            resultRockPaperScissorsDisplay.classList.add("greenText");
            playerScore++;
            playerScoreDisplay.textContent = playerScore;
            break;
        case "You lose!":
            resultRockPaperScissorsDisplay.classList.remove("greenText");
            resultRockPaperScissorsDisplay.classList.add("redText");
            computerScore++;
            computerScoreDisplay.textContent = computerScore;
            break;
        case "It's a tie!":
            resultRockPaperScissorsDisplay.classList.remove("greenText", "redText");
            break;

    }
}

//weather

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "e35f3a9a2492dfe7eeeddc3fa10b52df";

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    const city = cityInput.value;
    if(city){
        try{
            const weatherData = await getWeatherDate(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Please enter a city");
    }
});

async function getWeatherDate(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }
    return await response.json();
}

function displayWeatherInfo(data){
    const { name: city, main: { temp, humidity }, weather: [{ description, id }] } = data;
    
    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;

    weatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId){
    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "🌩️";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧️";
        case (weatherId >= 500 && weatherId < 600):
            return "🌨️";
        case (weatherId >= 600 && weatherId < 700):
            return "❄️";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️";
        case (weatherId === 800):
            return "☀️";
        case (weatherId >= 801 && weatherId < 810):
            return "☁️";
        default:
            return "🌈";
    }
}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}