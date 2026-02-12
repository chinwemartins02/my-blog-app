const API_URL = "http://localhost/wordpress/wp-json/jwt-auth/v1/token";

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  })
  .then(res => res.json())
  .then(data => {
    if (data.token) {
      localStorage.setItem("token", data.token);
      window.location.href = "dashboard.html";
    } else {
      document.getElementById("msg").innerText = "Invalid login";
    }
  })
  .catch(() => {
    document.getElementById("msg").innerText = "Server error";
  });
}
