<?php
if (!isset($_SESSION)){
	session_start();
};
class userinfo{
	
	public $conn;
  	
  	function __construct($db) {
    	$this->conn = $db;
  	}
	
	function get(){
		if (!array_key_exists("isLogged", $_SESSION)) {
			http_response_code(403);
			die();
		}
		$username = $_SESSION["username"];
		$sql = "SELECT id FROM journey WHERE username=?";
		$stmt = $this->conn->prepare($sql); 
		$stmt->bind_param("s", $username);
		$stmt->execute();
		$idArray = $stmt->get_result();
		if ($idArray->num_rows === 0) {
			http_response_code(404);
			die();
		}
		$idArray = $idArray->fetch_all(MYSQLI_ASSOC);
		$arr = array(); 
		for ($i = 0; $i < count($idArray); $i++) {
			$sql = "SELECT * FROM schedule WHERE id=?";
			$stmt = $this->conn->prepare($sql); 
			$stmt->bind_param("s", $idArray[$i]["id"]);
			$stmt->execute();
			$result = $stmt->get_result();
			if ($result->num_rows === 0) {
				http_response_code(500);
				die();
			}
			$result = $result->fetch_assoc();
			$result = json_encode($result, JSON_UNESCAPED_UNICODE);
			$arr[$i] = $result;
		}
		$arr = json_encode($arr, JSON_UNESCAPED_UNICODE);
		print_r($arr);
	}
	
	function post($array){
		if (!array_key_exists("isLogged", $_SESSION)) {
			http_response_code(403);
			die();
		}
		$cond1 = array_key_exists("id", $array);
		$cond2 = array_key_exists("child", $array);
		$cond3 = array_key_exists("adult", $array);
		$cond4 = array_key_exists("elder", $array);


		if ($cond1 and $cond2 and $cond3 and $cond4 and $this->isValidId($array["id"])) {

			$sql = "SELECT * FROM journey WHERE username=? AND id=?";
			$stmt = $this->conn->prepare($sql);
			$stmt->bind_param("ss", $_SESSION['username'], $array['id']);
			$stmt->execute();
			$result = $stmt->get_result();
			if ($result->num_rows === 1) {
				// $this->put($array);
				http_response_code(409);
			} else {
				$sql = "INSERT INTO journey (id, username, child, adult, elder) VALUES (?,?,?,?,?)";
				$stmt = $this->conn->prepare($sql);
				$stmt->bind_param("sssss", 
					$array["id"], 
					$_SESSION['username'],
					$array['child'],
					$array['adult'],
					$array['elder']
				);
				$stmt->execute();
				http_response_code(201);
			}
		} else {
			http_response_code(400);
		}
	}

	function put($array) {
		if (!array_key_exists("isLogged", $_SESSION)) {
			http_response_code(403);
			die();
		}

		$cond1 = array_key_exists("id", $array);
		$cond2 = array_key_exists("child", $array);
		$cond3 = array_key_exists("adult", $array);
		$cond4 = array_key_exists("elder", $array);

		if ($cond1 and $cond2 and $cond3 and $cond4 and $this->isValidId($array["id"])) {
			$sql = "UPDATE journey SET child=?, adult=?, elder=? WHERE username=? AND id=?";
			$stmt = $this->conn->prepare($sql);
			$stmt->bind_param(
				"sssss",
				$array['child'],
				$array['adult'],
				$array['elder'],
				$_SESSION['username'],
				$array['id']
			);
			$stmt->execute();
			http_response_code(200);
		} else {
			http_response_code(400);
		}
	}

	function isValidId($id) {
		$sql = "SELECT * FROM schedule WHERE id=?";
		$stmt = $this->conn->prepare($sql);
		$stmt->bind_param("s", $id);
		$stmt->execute();
		$result = $stmt->get_result();
		if ($result->num_rows === 0) {
			http_response_code(404);
			die();
		}
		return True;
	}
}
include($_SERVER["DOCUMENT_ROOT"]."/backend/db.php");
$model = new userinfo(db());
switch ($_SERVER["REQUEST_METHOD"]) {
	case "GET":
		echo $model->get();
		break;
	case "POST":
		$entityBody = file_get_contents('php://input');
		$array = json_decode($entityBody, true);
		echo $model->post($array);
		break;
	case "PUT":
		$entityBody = file_get_contents('php://input');
		$array = json_decode($entityBody, true);
		echo $model->put($array);
		break;
	default:
		http_response_code(405);
}

?>

