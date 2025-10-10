import "./style.css";

let lastTime = performance.now();
let accumulatedTime = 0;
let money = 0;

// Create div
const display = document.createElement("div");
display.textContent = "Stolen Cash $" + money;

// Create button
const button = document.createElement("button");
button.textContent = "💵";

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
    money += 1;
    accumulatedTime -= 1000;
    display.textContent = "Stolen Cash $" + money;
  }
  requestAnimationFrame(update);
}
requestAnimationFrame(update);

// Add everything to the page
document.body.appendChild(display);
document.body.appendChild(button);
