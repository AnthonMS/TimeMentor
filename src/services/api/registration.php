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

    $tmpTime = $data->tmpTime;

    $attendance = utf8_decode($data->attendance);
    $description = utf8_decode($data->description);

    $outputArray = array();
    $outputArray['success'] = false;
    $outputArray['msg'] = "ERROR";

    $sql = "INSERT INTO timeregistrations (userId, companyId, borgerId, date, timeInterval, attendance, description) VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmt = $localConn->prepare($sql);
    $stmt->bind_param('iiisiss', $userId, $companyId, $borgerId, $dateFormat, $tmpTime, $attendance, $description);

    if ($stmt->execute()) 
    {
        $outputArray['success'] = true;
        $outputArray['msg'] = "SUCCESS: saved registration";
    } else {
        $outputArray['msg'] = "ERROR: did not save registration";
    }

    //$stmt->execute();
    $stmt->close();

    return json_encode($outputArray);;
}