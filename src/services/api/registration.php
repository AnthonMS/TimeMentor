<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');


include("includes/db_conn.php");
include("includes/response.php");
include("includes/functions.php");

switch($_SERVER['REQUEST_METHOD'])
{
    case 'POST':
        $function = $_REQUEST['function'];
        if ($function == "registerTime") {
            echo registerTime($connect);
        } else if ($function == "getMyRegistrations") {
            echo getMyRegistrations($connect);
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

    //$now = new \DateTime('now', new DateTimeZone('Europe/Bucharest'));
    //date_default_timezone_set('UTC+1');
    $date = new DateTime($data->date, new DateTimeZone('Europe/Copenhagen'));
    $date->add(new DateInterval('PT1H'));
    $dateFormat = $date->format('Y-m-d H:i:s');

    $tmpTime = $data->tmpTime;

    $attendance = utf8_decode($data->attendance);
    $description = utf8_decode($data->description);

    $response = new Response;
    $response->setSuccess(false);
    $response->setMsg("ERROR");

    //$sql = "SET SESSION time_zone = '+1:00'; ";
    $sql = "INSERT INTO timeregistrations (userId, companyId, borgerId, date, timeInterval, attendance, description) VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmt = $localConn->prepare($sql);
    $stmt->bind_param('iiisiss', $userId, $companyId, $borgerId, $dateFormat, $tmpTime, $attendance, $description);

    if ($stmt->execute()) 
    {
        $response->setSuccess(true);
        $response->setMsg("SUCCESS: saved registration");
    } else {
        $response->setMsg("ERROR: did not save registration");
    }

    //$response->setMsg(phpinfo());

    //$stmt->execute();
    $stmt->close();

    return $response->jsonEnc();
}

function getMyRegistrations($localConn) {
    $userId = file_get_contents('php://input');
    $userId = mysqli_real_escape_string($localConn, $userId);

    $response = new Response;
    $response->setSuccess(false);
    $response->setMsg("ERROR");

    //$sql = "SET SESSION time_zone = '+1:00'; ";tr.id, tr.date, tr.create_date, tr.timeInterval, tr.attendance, b.name, b.id FROM timeregistrations AS tr
    $sql = "SELECT tr.id, tr.date, tr.create_date, tr.timeInterval, tr.attendance, b.name, b.id FROM timeregistrations AS tr ";
    $sql .= "LEFT JOIN borgere AS b ON tr.borgerId=b.id ";
    $sql .= "WHERE userId = ?;";
    $stmt = $localConn->prepare($sql);
    $stmt->bind_param('i', $userId);

    $res = [];

    if ($stmt->execute()) 
    {
        $response->setSuccess(true);
        $response->setMsg("SUCCESS: executed getMyRegistrations");

        if ($stmt->bind_result($id, $date, $create_date, $time, $status, $borgerName, $borgerId)) {
            while ($stmt->fetch()) {
                $data = new stdClass();
                
                $data->id = $id;
                $data->date = $date;
                $data->create_date = $create_date;
                $data->time = $time;
                $data->status = utf8_encode($status);
                $data->borgerName = utf8_encode($borgerName);
                $data->borgerId = $borgerId;

                $res[] = $data;
            }           

            $response->setResult($res);
            $response->setMsg("SUCCESS: bound result");
        } else {
            $response->setResult($result2);
            $response->setMsg("ERROR: DID NOT bind result");
        }
        
    } else {
        $response->setMsg("ERROR: failed execution of getMyRegistrations");
    }

    $stmt->close();

    return $response->jsonEnc();
}