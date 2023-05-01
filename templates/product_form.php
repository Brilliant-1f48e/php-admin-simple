<?php
$action_attr = isset($attrs) ? "/{$action}_product{$attrs}" : "/{$action}_product";
echo "<form class='form' action='{$action_attr}' method='POST' enctype='multipart/form-data'>";
?>
<table class="form__table table-form table">
    <tbody>
    <tr>
        <td class="table-form__title">Название *</td>
        <td>
            <label>
                <?php
                $value_title_attr = isset($title) ? "value='{$title}'" : "";
                echo "<input name='title' class='input' type='text' tabindex='1' {$value_title_attr}>";
                ?>
            </label>
        </td>
    </tr>
    <tr>
        <td class="table-form__title">Цена (руб.) *</td>
        <td>
            <label>
                <?php
                $value_price_attr = isset($price) ? "value='{$price}'" : "";
                echo "<input name='price' class='input' type='text' tabindex='2' $value_price_attr>";
                ?>
            </label>
        </td>
    </tr>
    <tr>
        <td class="table-form__title">Описание *</td>
        <td>
            <label>
                <?php
                $content = isset($description) ? $description : "";
                echo "<textarea class='textarea' name='description' maxlength='512' tabindex='3'>{$content}</textarea>"; ?>
            </label>
        </td>
    </tr>
    <tr>
        <td class="table-form__title">Категория</td>
        <td>
            <label>
                <select class="select" name="category_id" tabindex="4">
                    <?php
                    foreach ($categories as $category) {
                        $selected_attr = isset($category_id) && $category["id"] === $category_id ? "selected='selected'" : "";
                        echo "<option {$selected_attr} value='{$category["id"]}'>{$category['title']}</option>";
                    }
                    ?>
                </select>
            </label>
        </td>
    </tr>
    <tr>
        <td class="table-form__title">Изображение</td>
        <td>
            <div class="input-file__wrapper">
                <input class="input-file" name="file" type="file" id="input-file"
                       placeholder="Загрузить изображение" accept="image/*,image/jpeg" tabindex="5">
                <div class="input-file__preview preview-input-file">
                    <div class="preview-input-file__hover"></div>
                    <?php echo isset($image) ? "<img src='uploads/{$image}' class='preview-input-file__image' alt='Image preview'>" : " ";?>
                </div>
                <label for="input-file" class="input-file__button">
                    <span>Загрузить изображение</span>
                </label>
            </div>
        </td>
    </tr>
    <tr>
        <td class="table-form__title"></td>
        <td>
            <button type="submit" class="button" name="submit" tabindex="6">
                <?php
                switch ($action) {
                    case "create":
                        echo "Добавить";
                        break;
                    case "update";
                        echo "Изменить";
                        break;
                }
                ?>
            </button>
        </td>
    </tr>
    </tbody>
</table>
</form>
