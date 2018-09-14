// * 代码展示切换
// */
$("ul.code-types li a").on("click", function (e) { //code-types 在仪表盘和柱状图里，demo文件里
        var tab = $(this).data("href"); // 获取的是data-href的属性值
        // console.log(tab);
        $(this).parent().addClass('active').siblings('.active').removeClass("active"); // 本身添加样式
        $(tab).removeClass("hidden").siblings().addClass("hidden"); // 显示对应的内容
    }
);
// 最大化代码块
$('.maxCode').on('click', function () {
    var contentBtn = $('.maxCode').html();
    if (contentBtn == '最大化') {
        $('.left-wrapper').css('width', '100%').siblings('.right-wrapper').hide();
        $('.maxCode').html('还原');
    } else {
        $('.left-wrapper').css('width', '50%').siblings('.right-wrapper').show();
        $('.maxCode').html('最大化');
    }
});
// 小球移动 体验cubic-bezier属性
$('.btn').on('click', function () {
    var text=$(this).html();
    if(text==='移动'){
        // $('.ball').css('transform','translate3d(0, -300px, 0)');
        $('.ball').addClass('active');
        $('.inner').css('transform','translate3d(300px, 0, 0)');
        $(this).html('返回');
    }else{
        $('.ball').removeClass('active');
        $('.ball').css('transform','translate3d(0, 0, 0)');
        $('.inner').css('transform','translate3d(0, 0, 0)');
        $(this).html('移动');
    }
});
