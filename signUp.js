document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form values
  const fullName = document.getElementById("fullName").value.trim();
  const username = document.getElementById("signupUsername").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("signupPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // 1. Check empty fields
  if (!fullName || !username || !email || !password || !confirmPassword) {
    alert("⚠️ Please fill in all fields.");
    return;
  }

  // 2. Check password length
  if (password.length < 6) {
    alert("⚠️ Password must be at least 6 characters long.");
    return;
  }

  // 3. Confirm passwords match
  if (password !== confirmPassword) {
    alert("⚠️ Passwords do not match.");
    return;
  }

  // 4. Get existing users or empty array
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if username OR email already exists
  const existingUser = users.find(
    (user) => user.username === username || user.email === email
  );
  if (existingUser) {
    alert("⚠️ Username or email already registered. Please login.");
    return;
  }

  // 5. Save new user
  users.push({ fullName, username, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("✅ Signup successful! You can now login.");

  // 6. Redirect to login page
  window.location.href = "login.html";
});
