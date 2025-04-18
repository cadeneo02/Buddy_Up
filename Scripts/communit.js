// JavaScript for Student Community Page with full JSON & localStorage integration

document.addEventListener("DOMContentLoaded", async () => {
    const postBtn = document.querySelector(".actions .post");
    const postInput = document.querySelector(".post-creator .input");
    const postsContainer = document.querySelector(".posts > .container");
    const locationInput = document.getElementById("location-input");
    const filters = document.querySelectorAll(".filters button");
    const photoInput = document.createElement("input");
    photoInput.type = "file";
    photoInput.accept = "image/*";
  
    let currentFilter = "All Posts";
    let selectedImage = null;
  
    const getPostsFromStorage = () =>
      JSON.parse(localStorage.getItem("communityPosts") || "[]");
  
    const savePostsToStorage = (data) =>
      localStorage.setItem("communityPosts", JSON.stringify(data));
  
    // Load initial JSON posts if localStorage is empty
    async function loadInitialPosts() {
      const storedPosts = getPostsFromStorage();
  
  
      try {
        const res = await fetch("./Docs/communitypost.json");
        const jsonPosts = await res.json();
        savePostsToStorage(jsonPosts);
        return jsonPosts;
      } catch (e) {
        console.error("Failed to load posts.json:", e);
        return [];
      }
    }
  
    let posts = await loadInitialPosts();
  
    postBtn.addEventListener("click", () => {
      const content = postInput.textContent.trim();
      if (!content) return;
  
      const newPost = {
        id: Date.now(),
        name: "You",
        status: "just now",
        content,
        category: currentFilter,
        image: selectedImage ? URL.createObjectURL(selectedImage) : null,
        location: locationInput.value,
        avatar:"Media/Katie.jpg",
        likes: 0,
        comments: [],
      };
  
      posts.unshift(newPost);
      savePostsToStorage(posts);
      renderPosts();
      postInput.textContent = "";
      locationInput.value = "";
      selectedImage = null;
    });
  
    filters.forEach((btn) => {
      btn.addEventListener("click", () => {
        filters.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        currentFilter = btn.textContent;
        renderPosts();
      });
    });
  
    document.querySelector(".photo-trigger").addEventListener("click", () => {
      photoInput.click();
    });
  
    const locationBtn = document.querySelector(".actions button:nth-child(2)");
  
  locationBtn.addEventListener("click", () => {
  if (locationInput.style.display === "none") {
    locationInput.style.display = "block";
    locationInput.focus();
  } else {
    locationInput.style.display = "none";
  }
});
    photoInput.addEventListener("change", () => {
      selectedImage = photoInput.files[0];
    });
  
    function renderPosts() {
      postsContainer.innerHTML = "";
      const visiblePosts =
        currentFilter === "All Posts"
          ? posts
          : posts.filter((p) => p.category === currentFilter);
  
      visiblePosts.forEach((post) => {
        const postEl = document.createElement("article");
        postEl.className = "post";
        postEl.innerHTML = `
          <div class="user">
            <div class="avatar" style="background-image: url('${post.avatar || "Media/default.jpg"}')"></div>
            <div class="info">
              <span class="name">${post.name}</span>
              <span class="status">${post.status}</span>
            </div>
            <img src="Media/online.png" alt="status" class="status-icon" />
          </div>
          <div class="content">
            <p>${post.content}</p>
            ${post.image ? `<img src="${post.image}" class="post-img" />` : ""}
            ${post.location ? `<span class="location">📍 ${post.location}</span>` : ""}
          </div>
          <div class="interactions">
            <button class="like" data-id="${post.id}"><img src="Media/like.png" /><span>Like (${post.likes})</span></button>
            <button class="comment-toggle" data-id="${post.id}"><img src="Media/comment.png" /><span>Comment (${post.comments.length})</span></button>
            <button class="share"><img src="Media/share.png" /><span>Share</span></button>
          </div>
          <div class="comment-box" style="display: none; margin-top: 0.5rem;">
            <input type="text" placeholder="Write a comment..." class="comment-input" data-id="${post.id}" />
          </div>
          <div class="comment-list">
            ${post.comments.map(c => `<div class="comment">💬 ${c.text}</div>`).join("")}
          </div>
        `;
        postsContainer.appendChild(postEl);
      });
  
      attachInteractionHandlers();
    }
  
    function attachInteractionHandlers() {
      document.querySelectorAll(".like").forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = parseInt(btn.getAttribute("data-id"));
          const post = posts.find((p) => p.id === id);
          if (post) {
            post.likes++;
            savePostsToStorage(posts);
            renderPosts();
          }
        });
      });
  
      document.querySelectorAll(".comment-toggle").forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data-id");
          const box = btn.closest(".post").querySelector(".comment-box");
          box.style.display = box.style.display === "none" ? "block" : "none";
        });
      });
  
      document.querySelectorAll(".comment-input").forEach((input) => {
        input.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            const text = input.value.trim();
            const id = parseInt(input.getAttribute("data-id"));
            if (text) {
              const post = posts.find((p) => p.id === id);
              post.comments.push({ text });
              savePostsToStorage(posts);
              renderPosts();
            }
          }
        });
      });
    }
  
    renderPosts();
  });
  