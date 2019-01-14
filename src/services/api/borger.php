<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');


include("includes/db_conn.php");
include("includes/response.php");

switch($_SERVER['REQUEST_METHOD'])
{
    case 'POST':
        $function = $_REQUEST['function'];
        if ($function == "getBorgere") {
            echo getBorgere($connect);
        }
        else if ($function == "deleteBorger") {
            echo deleteBorger($connect);
        }
        else if ($function == "createBorger") {
            echo createBorger($connect);
        }
        break;
    case 'GET':
        echo "NO GET FUNCTION";
        break;
}

function getBorgere($localConn)
{
    $companyId = file_get_contents('php://input');
    $companyId = mysqli_real_escape_string($localConn, $companyId);
    //return $companyId;

    $sql = "SELECT * FROM borgere WHERE companyId = $companyId AND active = true";
    $result = $localConn->query($sql);

    $outputArray = array();
    $outputArray['success'] = false;
    $outputArray['msg'] = "ERROR";

    $response = new Response;
    $response->setSuccess(false);
    $response->setMsg("ERROR");

    if ($result->num_rows > 0) 
    {
        $dataArray = array();
        while ($row = $result->fetch_assoc())
        {
            $data = new stdClass();
            $data->id = utf8_encode($row["id"]);
            $data->name = utf8_encode($row["name"]);
            $data->username = utf8_encode($row["address"]);
            $data->companyId = utf8_encode($row["companyId"]);

            $dataArray[] = $data;
        }
        $outputArray['success'] = true;
        $outputArray['msg'] = "Success";
        $outputArray['result'] = $dataArray;
        $response->setSuccess(true);
        $response->setMsg("Success");
        $response->setResult($dataArray);

    } 
    else
    {
        $response->setMsg("The result of the request is 0");
        $outputArray['msg'] = "The result of the request is 0";
    }
    return $response->jsonEnc();
    //return json_encode($outputArray);
}

function deleteBorger($localConn)
{
    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body);

    $borgerId = $data->borgerId;
    $companyId = $data->companyId;

    $response = new Response;
    $response->setSuccess(false);
    /*
    UPDATE table_name
    SET column1=value, column2=value2,...
    WHERE some_column=some_value 
    */
    $sql = "UPDATE borgere SET active = false WHERE id = ? AND companyId = ?";
    $stmt = $localConn->prepare($sql);
    if ($stmt === false) {
        $response->setMsg("ERROR: did not prepare stmt");
    }
    $bind = $stmt->bind_param('ii', $borgerId, $companyId);
    if ($bind === false) {
        $response->setMsg("ERROR: did not bind params");
    }
    $exec = $stmt->execute();
    if ($exec === false)
    {
        $response->setMsg("ERROR: " . $stmt->error);
    } else {
        $response->setSuccess(true);
        $response->setMsg("SUCCESS: deleted borger");
    }

    $stmt->close();


    return $response->jsonEnc();
}

function createBorger($localConn) 
{
    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body);
    $name = $data->name;
    $companyId = $data->companyId;

    $response = new Response;
    $response->setSuccess(false);
    $response->setMsg("ERROR");

    $sql = "INSERT INTO borgere (name, companyId) VALUES (?, ?)";
    $stmt = $localConn->prepare($sql);
    if ($stmt === false) {
        $response->setMsg("ERROR: did not prepare stmt");
    }
    $bind = $stmt->bind_param('si', $name, $companyId);
    if ($bind === false) {
        $response->setMsg("ERROR: did not bind params");
    }
    $exec = $stmt->execute();
    if ($exec === false)
    {
        $response->setMsg("ERROR: " . $stmt->error);
    } else {
        $response->setSuccess(true);
        $response->setMsg("SUCCESS: created borger");
    }

    $stmt->close();

    return $response->jsonEnc();
}