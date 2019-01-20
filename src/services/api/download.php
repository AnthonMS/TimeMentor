<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');


include("includes/db_conn.php");
include("includes/response.php");
include("includes/functions.php");

switch($_SERVER['REQUEST_METHOD'])
{
    case 'POST':
        $function = $_REQUEST['function'];
        if ($function == "myActivity") {
            echo downloadExcel($connect);
        } 
        break;
    case 'GET':
        echo "NO GET FUNCTION";
        break;
}

function downloadExcel($localConn) {
    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body);
    $response = new Response;
    $response->setSuccess(false);
    $response->setMsg("ERROR");
    // Data is an array of time registrations. This data needs to be put into an excel ark.
    // Then Base64 encode the excel file and save it in the database.
    // Then download the excel file
    // Then return a response object
    //$test = [];


/*     $dataTable = "
        <table class='table' bordered='1'>
            <tr>
                <th>borgerName</th>
                <th>create_date</th>
                <th>date</th>
                <th>status</th>
            <tr>
    ";
    foreach ($data as $item) {
        //$test[] = $item; 
        // $item->borgerName | $item->create_date | $item->date | $item->status
        $dataTable .= "
            <tr>
                <td>" . $item->borgerName . "</td>
                <td>" . $item->create_date . "</td>
                <td>" . $item->date . "</td>
                <td>" . $item->status . "</td>
            </tr>
        ";
    }
    
    $dataTable .= "
        </table>
    ";
    header("Content-Type: application/xls");
    header("Content-Disposition: attachment; filename=download.xls"); */

    $dataTable = file_get_contents('XML/doctop.xml');

    $dataTable .= '<Row>';
    $dataTable .= '<Cell ss:StyleID="s65"><Data ss:Type="String">Borger</Data></Cell>';
    $dataTable .= '<Cell ss:StyleID="s65"><Data ss:Type="String">Registrering</Data></Cell>';
    $dataTable .= '<Cell ss:StyleID="s65"><Data ss:Type="String">Dato</Data></Cell>';
    $dataTable .= '<Cell ss:StyleID="s65"><Data ss:Type="String">Status</Data></Cell>';
    $dataTable .= '</Row>';
    foreach ($data as $item) {
        //$test[] = $item; 
        // $item->borgerName | $item->create_date | $item->date | $item->status
        $dataTable .= '<Row>';
        $dataTable .= "<Cell><Data ss:Type='String'>{$item->borgerName}</Data></Cell>";
        $dataTable .= "<Cell ss:StyleID='s62'><Data ss:Type='String'>{$item->create_date}</Data></Cell>";
        $dataTable .= "<Cell ss:StyleID='s62'><Data ss:Type='String'>{$item->date}</Data></Cell>";
        $dataTable .= "<Cell><Data ss:Type='String'>{$item->status}</Data></Cell>";
        $dataTable .= '</Row>';
    }

    $dataTable .= file_get_contents('XML/docbottom.xml');

    header("Content-Type: application/vnd.ms-excel");
    header("Content-Disposition: attachment; filename=download.xml");
    return $dataTable;

    //return $response->jsonEnc();
}