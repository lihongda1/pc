
var box = utils.getElementsByClass('goodsList')[0];//获取最大的盒子
var boxImg = utils.getElementsByClass('scrollImg')[0] ;//获取包涵img的大盒子
var ul1=utils.getElementsByClass('ul1')[0];
var left=utils.getElementsByClass('left',box)[0];
var right=utils.getElementsByClass('right',box)[0];

//获取包涵图片的大盒子
var lis = boxImg.getElementsByTagName('li');//获取包涵img的小盒子
var img = boxImg.getElementsByTagName('img');//获取每一个img
var pageControl = utils.getElementsByClass('pageControl',box)[0];//获取所有焦点
var yuandianli = pageControl.getElementsByTagName('li');//获取单个焦点
ul1.style.width=1226*6+"px";



//实现自动轮播
var timer = null;
var step = 0;
var val = 2000;
function lunbo(){
    if(step == img.length-1){
        step = 0;
        utils.setCss(boxImg,'left',-step*1226);
    }
    step++;

    window.zhufengAnimate(boxImg,{left: -step*1226},500);
    jiaodian();
}
timer = window.setInterval(lunbo,val);

//li焦点对齐

function jiaodian(){
    var tempStep = step > yuandianli.length -1 ? 0 : step;

    for(var i=0;i<yuandianli.length;i++){
        if(i === tempStep){
            yuandianli[i].className = 'on';
        }else{
            yuandianli[i].className = '';
        }
    }
}

//鼠标停留在页面的时候停止轮播，鼠标离开的时候开始轮播
box.onmouseover = function(){
 window.clearInterval(timer);
 left.style.display = right.style.display = 'block';
 };
 box.onmouseout = function(){
 timer = window.setInterval(lunbo,val);
 left.style.display = right.style.display = 'none';
 };

//点击左右按钮的时候，对应切换
//绑定事件
left.onclick = function (){
    if(step == 0){
        step = img.length-1;
        utils.setCss(boxImg,'left',-step*1226);
    }
    step--;
    window.zhufengAnimate(boxImg,{left: -step*1226},500);
    jiaodian();
};
right.onclick = lunbo;

//点击焦点的时候，对应图片切换

function qiehuan(){
    for(var i=0;i<yuandianli.length;i++){
        var curFocus = yuandianli[i];
        curFocus.index = i;
        curFocus.onclick = function (){
            //点击的时候对应的焦点切换
            step = this.index;
            zhufengAnimate(boxImg,{left: -step*1226},200);
            jiaodian();
        }
    }
}
qiehuan();

