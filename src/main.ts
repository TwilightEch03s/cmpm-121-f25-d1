import "./style.css";

// ===== TYPES =====
interface Upgrade {
  name: string;
  cost: number;
  rate: number;
  owned: number;
  description: string;
}

// ===== DATA =====
const PRICE_MULTIPLIER = 1.15;

// ===== GAME STATE =====
let money = 0;
let rate = 0;
let lastTime = performance.now();
let accumulatedTime = 0;

// ===== UI ELEMENTS =====
const display = document.createElement("div");
const rateBox = document.createElement("div");
rateBox.classList.add("info-box");
const rateTitle = document.createElement("h2");
rateTitle.textContent = "💸 Stealing Rate";
const rateValue = document.createElement("p");
rateValue.innerHTML = `<span>${rate.toFixed(2)}</span> units/sec`;
rateBox.append(rateTitle, rateValue);

const ownedBox = document.createElement("div");
ownedBox.classList.add("info-box");
const ownedTitle = document.createElement("h2");
ownedTitle.textContent = "🔧 Upgrades Owned";
const ownedValue = document.createElement("p");

const infoRow = document.createElement("div");
infoRow.classList.add("info-row");
infoRow.append(rateBox, ownedBox);

const stealButton = document.createElement("button");
stealButton.textContent = "Steal Cash 💵";

// ===== UPGRADE DATA =====
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

ownedValue.innerHTML = UPGRADE_DATABASE.map(
  (u) => `${u.name}: <span>${u.owned}</span>`,
).join(" | ");
ownedBox.append(ownedTitle, ownedValue);

// ===== UPGRADE BUTTONS =====
const upgradesContainer = document.createElement("div");
upgradesContainer.classList.add("upgrades-container");

// Create upgrade buttons dynamically
function createUpgradeButtons(
  container: HTMLElement,
  upgrades: Upgrade[],
  onPurchase: (upgrade: Upgrade) => void,
): HTMLButtonElement[] {
  return upgrades.map((upgrade) => {
    const btn = document.createElement("button");
    btn.textContent = `${upgrade.name} Upgrade ($${
      upgrade.cost.toFixed(
        2,
      )
    }) 🎒 - ${upgrade.description}`;
    btn.disabled = money < upgrade.cost;
    btn.addEventListener("click", () => {
      onPurchase(upgrade);
      showUpgradePopup(upgrade.name);
    });
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
      upgrade.cost *= PRICE_MULTIPLIER;
      updateDisplay();
    }
  },
);

// ===== UPDATE FUNCTION =====
function updateDisplay() {
  display.textContent = `Stolen Cash: $${money.toFixed(2)}`;

  rateValue.innerHTML = `<span>${rate.toFixed(2)}</span> units/sec`;
  ownedValue.innerHTML = UPGRADE_DATABASE.map(
    (u) => `${u.name}: <span>${u.owned}</span>`,
  ).join(" | ");

  for (let i = 0; i < UPGRADE_DATABASE.length; i++) {
    const item = UPGRADE_DATABASE[i];
    const btn = upgradeButtons[i];
    btn.textContent = `${item.name} Upgrade ($${
      item.cost.toFixed(
        2,
      )
    }) ⬆️ - ${item.description}`;
    btn.disabled = money < item.cost;
  }
}

// ===== EVENT LISTENERS =====
stealButton.addEventListener("click", (e) => {
  money += 1;
  money = parseFloat(money.toFixed(2));
  updateDisplay();

  const float = document.createElement("div");
  float.textContent = "+$1";
  float.classList.add("money-float");
  document.body.appendChild(float);

  const rect = (e.target as HTMLElement).getBoundingClientRect();
  float.style.left = rect.left + rect.width / 2 + "px";
  float.style.top = rect.top + "px";

  setTimeout(() => float.remove(), 1000);
});

// Manual upgrade listener
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
      showUpgradePopup(item.name);
    }
  });
}

// ===== FANCY UPGRADE POPUP =====
function showUpgradePopup(upgradeName: string): void {
  const popup = document.createElement("div");
  popup.classList.add("upgrade-popup");
  popup.innerHTML = `✨ ${upgradeName} Upgraded! ✨`;
  document.body.appendChild(popup);

  popup.style.left = "50%";
  popup.style.top = "20%";
  popup.style.transform = "translateX(-50%)";

  setTimeout(() => popup.remove(), 1500);
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
document.body.appendChild(display);
document.body.appendChild(infoRow);
document.body.appendChild(stealButton);
document.body.appendChild(upgradesContainer);

updateDisplay();
