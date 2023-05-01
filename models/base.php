<?php

enum ResponseStatus: int
{
    case Success = 1;
    case Fail = 0;
}

abstract class Model
{
    protected DBConnect $db_connection;
    protected string $table_name;

    public int $id;

    public function __construct($db_connection)
    {
        $this->db_connection = $db_connection;
    }
}
