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
        if ($function == "getBorgere") {
            echo getBorgere($connect);
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

    $sql = "SELECT * FROM borgere WHERE companyId = $companyId";
    $result = $localConn->query($sql);

    $outputArray = array();
    $outputArray['success'] = false;
    $outputArray['msg'] = "ERROR";

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
    } 
    else
    {
        $outputArray['msg'] = "The result of the request is 0";
    }

    return json_encode($outputArray);
}