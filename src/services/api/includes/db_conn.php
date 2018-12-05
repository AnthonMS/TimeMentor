<?php

$servername = "localhost";
$username = "root";
$password = "root";
$dbName = "timeregdb";

$connect = new mysqli($servername, $username, $password, $dbName);
//$connect->set_charset("utf8");

if ($connect->connect_error) {
    die("Connection failed... " + $connect->connect_error);
}

/*function getConnection() {
    return $this->$connect;
}*/

//echo "Connection successful!";