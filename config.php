<?php
// Local configuration for database connection
$servername = "localhost"; // Or your remote server address
$username = "kobina.coleman";
$password = "passwird2";
$dbname = "webtech_fall2024_kobina_coleman";

// Create a new connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Verify whether or not the connection was successful
if ($conn->connect_error) {
    die("Connection Failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $errors = [];

    // Sample validation logic
    if (empty($_POST["username"])) {
        $errors[] = "Username is required.";
    }
    if (empty($_POST["email"]) || !filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Valid email is required.";
    }
    if (empty($_POST["password"]) || strlen($_POST["password"]) < 6) {
        $errors[] = "Password must be at least 8 characters.";
    }

    if (empty($errors)) {
        // Proceed with other logic if no errors
    } else {
        foreach ($errors as $error) {
            echo "<p>$error</p>"; // Display error messages
        }
    }
}
?>