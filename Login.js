document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const usernameOrEmail = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value;

  // Get selected role
  const role = document.querySelector('input[name="role"]:checked').value;

  if (role === "customer") {
    // Customer login
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) =>
        (u.username === usernameOrEmail || u.email === usernameOrEmail) &&
        u.password === password
    );

    if (user) {
      alert("✅ Customer login successful!");
      localStorage.setItem("currentUser", JSON.stringify(user));
      window.location.href = "dashboard.html"; // Customer dashboard
    } else {
      alert("❌ Invalid email or password for Customer!");
    }
  } else if (role === "admin") {
    // Admin login (hardcoded credentials)
    const ADMIN_USERNAME = "admin";
    const ADMIN_PASSWORD = "admin123";

    if (usernameOrEmail === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      alert("✅ Admin login successful!");
      localStorage.setItem(
        "currentAdmin",
        JSON.stringify({ username: ADMIN_USERNAME })
      );
      window.location.href = "admin.html"; // Admin dashboard
    } else {
      alert("❌ Invalid admin credentials!");
    }
  }
});

//A database to store the users' login details
