function SetData(myJson) {
    //调用到Json  myJson 后执行的函数
    var ID = $("#ulHTotalBuy");
    //获取页面要添加的数字的DIV的ID
    var money = 0;
    var seep = 2000;
    //数字变化的速度
    if (myJson.state == 0) {
        money = myJson.count;
        //把myJson.count 赋值给money
        ID.children("li.num").each(function () {
            //在li里面动态的追加数字0-9
            var str1 = '<cite style="top:-621px">';
            //给数字定位 top -621px  这样数字默认的显示的就是0
            for (var i = 9; i >= 0; i--) {
                str1 += '<em t="' + i + '">' + i + "</em>";
                //拼接字符串
            }
            str1 += "</cite><i></i>";
            $(this).html(str1);
            //把拼接好的内容追加到li中
        });

        var moneyStr = myJson.count.toString();
        //把myJson.count 转化为字符串；
        var moneyStrLen = moneyStr.length;
        //获取到字符串的长度
        var arr = moneyStr.split("");
        //把字符串分割为数组

        var moneyLen = 12;
        //定一个一个变量。这个变量是页面中显示的数字的个数
        if ($.inArray(".", arr) != -1) {
            //判断数组当中是否有小数点
            arr.splice($.inArray(".", arr), 1);
            //如果有小数点的话就把小数点删除
            moneyLen = 13;
            //因为有小数点了，所有变量个数就得加1  算上小数点
        };
        var num = moneyLen - moneyStrLen;
        //算出页面中显示的数字的位数和json给出的数字的位数的差值
        for (var i = 0; i < num; i++) {
            //然后进行循环补0；  差多少位就在数组的最前面补多少个0；
            arr.unshift(0);
        }
        console.log(money);
        ID.find("cite").each(function (index) {
            //遍历所追加的元素
            var number = parseFloat(arr[index]);
            //把刚才计算完的数组变成数字；进行下面的动画
            $(this).animate({
                    top: "-" + (69 * (9 - number)) + "px"
                //数字的top值随着变化，计算方法是当钱要显示数字几， 那就从0 滚到几，  一共9个数字，每个数字69的高度，所以9-当前的数字，乘以69 就是要运动的距离，
                },
                {
                    queue: false, //JQ里面判断动画队列长度的方法， false为不执行
                    duration: seep, // 刚才在上面的时候定义的动画速度 duration  JQ的动画速度的方法
                    complete: function () {
                    } //请求错误的时候执行的函数
                });
        });
    }
}