<?php

if ($is_auth = !isset($_COOKIE["is_auth"])) header("Location: /auth");
$is_auth = $_COOKIE["is_auth"];

if (isset($_GET["id"])){
    session_start();
    include_once "../config/db_connect.php";
    include_once "../config/config.php";
    include_once "../models/product.php";

    $config = ConfigParser::parse("../run.ini");
    $db_connection = DBConnect::getConnect(
        dsn: $config->db_config->dsn,
        username: $config->db_config->username,
        password: $config->db_config->password,
        options: $config->db_config->options,
    );
    $product = new Product(db_connection: $db_connection);
    $response = $product->delete(id: (int) $_GET["id"]);
    switch ($response) {
        case ResponseStatus::Success:
            $_SESSION["flash"] = "<div class='notify notify_success'>Товар успешно удалён</div>";
            break;
        case ResponseStatus::Fail:
            $_SESSION["flash"] = "<div class='notify notify_success'>При попытке удалить товар, возникла непредвиденная ошибка. Перезагрузите страницу и попробуйте снова</div>";
            break;
    }
}
header("Location: /");
