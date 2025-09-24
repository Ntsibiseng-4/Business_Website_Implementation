// Check admin session
const currentAdmin = JSON.parse(localStorage.getItem("currentAdmin"));
if (!currentAdmin) {
  alert("Please log in as admin to access this page.");
  window.location.href = "login.html";
}

// Logout button
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("currentAdmin");
  window.location.href = "login.html";
});

// Elements
const tableBody = document.querySelector("#requestsTable tbody");
const serviceFilter = document.getElementById("serviceFilter");

let serviceRequests = JSON.parse(localStorage.getItem("serviceRequests")) || [];

// Function to generate details string based on service type
function getRequestDetails(req) {
  if (req.service === "CV Poster") {
    return `Full Name: ${req.fullName}, Email: ${req.email}, Phone: ${req.phone}, Education: ${req.education}, Experience: ${req.experience}, Skills: ${req.skills}`;
  } else if (req.service === "Printing") {
    return `Document: ${req.documentName}, Pages: ${req.numPages}, Color: ${req.colorOption}, Notes: ${req.instructions}`;
  } else if (req.service === "Website Assistance") {
    return `Business: ${req.businessName}, Type: ${req.websiteType}, Design Pref: ${req.designPref}, Contact: ${req.contact}`;
  } else {
    return "-";
  }
}

// Function to display requests in table
function displayRequests(filter = "all") {
  tableBody.innerHTML = "";
  serviceRequests
    .filter((req) => filter === "all" || req.service === filter)
    .forEach((req) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${req.user}</td>
                <td>${req.service}</td>
                <td>${getRequestDetails(req)}</td>
                <td>${req.requestedAt}</td>
            `;
      tableBody.appendChild(row);
    });
}

// Initial display
displayRequests();

// Filter change
serviceFilter.addEventListener("change", () => {
  displayRequests(serviceFilter.value);
});
