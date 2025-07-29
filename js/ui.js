function toggleForms() {
  document.getElementById("login-form").classList.toggle("hidden");
  document.getElementById("register-form").classList.toggle("hidden");
}

document.getElementById("login-form").onsubmit = async (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const pass = document.getElementById("login-pass").value;
  try {
    const tree = await loginUser(email, pass);
    sessionStorage.setItem("email", email);
    document.getElementById("tree-data").value = JSON.stringify(tree, null, 2);
    document.getElementById("auth-section").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");
  } catch (err) {
    alert("Login failed: " + err.message);
  }
};

document.getElementById("register-form").onsubmit = async (e) => {
  e.preventDefault();
  const email = document.getElementById("reg-email").value;
  const pass = document.getElementById("reg-pass").value;
  const phone = document.getElementById("reg-phone").value;
  try {
    await registerUser(email, pass, phone);
    alert("Registered. You can now login.");
    toggleForms();
  } catch (err) {
    alert("Registration failed: " + err.message);
  }
};

async function saveTree() {
  const email = sessionStorage.getItem("email");
  if (!email) return alert("User session expired.");
  try {
    const tree = JSON.parse(document.getElementById("tree-data").value);
    await saveUserTree(email, tree);
    alert("Tree saved successfully");
  } catch (err) {
    alert("Save failed: " + err.message);
  }
}
