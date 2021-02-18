const messages = document.querySelector("#messages");
const form = document.getElementById("form");
const input = document.getElementById("input");

const socket = io();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(input.value);
  if (input.value) {
    socket.emit("chat message", input.value);
    input.value = "";
  }
});

socket.on("chat message", (msg) => {
  const item = document.createElement("li");
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on("user connect", () => {
  const newItem = document.createElement("li");
  newItem.innerText = "user connected";
  messages.appendChild(newItem);
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on("user disconnect", () => {
  const newItem = document.createElement("li");
  newItem.innerText = "user disconnected";
  messages.appendChild(newItem);
  window.scrollTo(0, document.body.scrollHeight);
});
