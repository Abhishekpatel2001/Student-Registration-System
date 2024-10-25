// Function to load data from localStorage and display it
function loadStudentData() {
    const studentData = JSON.parse(localStorage.getItem('students')) || [];
    const table = document.getElementById('studentTable').getElementsByTagName('tbody')[0];
    table.innerHTML = '';  // Clear the table before re-rendering

    studentData.forEach((student, index) => {
        const newRow = table.insertRow();

        const nameCell = newRow.insertCell(0);
        const idCell = newRow.insertCell(1);
        const emailCell = newRow.insertCell(2);
        const contactCell = newRow.insertCell(3);
        const actionsCell = newRow.insertCell(4);

        nameCell.textContent = student.name;
        idCell.textContent = student.id;
        emailCell.textContent = student.email;
        contactCell.textContent = student.contact;

        actionsCell.innerHTML = `<button class="edit">Edit</button> <button class="delete">Delete</button>`;

        // Add delete functionality
        actionsCell.querySelector('.delete').addEventListener('click', function () {
            deleteStudent(index);
        });

        // Add edit functionality
        actionsCell.querySelector('.edit').addEventListener('click', function () {
            editStudent(index, student);
        });
    });
}

// Function to save data to localStorage
function saveStudentData(studentData) {
    localStorage.setItem('students', JSON.stringify(studentData));
}

// Function to delete a student entry
function deleteStudent(index) {
    const studentData = JSON.parse(localStorage.getItem('students')) || [];
    studentData.splice(index, 1);  // Remove the student at the given index
    saveStudentData(studentData);
    loadStudentData();  // Reload the table
}

// Function to edit a student entry
function editStudent(index, student) {
    document.getElementById('studentName').value = student.name;
    document.getElementById('studentId').value = student.id;
    document.getElementById('email').value = student.email;
    document.getElementById('contact').value = student.contact;

    deleteStudent(index);  // Remove the old entry before editing
}

// Function to check if the Student ID is unique
function isStudentIdUnique(id) {
    const studentData = JSON.parse(localStorage.getItem('students')) || [];
    return !studentData.some(student => student.id === id);  // Return false if ID exists
}

// Handle form submission
document.getElementById('studentForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const studentName = document.getElementById('studentName').value;
    const studentId = document.getElementById('studentId').value;
    const email = document.getElementById('email').value;
    const contact = document.getElementById('contact').value;

    // Check if Student ID is unique
    if (!isStudentIdUnique(studentId,contact)) {
        alert('Student ID must be unique. Please enter a different ID.');
        return;  // Stop form submission if ID is not unique
    }

    const studentData = JSON.parse(localStorage.getItem('students')) || [];

    // Add the new student to the array
    studentData.push({
        name: studentName,
        id: studentId,
        email: email,
        contact: contact
    });

    // Save the updated student data to localStorage
    saveStudentData(studentData);

    // Reload the student data and clear the form
    loadStudentData();
    document.getElementById('studentForm').reset();
});

// Load the student data when the page is loaded
window.onload = function () {
    loadStudentData();
};
