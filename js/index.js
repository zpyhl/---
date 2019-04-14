$(function(){
    banner();
});

function banner(){
    /*
    * 1.图片数据  抽象出来 数据结构
    * 2.判断当前的设备  屏幕的宽度来判断   768px
    * 3.动态渲染轮播图
    * 3.1 准备数据
    * 3.2 把数据转化成html结构  （字符串拼接  模版引擎）
    * 3.3 页面渲染
    * 4.测试  页面尺寸改变的时候要求重新渲染
    * */
    var imageList = [
        {
            pcImg:"images/slide_01_2000x410.jpg",
            mImg:"images/slide_01_640x340.jpg"
        },
        {
            pcImg:"images/slide_02_2000x410.jpg",
            mImg:"images/slide_02_640x340.jpg"
        },
        {
            pcImg:"images/slide_03_2000x410.jpg",
            mImg:"images/slide_03_640x340.jpg"
        },
        {
            pcImg:"images/slide_04_2000x410.jpg",
            mImg:"images/slide_04_640x340.jpg"
        }
    ];

    var renderHtml = function(){
        var width = $(window).width();
        var isMobile = width >= 768 ? false : true ;
        var pointStr = $("#point_template").html();
        var imageStr = $("#image_template").html();
        var pointFun = _.template(pointStr);
        var imageFun = _.template(imageStr);
        var pointHtml = pointFun({model:imageList});
        var imageHtml = imageFun({model:imageList, isMobile:isMobile});
        $(".carousel-indicators").html(pointHtml);
        $(".carousel-inner").html(imageHtml);
    };
/*4.测试  页面尺寸改变的时候要求重新渲染*/
    $(window).on('resize',function(){
        renderHtml();
    }).trigger('resize');

 /*5.移动端滑动手势效果*/
    var startX = 0 ,moveX = 0 , distanceX = 0 , isMove = false ;
    $(".wjs_banner").on('touchstart',function(e){
        startX = e.originalEvent.touches[0].clientX;
    }).on('touchmove',function(e){
        moveX = e.originalEvent.touches[0].clientX;
        distanceX = moveX - startX ;
        isMove = true ;
    }).on('touchend',function(e){
        console.log(distanceX);
        if(isMove && Math.abs(distanceX) > 50){
            // prve
            if(distanceX > 0 ){
                $('.carousel').carousel('prev');
            } else {
                $('.carousel').carousel('next'); 
            }
        }
    });



}