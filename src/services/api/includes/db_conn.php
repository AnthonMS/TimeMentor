<?php

$servername = "localhost";
$username = "root";
$password = "root";
$dbName = "timeregdb";

$connect = new mysqli($servername, $username, $password, $dbName);

if ($connect->connect_error) {
    die("Connection failed... " + $connect->connect_error);
}

//echo "Connection successful!";