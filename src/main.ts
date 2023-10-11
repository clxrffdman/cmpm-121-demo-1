import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Calex's Game!";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;

const clickDisplay = document.createElement("div");
clickDisplay.innerHTML = "0 clicks!";

let counter: number = 0;
let cps: number = 1;

const mainButton = document.createElement("button");
mainButton.innerHTML = "🐵";
if (mainButton) {
  mainButton.addEventListener("click", () => mainClick());
}

app.append(header);
app.append(clickDisplay);
app.append(mainButton);

function mainClick() {
  counter++;
  updateCounterDisplay();
  setInterval(autoClick, 1000);
}

function updateCounterDisplay() {
  clickDisplay.innerHTML = counter + " clicks!";
}

function autoClick(){
    counter += cps;
    updateCounterDisplay();
}