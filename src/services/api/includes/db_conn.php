<?php

$db = parse_ini_file('db_info.ini');

$servername = $db['servername'];
$username = $db['username'];
$password = $db['password'];
$dbName = $db['dbname'];

// $servername = "localhost";
// $username = "root";
// $password = "root";
// $dbName = "timeregdb";

$connect = new mysqli($servername, $username, $password, $dbName);
//$connect->set_charset("utf8");

if ($connect->connect_error) {
    die("Connection failed... " + $connect->connect_error);
}

/*function getConnection() {
    return $this->$connect;
}*/

//echo "Connection successful!";