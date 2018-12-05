<?php

include("includes/db_conn.php");
//$localTest = getConnection();

function testMethod() {
    $sql = "SELECT * FROM users LIMIT 1";
    //$query = mysqli_query($this->$connect, $sql);
    //$dataArray = mysqli_fetch_array($query);
    //$result = $this->$connect->query($sql);
    return "test";
    ///return $dataArray;
}
?>