/*第一部分轮播图变量声明*/
var blaindex=0; 
var blanner1 = $(".blanner1 .font"); //第一部分轮播图个数
var btnleft = $("#left");
var btnright = $("#right");
var point = $(".blanner1 ul li");

/* 第二部分轮播图变量声明 */
var blanner2 = $(".blanner2");
var blaimg = blanner2.find("img");
var mx=0,my=0,xn=0,yn=0;
var play = null;

/**************** 第一部分轮播图 ********************/
btnleft.click(function(){
    btnLeft();
})
btnright.click(function(){
    btnRight();
})
point.click(function(){
    blaindex = Number.parseInt($(this).attr("data-index"));
    goIndex();
})

function goIndex(){
    clear();
    //图片
    if(blaindex<0){
        blaindex = blanner1.length-1;
    }else if(blaindex>=blanner1.length){
        blaindex = 0;
    }
    if(blaindex==0){
        blanner1[blanner1.length-1].className = "font left";
        blanner1[blaindex].className="font current";
        blanner1[blaindex+1].className = "font right";
    }else if(blaindex==blanner1.length-1){
        blanner1[blaindex-1].className = "font left";
        blanner1[blaindex].className="font current";
        blanner1[0].className = "font right";
    }else{
        blanner1[blaindex-1].className = "font left";
        blanner1[blaindex].className="font current";
        blanner1[blaindex+1].className = "font right";
    }
    //底下的小圆点
    point[blaindex].children[0].className = "point";
}

function clear(){
    for(let i=0; i<blanner1.length; i++){
        blanner1[i].className = "font";
    }
    let span = point.find("span");
    for(let i=0; i<span.length; i++){
        span[i].className = "";
    }
}

function btnLeft(){
    blaindex--;
    goIndex();
}

function btnRight(){
    blaindex++;
    goIndex();
}

/******************    第二部分我的项目      ****************/
$(".design li").each(function(index){
    $(this).click(function(){
        $(this).addClass("active")
    })
})





/******************    第三部分鼠标拖动轮播图      ****************/
blaimg.each(function (index) { 
     $(this).css({
         //3d旋转，Y轴，z轴
         "transform":"rotateY("+ index*360/blaimg.length +"deg) translateZ(300px)"
     })
     //防止鼠标拖拽图片
     $(this).attr("ondragstart","return false");
});
$("#blanner-3d").mousedown(function (e) {
    //鼠标按下的位置 
    var _x = e.clientX;
    var _y = e.clientY;
    clearInterval(play);
    $(this).bind('mousemove',function(e){
        var x = e.clientX;
        var y = e.clientY;
        //鼠标移动的距离
        xn = x-_x;
        yn = y-_y;
        my += xn*0.2;
        mx -= yn*0.1;
        console.log(mx);
        blanner2.css({
            "transform":"rotateX(-10deg) rotateY("+ my +"deg)"
        })
        /* rotateX("+ mx +"deg)  */
        _x = e.clientX;
        _y = e.clientY;
    })
}).mouseup(function(){
    $(this).unbind('mousemove');
});