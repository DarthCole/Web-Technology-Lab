<?php
/**
 * AUTHOR: Kobina Kyereboah-Coleman
 */
session_start();
require 'config.php'; // Database configuration and connection file

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);
    $errors = [];

    // Server-side validation
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Please enter a valid email address.";
    }
    if (empty($password)) {
        $errors[] = "Password is required.";
    }

    if (empty($errors)) {
        try {
            // Connect to the database
            $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Verify user credentials using a prepared statement
            $stmt = $conn->prepare("SELECT id, fname, lname, role, password FROM users WHERE email = :email");
            $stmt->bindParam(':email', $email);
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($user && password_verify($password, $user['password'])) {
                // User authenticated successfully, set session variables
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['fname'] = $user['fname'];
                $_SESSION['lname'] = $user['lname'];
                $_SESSION['role'] = $user['role'];

                // Redirect based on user role
                if ($user['role'] == 1) {
                    header("Location: view/admin/dashboard.php");
                } else {
                    header("Location: view/admin/personal_dashboard.php"); // Adjust path as needed
                }
                exit;
            } else {
                $errors[] = "Invalid email or password.";
            }
        } catch (PDOException $e) {
            $errors[] = "Database error: " . $e->getMessage();
        }
    }
    
    if (!empty($errors)) {
        foreach ($errors as $error) {
            echo "<p class='error'>$error</p>"; // Display errors to the user
        }
    }
}
?>