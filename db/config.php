<?php
// Database connection using PDO (recommended for prepared statements)
function connectDB() {
    $host = 'localhost'; // Database host
    $dbname = 'webtech_fall2024_kobina_coleman'; // Your database name
    $username = 'kobina.coleman'; // Your database username
    $password = 'passwird2'; // Your database password

    try {
        $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $conn;
    } catch (PDOException $e) {
        die("Database connection failed: " . $e->getMessage());
    }
}
?>
