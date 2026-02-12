const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
}

const POSTS_URL = "http://localhost/wordpress/wp-json/wp/v2/posts";

function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

// CREATE POST
function createPost() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  fetch(POSTS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      title,
      content,
      status: "publish"
    })
  })
  .then(res => res.json())
  .then(() => {
    loadPosts();
    alert("Post created!");
  });
}

// LOAD POSTS
function loadPosts() {
  fetch(POSTS_URL, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  .then(res => res.json())
  .then(posts => {
    let html = "";
    posts.forEach(post => {
      html += `
        <div class="dash-post">
          <h4>${post.title.rendered}</h4>
          <button onclick="deletePost(${post.id})">Delete</button>
        </div>
      `;
    });
    document.getElementById("postList").innerHTML = html;
  });
}

// DELETE POST
function deletePost(id) {
  fetch(`${POSTS_URL}/${id}?force=true`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }).then(() => loadPosts());
}

loadPosts();
