<?php   

if ( !isset(  $_REQUEST['code'] ) ){
    require_once 'server_list.php';
    include 'page.php';
    exit;
} 

if ( isset( $_REQUEST['server'] ) ) {

    require_once 'server_list.php';

    $url = $serverList[ $_REQUEST['server'] ]['url'];

    redirectServer ( $url, $_REQUEST['code'] );

} else {

    runCode ( rawurldecode($_REQUEST['code']) );

}

function redirectServer ( $url, $code) {

    $code = 'code=' . $code ;
    
    $curl = curl_init( $url );
    curl_setopt( $curl, CURLOPT_POST, 1);
    curl_setopt( $curl, CURLOPT_POSTFIELDS, $code);
    curl_setopt( $curl, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt( $curl, CURLOPT_HEADER, 0);
    curl_setopt( $curl, CURLOPT_RETURNTRANSFER, 1);
    
    echo curl_exec( $curl );
}

function runCode ( $code ) {
    
    if ( !$tempFile = fopen("code.php", "w")  ) {

        echo "No se puede abrir el archivo";
        exit;
    }
    
    if ( fwrite($tempFile, $code) === FALSE) {

        echo "No se puede escribir en el archivo";
        exit;
    }
    
    fclose($tempFile);

    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    unset($_REQUEST);
    unset($_POST);
    unset($code);
    
    require_once 'code.php';
    
}