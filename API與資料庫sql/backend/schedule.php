<?php
class userinfo{
	
	public $conn;
  	
  	function __construct($db) {
    	$this->conn = $db;
  	}

  	function get() {
		$sql = "SELECT * FROM schedule";
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
	
	function find() {
		$cond1 = array_key_exists('start_time', $_GET);
		$cond2 = array_key_exists('end_time', $_GET);
		$cond3 = array_key_exists('departure', $_GET);
		$cond4 = array_key_exists('destination', $_GET);
		if (!$cond1 or !$cond2 or !$cond3 or !$cond4) {
			http_response_code(400);
			die();
		}
		$startHour = explode(':',$_GET["start_time"])[0];
		$startHour = intval($startHour);
		$endHour = explode(':',$_GET["end_time"])[0];
		$endHour = intval($endHour);
		$isValid1 = is_numeric($startHour) and 24 > $startHour and $startHour >= 0;
		$isValid2 = is_numeric($endHour) and 24 > $endHour and $endHour >= 0;
		if ($isValid1 and $isValid2) {
			$sql = "SELECT * FROM schedule WHERE departure=? AND destination=? AND departure_time_h>=? AND departure_time_h<=?";
			$stmt = $this->conn->prepare($sql);
			$stmt->bind_param("ssii", $_GET["departure"], $_GET['destination'], $startHour, $endHour);
			$stmt->execute();
			$result = $stmt->get_result();
			if ($result->num_rows === 0) {
				http_response_code(404);
			} else {
				$result = $result->fetch_all(MYSQLI_ASSOC);
				for ($i = 0; $i < count($result); $i++) {
					$result[$i] = json_encode($result[$i], JSON_UNESCAPED_UNICODE);
				};
				$result = json_encode($result, JSON_UNESCAPED_UNICODE);
				print_r($result);
			}
		} else {
			http_response_code(400);
		}
	}
}
include($_SERVER["DOCUMENT_ROOT"]."/backend/db.php");
$model = new userinfo(db());
switch ($_SERVER["REQUEST_METHOD"]) {
	case "GET":
		if (empty($_GET)) {
			echo $model->get();
		} else {
			echo $model->find();
		}
		break;
	default:
		http_response_code(405);
}

?>

