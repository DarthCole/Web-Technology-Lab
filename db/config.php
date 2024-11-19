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
?>