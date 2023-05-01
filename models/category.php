<?php

include_once "base.php";

class Category  extends Model
{
    protected string $table_name = "categories";

    public string $title;

    public function getAll(): array|ResponseStatus
    {
        $query = "SELECT * FROM " . $this->table_name;
        if ($result = $this->db_connection->query($query)->fetchAll()){
            return $result;
        } else {
            return ResponseStatus::Fail;
        }
    }
}
