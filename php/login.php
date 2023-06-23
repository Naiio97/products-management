<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$user = $_POST['user'];
$pass = $_POST['pass'];

$sql = "SELECT * FROM users WHERE user = :user";
$stmt = $conn->prepare($sql);
$stmt->bindValue(':user', $user);
$stmt->execute();

if ($stmt->rowCount() != 0) {
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    if($pass === $row['pass']){
        $result = "Logged in successfully! Redirecting...";
    } else {
        $result = "Invalid password!";
    }
} else {
    $result = "Invalid username!";
}

$response = ['message' => $result];
echo json_encode($response);
