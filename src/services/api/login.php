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
        if ($_REQUEST['function'] == "login"){
            //login($connect);
            echo login($connect);
        }
        else if ($_REQUEST['function'] == "checkToken") {
            echo checkToken($connect);
        }
        else if ($_REQUEST['function'] == "getUser") {
            echo getUser($connect);
        }
        break;
    case 'GET':
        //echo "GET";
        echo "NO GET FUNCTION";
        break;
}

function login($localConn) 
{
    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body);
    $returnStr = "";

    $email = $data->email;
    $email = utf8_encode($email);
    $email = mysqli_real_escape_string($localConn, $email);
    $password = $data->password;
    $password = utf8_encode($password);
    $password = mysqli_real_escape_string($localConn, $password);

    $sql = "SELECT * FROM users WHERE email='$email' LIMIT 1";
    $query = mysqli_query($localConn, $sql);
    $rows = mysqli_num_rows($query);

    $response = new Response;
    $response->setSuccess(false);
    $response->setMsg("ERROR");

    if ($rows == 1)
    {
        $dataArray = mysqli_fetch_array($query);
        $dbEmail = utf8_encode($dataArray['email']);
        $dbPassword = utf8_encode($dataArray['password']);

        if ($email == $dbEmail && 
            $password == $dbPassword) {
            // SETTING THE COOKIETOKEN
            $returnStr = "SUCCESS";
            $response->setSuccess(true);
            $response->setMsg("SUCCESS: Login correct");
        } else {
            //echo "Incorrect login, " . $email , ", " . $password;
            $returnStr = "ERROR";
            $response->setMsg("ERROR: Wrong email or password");
        }
    }
    else 
    {
        $returnStr = "ERROR";
        $response->setMsg("ERROR: Wrong email or password");
        //echo "ERROR";
    }
    
    return $response->jsonEnc();
}

function checkToken($localConn)
{
    $response = "";
    $data = file_get_contents('php://input');
    $data = json_decode($data);
    $email = $data->email;
    $email = mysqli_real_escape_string($localConn, $email);
    $token = $data->token;
    $token = mysqli_real_escape_string($localConn, $token);

    $response2 = new Response;
    $response2->setSuccess(false);
    $response2->setMsg("ERROR");

    $sql = "SELECT * FROM users WHERE token = '$token'";
    $query = mysqli_query($localConn, $sql);
    $rows = mysqli_num_rows($query);
    if ($rows >= 1) {
        $response2->setMsg("EXIST");
        $response = "EXIST";
    }
    else {
        $response2->setSuccess(true);
        $response2->setMsg("NOT EXIST");
        $response = "NOT EXIST";
        $sql = "UPDATE users SET token = '$token' WHERE email='$email';";
        $query = mysqli_query($localConn, $sql);
    }

    //echo $response;
    return $response2->jsonEnc();
}

function getUser($localConn) {
    $token = file_get_contents('php://input');
    $token = mysqli_real_escape_string($localConn, $token);

    $sql = "SELECT users.id, users.username, users.name, users.email, users.phone, users.superuser, users.companyId, users.token, 
            companies.name AS companyName, companies.email AS companyEmail, companies.phone AS companyPhone, licenseQuantity FROM users 
            LEFT JOIN companies ON companies.id = users.companyId
            WHERE token = '$token'";
    $result = $localConn->query($sql);

    $response = new Response;
    $response->setSuccess(false);
    $response->setMsg("ERROR");

    if ($result->num_rows > 0) 
    {
        $dataArray = array();
        while ($row = $result->fetch_assoc())
        {
            $tempSuperuser = utf8_encode($row["superuser"]);
            $superUser = false;
            if ($tempSuperuser == 1) {
                $superUser = true;
            }

            $data = new stdClass();
            $data->id = $row['id'];
            $data->name = utf8_encode($row["name"]);
            $data->username = utf8_encode($row["username"]);
            $data->email = utf8_encode($row["email"]);
            $data->phone = utf8_encode($row["phone"]);
            $data->superuser = $superUser;
            $data->companyId = utf8_encode($row["companyId"]);;
            $data->token = utf8_encode($row["token"]);
            $data->companyName = utf8_encode($row["companyName"]);
            $data->companyEmail = utf8_encode($row["companyEmail"]);
            $data->companyPhone = utf8_encode($row["companyPhone"]);
            $data->licenseQuantity = $row['licenseQuantity'];


            $dataArray[] = $data;
        }
        $response->setSuccess(true);
        $response->setMsg("Success");
        $response->setResult($dataArray);
    } 
    else
    {
        $response->setMsg("The result of the request is 0");
    }

    return $response->jsonEnc();
}