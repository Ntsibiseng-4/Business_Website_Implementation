// Check admin session
const currentAdmin = JSON.parse(localStorage.getItem("currentAdmin"));
if (!currentAdmin) {
  alert("Please log in as admin to access this page.");
  window.location.href = "adminLogin.html";
}

// Logout button
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("currentAdmin");
  window.location.href = "adminLogin.html";
});

const tableBody = document.querySelector("#requestsTable tbody");
const serviceFilter = document.getElementById("serviceFilter");

let serviceRequests = JSON.parse(localStorage.getItem("serviceRequests")) || [];

function getRequestDetails(req) {
  switch (req.service) {
    case "CV Poster":
      return `Full Name: ${req.fullName || "-"}, Email: ${
        req.email || "-"
      }, Education: ${req.education || "-"}, Experience: ${
        req.experience || "-"
      }, Skills: ${req.skills || "-"}`;
    case "Printing":
      return `Document: ${req.documentName || "-"}, Pages: ${
        req.numPages || "-"
      }, Color: ${req.colorOption || "-"}, Notes: ${req.instructions || "-"}`;
    case "Website Assistance":
      return `Business: ${req.businessName || "-"}, Type: ${
        req.websiteType || "-"
      }, Design Pref: ${req.designPref || "-"}, Contact: ${req.contact || "-"}`;
    case "University Applications":
      return `Course: ${req.course || "-"}, Institution: ${
        req.institution || "-"
      }, Requirements: ${req.requirements || "-"}`;
    case "Job Search Support":
      return `Field: ${req.jobField || "-"}, Location: ${
        req.location || "-"
      }, Resume: ${req.resume || "-"}`;
    default:
      return "-";
  }
}

function loadRequests(filter = "all") {
  tableBody.innerHTML = "";

  let filteredRequests = serviceRequests;
  if (filter !== "all") {
    filteredRequests = serviceRequests.filter((req) => req.service === filter);
  }

  if (filteredRequests.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="7" style="text-align:center;">No requests found.</td></tr>`;
    return;
  }

  filteredRequests.forEach((req, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${req.user || "-"}</td>
      <td>${req.service || "-"}</td>
      <td>${
        req.cvFile
          ? `<button class="download-btn" data-index="${index}">Download</button>`
          : "No document"
      }</td>
      <td>${req.requestedAt || "-"}</td>
      <td>${getRequestDetails(req)}</td>
      <td>${req.contact || "-"}</td>
      <td>${req.receivingMethod || "-"}</td>
    `;

    tableBody.appendChild(row);
  });

  // Add download functionality
  document.querySelectorAll(".download-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const idx = e.target.getAttribute("data-index");
      const fileData = serviceRequests[idx].cvFile;

      if (fileData) {
        const a = document.createElement("a");
        a.href = fileData;
        a.download = `${serviceRequests[idx].documentName || "document"}`;
        a.click();
      }
    });
  });
}

// Initial load
loadRequests();

// Filter by service type
serviceFilter.addEventListener("change", () => {
  loadRequests(serviceFilter.value);
});
