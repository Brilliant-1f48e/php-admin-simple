<?php
include_once "../config/db_connect.php";
include_once "../config/config.php";

if ($is_auth = !isset($_COOKIE["is_auth"])) header("Location: /auth");
$is_auth = $_COOKIE["is_auth"];
if (!isset($_GET["id"])){
    echo "Not found 404";
    return;
}
$product_id = (int) $_GET["id"];

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
$product_data = $product->get($product_id);
$title = $product_data["title"];
$price = $product_data["price"];
$description = $product_data["description"];
$category_id = $product_data["category_id"];
$image = $product_data["image"];
$category = new Category(db_connection: $db_connection);
$page_title = "Просмотр товара";
?>
<!DOCTYPE html>
<html lang="ru">
<?php include_once "../templates/head.php"; ?>
<body>

<div class="page__wrapper">
    <!-- HEADER -->
    <?php include_once "../templates/header.php"; ?>
    <main class="page">
        <section class="create_product outer section">
            <div class="container">
                <h1 class="section-title"><?php echo $page_title ?></h1>
                <div class="button__wrapper">
                    <div class="button-actions">
                        <?php
                        echo "<a class='button button_sm button_green' href='/update_product?id={$product_id}'>";
                        include '../libs/icons/icon-edit.svg';
                        echo "</a>";
                        echo "<button class='button button_sm button_red' data-action='open' data-delete-id='{$product_id}'>";
                        include '../libs/icons/icon-delete.svg';
                        echo "</button>";
                        ?>
                    </div>
                </div>
                <table class="form__table table-form table">
                    <tbody>
                    <tr>
                        <td class="table-form__title">Название *</td>
                        <td>
                            <?php echo $title; ?>
                        </td>
                    </tr>
                    <tr>
                        <td class="table-form__title">Цена (руб.) *</td>
                        <td>
                            <?php echo $price; ?>
                        </td>
                    </tr>
                    <tr>
                        <td class="table-form__title">Описание *</td>
                        <td>
                            <?php echo $description; ?>
                        </td>
                    </tr>
                    <tr>
                        <td class="table-form__title">Категория</td>
                        <td>
                            <?php echo $category_id; ?>
                        </td>
                    </tr>
                    <tr>
                        <td class="table-form__title">Изображение</td>
                        <td>
                            <?php echo "<img src='uploads/{$image}' alt='Product image'>"; ?>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </section>

    </main>
    <!-- FOOTER -->
    <?php include_once "../templates/footer.php"; ?>
</div>
<div class="modal">
    <div class="modal__body">
        <form class="modal__form" action="/delete_product" method="GET">
            <label style="visibility: hidden;"><input type="text" name="id"></label>
            <p class="modal__text">Вы уверенны, что хотите удалить этот товар?</p>
            <div class="modal__actions">
                <button type="submit" class="button button_red">Да</button>
                <button data-action="close" type="button" class="button button_blue">Нет</button>
            </div>
        </form>
    </div>
</div>
<script src="../libs/js/main-dist.js"></script>
</body>
</html>
