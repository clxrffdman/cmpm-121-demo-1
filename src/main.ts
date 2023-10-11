import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Calex's Game!";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;

const clickDisplay = document.createElement("div");
clickDisplay.innerHTML = "0 clicks!";

let counter: number = 0;
let cps: number = 0;

const mainButton = document.createElement("button");
mainButton.innerHTML = "🐵";
if (mainButton) {
  mainButton.addEventListener("click", () => mainClick());
}

const autoClickButton = document.createElement("button");
autoClickButton.innerHTML = "Click to increase auto-click speed.";
autoClickButton.addEventListener("click", () => addCPS(1));

app.append(header);
app.append(clickDisplay);
app.append(mainButton);
app.append(autoClickButton);

setInterval(autoClick, 1000);

function mainClick() {
  counter++;
  updateCounterDisplay();
}

function updateCounterDisplay() {
  clickDisplay.innerHTML = counter + " clicks!";
}

function autoClick() {
  counter += cps;
  updateCounterDisplay();
}

function addCPS(amount: number) {
  cps += amount;
}
