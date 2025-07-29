const API_BASE = "https://832653e8-familytree-api.surajit-familytree.workers.dev";

async function apiPost(path, data) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.text().then(text => {
    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  });
}

async function registerUser(email, pass, phone) {
  return apiPost("/register", { email, pass, phone });
}

async function loginUser(email, pass) {
  return apiPost("/login", { email, pass });
}

async function saveUserTree(email, tree) {
  return apiPost("/save", { email, tree });
}
