import "./style.css";

// Upgrade structure
// ===== TYPES =====
interface Upgrade {
  name: string;
  cost: number;
  rate: number;
  owned: number;
  description: string;
}

// ===== DATA =====
// Price increase rate
const PRICE_MULTIPLIER = 1.15;

// ===== GAME STATE =====
let money = 0;
let rate = 0;
let lastTime = performance.now();
let accumulatedTime = 0;

// ===== UI ELEMENTS =====
const display = document.createElement("div");
const rateDisplay = document.createElement("div");
const ownedDisplay = document.createElement("div");

const stealButton = document.createElement("button");
stealButton.textContent = "Steal Cash 💵";

// Data-driven upgrades (5 items now)
const UPGRADE_DATABASE: Upgrade[] = [
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

// ===== UPGRADE BUTTONS =====
const upgradesContainer = document.createElement("div");
upgradesContainer.classList.add("upgrades-container");

//Create upgrade buttons dynamically
function createUpgradeButtons(
  container: HTMLElement,
  upgrades: Upgrade[],
  onPurchase: (upgrade: Upgrade) => void,
): HTMLButtonElement[] {
  return upgrades.map((upgrade) => {
    const btn = document.createElement("button");
    btn.textContent = `${upgrade.name} Upgrade ($${
      upgrade.cost.toFixed(2)
    }) 🎒 - ${upgrade.description}`;
    btn.disabled = money < upgrade.cost;
    btn.addEventListener("click", () => onPurchase(upgrade));
    container.appendChild(btn);
    return btn;
  });
}

const upgradeButtons = createUpgradeButtons(
  upgradesContainer,
  UPGRADE_DATABASE,
  (upgrade) => {
    if (money >= upgrade.cost) {
      money -= upgrade.cost;
      money = parseFloat(money.toFixed(2));
      rate = parseFloat((rate + upgrade.rate).toFixed(2));
      upgrade.owned++;
      upgrade.cost *= 1.15;
      updateDisplay();
    }
  },
);

// ===== UPDATE FUNCTION =====
function updateDisplay() {
  display.textContent = `Stolen Cash: $${money.toFixed(2)}`;
  rateDisplay.textContent = `Money Stealing Rate: ${rate.toFixed(2)} units/sec`;

  // Show owned counts dynamically
  ownedDisplay.textContent = "Upgrades Owned: " +
    UPGRADE_DATABASE.map((item) => `${item.name}: ${item.owned}`).join(", ");

  // Update each upgrade button text + disable state
  for (let i = 0; i < UPGRADE_DATABASE.length; i++) {
    const item = UPGRADE_DATABASE[i];
    const btn = upgradeButtons[i];
    btn.textContent = `${item.name} Upgrade ($${
      item.cost.toFixed(2)
    }) ⬆️ - ${item.description}`;
    btn.disabled = money < item.cost;
  }
}

// ===== EVENT LISTENERS =====
// Handle stealing manually
stealButton.addEventListener("click", () => {
  money += 1;
  money = parseFloat(money.toFixed(2));
  updateDisplay();
});

// Handle all upgrade buttons using loop logic
for (let i = 0; i < UPGRADE_DATABASE.length; i++) {
  const item = UPGRADE_DATABASE[i];
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

// ===== GAME LOOP =====
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

// ===== INITIALIZATION =====
// Add all UI elements to the page
document.body.appendChild(display);
document.body.appendChild(rateDisplay);
document.body.appendChild(ownedDisplay);
document.body.appendChild(stealButton);
document.body.appendChild(upgradesContainer);

updateDisplay();
