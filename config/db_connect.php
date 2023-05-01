<?php

class DBConnect extends PDO
{
    static DBConnect $instance;

    private function __construct(
        string  $dsn,
        ?string $username = null,
        ?string $password = null,
        ?array  $options = null
    )
    {
        parent::__construct($dsn, $username, $password, $options);
    }
    static function getConnect(
        string  $dsn,
        ?string $username = null,
        ?string $password = null,
        ?array  $options = null
    ): DBConnect
    {
        if (!isset(self::$instance)){
            return new DBConnect(
                dsn: $dsn,
                username: $username,
                password: $password,
                options: $options
            );
        }
        return self::$instance;
    }
}
