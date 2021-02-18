let nickName = "";

const nickInput = document.getElementById("nickname");
const nickContainer = document.getElementById("nickname-container");

const messages = document.querySelector("#messages");

const typingArea = document.querySelector("#typing-area");

typingArea.classList.add("hidden");

const typingUser = document.querySelector("#typing-user");

const form = document.getElementById("form");
const userNickname = document.getElementById("user-nickname");
const chatInput = document.getElementById("input");

chatInput.disabled = true;

nickContainer.addEventListener("submit", (e) => {
  e.preventDefault();
  if (nickInput.value.length < 2) return;
  nickName = nickInput.value;
  userNickname.textContent = nickInput.value + ":";
  chatInput.disabled = false;
  nickContainer.hidden = true;
});

const socket = io();

let isTyping = false;

chatInput.addEventListener("keyup", (e) => {
  if (isTyping) return;
  if (e.target.value.length === 0) return;
  console.log("typing");
  socket.emit("typing", nickName);
  isTyping = true;

  setTimeout(() => {
    socket.emit("typing", nickName);
    isTyping = false;
  }, 1500);
});

// Contruct message with users name
const createMessage = (msg) => `${nickName}: ${msg}`;

const getMessage = (msg) => {
  const item = document.createElement("li");
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (chatInput.value) {
    const newMessage = createMessage(chatInput.value);
    socket.emit("chat message", newMessage);
    getMessage(newMessage);
    chatInput.value = "";
  }
});

socket.on("typing", (nickname) => {
  typingArea.classList.toggle("hidden");
  typingUser.innerText = nickname;
});

socket.on("chat message", (msg) => {
  getMessage(msg);
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
