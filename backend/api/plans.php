<?php
// backend/api/plans.php

require_once('../config.php');

// Foreign key desteğini aktif et
$pdo->exec("PRAGMA foreign_keys = ON");

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // Planları listele, kutu ve konteyner adlarıyla birlikte
    $stmt = $pdo->query("
        SELECT 
            plans.id, 
            plans.name, 
            containers.name AS container_name, 
            boxes.name AS box_name,
            plans.created_at
        FROM plans
        JOIN containers ON plans.container_id = containers.id
        JOIN boxes ON plans.box_id = boxes.id
        ORDER BY plans.created_at DESC
    ");

    $plans = $stmt->fetchAll(PDO::FETCH_ASSOC);
    header('Content-Type: application/json');
    echo json_encode($plans);
    exit;
}

if ($method === 'POST') {
    // Yeni plan ekle
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['name'], $data['container_id'], $data['box_id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Eksik veri']);
        exit;
    }

    $stmt = $pdo->prepare("INSERT INTO plans (name, container_id, box_id) VALUES (?, ?, ?)");
    $stmt->execute([
        $data['name'],
        $data['container_id'],
        $data['box_id']
    ]);

    echo json_encode(['success' => true]);
    exit;
}

// Diğer metotlar için
http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);

if ($method === 'DELETE') {
    parse_str($_SERVER['QUERY_STRING'], $queryParams);
    $id = $queryParams['id'] ?? null;

    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'ID belirtilmedi']);
        exit;
    }

    $stmt = $pdo->prepare("DELETE FROM plans WHERE id = ?");
    $stmt->execute([$id]);

    echo json_encode(['success' => true]);
    exit;
}

