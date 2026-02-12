export const API_BASE = "http://localhost/wordpress/wp-json";

export const endpoints = {
  login: `${API_BASE}/jwt-auth/v1/token`,
  posts: `${API_BASE}/wp/v2/posts`
};
