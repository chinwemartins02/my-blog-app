const API_URL = "http://localhost/wordpress/wp-json/wp/v2/posts";

// Load posts on homepage
if (document.getElementById("posts")) {
  fetch(API_URL)
    .then(res => res.json())
    .then(posts => {
      let output = "";

      posts.forEach(post => {
        output += `
          <div class="post-card">
            <h3>${post.title.rendered}</h3>
            <div>${post.excerpt.rendered}</div>
            <a href="post.html?id=${post.id}">Read More</a>
          </div>
        `;
      });

      document.getElementById("posts").innerHTML = output;
    })
    .catch(err => console.log("Error:", err));
}

// Load single post
const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

if (postId) {
  fetch(`${API_URL}/${postId}`)
    .then(res => res.json())
    .then(post => {
      document.getElementById("title").innerHTML = post.title.rendered;
      document.getElementById("content").innerHTML = post.content.rendered;
    });
}
