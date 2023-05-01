<?php
include_once "../config/db_connect.php";
include_once "../config/config.php";
if ($is_auth = !isset($_COOKIE["is_auth"])) header("Location: /auth");

session_start();

$is_auth = $_COOKIE["is_auth"];
$page_title = "Изменение товара";

include_once "../models/product.php";
include_once "../models/category.php";

$config = ConfigParser::parse("../run.ini");
$db_connection = DBConnect::getConnect(
    dsn: $config->db_config->dsn,
    username: $config->db_config->username,
    password: $config->db_config->password,
    options: $config->db_config->options,
);
$product = new Product(db_connection: $db_connection);
$category = new Category(db_connection: $db_connection);
$categories = $category->getAll();
if (!isset($_GET["id"])){
    echo "Not found 404";
    return;
}
$product_id = (int) $_GET["id"];
$attrs = "?id={$product_id}";
$product_data = $product->get($product_id);
$title = $product_data["title"];
$price = $product_data["price"];
$description = $product_data["description"];
$category_id = $product_data["category_id"];
$image = $product_data["image"];
if (isset($_POST["submit"])){
    $file = !empty($_FILES["file"]["name"]) ? $_FILES["file"] : $image;
    switch ($product->uploadPhoto($file)){
        case UploadPhotoStatus::Success:
            $_SESSION["flash"] = "<div class='notify notify_success'>Товар успешно изменён</div>";
            $product->set(
                id: $product_id,
                title: $_POST["title"],
                price: (float) $_POST["price"],
                description: $_POST["description"],
                image: !empty($_FILES["file"]["name"]) ? $_FILES["file"]["name"] : $image,
                category_id: (int) $_POST["category_id"]
            );
            break;
        case UploadPhotoStatus::FormatError:
            $_SESSION["flash"] = "<div class='notify notify_error'>Разрешены только JPG, JPEG.</div>";
            break;
        case UploadPhotoStatus::SizeError:
            $_SESSION["flash"] = "<div class='notify notify_error'>Превышен размер изображения в 1 МБ.</div>";
            break;
        case UploadPhotoStatus::Error:
            $_SESSION["flash"] = "<div class='notify notify_error'>Ошибка сервера, повторите попытку позже.</div>";
            break;
    }
    header("Location: ".$_SERVER['REQUEST_URI']);
} else {
    if(!empty($_SESSION['flash']))
    {
        $flash = $_SESSION['flash'];
        unset($_SESSION['flash']);
    }
}
?>
<!doctype html>
<html lang="ru">
<?php include_once "../templates/head.php"; ?>
<body>

    <div class="page__wrapper">
        <!-- HEADER -->
        <?php include_once "../templates/header.php"; ?>
        <main class="page">
            <section class="section outer">
                <div class="container">
                    <h1 class="section-title"><?php echo $page_title ?></h1>
                    <div class="button__wrapper">
                        <a href="/" class="button button_blue">Все товары</a>
                    </div>
                    <?php
                    echo !empty($flash) ? $flash : "";
                    $action = "update";
                    include_once "../templates/product_form.php";
                    ?>
                </div>
            </section>
        </main>
        <!-- FOOTER -->
        <?php include_once "../templates/footer.php"; ?>
    </div>
    <script src="../libs/js/main-dist.js"></script>
</body>
</html>
