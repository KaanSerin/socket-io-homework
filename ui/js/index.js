let nickName = "";

const nickInput = document.getElementById("nickname");
const nickContainer = document.getElementById("nickname-container");
const messages = document.querySelector("#messages");
const userNickname = document.getElementById("user-nickname");
const form = document.getElementById("form");
const input = document.getElementById("input");

input.disabled = true;

nickContainer.addEventListener("submit", (e) => {
  e.preventDefault();
  if (nickInput.value.length < 2) return;
  nickName = nickInput.value;
  userNickname.textContent = nickInput.value + ":";
  input.disabled = false;

  nickContainer.hidden = true;
});

const socket = io();

// Contruct message with users name
const createMessage = (msg) => `${nickName}: ${msg}`;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(input.value);
  if (input.value) {
    socket.emit("chat message", createMessage(input.value));
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
