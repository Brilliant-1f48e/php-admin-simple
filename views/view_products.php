<?php

if ($is_auth = !isset($_COOKIE["is_auth"])) header("Location: /auth");
$is_auth = $_COOKIE["is_auth"];
$page_title = "Просмотр товаров";
?>
<!doctype html>
<html lang="ru">
<?php include_once "../templates/head.php"; ?>
<body>
    <div class="page__wrapper">
        <!-- HEADER -->
        <?php include_once "../templates/header.php"; ?>
        <main class="page">
            <?php echo "<h1>$page_title</h1>"; ?>
        </main>
        <!-- FOOTER -->
        <?php include_once "../templates/footer.php"; ?>
    </div>
</body>
</html>
