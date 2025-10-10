import "./style.css";

let money = 0;

// Create div
const display = document.createElement("div");
display.textContent = "Stolen Cash $" + money;

// Add div to browser
document.body.appendChild(display);

// Create a new button
const button = document.createElement("button");
button.textContent = "💵";

button.addEventListener("click", () => {
  money += 1;
  display.textContent = "Stolen Cash $" + money;
});

// Add the button to the page
document.body.appendChild(button);
