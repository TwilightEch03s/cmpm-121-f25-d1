import "./style.css";

// Upgrade upgrade structure
interface upgrades {
  name: string;
  cost: number;
  rate: number;
  owned: number;
}

// Price increase rate
const PRICE_MULTIPLIER = 1.15;

// Data-driven upgrades
const availableItems: upgrades[] = [
  { name: "💰 Bag", cost: 10, rate: 1.0, owned: 0 },
  { name: "🚐 Van", cost: 100, rate: 2.0, owned: 0 },
  { name: "🚚 Truck", cost: 1000, rate: 50.0, owned: 0 },
];

// Game state
let money = 0;
let rate = 0;
let lastTime = performance.now();
let accumulatedTime = 0;

// UI elements
const display = document.createElement("div");
const rateDisplay = document.createElement("div");
const ownedDisplay = document.createElement("div");

const stealButton = document.createElement("button");
stealButton.textContent = "Steal Cash 💵";

// Container for upgrades
const upgradesContainer = document.createElement("div");
upgradesContainer.classList.add("upgrades-container");

// Create a button for each available item
const upgradeButtons: HTMLButtonElement[] = [];
for (const item of availableItems) {
  const btn = document.createElement("button");
  btn.textContent = `${item.name} Upgrade ($${item.cost.toFixed(2)}) ⬆️`;
  btn.disabled = true;
  upgradeButtons.push(btn);
  upgradesContainer.appendChild(btn);
}

// Update all UI text
function updateDisplay() {
  display.textContent = `Stolen Cash: $${money.toFixed(2)}`;
  rateDisplay.textContent = `Reinforcements Help Rate: ${
    rate.toFixed(2)
  } units/sec`;

  // Show owned counts dynamically
  ownedDisplay.textContent = "Upgrades Owned: " +
    availableItems.map((item) => `${item.name}: ${item.owned}`).join(", ");

  // Update each upgrade button text + disable state
  for (let i = 0; i < availableItems.length; i++) {
    const item = availableItems[i];
    const btn = upgradeButtons[i];
    btn.textContent = `${item.name} Upgrade ($${item.cost.toFixed(2)}) ⬆️`;
    btn.disabled = money < item.cost;
  }
}

// Handle stealing manually
stealButton.addEventListener("click", () => {
  money += 1;
  money = parseFloat(money.toFixed(2)); // keep consistent
  updateDisplay();
});

// Handle all upgrade buttons using loop logic
for (let i = 0; i < availableItems.length; i++) {
  const item = availableItems[i];
  const btn = upgradeButtons[i];
  btn.addEventListener("click", () => {
    if (money >= item.cost) {
      money -= item.cost;
      money = parseFloat(money.toFixed(2)); // keep consistent
      rate = parseFloat((rate + item.rate).toFixed(2)); // precise increments
      item.owned++;
      item.cost *= PRICE_MULTIPLIER;
      updateDisplay();
    }
  });
}

// Passive income update loop
function update(now: number) {
  const deltaTime = now - lastTime;
  lastTime = now;
  accumulatedTime += deltaTime;

  while (accumulatedTime >= 1000) {
    money += rate;
    money = parseFloat(money.toFixed(2)); // keep increments consistent
    accumulatedTime -= 1000;
  }

  updateDisplay();
  requestAnimationFrame(update);
}

requestAnimationFrame(update);

// Add all UI elements to the page
document.body.appendChild(display);
document.body.appendChild(rateDisplay);
document.body.appendChild(ownedDisplay);
document.body.appendChild(stealButton);
document.body.appendChild(upgradesContainer);

updateDisplay();
