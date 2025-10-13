import "./style.css";

let lastTime = performance.now();
let accumulatedTime = 0;
let money = 0;
let rate = 0;

// Track how many of each upgrade are owned
let A_owned = 0;
let B_owned = 0;
let C_owned = 0;

// Upgrade costs and rates
let A_cost = 10;
let B_cost = 100;
let C_cost = 1000;

const A_rate = 0.1;
const B_rate = 2.0;
const C_rate = 50.0;

// Each item gets 15% more expensive after purchase
const PRICE_MULTIPLIER = 1.15;

// Create displays
const display = document.createElement("div");
const rateDisplay = document.createElement("div");
const ownedDisplay = document.createElement("div");

// Create steal button
const stealButton = document.createElement("button");
stealButton.textContent = "Steal Cash 💵";

// Create upgrade buttons
const upgradeA_button = document.createElement("button");
const upgradeB_button = document.createElement("button");
const upgradeC_button = document.createElement("button");

// Update display text
function updateDisplay() {
  display.textContent = "Stolen Cash: $" + money.toFixed(1);
  rateDisplay.textContent = `Reinforcements Help Rate: ${
    rate.toFixed(1)
  } units/sec`;
  ownedDisplay.textContent =
    `Upgrades Owned: Bag Upgrades: ${A_owned}, Van Upgrades: ${B_owned}, Truck Upgrades: ${C_owned}`;
  upgradeA_button.textContent = `💰 Bag Upgrade: ($${A_cost}) ⬆️`;
  upgradeB_button.textContent = `🚐 Van Upgrade: ($${B_cost}) ⬆️`;
  upgradeC_button.textContent = `🚚 Truck Upgrade: ($${C_cost}) ⬆️`;

  upgradeA_button.disabled = money < A_cost;
  upgradeB_button.disabled = money < B_cost;
  upgradeC_button.disabled = money < C_cost;
}

// Button logic
stealButton.addEventListener("click", () => {
  money += 1;
  updateDisplay();
});

upgradeA_button.addEventListener("click", () => {
  if (money >= A_cost) {
    money -= A_cost;
    rate += A_rate;
    A_owned++;
    A_cost *= PRICE_MULTIPLIER;
    updateDisplay();
  }
});

upgradeB_button.addEventListener("click", () => {
  if (money >= B_cost) {
    money -= B_cost;
    rate += B_rate;
    B_owned++;
    B_cost *= PRICE_MULTIPLIER;
    updateDisplay();
  }
});

upgradeC_button.addEventListener("click", () => {
  if (money >= C_cost) {
    money -= C_cost;
    rate += C_rate;
    C_owned++;
    C_cost *= PRICE_MULTIPLIER;
    updateDisplay();
  }
});

// Passive income update loop
function update(now: number) {
  const deltaTime = now - lastTime;
  lastTime = now;
  accumulatedTime += deltaTime;

  while (accumulatedTime >= 1000) {
    money += rate;
    accumulatedTime -= 1000;
  }

  updateDisplay();
  requestAnimationFrame(update);
}

requestAnimationFrame(update);

// Add everything to page
document.body.appendChild(display);
document.body.appendChild(rateDisplay);
document.body.appendChild(ownedDisplay);
document.body.appendChild(stealButton);
document.body.appendChild(upgradeA_button);
document.body.appendChild(upgradeB_button);
document.body.appendChild(upgradeC_button);

updateDisplay();
