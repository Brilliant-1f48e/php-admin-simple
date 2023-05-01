<?php

if ($_POST) {
    setcookie(name: "is_auth", value: true, path: "/");
    header("Location: /");
}

if (isset($_COOKIE["is_auth"])) header("Location: /");
$page_title = "Вход";
?>
<!doctype html>
<html lang="ru">
<?php include_once "../templates/head.php"; ?>
<body>

<div class="page__wrapper">
    <!-- HEADER -->
    <?php include_once "../templates/header.php"; ?>
    <main class="page">
        <section class="auth outer">
            <div class="auth__wrapper">
                <form action="/auth" class="auth__form form-auth" method="POST">
                    <h1 class="form-auth__title">Вход</h1>

                    <div class="form-auth__inputs">
                        <label class="form-auth__input-wrapper">
                            Логин
                            <input name="login" class="input form-auth__input" tabindex="1">
                        </label>
                        <label class="form-auth__input-wrapper">Пароль
                            <input name="password" type="password" class="input form-auth__input" tabindex="2">
                        </label>
                    </div>
                    <button type="submit" class="button form-auth__button" tabindex="3" aria-label="Sign in">
                        Войти
                    </button>
                </form>
            </div>
        </section>
    </main>
    <!-- FOOTER -->
    <?php include_once "../templates/footer.php"; ?>

    <script src="../libs/js/main-dist.js"></script>
</div>
</body>
</html>
