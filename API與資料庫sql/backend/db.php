<?php 
function db(){
	$conn = new mysqli('localhost', 'root', '', 'railroad');
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	} else {
		return $conn;
	}
}

?>
