import "./style.css";

let lastTime = performance.now();
let accumulatedTime = 0;
let money = 0;
let rate = 0;

// Create div
const display = document.createElement("div");
display.textContent = "Stolen Cash $" + money;

// Create button
const button = document.createElement("button");
button.textContent = "Steal 💵";

// Create upgrade button
const upgrade_button = document.createElement("button");
upgrade_button.textContent = "Upgrade ⬆️";
upgrade_button.disabled = true;

// On click increment
button.addEventListener("click", () => {
  money += 1;
  display.textContent = "Stolen Cash $" + money;
});

//requestAnimationFrame
function update(now: number) {
  const deltaTime = now - lastTime;
  lastTime = now;
  accumulatedTime += deltaTime;

  while (accumulatedTime >= 1000) {
    money += rate;
    accumulatedTime -= 1000;
    display.textContent = "Stolen Cash $" + money;
  }
  if (money >= 10) {
    upgrade_button.disabled = false;
  }
  requestAnimationFrame(update);
}
requestAnimationFrame(update);

//Upgrade
upgrade_button.addEventListener("click", () => {
  money -= 10;
  rate += 1;
  display.textContent = "Stolen Cash $" + money;
  if (money < 10) {
    upgrade_button.disabled = true;
  }
});

// Add everything to the page
document.body.appendChild(display);
document.body.appendChild(button);
document.body.appendChild(upgrade_button);
