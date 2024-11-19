<?php
/**
 * AUTHOR: Kobina Kyereboah-Coleman
 */
session_start();
require 'config.php'; // Database configuration and connection file

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form input and trim whitespace
    $fname = trim($_POST['fname']);
    $lname = trim($_POST['lname']);
    $username = trim($_POST['username']);
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);
    $confirm_password = trim($_POST['confirm_password']);
    $role = 2; // Set the initial user role to 2 (Regular Admin)
    $created_at = $updated_at = date("Y-m-d H:i:s");

    $errors = [];

    // Server-side validation
    if (empty($fname)) {
        $errors[] = "First name is required.";
    }
    if (empty($lname)) {
        $errors[] = "Last name is required.";
    }
    if (empty($username)) {
        $errors[] = "Username is required.";
    }
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "A valid email address is required.";
    }
    if (empty($password) || strlen($password) < 6) {
        $errors[] = "Password must be at least 6 characters.";
    }
    if ($password !== $confirm_password) {
        $errors[] = "Passwords do not match.";
    }

    if (empty($errors)) {
        // Hash the password
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        try {
            // Connect to the database
            $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Check for duplicate email
            $stmt = $conn->prepare("SELECT COUNT(*) FROM users WHERE email = :email");
            $stmt->bindParam(':email', $email);
            $stmt->execute();
            $email_count = $stmt->fetchColumn();

            if ($email_count > 0) {
                $errors[] = "The email address is already registered.";
            } else {
                // Insert new user using prepared statements
                $stmt = $conn->prepare("INSERT INTO users (fname, lname, username, email, password, role, created_at, updated_at) 
                                        VALUES (:fname, :lname, :username, :email, :password, :role, :created_at, :updated_at)");
                $stmt->bindParam(':fname', $fname);
                $stmt->bindParam(':lname', $lname);
                $stmt->bindParam(':username', $username);
                $stmt->bindParam(':email', $email);
                $stmt->bindParam(':password', $hashed_password);
                $stmt->bindParam(':role', $role);
                $stmt->bindParam(':created_at', $created_at);
                $stmt->bindParam(':updated_at', $updated_at);

                $stmt->execute();

                // Redirect or display success message
                echo "Registration successful!";
            }
        } catch (PDOException $e) {
            $errors[] = "Database error: " . $e->getMessage();
        }
    }

    // Display errors if any
    if (!empty($errors)) {
        foreach ($errors as $error) {
            echo "<p class='error'>$error</p>";
        }
    }
}
?>