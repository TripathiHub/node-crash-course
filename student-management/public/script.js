const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const response = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        const data = await response.json();

        if (response.ok) {
            window.location.href = "/dashboard.html";
        } else {
            document.getElementById("loginMessage").textContent = data.error;
        }
    });
}
const studentTableBody = document.getElementById("studentTableBody");

if (studentTableBody) {
    loadStudents();
}

async function loadStudents() {
    const response = await fetch("/students");

    const students = await response.json();

    studentTableBody.innerHTML = "";

    students.forEach((student) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.roll_no}</td>
            <td>${student.name}</td>
            <td>${student.branch}</td>
            <td>${student.semester}</td>
            <td>${student.email}</td>
            <td>
                <button onclick="editStudent(${student.id})">
                    Edit
                </button>

                <button onclick="deleteStudent(${student.id})">
                    Delete
                </button>
            </td>
        `;

        studentTableBody.appendChild(row);
    });
}
const addStudentBtn = document.getElementById("addStudentBtn");
const studentFormContainer = document.getElementById("studentFormContainer");
const cancelBtn = document.getElementById("cancelBtn");

if (addStudentBtn) {
    addStudentBtn.addEventListener("click", () => {
        studentFormContainer.style.display = "block";
    });
}

if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
        studentFormContainer.style.display = "none";
    });
}
const studentForm = document.getElementById("studentForm");

if (studentForm) {
    studentForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const student = {
            roll_no: document.getElementById("rollNo").value,
            name: document.getElementById("name").value,
            branch: document.getElementById("branch").value,
            semester: document.getElementById("semester").value,
            email: document.getElementById("email").value
        };

        const response = await fetch("/students", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
        });

        const data = await response.json();

        if (response.ok) {
            alert("Student added successfully!");

            studentForm.reset();
            studentFormContainer.style.display = "none";

            loadStudents();
        } else {
            alert(data.error);
        }
    });
}
async function editStudent(id) {
    const name = prompt("Enter new name:");
    const branch = prompt("Enter new branch:");
    const semester = prompt("Enter new semester:");
    const email = prompt("Enter new email:");

    if (!name || !branch || !semester || !email) {
        return;
    }

    // First get the existing student
    const response = await fetch("/students");

    const students = await response.json();

    const student = students.find((student) => student.id === id);

    if (!student) {
        alert("Student not found");
        return;
    }

    const updatedStudent = {
        roll_no: student.roll_no,
        name: name,
        branch: branch,
        semester: semester,
        email: email
    };

    const updateResponse = await fetch(`/students/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedStudent)
    });

    const data = await updateResponse.json();

    if (updateResponse.ok) {
        alert("Student updated successfully!");

        loadStudents();
    } else {
        alert(data.error);
    }
}
async function deleteStudent(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) {
        return;
    }

    const response = await fetch(`/students/${id}`, {
        method: "DELETE"
    });

    const data = await response.json();

    if (response.ok) {
        alert("Student deleted successfully!");

        loadStudents();
    } else {
        alert(data.error);
    }
}
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {

        const response = await fetch("/logout", {
            method: "POST"
        });

        if (response.ok) {
            window.location.href = "/";
        }
    });
}