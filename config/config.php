<?php
class DBConfig
{
    public string $dsn;
    public ?string $username;
    public ?string $password;
    public ?array $options;

    public function __construct(
        string  $driver,
        string  $scheme,
        string  $host,
        ?int  $port = null,
        ?string $username = null,
        ?string $password = null,
        ?array  $options = null
    ){
        $this->setDSN(
            driver: $driver,
            scheme: $scheme,
            host: $host,
            port: $port
        );
        $this->username = $username;
        $this->password = $password;
        $this->options = $options;
    }

    public function setDSN(
        string  $driver,
        string  $scheme,
        string  $host,
        ?int  $port
    ): void{
        $this->dsn = $driver.':host='.$host.((!empty($port)) ? (';port=' . $port) : '').';dbname='.$scheme;
    }
}

class Config
{
    public DBConfig $db_config;

    public function __construct(
        DBConfig  $db_config
    )
    {
        $this->db_config = $db_config;
    }
}

class ConfigParser
{
    static function parse(string $file = "my_settings.ini"): Config
    {
        if (!$settings = parse_ini_file($file, TRUE)) throw new exception('Unable to open '.$file.'.');
        $database_settings = $settings["database"];

        return new Config(
            new DBConfig(
                driver: $database_settings["driver"],
                scheme: $database_settings["scheme"],
                host: $database_settings["host"],
                port: !empty($database_settings["port"]) ? (int) $database_settings["port"] : null,
                username: $database_settings["username"],
                password: !empty($database_settings["password"]) ? $database_settings["password"] : null,
                options: !empty($database_settings["options"]) ? $database_settings["options"] : null,
            )
        );
    }
}