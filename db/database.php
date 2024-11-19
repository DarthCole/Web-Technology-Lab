<?php
// Configuration for the database connection
$servername = "localhost"; // Or your remote server address
$db_username = "kobina.coleman"; // Database username
$db_password = "passwird2"; // Database password
$dbname = "webtech_fall2024_kobina_coleman";

try {
    // Create a new PDO connection
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $db_username, $db_password);
    // Set PDO error mode to exception for better error handling
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage()); // Terminate script if the connection fails
}
?>
