<?php
/**
 * PrismLine Backend Lead Collector (GoDaddy & cPanel Compatible)
 * Handles inquiries from contact.html and homepage consultation forms.
 * Accepts both JSON and form-urlencoded POST requests.
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

// Receive payload
$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

if (stripos($contentType, 'application/json') !== false) {
    $rawInput = file_get_contents('php://input');
    $data = json_decode($rawInput, true);
} else {
    $data = $_POST;
}

// Sanitize fields
$name     = isset($data['fullName']) ? htmlspecialchars(trim($data['fullName']), ENT_QUOTES, 'UTF-8') : (isset($data['name']) ? htmlspecialchars(trim($data['name']), ENT_QUOTES, 'UTF-8') : '');
$email    = isset($data['email']) ? filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL) : '';
$phone    = isset($data['phone']) ? htmlspecialchars(trim($data['phone']), ENT_QUOTES, 'UTF-8') : '';
$service  = isset($data['service']) ? htmlspecialchars(trim($data['service']), ENT_QUOTES, 'UTF-8') : 'General Inquiry';
$timeline = isset($data['timeline']) ? htmlspecialchars(trim($data['timeline']), ENT_QUOTES, 'UTF-8') : 'Flexible';
$message  = isset($data['message']) ? htmlspecialchars(trim($data['message']), ENT_QUOTES, 'UTF-8') : '';
$source   = isset($data['source']) ? htmlspecialchars(trim($data['source']), ENT_QUOTES, 'UTF-8') : 'Website';

// Validation
if (empty($name) || empty($phone)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Name and phone number are required.'
    ]);
    exit;
}

// Create lead entry
$lead = [
    'id'        => uniqid('lead_', true),
    'timestamp' => date('c'),
    'fullName'  => $name,
    'email'     => $email,
    'phone'     => $phone,
    'service'   => $service,
    'timeline'  => $timeline,
    'message'   => $message,
    'source'    => $source,
    'ip'        => $_SERVER['REMOTE_ADDR'] ?? 'Unknown'
];

// 1. Persistent file storage backup (ensures zero lead loss even before email setup)
$leadsFile = __DIR__ . '/leads_storage.json';
$existing = file_exists($leadsFile) ? json_decode(file_get_contents($leadsFile), true) : [];
if (!is_array($existing)) $existing = [];
$existing[] = $lead;
file_put_contents($leadsFile, json_encode($existing, JSON_PRETTY_PRINT));

// 2. Email notification to PrismLine team
$to = "contact@prismline.tech"; // Backend team can configure this or SMTP
$subject = "⚡ New Inbound Project / Audit Lead from: {$name}";
$emailBody = "New project inquiry submitted through PrismLine website:\n\n"
           . "Name: {$name}\n"
           . "Phone: {$phone}\n"
           . "Email: {$email}\n"
           . "Service: {$service}\n"
           . "Timeline: {$timeline}\n"
           . "Message:\n{$message}\n\n"
           . "Direct Callback Hotline: 9952934596\n"
           . "Received: " . date('Y-m-d H:i:s') . "\n";

$headers = "From: inquiries@prismline.tech\r\n"
         . "Reply-To: " . ($email ? $email : "no-reply@prismline.tech") . "\r\n"
         . "X-Mailer: PHP/" . phpversion();

// Attempt PHP mail (silent fallback if not configured on local)
@mail($to, $subject, $emailBody, $headers);

// Response
header('Content-Type: application/json');
echo json_encode([
    'success' => true,
    'message' => 'Thank you! Your inquiry has been secured. A PrismLine senior engineer will contact you shortly.',
    'leadId'  => $lead['id']
]);
