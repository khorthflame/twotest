 <?php
    /*随机的获取data.json中的10条数据 */
    header('Content-type:application/json');
    //1，读取data.json
    $data = file_get_contents('./info/data.json');
    print_r($data);
//这是把数据放前台处理的写法

    //2,把$data(json格式)转换为php对象(array) json_decode();
//     $dataArr = json_decode($data);
//     //print_r($dataArr);
//     //3.array_rand(arr,n) 这个方法是从数组中随机取出n个元素 并返回对应的下标的集合(数组)
//     $randArr = array_rand($dataArr,10);
//    // print_r($randArr);
//     //4,根据随机生成的随机下标去到总数组中取到对应的内容
//     $newArr = array();
//     ///遍历下标数组$randArr
//     for($i=0;$i<count($randArr);$i++){
//         //获取随机下标
//         $key = $randArr[$i];
//         //获取每一个随机的对象
//         $randObj = $dataArr[$key];
//         //把他压入到$newArr中 
//         array_push($newArr,$randObj);
//     }
//     //输出结果
//     echo json_encode($newArr);//把php对象转化为json对象
//     //print_r($newArr);
?> 