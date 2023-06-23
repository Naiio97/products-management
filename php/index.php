
<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "GET":
        $sql = "SELECT * FROM product";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if (isset($path[3]) && is_numeric($path[3])) {
            $sql .= " WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);
            $stmt->execute();
            $products = $stmt->fetch(PDO::FETCH_ASSOC);
            $products['image'] = 'http://localhost/php/' . $products['image'];
        } else {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
            foreach ($products as &$product) {
                $product['image'] = 'http://localhost/php/' . $product['image'];
            }
            unset($product);
        }

        echo json_encode($products);
        break;

    case "DELETE":
        $sql = "DELETE FROM product WHERE id = :id";
        $path = explode('/', $_SERVER['REQUEST_URI']);

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[3]);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to delete record.'];
        }
        echo json_encode($response);
        break;

        case "POST":
            if (isset($_POST['id'])) {
                $id = $_POST['id'];
                $name = $_POST['name'];
                $detail = $_POST['detail'];
        
                $sql = "UPDATE product SET name = :name, detail = :detail";
        
                if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
                    $image = $_FILES['image'];
        
                    $targetDir = "images/";
                    $targetFile = $targetDir . basename($image['name']);
                    move_uploaded_file($image['tmp_name'], $targetFile);
                    $imagePath = $targetFile;
        
                    $sql .= ", image = :image";
                }
        
                $sql .= " WHERE id = :id";
        
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':id', $id);
                $stmt->bindParam(':name', $name);
                $stmt->bindParam(':detail', $detail);
        
                if (isset($imagePath)) {
                    $stmt->bindParam(':image', $imagePath);
                }
        
                if ($stmt->execute()) {
                    $response = ['status' => 1, 'message' => 'Record updated successfully.'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to update record.'];
                }
            } else {
                $name = $_POST['name'];
                $detail = $_POST['detail'];
        
                if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
                    $image = $_FILES['image'];
        
                    $targetDir = "images/";
                    $targetFile = $targetDir . basename($image['name']);
                    move_uploaded_file($image['tmp_name'], $targetFile);
                    $imagePath = $targetFile;
                } else {
                    $imagePath = null;
                }
        
                $sql = "INSERT INTO product(name, detail, image) VALUES(:name, :detail, :image)";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':name', $name);
                $stmt->bindParam(':detail', $detail);
                $stmt->bindParam(':image', $imagePath);

                var_dump($stmt);
                if ($stmt->execute()) {
                    $response = ['status' => 1, 'message' => 'Record created successfully.'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to create record.'];
                }
            }
        
            echo json_encode($response);
            break;
        }