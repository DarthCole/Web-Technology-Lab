/* -------------------------------------------------
    EVENT LISTENER FOR DOM CONTENT LOADED:
    Ensures the following code is executed only after the 
    DOM (Document Object Model) has fully loaded.
------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
    
    // -------------------------------------------------
    // Bar Chart for Recipe Analytics:
    // Displays a bar chart showing the number of recipes created each month.
    // -------------------------------------------------
    const ctx = document.getElementById('recipeChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [{
                label: 'Recipes Created Per Month',
                data: [5, 12, 8, 6, 9, 13, 14, 15, 10, 8, 6, 12],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // -------------------------------------------------
    // Pie Chart for User Demographics:
    // Displays a pie chart that shows the distribution of users by country.
    // -------------------------------------------------
    const countryCtx = document.getElementById('userCountryChart').getContext('2d');
    new Chart(countryCtx, {
        type: 'pie',
        data: {
            labels: ['Kenya', 'Ghana', 'South Africa', 'Nigeria', 'England'],
            datasets: [{
                label: 'Users by Country',
                data: [50, 30, 25, 20, 25],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)', 
                    'rgba(54, 162, 235, 0.6)', 
                    'rgba(255, 206, 86, 0.6)', 
                    'rgba(75, 192, 192, 0.6)', 
                    'rgba(153, 102, 255, 0.6)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                }
            }
        }
    });

    // -------------------------------------------------
    // Line Chart for Membership Growth:
    // Displays a line chart showing the growth of new members over the past 6 months.
    // -------------------------------------------------
    const growthCtx = document.getElementById('membershipGrowthChart').getContext('2d');
    new Chart(growthCtx, {
        type: 'line',
        data: {
            labels: ['May', 'June', 'July', 'August', 'September', 'October'],
            datasets: [{
                label: 'New Members',
                data: [12, 19, 3, 5, 2, 10],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // -------------------------------------------------
    // Render Dummy Recipe Data:
    // Calls the function to render the dummy recipes in the table.
    // -------------------------------------------------
    renderRecipes();

    // -------------------------------------------------
    // Render Dummy User Data:
    // Calls the function to render the dummy users in the table.
    // -------------------------------------------------
    renderUsers();

    // -------------------------------------------------
    // Add validation for the edit user form
    // -------------------------------------------------
    const editForm = document.getElementById("edit-user-form");
    if (editForm) {
        editForm.addEventListener("submit", (event) => {
            event.preventDefault(); // Prevent form submission for validation
            validateEditForm();
        });
    }
});

/* -------------------------------------------------
    DUMMY DATA FOR RECIPES:
    Array of objects containing sample data for recipes.
------------------------------------------------- */
const recipeData = [
    { id: 1, title: "Spaghetti Bolognese", author: "John Doe", dateCreated: "2024-01-12" },
    { id: 2, title: "Chicken Curry", author: "Jane Smith", dateCreated: "2024-02-24" },
    { id: 3, title: "Vegetable Stir Fry", author: "Alice Johnson", dateCreated: "2024-03-10" },
    { id: 4, title: "Beef Tacos", author: "Michael Brown", dateCreated: "2024-04-04" },
    { id: 5, title: "Fish and Chips", author: "Emily White", dateCreated: "2024-05-18" },
    { id: 6, title: "Chocolate Cake", author: "Chris Green", dateCreated: "2024-06-20" },
];

/* -------------------------------------------------
    FUNCTION TO RENDER RECIPES:
    Dynamically generates table rows using the recipe data.
------------------------------------------------- */
function renderRecipes() {
    const recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = ''; // Clear existing rows
    recipeData.forEach(recipe => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${recipe.id}</td>
            <td>${recipe.title}</td>
            <td>${recipe.author}</td>
            <td>${recipe.dateCreated}</td>
            <td>
                <button onclick="viewMoreRecipe(${recipe.id})">View More</button>
                <button onclick="editRecipe(${recipe.id})">Edit</button>
                <button onclick="confirmDeleteRecipe(${recipe.id})">Delete</button>
            </td>
        `;
        recipeList.appendChild(row);
    });
}

/* -------------------------------------------------
    FUNCTIONS TO EDIT, DELETE AND VIEW RECIPES:
    Simulates the editing, viewing and deleting of recipes.
------------------------------------------------- */
function viewMoreRecipe(id) {
    alert(`Viewing more details for recipe with ID: ${id}`);
}

function editRecipe(id) {
    alert(`Editing recipe with ID: ${id}`);
}

function confirmDeleteRecipe(id) {
    if (confirm('Are you sure you want to delete this recipe?')) {
        deleteRecipe(id);
    }
}

function deleteRecipe(id) {
    alert(`Recipe with ID ${id} has been deleted.`);
    // Logic to remove the recipe from the array and re-render the list
    recipeData = recipeData.filter(recipe => recipe.id !== id);
    renderRecipes(); // Re-render after deletion
}

/* -------------------------------------------------
    DUMMY DATA FOR USERS:
    Array of objects containing sample data for users.
------------------------------------------------- */
let userData = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com" },
    { id: 4, name: "Michael Brown", email: "michael@example.com" },
    { id: 5, name: "Emily White", email: "emily@example.com" },
    { id: 6, name: "Chris Green", email: "chris@example.com" },
];

/* -------------------------------------------------
    FUNCTION TO RENDER USERS:
    Dynamically generates table rows using the user data.
------------------------------------------------- */
function renderUsers() {
    const userList = document.getElementById('user-list');
    userList.innerHTML = ''; // Clear existing rows
    userData.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>
                <button onclick="viewMoreUser(${user.id})">View More</button>
                <button onclick="editUser(${user.id})">Edit</button>
                <button onclick="confirmDeleteUser(${user.id})">Delete</button>
            </td>
        `;
        userList.appendChild(row);
    });
}

/* -------------------------------------------------
    FUNCTIONS TO EDIT, DELETE, AND VIEW USERS:
    Simulates the editing, viewing, and deleting of users.
------------------------------------------------- */
function viewMoreUser(id) {
    alert(`Viewing more details for user with ID: ${id}`);
}

function editUser(id) {
    alert(`Editing user with ID: ${id}`);
}

function confirmDeleteUser(id) {
    if (confirm('Are you sure you want to delete this user?')) {
        deleteUser(id);
    }
}

function deleteUser(id) {
    alert(`User with ID ${id} has been deleted.`);
    // Logic to remove the user from the array and re-render the list
    userData = userData.filter(user => user.id !== id);
    renderUsers(); // Re-render after deletion
}

/* -------------------------------------------------
    FUNCTION TO VALIDATE EDIT USER FORM:
    Validates the name and email input fields on the edit user form.
------------------------------------------------- */
function validateEditForm() {
    const nameInput = document.getElementById("edit-name");
    const emailInput = document.getElementById("edit-email");

    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");

    let valid = true;

    // Clear previous error messages
    nameError.textContent = "";
    emailError.textContent = "";

    // Name validation
    if (nameInput.value.trim() === "") {
        nameError.textContent = "Name is required.";
        valid = false;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value)) {
        emailError.textContent = "Please enter a valid email address.";
        valid = false;
    }

    if (valid) {
        alert('User details are valid!');
    }
}
