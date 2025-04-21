document.addEventListener("DOMContentLoaded", () => {
  const chatList = document.querySelector(".div-9");
  const chatContainer = document.querySelector(".div-22");
  const messageInput = document.querySelector(".input-2");
  const sendButton = document.querySelector(".button");
  const rightHeader = document.querySelector(".div-21");

  let allChats = {};
  let currentUserId = null;

  function saveToLocalStorage() {
    localStorage.setItem("chatData", JSON.stringify(allChats));
  }

  function loadFromLocalStorage() {
    const saved = localStorage.getItem("chatData");
    if (saved) {
      allChats = JSON.parse(saved);
    }
  }

  function loadChatList() {
    chatList.innerHTML = "";
    Object.entries(allChats).forEach(([id, user]) => {
      const entry = document.createElement("div");
      entry.className = "chat-entry";
      entry.dataset.userId = id;
      entry.innerHTML = `
        <div class="div-10">
          <div class="overlap-group-2">
           <div class="chat-avatar" style="background-image: url('${user.avatarUrl}')"></div>
            <div class="div-11 ${user.status === 'online' ? 'online' : 'offline'}"></div>
          </div>
        </div>
        <div class="div-12">
          <div class="text-wrapper-2">${user.name}</div>
          <p class="hey-i-m-interested">${user.preview}</p>
          <div class="text-wrapper-3">${user.messages.at(-1)?.time || ""}</div>
        </div>
      `;
      entry.addEventListener("click", () => {
        loadChatMessages(id);
      });
      entry.style.cursor = "pointer";
      entry.onmouseover = () => entry.style.backgroundColor = "#f8f8f8";
      entry.onmouseout = () => entry.style.backgroundColor = "";
      chatList.appendChild(entry);
    });
  }

  function loadChatMessages(userId) {
    currentUserId = userId;
    chatContainer.innerHTML = "";
    const user = allChats[userId];

    
  rightHeader.innerHTML = 
  `<div class="div-10">
    <div class="overlap-group-2">
      <div class="chat-avatar" style="background-image: url('${user.avatarUrl}')"></div>
      <div class="div-11 ${user.status === 'online' ? 'online' : 'offline'}"></div>
    </div>
  </div>
  <div class="div-12">
    <div class="text-wrapper-2">${user.name}</div>
    <div class="text-wrapper-9">${user.status}</div>
  </div>
  `;
    user.messages.forEach(msg => {
      const bubble = document.createElement("div");
      bubble.className = "chat-bubble " + (msg.from === "me" ? "sent" : "received");
      bubble.innerHTML = `
        <div class="div-24" style="margin-top: 8px;">
          <div class="p-2">
            <p class="text-wrapper-10">${msg.text}</p>
          </div>
          <div class="span"><div class="text-wrapper-11">${msg.time}</div></div>
        </div>
      `;
      chatContainer.appendChild(bubble);
    });

    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  sendButton.addEventListener("click", () => {
    const text = messageInput.value.trim();
    if (!text || !currentUserId) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newMsg = { text, time, from: "me" };
    allChats[currentUserId].messages.push(newMsg);
    allChats[currentUserId].preview = text;
    messageInput.value = "";

    saveToLocalStorage();
    loadChatMessages(currentUserId);
    loadChatList();
  });

  messageInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendButton.click();
  });

  const searchInput = document.querySelector(".input");
  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    document.querySelectorAll(".chat-entry").forEach(entry => {
      const name = entry.querySelector(".text-wrapper-2")?.textContent.toLowerCase() || "";
      const message = entry.querySelector(".hey-i-m-interested")?.textContent.toLowerCase() || "";
      entry.style.display = (name.includes(searchTerm) || message.includes(searchTerm)) ? "flex" : "none";
    });
  });

  // Initialization
  fetch("Docs/messages.json")
    .then(res => res.json())
    .then(jsonData => {
      loadFromLocalStorage();
      jsonData.forEach(user => {
        if (!allChats[user.id]) {
          allChats[user.id] = user;
        }
      });
      saveToLocalStorage();
      loadChatList();
    });
});
