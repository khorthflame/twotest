<?php
 header('Content-type:text/json;charset=utf-8');
//获取1.json
//使用file_get_contents(路径)
$data = file_get_contents('./1.json');
echo $data;
?>