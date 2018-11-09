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
    $sql = "SELECT COUNT(id) AS numberOfUsers FROM users WHERE companyId=$companyId;";
    $result = $localConn->query($sql);
    echo json_encode($result->fetch_assoc());
}

function getUsers($localConn) {
    $companyId = file_get_contents('php://input');
    $companyId = mysqli_real_escape_string($localConn, $companyId);
    //echo $companyId;

    $sql = "SELECT *, email AS oldEmail FROM users WHERE companyId = $companyId";
    $result = $localConn->query($sql);

    $outputArray = array();
    $outputArray['success'] = false;
    $outputArray['msg'] = "ERROR";

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


    $outputArray = array();
    $outputArray['success'] = false;
    $outputArray['msg'] = "ERROR";
    $sql = "";

    $sql = "SELECT * FROM users WHERE email='$email'";
    $query = mysqli_query($localConn, $sql);
    $rows = mysqli_num_rows($query);
    if ($rows >= 1) {
        $dataArray = mysqli_fetch_array($query);
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
                $outputArray['success'] = true;
                $outputArray['msg'] = "Successfully updated user data";
            } else {
                $outputArray['success'] = false;
                $outputArray['msg'] = "Failed when updating user data";
            }
        }
        else {
            $outputArray['success'] = false;
            $outputArray['msg'] = "EMAIL EXIST";
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
            $outputArray['success'] = true;
            $outputArray['msg'] = "Successfully updated user data";
        } else {
            $outputArray['success'] = false;
            $outputArray['msg'] = "Failed when updating user data";
        }
    }

    return json_encode($outputArray);
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
    
    $outputArray = array();
    $outputArray['success'] = false;
    $outputArray['msg'] = "ERROR";

    $sql = "SELECT * FROM users WHERE email='$email'";
    $query = mysqli_query($localConn, $sql);
    $rows = mysqli_num_rows($query);
    //$outputArray['oldEmail'] = $oldEmail;
    //$outputArray['email'] = $email;
    //$outputArray['rows'] = $rows;

    if ($rows >= 1) {
        $dataArray = mysqli_fetch_array($query);
        if ($dataArray['id'] == $id) 
        {
            $outputArray['test'] = "SAME ID";
            $sql = "UPDATE users SET name = '$name', email = '$email', phone = '$phone' WHERE id = $id;";
            if ($localConn->query($sql) === TRUE) {
                $outputArray['success'] = true;
                $outputArray['msg'] = "Successfully updated user data";
            } else {
                $outputArray['success'] = false;
                $outputArray['msg'] = "Failed when updatin user data";
            }
        }
        else
        {
            $outputArray['test'] = "NOT SAME ID";
            $outputArray['success'] = false;
            $outputArray['msg'] = "EMAIL EXIST";
        }
    } else 
    {
        $sql = "UPDATE users SET name = '$name', email = '$email', phone = '$phone' WHERE id = $id;";
        if ($localConn->query($sql) === TRUE) {
            $outputArray['success'] = true;
            $outputArray['msg'] = "Successfully updated user data";
        } else {
            $outputArray['success'] = false;
            $outputArray['msg'] = "Failed when updatin user data";
        }
    }

    return json_encode($outputArray);
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

    $outputArray = array();
    $outputArray['success'] = false;
    $outputArray['msg'] = 'ERROR';

    $sql = "SELECT * FROM users WHERE email='$email'";
    $query = mysqli_query($localConn, $sql);
    $rows = mysqli_num_rows($query);
    if ($rows >= 1) {
        // EMAIL EXIST IN DATABASE
        $outputArray['success'] = false;
        $outputArray['msg'] = "EMAIL_EXIST";
    }
    else {
        // EMAIL DOES NOT EXIST IN DATABASE
        $sql = "INSERT INTO users (username, name, email, phone, superuser, companyId, password) 
            VALUES ('$username', '$name', '$email', '$phone', false, $companyId, '$pass')";

        if ($localConn->query($sql) === TRUE) {
            $outputArray['success'] = true;
            $outputArray['msg'] = "Successfully created user";
        } else {
            $outputArray['success'] = false;
            $outputArray['msg'] = "Failed when creating user";
        }

    }

    

    return json_encode($outputArray);
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