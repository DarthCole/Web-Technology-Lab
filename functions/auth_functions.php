<?php
require_once '../db/config.php';
function registerUser($fname, $lname, $username, $email, $password, $role = 2) {
    $conn = connectDB();
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Check for duplicate email
    $stmt = $conn->prepare("SELECT COUNT(*) FROM users WHERE email = :email");
    $stmt->bindParam(':email', $email);
    $stmt->execute();
    if ($stmt->fetchColumn() > 0) {
        return "The email address is already registered.";
    }

    // Insert new user
    $stmt = $conn->prepare("INSERT INTO users (fname, lname, username, email, password, role, created_at, updated_at)
                            VALUES (:fname, :lname, :username, :email, :password, :role, NOW(), NOW())");
    $stmt->bindParam(':fname', $fname);
    $stmt->bindParam(':lname', $lname);
    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':password', $hashed_password);
    $stmt->bindParam(':role', $role);
    
    return $stmt->execute() ? "Registration successful!" : "Error registering user.";
}

function authenticateUser($email, $password) {
    $conn = connectDB();
    $stmt = $conn->prepare("SELECT id, fname, lname, role, password FROM users WHERE email = :email");
    $stmt->bindParam(':email', $email);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['password'])) {
        // Set session variables
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['fname'] = $user['fname'];
        $_SESSION['lname'] = $user['lname'];
        $_SESSION['role'] = $user['role'];
        return true;
    }
    return false;
}
?>
