<?php

include_once "base.php";

enum UploadPhotoStatus: int
{
    case Success = 0;
    case SizeError = 1;
    case FormatError = 2;
    case Error = 3;
}


class Product extends Model
{
    protected string $table_name = "products";

    public string $title;
    public float $price;
    public string $description;
    public string $image;
    public int $category_id;
    public string $date_create;

    public function create(
        string $title,
        float  $price,
        string $description,
        string $image,
        int    $category_id,
    ): ResponseStatus
    {
        $this->title = $title;
        $this->price = $price;
        $this->description = $description;
        $this->category_id = $category_id;
        $this->image = $image;
        $this->date_create = date("Y-m-d H:i:s");

        $query = "INSERT INTO " . $this->table_name . " SET title = :title, price = :price, description = :description, category_id = :category_id, image = :image, date_create = :date_create";
        $sth = $this->db_connection->prepare($query);
        if ($sth->execute([
            ":title" => $this->title,
            ":price" => $this->price,
            ":description" => $this->description,
            ":category_id" => $this->category_id,
            ":image" => $this->image,
            ":date_create" => $this->date_create
        ])) {
            return ResponseStatus::Success;
        } else {
            return ResponseStatus::Fail;
        }
    }

    public function set(
        int $id,
        string $title,
        float  $price,
        string $description,
        string $image,
        int    $category_id,
    ): ResponseStatus
    {
        $this->id = $id;
        $this->title = $title;
        $this->price = $price;
        $this->description = $description;
        $this->category_id = $category_id;
        $this->image = $image;

        $query = "UPDATE " . $this->table_name . " SET title = :title, price = :price, description = :description, category_id = :category_id, image = :image WHERE id = :id";
        $sth = $this->db_connection->prepare($query);
        if ($sth->execute([
            ":title" => $this->title,
            ":price" => $this->price,
            ":description" => $this->description,
            ":category_id" => $this->category_id,
            ":image" => $this->image,
            ":id" => $this->id
        ])) {
            return ResponseStatus::Success;
        } else {
            return ResponseStatus::Fail;
        }
    }

    public function get(
        int $id
    ): array|ResponseStatus
    {
        $query = "SELECT * FROM " . $this->table_name . " WHERE id = :id";
        $sth = $this->db_connection->prepare($query);
        $this->id = $id;
        $sth->execute([
            ":id" => $this->id
        ]);
        if ($result = $sth->fetch()) {
            return $result;
        } else {
            return ResponseStatus::Fail;
        }
    }

    public function getAll(): array|ResponseStatus
    {
        $query = "SELECT * FROM " . $this->table_name;
        if ($result = $this->db_connection->query($query)->fetchAll()) {
            return $result;
        } else {
            return ResponseStatus::Fail;
        }
    }

    public  function uploadPhoto(array|string $file): UploadPhotoStatus
    {
        if (is_string($file)) return UploadPhotoStatus::Success;

        $allowed_file_types = ["jpg", "jpeg"];
        $max_size = 1024000;

        if ($file) {
            $directory = $_SERVER["DOCUMENT_ROOT"] . "/uploads/";
            $file_name = $directory . $file["name"];
            $file_type = pathinfo($file_name, PATHINFO_EXTENSION);

            if (!is_dir($directory)) mkdir($directory, 0777, true);

            if (!in_array($file_type, $allowed_file_types)) return UploadPhotoStatus::FormatError;

            if ($file["size"] > $max_size) return UploadPhotoStatus::SizeError;

            if (file_exists($file_name)) return UploadPhotoStatus::Success;

            if (!move_uploaded_file($file["tmp_name"], $file_name)) return UploadPhotoStatus::Error;

            return UploadPhotoStatus::Success;
        }
        return UploadPhotoStatus::Error;
    }

    public function delete(
        int $id
    ): ResponseStatus
    {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = :id";
        $sth = $this->db_connection->prepare($query);
        $this->id = $id;
        if ($sth->execute([
            ":id" => $this->id,
        ])) {
            return ResponseStatus::Success;
        } else {
            return ResponseStatus::Fail;
        }
    }
}
