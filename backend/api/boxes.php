<?php
// backend/api/boxes.php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PUT");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// OPTIONS preflight isteğine cevap ver (ön kontrol)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}



require_once('../config.php');
$pdo->exec("PRAGMA foreign_keys = ON");

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // Tüm kutuları listele
    $stmt = $pdo->query("SELECT * FROM boxes ORDER BY created_at DESC");
    $boxes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');
    echo json_encode($boxes);
    exit;
}

if ($method === 'POST') {
    // Yeni kutu ekle
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['name'], $data['width'], $data['height'], $data['length'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Eksik veri']);
        exit;
    }

    $stmt = $pdo->prepare("INSERT INTO boxes (name, width, height, length) VALUES (?, ?, ?, ?)");
    $stmt->execute([
        $data['name'],
        $data['width'],
        $data['height'],
        $data['length']
    ]);

    echo json_encode(['success' => true]);
    exit;
}



if ($method === 'PUT') {
    // PUT ile güncelleme
    parse_str($_SERVER['QUERY_STRING'], $queryParams);
    $id = $queryParams['id'] ?? null;

    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'ID belirtilmedi']);
        exit;
    }

    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['name'], $data['width'], $data['height'], $data['length'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Eksik veri']);
        exit;
    }

    $stmt = $pdo->prepare("UPDATE boxes SET name = ?, width = ?, height = ?, length = ? WHERE id = ?");
    $stmt->execute([
        $data['name'],
        $data['width'],
        $data['height'],
        $data['length'],
        $id
    ]);

    echo json_encode(['success' => true]);
    exit;
}

if ($method === 'DELETE') {
    parse_str($_SERVER['QUERY_STRING'], $queryParams);
    $id = $queryParams['id'] ?? null;

    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'ID belirtilmedi']);
        exit;
    }

    $stmt = $pdo->prepare("DELETE FROM boxes WHERE id = ?");
    $stmt->execute([$id]);

    echo json_encode(['success' => true]);
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);