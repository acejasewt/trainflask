<?php
class attraction {
	
	public $conn;
  	
  	function __construct($db) {
    	$this->conn = $db;
  	}
	
	function find($id) {
		$sql = "SELECT * FROM attraction WHERE id=?";
		$stmt = $this->conn->prepare($sql);
		$stmt->bind_param("s", $id);
		$stmt->execute();
		$result = $stmt->get_result();
		if ($result->num_rows === 0) {
			http_response_code(404);
		} else {
			$result = $result->fetch_assoc();
			$result = json_encode($result, JSON_UNESCAPED_UNICODE);
			print_r($result);
		}
	}

	function get() {
		$sql = "SELECT * FROM attraction";
		$stmt = $this->conn->prepare($sql); 
		$stmt->execute();
		$result = $stmt->get_result();
		$result = $result->fetch_all(MYSQLI_ASSOC);
		for ($i = 0; $i < count($result); $i++) {
			$result[$i] = json_encode($result[$i], JSON_UNESCAPED_UNICODE);
		};
		$result = json_encode($result, JSON_UNESCAPED_UNICODE);
		print_r($result);
	}
}
include($_SERVER["DOCUMENT_ROOT"]."/backend/db.php");
$model = new attraction(db());
switch ($_SERVER["REQUEST_METHOD"]) {
	case "GET":
		if (array_key_exists("id", $_GET)) {
			echo $model->find($_GET["id"]);
		} else {
			echo $model->get();
		}
		break;
	default:
		http_response_code(405);
}

?>

