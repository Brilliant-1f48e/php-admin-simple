<?php
include_once "config/db_connect.php";
include_once "config/config.php";

if ($is_auth = !isset($_COOKIE["is_auth"])) header("Location: /auth");
$is_auth = $_COOKIE["is_auth"];
session_start();

if (!empty($_SESSION["flash"])) {
    $flash = $_SESSION["flash"];
    unset($_SESSION['flash']);
}
include_once "models/product.php";

$config = ConfigParser::parse("run.ini");
$db_connection = DBConnect::getConnect(
    dsn: $config->db_config->dsn,
    username: $config->db_config->username,
    password: $config->db_config->password,
    options: $config->db_config->options,
);
$product = new Product(db_connection: $db_connection);
$products = $product->getAll();
$page_title = "Главная страница";
?>
<!DOCTYPE html>
<html lang="ru">
<?php include_once "templates/head.php"; ?>
<body>

<div class="page__wrapper">
    <!-- HEADER -->
    <?php include_once "templates/header.php"; ?>
    <main class="page">
        <section class="section outer">
            <div class="container">
                <h1 class='section-title'><?php echo $page_title ?></h1>
                <div class="button__wrapper">
                    <a href="/create_product" class="button">Добавить товар</a>
                </div>
                <?php echo !empty($flash) ? $flash : "";
                if ($products !== ResponseStatus::Fail) {
                    echo "<table class='table'>";
                    echo "<thead>";
                    echo "<th>Название</th>";
                    echo "<th>Описание</th>";
                    echo "<th>Цена (руб.)</th>";
                    echo "<th>Категория</th>";
                    echo "<th>Изображение</th>";
                    echo "<th>Действия</th>";
                    echo "</thead>";
                    echo "<tbody>";
                    foreach ($products as $product) {
                        $id = $product["id"];
                        echo "<tr>";
                        echo "<td>{$product['title']}</td>";
                        echo "<td>{$product['description']}</td>";
                        echo "<td>{$product['price']}</td>";
                        echo "<td>{$product['category_id']}</td>";
                        echo "<td>{$product['image']}</td>";
                        echo "<td class='table__actions'>";
                        echo "<a class='button button_sm' href='/view_product?id={$id}'>";
                        include 'libs/icons/icon-view.svg';
                        echo "</a>";
                        echo "<a class='button button_sm button_green' href='/update_product?id={$id}'>";
                        include 'libs/icons/icon-edit.svg';
                        echo "</a>";
                        echo "<button class='button button_sm button_red' data-action='open' data-delete-id='{$id}'>";
                        include 'libs/icons/icon-delete.svg';
                        echo "</button>";
                        echo "</td>";
                        echo "</tr>";
                    }

                    echo "</tbody>";
                    echo "</table>";
                } else {
                    echo "<div class='notify'>Список товаров пуст</div>";
                }
                ?>
            </div>
        </section>
    </main>
    <!-- FOOTER -->
    <?php include_once "templates/footer.php"; ?>
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
<script src="libs/js/main-dist.js"></script>
</body>
</html>
