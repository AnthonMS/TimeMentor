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
        login($connect);
        break;
    case 'GET':
        //echo "GET";
        getUsers($connect);
        break;
}

function getUsers($localConn)
{
    $sql = "SELECT * FROM users";
    $result = $localConn->query($sql);

    $outputArray = array();
    $outputArray['success'] = false;
    $outputArray['msg'] = "Something happened when putting the data into JSON response";

    if ($result->num_rows > 0) 
    {
        $dataArray = array();
        while ($row = $result->fetch_assoc())
        {
            $name = utf8_encode($row["name"]);
            $username = utf8_encode($row["username"]);
            $email = utf8_encode($row["email"]);
            $phone = utf8_encode($row["phone"]);
            $superuser = utf8_encode($row["superuser"]);
            $companyId = utf8_encode($row["companyId"]);
            $password = utf8_encode($row["password"]);
            $testVar = false;
            if ($superuser == 1) {
                $testVar = true;
            }

            $data = new stdClass();
            $data->name = $name;
            $data->username = $username;
            $data->email = $email;
            $data->phone = $phone;
            //$data->superuser = $superuser;
            $data->superuser = $testVar;
            $data->companyId = $companyId;
            $data->password = $password;


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

    echo json_encode($outputArray);
}

function login($localConn) 
{
    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body);

    $email = $data->email;
    $email = utf8_encode($email);
    $password = $data->password;
    $password = utf8_encode($password);

    $sql = "SELECT * FROM users WHERE email='$email' LIMIT 1";
    $query = mysqli_query($localConn, $sql);
    $rows = mysqli_num_rows($query);

    if ($rows == 1)
    {
        $dataArray = mysqli_fetch_array($query);
        $dbEmail = utf8_encode($dataArray['email']);
        $dbPassword = utf8_encode($dataArray['password']);

        if ($email == $dbEmail && 
            $password == $dbPassword) {
            //echo "Correct login, " . $email , ", " . $password;
            echo "SUCCESS";
        } else {
            //echo "Incorrect login, " . $email , ", " . $password;
            echo "ERROR";
        }
    }
    else 
    {
        echo "ERROR";
    }

}
