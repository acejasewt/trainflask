<?php
if (!isset($_SESSION)){
	session_start();
};
class session{
	
	public $conn;
  	
  	function __construct($db) {
    	$this->conn = $db;
  	}
	
	function post($array){
		$cond1 = array_key_exists('username', $array);
		$cond2 = array_key_exists('password', $array);
		if ($cond1 and $cond2) {
			$sql = "SELECT username, password FROM userinfo WHERE username=? AND password=?";
			$stmt = $this->conn->prepare($sql); 
			$stmt->bind_param("ss", $array["username"], $array["password"]);
			$stmt->execute();
			$result = $stmt->get_result();
			if ($result->num_rows === 0) {
				http_response_code(404);
			} else {
				$result = $result->fetch_assoc();
				$_SESSION["username"] = $result["username"];
				$_SESSION["password"] = $result["password"];
				$_SESSION["isLogged"] = True;
			}
		} else {
			http_response_code(400);
		}
	}
	
	function delete(){
		session_destroy();
	}
}
include($_SERVER["DOCUMENT_ROOT"]."/backend/db.php");
$model = new session(db());
switch ($_SERVER["REQUEST_METHOD"]) {
	case "POST":
		$entityBody = file_get_contents('php://input');
		$array = json_decode($entityBody, true);
		echo $model->post($array);
		break;
	case "DELETE":
		echo $model->delete();
		break;
	default:
		http_response_code(405);
}

?>

