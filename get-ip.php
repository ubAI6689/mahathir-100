<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
echo json_encode(['ip' => $_SERVER['REMOTE_ADDR']]);
?>