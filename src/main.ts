import "./style.css";

interface AutoClickButton {
  button: HTMLButtonElement;
  rq: number;
}

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

const autoClickButtons: AutoClickButton[] = [];

app.append(header);
app.append(clickDisplay);
app.append(mainButton);

addAutoClickButton("add 1 cps", 10, 1);

//setInterval(autoClick, 1000);
autoClick();

function mainClick() {
  counter++;
  updateCounterDisplay();
}

function updateCounterDisplay() {
  clickDisplay.innerHTML = counter.toFixed(2) + " clicks!";

  autoClickButtons.forEach((element) => {
    if (counter >= element.rq) {
      element.button.disabled = false;
    } else {
      element.button.disabled = true;
    }
  });
}

function addAutoClickButton(s: string, required: number, increase: number) {
  const newClickButton: HTMLButtonElement = document.createElement("button");
  newClickButton.innerHTML = s;
  newClickButton.addEventListener("click", () => addCPS(increase, required));
  newClickButton.disabled = true;
  app.append(newClickButton);
  autoClickButtons.push({ button: newClickButton, rq: required });
}

function incrementCounter(a: number) {
  counter += a;
  updateCounterDisplay();
}

function autoClick() {
  let lastTime = performance.now();
  window.requestAnimationFrame(cycle);
  function cycle() {
    const currentTime = performance.now();
    const elapsed = currentTime - lastTime;
    lastTime = currentTime;
    incrementCounter((elapsed / 1000) * cps);
    window.requestAnimationFrame(cycle);
  }
}

function addCPS(amount: number, cost: number) {
  cps += amount;
  counter -= cost;
}
