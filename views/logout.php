<?php
setcookie(name: "is_auth", value: true, expires_or_options: time());
header("Location: /auth");
