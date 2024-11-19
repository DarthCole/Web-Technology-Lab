<?php
session_start();
require '../db/config.php';
require '../functions/auth_functions.php';

// Only allow access to super admin (role = 1)
if ($_SESSION['role'] != 1) {
    header("Location: ../index.php");
    exit();
}

$conn = connectDB();
$stmt = $conn->prepare("SELECT user_id, fname, lname, email, role, created_at FROM users");
$stmt->execute();
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage Users</title>
    <link rel="stylesheet" href="../assets/css/styles.css">
</head>
<body>
    <h1>User Management</h1>
    <table>
        <thead>
            <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Created At</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($users as $user): ?>
            <tr>
                <td><?= htmlspecialchars($user['fname'] . ' ' . $user['lname']) ?></td>
                <td><?= htmlspecialchars($user['email']) ?></td>
                <td><?= $user['role'] == 1 ? 'Super Admin' : 'Admin' ?></td>
                <td><?= htmlspecialchars($user['created_at']) ?></td>
                <td>
                    <form action="../actions/delete_user.php" method="post">
                        <input type="hidden" name="user_id" value="<?= $user['user_id'] ?>">
                        <button type="submit">Delete</button>
                    </form>
                </td>
            </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</body>
</html>
