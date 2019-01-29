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
        if ($function == "getUsers") {
            echo getUsers($connect);
        }
        else if ($function == "getUserCount") {
            echo getUserCount($connect);
        }
        else if ($function == "updateUsers") {
            echo updateUsers($connect);
        }
        else if ($function == "updateUser") {
            echo updateUser($connect);
        }
        else if ($function == "deleteUser") {
            echo deleteUser($connect);
        }
        else if ($function == "createUser") {
            echo createUser($connect);
        }
        else if ($function == "checkUsername") {
            echo checkUsername($connect);
        }
        else if ($function == "changePassword") {
          echo changePassword($connect);
        }
        //echo getUsers($connect);
        break;
    case 'GET':
        //echo "GET";
        echo "NO GET FUNCTION";
        break;
}

function getUserCount($localConn)
{
    $companyId = file_get_contents('php://input');
    $companyId = mysqli_real_escape_string($localConn, $companyId);

    $response = new Response;
    $response->setSuccess(false);
    $response->setMsg("ERROR");

    $sql = "SELECT COUNT(id) AS numberOfUsers FROM users WHERE companyId=$companyId;";
    $result = $localConn->query($sql);
    while ($row = $result->fetch_assoc()) {
        $response->setSuccess(true);
        $response->setMsg("SUCCESS");
        $response->setResult($row);
    }

    return $response->jsonEnc();
}

function getUsers($localConn) {
    $companyId = file_get_contents('php://input');
    $companyId = mysqli_real_escape_string($localConn, $companyId);
    //echo $companyId;

    $sql = "SELECT *, email AS oldEmail FROM users WHERE companyId = $companyId";
    $result = $localConn->query($sql);

    $response = new Response;
    $response->setSuccess(false);
    $response->setMsg("ERROR");

    if ($result->num_rows > 0)
    {
        $dataArray = array();
        while ($row = $result->fetch_assoc())
        {
            $superuser = false;
            if (utf8_encode($row["superuser"]) == 1) {
                $superuser = true;
            }

            $data = new stdClass();
            $data->id = utf8_encode($row["id"]);
            $data->name = utf8_encode($row["name"]);
            $data->username = utf8_encode($row["username"]);
            $data->email = utf8_encode($row["email"]);
            $data->oldEmail = utf8_encode($row["oldEmail"]);
            $data->phone = utf8_encode($row["phone"]);
            $data->superuser = $superuser;
            $data->companyId = $companyId;

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

function changePassword($localConn)
{
    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body);

    $currPass = $data->currPass;
    $newPass = $data->newPass;

    $response = new Response;
    $response->setSuccess(false);
    $response->setMsg("ERROR");

    //$sql = "UPDATE users SET ";

    
    $sql = "SELECT * FROM users WHERE id='$data->id'";
    $query = mysqli_query($localConn, $sql);
    $rows = mysqli_num_rows($query);

    if ($rows == 1) {
        $dataArray = mysqli_fetch_array($query);

        $response->dbPass = $dataArray['password'];
        $response->sendPass = $data->currPass;
        if ($data->currPass == $dataArray['password']) {
            $newSql = "UPDATE users SET password='$data->newPass', token='$data->newToken' WHERE id='$data->id'";
            if ($localConn->query($newSql) === TRUE) {
                $response->setSuccess(true);
                $response->setMsg("Successfully updated user password");
            } else {
                $response->setSuccess(false);
                $response->setMsg("Failed when updating user password");
            }
        } else {
            $response->setSuccess(false);
            $response->setMsg("WRONG PASSWORD");
        }

    }
    

    //$response->setResult($dataArray);
    
    return $response->jsonEnc();
}

function updateUser($localConn) {
    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body);

    $token = $data->token;
    $token = mysqli_real_escape_string($localConn, $token);
    //$token = utf8_encode($token);
    $name = $data->name;
    $name = mysqli_real_escape_string($localConn, utf8_decode($name));
    $email = $data->email;
    $email = mysqli_real_escape_string($localConn, $email);
    $oldEmail = $data->oldEmail;
    $oldEmail = mysqli_real_escape_string($localConn, $oldEmail);
    //$email = utf8_encode($email);
    $phone = $data->phone;
    $phone = mysqli_real_escape_string($localConn, $phone);
    //$phone = utf8_encode($phone);
    $superUser = $data->superuser;
    $superUser = mysqli_real_escape_string($localConn, $superUser);
    $companyId = $data->companyId;
    $companyId = mysqli_real_escape_string($localConn, $companyId);
    $companyEmail = $data->companyEmail;
    $companyEmail = mysqli_real_escape_string($localConn, $companyEmail);
    $companyName = $data->companyName;
    $companyName = mysqli_real_escape_string($localConn, $companyName);
    $companyPhone = $data->companyPhone;
    $companyPhone = mysqli_real_escape_string($localConn, $companyPhone);

    $sql = "";
    $response = new Response;
    $response->setSuccess(false);
    $response->setMsg("ERROR");

    // Gets the user in the system with the new email
    $sql = "SELECT * FROM users WHERE email='$email'";
    $query = mysqli_query($localConn, $sql);
    $rows = mysqli_num_rows($query);

    // If there are a user in the system with the new email, check if it is the same user as editing
    if ($rows >= 1) {
        $dataArray = mysqli_fetch_array($query);
        // It checks here if it is the same user editing.
        if ($dataArray['token'] == $token)
        {
            if ($superUser) {
                $sql = "UPDATE users, companies SET users.name = '$name', users.email = '$email', users.phone = '$phone',
                        companies.name = '$companyName', companies.email = '$companyEmail', companies.phone = '$companyPhone'
                        WHERE users.token = '$token' AND companies.id = $companyId;";
            } else {
                $sql = "UPDATE users SET name = '$name', email = '$email', phone = '$phone' WHERE token = '$token';";
            }

            if ($localConn->query($sql) === TRUE) {
                $response->setSuccess(true);
                $response->setMsg("Successfully updated user data");
            } else {
                $response->setSuccess(false);
                $response->setMsg("Failed when updating user data");
            }
        }
        else {
            $response->setSuccess(false);
            $response->setMsg("EMAIL EXIST");
        }


    } else {
        if ($superUser) {
            $sql = "UPDATE users, companies SET users.name = '$name', users.email = '$email', users.phone = '$phone',
                    companies.name = '$companyName', companies.email = '$companyEmail', companies.phone = '$companyPhone'
                    WHERE users.token = '$token' AND companies.id = $companyId;";
        } else {
            $sql = "UPDATE users SET name = '$name', email = '$email', phone = '$phone' WHERE token = '$token';";
        }

        if ($localConn->query($sql) === TRUE) {

            $response->setSuccess(true);
            $response->setMsg("Successfully updated user data");
        } else {

            $response->setSuccess(false);
            $response->setMsg("Failed when updating user data");
        }
    }

    return $response->jsonEnc();
}

function updateUsers($localConn)
{
    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body);

    $email = $data->email;
    $email = mysqli_real_escape_string($localConn, utf8_decode($email));
    $oldEmail = $data->oldEmail;
    $oldEmail = mysqli_real_escape_string($localConn, $oldEmail);
    $name = $data->name;
    $name = mysqli_real_escape_string($localConn, utf8_decode($name));
    $phone = $data->phone;
    $phone = mysqli_real_escape_string($localConn, $phone);
    $id = $data->id;
    $id = mysqli_real_escape_string($localConn, $id);

    $response = new Response;
    $response->setSuccess(false);
    $response->setMsg("ERROR");

    $sql = "SELECT * FROM users WHERE email='$email'";
    $query = mysqli_query($localConn, $sql);
    $rows = mysqli_num_rows($query);

    if ($rows >= 1) {
        $dataArray = mysqli_fetch_array($query);
        if ($dataArray['id'] == $id)
        {
            //$outputArray['test'] = "SAME ID";
            $sql = "UPDATE users SET name = '$name', email = '$email', phone = '$phone' WHERE id = $id;";
            if ($localConn->query($sql) === TRUE) {
                $response->setSuccess(true);
                $response->setMsg("Successfully updated user data");
            } else {
                $response->setSuccess(false);
                $response->setMsg("Failed when updatin user data");
            }
        }
        else
        {
            $response->setSuccess(false);
            $response->setMsg("EMAIL EXIST");
        }
    } else
    {
        $sql = "UPDATE users SET name = '$name', email = '$email', phone = '$phone' WHERE id = $id;";
        if ($localConn->query($sql) === TRUE) {
            $response->setSuccess(true);
            $response->setMsg("Successfully updated user data");
        } else {
            $response->setSuccess(false);
            $response->setMsg("Failed when updatin user data");
        }
    }

    return $response->jsonEnc();
}


function deleteUser($localConn)
{
    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body);

    $email = $data->email;
    $email = mysqli_real_escape_string($localConn, utf8_decode($email));
    $name = $data->name;
    $name = mysqli_real_escape_string($localConn, utf8_decode($name));
    $phone = $data->phone;
    $phone = mysqli_real_escape_string($localConn, $phone);
    $id = $data->id;
    $id = mysqli_real_escape_string($localConn, $id);

    $outputArray = array();
    $outputArray['success'] = false;
    $outputArray['msg'] = 'ERROR';
    $outputArray['result'] = array();

    $sql = "DELETE FROM users WHERE id = $data->id";
    if ($localConn->query($sql) === TRUE) {
        $outputArray['success'] = true;
        $outputArray['msg'] = "Successfully deleted user";
    } else {
        $outputArray['success'] = false;
        $outputArray['msg'] = "Failed when deleting user";
    }

    return json_encode($outputArray);
}

function createUser($localConn)
{
    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body);

    $email = $data->email;
    $email = mysqli_real_escape_string($localConn, utf8_decode($email));
    $name = $data->name;
    $name = mysqli_real_escape_string($localConn, utf8_decode($name));
    $phone = $data->phone;
    $phone = mysqli_real_escape_string($localConn, $phone);
    $pass = $data->password;
    $pass = mysqli_real_escape_string($localConn, $pass);
    $username = $data->username;
    $username = mysqli_real_escape_string($localConn, utf8_decode($username));
    $companyId = $data->companyId;
    $companyId = mysqli_real_escape_string($localConn, $companyId);

    $response = new Response;
    $response->setSuccess(false);
    $response->setMsg("ERROR");

    $sql = "SELECT * FROM users WHERE email='$email'";
    $query = mysqli_query($localConn, $sql);
    $rows = mysqli_num_rows($query);
    if ($rows >= 1) {
        // EMAIL EXIST IN DATABASE
        $response->setSuccess(false);
        $response->setMsg('EMAIL_EXIST');
    }
    else {
        // EMAIL DOES NOT EXIST IN DATABASE
        $sql = "INSERT INTO users (username, name, email, phone, superuser, companyId, password)
            VALUES ('$username', '$name', '$email', '$phone', false, $companyId, '$pass')";

        if ($localConn->query($sql) === TRUE) {
            $response->setSuccess(true);
            $response->setMsg('Successfully created user');
        } else {
            $response->setSuccess(false);
            $response->setMsg('Failed when creating user');
        }

    }

    return $response->jsonEnc();
}

function checkUsername($localConn)
{
    $username = file_get_contents('php://input');
    $username = mysqli_real_escape_string($localConn, utf8_decode($username));

    $sql = "SELECT username FROM users WHERE username = '$username'";
    $query = mysqli_query($localConn, $sql);
    $rows = mysqli_num_rows($query);

    return $rows;
}
