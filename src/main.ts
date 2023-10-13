import "./style.css";

interface AutoClickButton {
  button: HTMLButtonElement;
  item: Item;
}

interface Item {
  id: string;
  display: string;
  description: string;
  rq: number;
  amount: number;
  currentCount: number;
}

const availableItems: Item[] = [
  {
    id: "hammer",
    display: "🔨",
    description: "<b>Slam those pies!</b>",
    rq: 10,
    amount: 0.1,
    currentCount: 0,
  },
  {
    id: "knife",
    display: "🔪",
    description: "<b>Slice and dice!</b>",
    rq: 100,
    amount: 2.0,
    currentCount: 0,
  },
  {
    id: "angry",
    display: "💢",
    description: "<b>Get MAD! Rage 🥧!</b>",
    rq: 1000,
    amount: 50,
    currentCount: 0,
  },
  {
    id: "juice",
    display: "🧃",
    description: "<b>Drink juice and power up!</b>",
    rq: 5000,
    amount: 400,
    currentCount: 0,
  },
  {
    id: "kiwi",
    display: "🥝",
    description: "<b>Legndary kiwi pies!</b>",
    rq: 10000,
    amount: 1000,
    currentCount: 0,
  },
];

const app: HTMLDivElement = document.querySelector("#app")!;
const gameName = "🥧 Time!";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;

const clickDisplay = document.createElement("div");
clickDisplay.innerHTML = "0 🥧s!";

const shopDescription = document.createElement("div");
shopDescription.innerHTML = "<b>Shop</b>";

const cpsDisplay = document.createElement("div");
cpsDisplay.innerHTML = "The current 🥧 per second is 0!";

let counter: number = 0;
let cps: number = 0;

const mainButton = document.createElement("button");
mainButton.innerHTML = "🥧";
mainButton.style.width = "300px";
mainButton.style.height = "300px";
mainButton.style.fontSize = "80px";
if (mainButton) {
  mainButton.addEventListener("click", () => mainClick());
}

const autoClickButtons: AutoClickButton[] = [];

app.append(header);
app.append(mainButton);
app.append(clickDisplay);
app.append(cpsDisplay);
app.append(shopDescription);

availableItems.forEach((element) => {
  addAutoClickButton(element);
});

//setInterval(autoClick, 1000);
autoClick();

function mainClick() {
  counter++;
  updateCounterDisplay();
}

function updateCounterDisplay() {
  clickDisplay.innerHTML = counter.toFixed(2) + " 🥧s!";

  updateItemVisibility();
}

function updateCPSDisplay() {
  cpsDisplay.innerHTML = "The current 🥧 per second is " + cps.toFixed(2) + "!";
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
    "<br>" +
    autoButton.item.description +
    "<br>Provides " +
    autoButton.item.amount +
    " 🥧 per second.<br>Costs " +
    autoButton.item.rq.toFixed(2) +
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
  button.item.rq *= 1.15;
  updateCPSDisplay();
  updateItemDisplay(button);
}
