<?php
/**
 * AUTHOR: Kobina Kyereboah-Coleman
 */
session_start();
require 'config.php'; // Include the database connection file

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fname = trim($_POST['firstname']);
    $lname = trim($_POST['lastname']);
    $username = trim($_POST['username']);
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);
    $confirm_password = trim($_POST['confirm_password']);
    $role = 2; // Regular user role
    $created_at = $updated_at = date("Y-m-d H:i:s");

    $errors = [];

    // Validation
    if (empty($fname)) $errors[] = "First name is required.";
    if (empty($lname)) $errors[] = "Last name is required.";
    if (empty($username)) $errors[] = "Username is required.";
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = "A valid email is required.";
    if (empty($password) || strlen($password) < 8) $errors[] = "Password must be at least 8 characters.";
    if ($password !== $confirm_password) $errors[] = "Passwords do not match.";

    if (empty($errors)) {
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        try {
            // Check for duplicate email
            $stmt = $conn->prepare("SELECT COUNT(*) FROM users WHERE email = :email");
            $stmt->bindParam(':email', $email);
            $stmt->execute();
            if ($stmt->fetchColumn() > 0) {
                $errors[] = "The email address is already registered.";
            } else {
                // Insert new user
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

                // Redirect on success
                header("Location: login.html");
                exit;
            }
        } catch (PDOException $e) {
            $errors[] = "Database error: " . $e->getMessage();
        }
    }

    foreach ($errors as $error) {
        echo "<p class='error'>$error</p>";
    }
}
?>
