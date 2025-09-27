document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const errorMsg = document.getElementById("loginErrorMsg");

  let users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(
    (u) =>
      (u.username === username || u.email === username) &&
      u.password === password
  );

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    window.location.href = "Customerdashboard.html";
  } else {
    errorMsg.textContent = "❌ Invalid username or password!";
    errorMsg.style.display = "block";
  }
});

//A database to store the users' login details
