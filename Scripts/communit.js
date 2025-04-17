// JavaScript for Student Community Page

document.addEventListener("DOMContentLoaded", () => {
    const postBtn = document.querySelector(".actions .post");
    const postInput = document.querySelector(".post-creator .input p");
    const postsContainer = document.querySelector(".posts > .container");
  
    const filters = document.querySelectorAll(".filters button");
    let currentFilter = "All Posts";
  
    const posts = [];
  
    postBtn.addEventListener("click", () => {
      const content = postInput.textContent.trim();
      if (content === "") return;
  
      const newPost = {
        name: "You",
        status: "just now",
        content,
        category: currentFilter,
      };
  
      posts.unshift(newPost);
      renderPosts();
      postInput.textContent = "";
    });
  
    filters.forEach(btn => {
      btn.addEventListener("click", () => {
        filters.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentFilter = btn.textContent;
        renderPosts();
      });
    });
  
    function renderPosts() {
      postsContainer.innerHTML = "";
      const visiblePosts = currentFilter === "All Posts" ? posts : posts.filter(p => p.category === currentFilter);
  
      visiblePosts.forEach(post => {
        const postEl = document.createElement("article");
        postEl.className = "post";
        postEl.innerHTML = `
          <div class="user">
            <div class="avatar" style="background-image: url('Media/Katie.jpg')"></div>
            <div class="info">
              <span class="name">${post.name}</span>
              <span class="status">${post.status}</span>
            </div>
            <img src="Media/online.png" alt="status" class="status-icon" />
          </div>
          <div class="content">
            <p>${post.content}</p>
          </div>
          <div class="interactions">
            <button class="like"><img src="Media/like.png" alt="Like" /><span>Like</span></button>
            <button class="comment"><img src="Media/comment.png" alt="Comment" /><span>Comment</span></button>
            <button class="share"><img src="Media/share.png" alt="Share" /><span>Share</span></button>
          </div>`;
        postsContainer.appendChild(postEl);
      });
    }
  });
  