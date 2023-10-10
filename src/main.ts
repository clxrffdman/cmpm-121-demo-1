import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Calex's Game!";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;

const mainButton = document.querySelector("#mainClickButton");
if (mainButton) {
  mainButton.addEventListener("click", () => mainClick());
}

app.append(header);

function mainClick() {
  console.log("clicked!");
}
