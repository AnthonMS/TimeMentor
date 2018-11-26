<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');


include("includes/db_conn.php");

switch($_SERVER['REQUEST_METHOD'])
{
    case 'POST':
        $function = $_REQUEST['function'];
        if ($function == "registerTime") {
            echo registerTime($connect);
        }
        break;
    case 'GET':
        echo "NO GET FUNCTION";
        break;
}

function registerTime($localConn) {
    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body);
    
    $userId = $data->userId;
    $companyId = $data->companyId;
    $borgerId = $data->borgerId;
    
    $date = new DateTime($data->date);
    $dateFormat = $date->format('Y-m-d H:i:s');

    $timeIntervalString = $data->timeInterval;
    $timeInterval = convertTime($timeIntervalString);

    $attendance = utf8_decode($data->attendance);
    $description = utf8_decode($data->description);

    $sql = "INSERT INTO timeregistrations (userId, companyId, borgerId, date, timeInterval, attendance, description) VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmt = $localConn->prepare($sql);
    $stmt->bind_param('iiisiss', $userId, $companyId, $borgerId, $dateFormat, $timeInterval, $attendance, $description);

    $stmt->execute();
    $stmt->close();

    return $request_body;
}

function convertTime($timeIntervalStringtoConvert){
    $timeInterval = "";

    switch($timeIntervalStringtoConvert)
    {
        case '15 Min.':
        $timeInterval = 15;
        break;
        case '30 Min.':
        $timeInterval = 30;
        break;
        case '45 Min.':
        $timeInterval = 45;
        break;
        case '1 Time':
        $timeInterval = 60;
        break;
        case '1 Time, 15 Min.':
        $timeInterval = 75;
        break;
        case '1 Time, 30 Min.':
        $timeInterval = 90;
        break;
        case '1 Time, 45 Min.':
        $timeInterval = 105;
        break;
        case '2 Timer':
        $timeInterval = 120;
        break;
        case '2 Timer, 30 Min.':
        $timeInterval = 150;
        break;
        case '3+ Timer':
        $timeInterval = 180;
        break;
    }

    return $timeInterval;
}
