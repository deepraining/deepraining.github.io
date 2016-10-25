$(function () {
    var $name = $('#name'),
        $submit = $('#submit'),
        $nameTibetan = $('#name-tibetan');

    $submit.click(function (e) {
        var name = $.trim($name.val());
        if (!name) {
            alert("姓名输入不能为空！");
            return !1;
        }
        var namePinyin = pinyin.getFullChars(name),
            namePinyinArray = namePinyin.split('-'),
            nameTibetanArray = [];

        for (var i = 0, il = namePinyinArray.length; i < il; i++) {
            if (!!chinese2tibetan[namePinyinArray[i]])
                nameTibetanArray.push(chinese2tibetan[namePinyinArray[i]]);
        }
        //console.log(nameTibetanArray);
        $nameTibetan.val(nameTibetanArray.join('·') + '།');
    });
});