import "./style.css";

interface AutoClickButton {
  button: HTMLButtonElement;
  item: Item;
}

interface Item {
  id: string;
  display: string;
  rq: number;
  amount: number;
  currentCount: number;
}

const allItems: Item[] = [
  {
    id: "cow",
    display: "cow",
    rq: 10,
    amount: 0.1,
    currentCount: 0,
  },
  {
    id: "sheep",
    display: "sheep",
    rq: 100,
    amount: 2.0,
    currentCount: 0,
  },
  {
    id: "goat",
    display: "goat",
    rq: 1000,
    amount: 50,
    currentCount: 0,
  },
];

const app: HTMLDivElement = document.querySelector("#app")!;
const gameName = "Calex's Game!";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;

const clickDisplay = document.createElement("div");
clickDisplay.innerHTML = "0 clicks!";

const cpsDisplay = document.createElement("div");
cpsDisplay.innerHTML = "The current CPS is 0!";

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
app.append(cpsDisplay);
app.append(mainButton);

addAutoClickButton(allItems[0]);
addAutoClickButton(allItems[1]);
addAutoClickButton(allItems[2]);

//setInterval(autoClick, 1000);
autoClick();

function mainClick() {
  counter++;
  updateCounterDisplay();
}

function updateCounterDisplay() {
  clickDisplay.innerHTML = counter.toFixed(2) + " clicks!";

  updateItemVisibility();
}

function updateCPSDisplay() {
  cpsDisplay.innerHTML = "The current CPS is " + cps.toFixed(2) + "!";
}

function updateItemVisibility() {
  autoClickButtons.forEach((element) => {
    if (counter >= element.item.rq) {
      element.button.disabled = false;
    } else {
      element.button.disabled = true;
    }
  });
}

function updateItemDisplay(autoButton: AutoClickButton) {
  autoButton.button.innerHTML =
    autoButton.item.display +
    "<br>Provides " +
    autoButton.item.amount +
    " cps.<br>Costs " +
    autoButton.item.rq +
    " clicks.<br>Owned: " +
    autoButton.item.currentCount;
}

function addAutoClickButton(i: Item) {
  const newClickButton: HTMLButtonElement = document.createElement("button");
  const autoButton: AutoClickButton = { button: newClickButton, item: i };
  newClickButton.addEventListener("click", () =>
    addCPS(autoButton, i.amount, i.rq),
  );
  newClickButton.disabled = true;
  app.append(newClickButton);
  autoClickButtons.push(autoButton);
  updateItemDisplay(autoButton);
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

function addCPS(button: AutoClickButton, amount: number, cost: number) {
  cps += amount;
  counter -= cost;
  button.item.currentCount++;
  updateCPSDisplay();
  updateItemDisplay(button);
}
