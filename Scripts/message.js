// message.js

document.addEventListener("DOMContentLoaded", () => {
    const sendButton = document.querySelector(".button");
    const messageInput = document.querySelector(".input-2");
    const chatContainer = document.querySelector(".div-22");
  
    sendButton.addEventListener("click", () => {
      const message = messageInput.value.trim();
      if (!message) return;
  
      const messageBubble = document.createElement("div");
      messageBubble.className = "div-23";
      messageBubble.innerHTML = `
        <div class="div-24" style="margin-top: 8px;">
          <div class="p-2">
            <p class="text-wrapper-10">${message}</p>
          </div>
          <div class="span"><div class="text-wrapper-11">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div></div>
        </div>
      `;
  
      chatContainer.appendChild(messageBubble);
      messageInput.value = "";
      chatContainer.scrollTop = chatContainer.scrollHeight;
    });
  
    messageInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") sendButton.click();
    });
  
    const searchInput = document.querySelector(".input");
    searchInput.addEventListener("input", () => {
      const filter = searchInput.value.toLowerCase();
      document.querySelectorAll(".div-8 > div").forEach(card => {
        const name = card.querySelector("div[class*='text-wrapper-']").textContent.toLowerCase();
        card.style.display = name.includes(filter) ? "block" : "none";
      });
    });
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector(".input");
  
    if (searchInput) {
      searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase();
  
        document.querySelectorAll(".chat-entry").forEach(entry => {
          const name = entry.querySelector(".text-wrapper-2")?.textContent.toLowerCase() || "";
          const message = entry.querySelector(".hey-i-m-interested")?.textContent.toLowerCase() || "";
  
          // Check if the name or message contains the search term
          const match = name.includes(searchTerm) || message.includes(searchTerm);
          entry.style.display = match ? "flex" : "none";
        });
      });
    }
  });
  