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
    // Merge and filter duplicates by ID
    const merged = [...storedPosts];
    const existingIds = new Set(storedPosts.map(p => p.id));
    for (const p of jsonPosts) {
      if (!existingIds.has(p.id)) {
        merged.push(p);
      }
    }

    savePostsToStorage(merged);
    return merged;
  } catch (e) {
    console.error("Failed to load communitypost.json:", e);
    return storedPosts;
  }
}
  
    let posts = await loadInitialPosts();
  
postInput.addEventListener("click" ,async()=>{

  postInput.textContent = "";
});
// --- Inside  postBtn.addEventListener("click", () => { ... })
postBtn.addEventListener("click", async () => {
  const content = postInput.textContent.trim();
  if (!content) return;

  const imageData = selectedImage ? await convertToBase64(selectedImage) : null;
  const newPost = {
    id: Date.now(),
    name: "You",
    status: "just now",
    content,
    category: currentFilter,
    image: imageData ? URL.createObjectURL(imageData) : null,
    location: locationInput.value,
    avatar: "Media/John.JPG",
    likes: 0,
    comments: [],
  };

  posts.unshift(newPost);
  savePostsToStorage(posts);
 // await postToServer(newPost); //  Simulate saving to backend
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
          </div>
          <div class="content">
            <p>${post.content}</p>
            ${post.image ? `<img src="${post.image}" class="post-img" />` : ""}
            ${post.location ? `<span class="location">📍 ${post.location}</span>` : ""}
          </div>
          <div class="interactions">
            <button class="like" data-id="${post.id}"><img src="Media/like.png" /><span>Like (${post.likes})</span></button>
            <button class="comment-toggle" data-id="${post.id}"><img src="Media/comment.png" /><span>Comment (${post.comments.length})</span></button>
            <button class="share" data-id="${post.id}"><img src="Media/share.png" /><span>Share</span></button>
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

      document.querySelectorAll(".share").forEach((btn) => {
        btn.addEventListener("click", () => {
          const postEl = btn.closest(".post");
          const text = postEl.querySelector(".content p")?.textContent || "Check this out!";
          const url = window.location.href;
      
          if (navigator.share) {
            navigator.share({
              title: "Student Community Post",
              text: text,
              url: url
            }).then(() => {
              console.log("Post shared successfully");
            }).catch((err) => {
              console.error("Error sharing post:", err);
            });
          } else {
            // Fallback: copy post text to clipboard
            navigator.clipboard.writeText(`${text}\n${url}`);
            alert("Post copied to clipboard. Share it anywhere!");
          }
        });
      });
    }
   
    
    async function convertToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    }
  
  
    renderPosts();
  });

  //In case of using a database and backend we can uncomment and modify the below code 
  // async function postToServer(post) {
  //   try {
  //     await fetch("./Docs/communitypost.json", {
  //       method: "POST", // for a proper backend
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(post),
  //     });
  //   } catch (err) {
  //     console.warn("Simulated post to JSON (not saved, no backend):", post);
  //   }
  // }
  