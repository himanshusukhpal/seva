<?php
  try {
    $scriptFile = "./run-seva-backend.sh";
    exec("/bin/bash ".$scriptFile, $output, $ret_code);
    $response = [
     "status" => "success",
     "message" => $output,
     "code" => $ret_code
    ];
    echo json_encode($response);
  } catch(\Exception $e) {
    $reponse = [
      "status" => "error",
      "message" => $e
    ];
    echo json_encode($response);
  }
?>
