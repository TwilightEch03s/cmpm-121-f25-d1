import "./style.css";

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

//setInterval
setInterval(() => {
  money += 1;
  display.textContent = "Stolen Cash $" + money;
}, 1000);

// Add everything to the page
document.body.appendChild(display);
document.body.appendChild(button);
