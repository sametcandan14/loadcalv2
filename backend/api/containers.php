<?php
// backend/api/containers.php

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
    // Tüm konteynerleri listele
    $stmt = $pdo->query("SELECT * FROM containers ORDER BY created_at DESC");
    $containers = $stmt->fetchAll(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');
    echo json_encode($containers);
    exit;
}

if ($method === 'POST') {
    // Yeni konteyner ekle
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['name'], $data['width'], $data['height'], $data['length'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Eksik veri']);
        exit;
    }

    $stmt = $pdo->prepare("INSERT INTO containers (name, width, height, length) VALUES (?, ?, ?, ?)");
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

    $stmt = $pdo->prepare("UPDATE containers SET name = ?, width = ?, height = ?, length = ? WHERE id = ?");
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

    $stmt = $pdo->prepare("DELETE FROM containers WHERE id = ?");
    $stmt->execute([$id]);

    echo json_encode(['success' => true]);
    exit;
}

// Tanımlı olmayan method ise 405 dön
http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
exit;
