import "./style.css";

// Upgrade structure
interface upgrades {
  name: string;
  cost: number;
  rate: number;
  owned: number;
  description: string;
}

// Price increase rate
const PRICE_MULTIPLIER = 1.15;

// Data-driven upgrades (5 items now)
const availableItems: upgrades[] = [
  {
    name: "💰 Bag",
    cost: 10,
    rate: 1.0,
    owned: 0,
    description: "A small bag to store cash.",
  },
  {
    name: "🚙 SUV",
    cost: 100,
    rate: 2.0,
    owned: 0,
    description: "A SUV to carry more cash.",
  },
  {
    name: "🚐 Van",
    cost: 1000,
    rate: 50.0,
    owned: 0,
    description: "A van for massive heists.",
  },
  {
    name: "🚚 Truck",
    cost: 5000,
    rate: 200.0,
    owned: 0,
    description: "A truck to carry a ton of stolen cash.",
  },
  {
    name: "🚂 Train",
    cost: 20000,
    rate: 1000.0,
    owned: 0,
    description: "A train that brings cash in bulk.",
  },
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
  btn.textContent = `${item.name} Upgrade ($${
    item.cost.toFixed(2)
  }) ⬆️ - ${item.description}`;
  btn.disabled = true;
  upgradeButtons.push(btn);
  upgradesContainer.appendChild(btn);
}

// Update all UI text
function updateDisplay() {
  display.textContent = `Stolen Cash: $${money.toFixed(2)}`;
  rateDisplay.textContent = `Money Stealing Rate: ${rate.toFixed(2)} units/sec`;

  // Show owned counts dynamically
  ownedDisplay.textContent = "Upgrades Owned: " +
    availableItems.map((item) => `${item.name}: ${item.owned}`).join(", ");

  // Update each upgrade button text + disable state
  for (let i = 0; i < availableItems.length; i++) {
    const item = availableItems[i];
    const btn = upgradeButtons[i];
    btn.textContent = `${item.name} Upgrade ($${
      item.cost.toFixed(2)
    }) ⬆️ - ${item.description}`;
    btn.disabled = money < item.cost;
  }
}

// Handle stealing manually
stealButton.addEventListener("click", () => {
  money += 1;
  money = parseFloat(money.toFixed(2));
  updateDisplay();
});

// Handle all upgrade buttons using loop logic
for (let i = 0; i < availableItems.length; i++) {
  const item = availableItems[i];
  const btn = upgradeButtons[i];
  btn.addEventListener("click", () => {
    if (money >= item.cost) {
      money -= item.cost;
      money = parseFloat(money.toFixed(2));
      rate = parseFloat((rate + item.rate).toFixed(2));
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
    money = parseFloat(money.toFixed(2));
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
